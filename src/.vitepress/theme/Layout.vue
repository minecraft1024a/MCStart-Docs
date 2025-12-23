<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const canvasRef = ref<HTMLCanvasElement | null>(null);

// ================= 配置参数 =================
const STAR_COUNT = 100; // 增加数量以适应全屏
const GLOBAL_GRAVITY = 0.02; // 稍微降低重力，让飘动感更强
const ATTRACTION_FORCE = 0.05; // 静态吸附力
const FRICTION = 0.95; // 摩擦力
const REPULSION_FORCE = 0.8; // 排斥力
const STAR_MIN_SIZE = 3;
const STAR_MAX_SIZE = 8;
// 流体跟随配置
const MOUSE_FLOW_FORCE = 0.08; // 鼠标带动气流的强度
const FLOW_RANGE = 300; // 气流影响范围

const COLORS = [
    '#F59E0B', '#A855F7', '#0EA5E9', '#EC4899', '#10B981', '#6366f1'
];

// ================= 状态管理 =================
// 鼠标状态：增加 vx, vy 记录鼠标自身的移动向量
const mouse = { x: -9999, y: -9999, vx: 0, vy: 0, speed: 0 };
let lastMousePos = { x: -9999, y: -9999 };

// 粒子类
class Star {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    rotation: number;
    rotationSpeed: number;
    life: number;
    maxLife: number;
    canvasWidth: number;
    canvasHeight: number;
    // 新增：跟随系数 (-1 到 1 之间)
    // 负数代表反向运动（模拟远景视差），正数代表同向运动（受气流影响）
    flowFactor: number; 

    constructor(w: number, h: number, initial = false) {
        this.canvasWidth = w;
        this.canvasHeight = h;
        // 占位初始化
        this.x = 0; this.y = 0; this.vx = 0; this.vy = 0;
        this.size = 0; this.color = ''; this.rotation = 0; 
        this.rotationSpeed = 0; this.life = 0; this.maxLife = 0;
        this.flowFactor = 0;
        this.reset(initial);
    }

    reset(initial = false) {
        this.x = Math.random() * this.canvasWidth;
        this.y = initial ? Math.random() * this.canvasHeight : -20;
        
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = Math.random() * 0.5;
        
        this.size = Math.random() * (STAR_MAX_SIZE - STAR_MIN_SIZE) + STAR_MIN_SIZE;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 0.05;
        this.maxLife = Math.random() * 2000 + 300;
        this.life = this.maxLife;

        // 3D 空间感核心逻辑：
        // 大星星(近景)更容易受到同向气流影响 (Flow > 0)
        // 小星星(远景)更倾向于产生反向视差或不动 (Flow < 0)
        const sizeRatio = (this.size - STAR_MIN_SIZE) / (STAR_MAX_SIZE - STAR_MIN_SIZE); // 0 ~ 1
        // 产生一个 -0.5 到 1.0 之间的系数
        // 尺寸越大，数值越偏大
        this.flowFactor = (Math.random() - 0.3) + (sizeRatio * 0.8);
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        
        let opacity = 1;
        if (this.life < 100) opacity = this.life / 100;
        
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = opacity;

        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;

        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
            ctx.lineTo(0, -this.size); 
            ctx.lineTo(this.size * 0.4, -this.size * 0.3);
            ctx.rotate(Math.PI / 2);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    update(allStars: Star[]) {
        this.life--;
        if (this.life <= 0) {
            this.reset();
            return;
        }

        // 1. 基础重力
        this.vy += GLOBAL_GRAVITY;

        // 计算与鼠标距离
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        
        // ================= 新增：鼠标气流跟随效果 (3D Parallax) =================
        if (distToMouse < FLOW_RANGE && mouse.speed > 0.1) {
            // 距离权重：越近影响越大 (0 ~ 1)
            const distanceWeight = (1 - distToMouse / FLOW_RANGE);
            
            // 施加力：鼠标速度向量 * 星星自身的跟随系数 * 距离权重 * 全局力度
            // 这里使用了 +=，实现了"加速度"而非直接修改速度，且自带缓冲效果
            this.vx += mouse.vx * this.flowFactor * distanceWeight * MOUSE_FLOW_FORCE;
            this.vy += mouse.vy * this.flowFactor * distanceWeight * MOUSE_FLOW_FORCE;
        }

        // ================= 原有：吸附与疲劳 =================
        const attractionRange = 250;
        if (distToMouse < attractionRange) {
            const isTooClose = distToMouse < 20;
            const isMouseStatic = mouse.speed < 2;

            if (!(isTooClose && isMouseStatic)) {
                // 吸附力
                const force = (distToMouse / attractionRange) * ATTRACTION_FORCE;
                this.vx += (dx / distToMouse) * force;
                this.vy += (dy / distToMouse) * force;
                this.rotation += 0.05;
            }
        }

        // ================= 原有：排斥 =================
        allStars.forEach(otherStar => {
            if (otherStar === this) return;
            const dx = this.x - otherStar.x;
            const dy = this.y - otherStar.y;
            const distSq = dx * dx + dy * dy;
            const minDist = (this.size + otherStar.size) * 1.5;
            if (distSq < minDist * minDist) {
                const dist = Math.sqrt(distSq);
                const force = (minDist - dist) / minDist * REPULSION_FORCE;
                if (dist > 0) {
                    this.vx += (dx / dist) * force;
                    this.vy += (dy / dist) * force;
                }
            }
        });

        // 摩擦力与更新
        this.vx *= FRICTION;
        this.vy *= FRICTION;
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;

        // 边界检查 (改为全屏后，左右也做个循环连接，让星星看起来源源不断)
        if (this.y > this.canvasHeight + 50) this.reset();
        if (this.x < -50) this.x = this.canvasWidth + 50;
        if (this.x > this.canvasWidth + 50) this.x = -50;
    }
}

let animationFrameId: number;
let stars: Star[] = [];

const updateMouseSpeed = () => {
    // 计算当前帧的鼠标向量
    const vx = mouse.x - lastMousePos.x;
    const vy = mouse.y - lastMousePos.y;

    // 缓冲鼠标向量：不要直接赋值，而是平滑过渡，避免鼠标瞬间跳跃导致星星乱飞
    // 这里简单的赋值即可，因为星星的物理惯性(vx/vy)已经起到了缓冲作用
    // 但为了计算方便，我们限制一下最大值
    mouse.vx = vx;
    mouse.vy = vy;

    mouse.speed = Math.sqrt(vx * vx + vy * vy);
    
    // 更新上一帧位置
    lastMousePos.x = mouse.x;
    lastMousePos.y = mouse.y;
};

const initCanvas = () => {
    const canvas = canvasRef.value;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置全屏尺寸
    const setSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        stars.forEach(s => {
            s.canvasWidth = canvas.width;
            s.canvasHeight = canvas.height;
        });
    };
    setSize();

    stars = Array.from({ length: STAR_COUNT }, () => new Star(canvas.width, canvas.height, true));

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        updateMouseSpeed();
        stars.forEach(star => {
            star.update(stars);
            star.draw(ctx);
        });
        animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('resize', setSize);
};

const handleMouseMove = (e: MouseEvent) => {
    // 全屏模式下，直接使用 clientX/Y
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    
    // 初始化 lastPos 防止第一帧飞跃
    if (lastMousePos.x === -9999) {
        lastMousePos.x = mouse.x;
        lastMousePos.y = mouse.y;
    }
};

onMounted(() => {
    initCanvas();
    window.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('mousemove', handleMouseMove);
});
</script>

<template>
    <div
        class="absolute flex flex-col z-[40] w-full !max-w-full items-center justify-center bg-transparent transition-bg overflow-hidden h-[60vh] -top-16 pointer-events-none opacity-[.35] dark:opacity-50">
        
        <!-- 修改点：Canvas 改为 fixed 并全屏覆盖，z-index 提高以保证不被极光遮挡，但仍在底层不挡内容 -->
        <!-- 如果需要让星星在所有页面内容之上（如下雪特效），可以将 z-index 改为 9999 -->
        <canvas ref="canvasRef" class="fixed inset-0 w-screen h-screen z-50 pointer-events-none"></canvas>
        
        <div class="jumbo absolute opacity-60 animate z-0"></div>
    </div>
</template>

<style scoped>
/* 保持原有极光样式 */
.opacity-\[\.35\] { opacity: .35; }
.bg-transparent { background-color: transparent; }
.overflow-hidden { overflow: hidden; }
.justify-center { justify-content: center; }
.items-center { align-items: center; }
.flex-col { flex-direction: column; }
.\!max-w-full { max-width: 100% !important; }
.w-full { width: 100%; }
.h-\[60vh\] { height: 60vh; }
.flex { display: flex; }
.z-\[40\] { z-index: 40; }
.-top-16 { top: -4rem; }
.absolute { position: absolute; }
.pointer-events-none { pointer-events: none; }

/* 实用工具类补充，确保 full-screen 生效 */
.fixed { position: fixed; }
.inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
.w-screen { width: 100vw; }
.h-screen { height: 100vh; }
.z-50 { z-index: 50; }

.jumbo {
    --stripes: repeating-linear-gradient(100deg, #fff 0%, #fff 7%, transparent 10%, transparent 12%, #fff 16%);
    --stripesDark: repeating-linear-gradient(100deg, #000 0%, #000 7%, transparent 10%, transparent 12%, #000 16%);
    --rainbow: repeating-linear-gradient(100deg, #60a5fa 10%, #e879f9 16%, #5eead4 22%, #60a5fa 30%);
    contain: strict;
    contain-intrinsic-size: 100vw 40vh;
    background-image: var(--stripes), var(--rainbow);
    background-size: 300%, 200%;
    background-position: 50% 50%, 50% 50%;
    height: inherit;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
    -webkit-perspective: 1000;
    perspective: 1000;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    filter: invert(100%);
    -webkit-mask-image: radial-gradient(ellipse at 100% 0%, black 40%, transparent 70%);
    mask-image: radial-gradient(ellipse at 100% 0%, black 40%, transparent 70%);
    pointer-events: none;
}
.opacity-60 { opacity: .6; }
@keyframes jumbo-5f0d2d0c {
    0% { background-position: 50% 50%, 50% 50% }
    to { background-position: 350% 50%, 350% 50% }
}
.jumbo:after {
    content: "";
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    background-image: var(--stripes), var(--rainbow);
    background-size: 200%, 100%;
    mix-blend-mode: difference
}
.animate.jumbo:after {
    animation: jumbo-5f0d2d0c 90s linear infinite
}
</style>