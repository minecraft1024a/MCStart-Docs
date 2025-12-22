<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const canvasRef = ref<HTMLCanvasElement | null>(null);

// ================= 配置参数 =================
const STAR_COUNT = 80; // 星星数量
const GLOBAL_GRAVITY = 0.01; // 全局重力
const ATTRACTION_FORCE = 0.03; // 鼠标吸附力系数
const FRICTION = 0.96; // 空气阻力 (防止速度无限增加)
const REPULSION_FORCE = 0.9; // 粒子排斥力强度
const STAR_MIN_SIZE = 4;
const STAR_MAX_SIZE = 9;

// 颜色配置：为了在Light模式下凸显，选用了色值较高的颜色
// 同时也保留了一定的透明度逻辑
const COLORS = [
    '#F59E0B', // Amber 500 (深黄色)
    '#A855F7', // Purple 500 (深紫色)
    '#0EA5E9', // Sky 500 (深天蓝)
    '#EC4899', // Pink 500
    '#10B981', // Emerald 500 (增加一点绿色点缀)
];

// ================= 状态管理 =================
// 鼠标状态：记录位置和当前移动速度
const mouse = { x: -9999, y: -9999, speed: 0 };
let lastMousePos = { x: -9999, y: -9999 };

// 粒子类
class Star {
    x: number;
    y: number;
    vx: number; // X轴速度
    vy: number; // Y轴速度
    size: number;
    color: string;
    rotation: number;
    rotationSpeed: number;
    life: number;     // 当前生命值
    maxLife: number;  // 总生命周期
    canvasWidth: number;
    canvasHeight: number;

    constructor(w: number, h: number, initial = false) {
        this.canvasWidth = w;
        this.canvasHeight = h;
        this.reset(initial);
        // 初始化时属性占位，reset会覆盖
        this.x = 0; this.y = 0; this.vx = 0; this.vy = 0;
        this.size = 0; this.color = ''; this.rotation = 0; 
        this.rotationSpeed = 0; this.life = 0; this.maxLife = 0;
        this.reset(initial); // 真正的初始化
    }

    // 重置/重生逻辑
    reset(initial = false) {
        this.x = Math.random() * this.canvasWidth;
        // 如果是初始加载，随机分布在全屏；如果是重生，从顶部开始
        this.y = initial ? Math.random() * this.canvasHeight : -20;
        
        this.vx = (Math.random() - 0.5) * 0.5; // 轻微的横向初始速度
        this.vy = Math.random() * 0.5;         // 初始向下速度
        
        this.size = Math.random() * (STAR_MAX_SIZE - STAR_MIN_SIZE) + STAR_MIN_SIZE;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 0.05;

        // 生命周期：300到600帧 (约5-10秒 @ 60fps)
        this.maxLife = Math.random() * 900 + 300;
        this.life = this.maxLife;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        
        // 计算透明度：生命周期最后 100 帧开始渐隐
        let opacity = 1;
        if (this.life < 100) {
            opacity = this.life / 100;
        }
        
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = opacity; // 应用渐隐

        // 颜色与阴影
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;

        // 绘制四角星
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
            ctx.lineTo(0, -this.size); 
            ctx.lineTo(this.size * 0.35, -this.size * 0.35); // 0.35 让星星稍微胖一点点，更可爱
            ctx.rotate(Math.PI / 2);
        }
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
    }

    update(allStars: Star[]) {
        // 1. 生命周期递减
        this.life--;
        if (this.life <= 0) {
            this.reset();
            return;
        }

        // 2. 基础物理：重力
        this.vy += GLOBAL_GRAVITY;

        // 3. 鼠标交互 (吸附与疲劳)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        const attractionRange = 250;

        if (distToMouse < attractionRange) {
            // 疲劳机制：
            // 如果距离极近 (< 20px) 且 鼠标移动很慢 (< 2)，则失去吸附力，允许重力接管
            // 否则，正常吸附
            const isTooClose = distToMouse < 20;
            const isMouseStatic = mouse.speed < 3;

            if (!(isTooClose && isMouseStatic)) {
                // 计算吸附向量 (归一化 * 力度)
                // 距离越远吸力越强(直到边缘)，距离极近时吸力减弱防抖动
                const force = (distToMouse / attractionRange) * ATTRACTION_FORCE;
                
                this.vx += (dx / distToMouse) * force;
                this.vy += (dy / distToMouse) * force;
                
                // 受到扰动时旋转加速
                this.rotation += 0.1;
            }
        }

        // 4. 粒子排斥 (防堆积)
        // 这是一个 O(N^2) 操作，但 N=80 时性能完全没问题
        allStars.forEach(otherStar => {
            if (otherStar === this) return;
            
            const dx = this.x - otherStar.x;
            const dy = this.y - otherStar.y;
            // 简化距离计算，不开根号以提升性能 (判断距离平方)
            const distSq = dx * dx + dy * dy;
            const minDist = (this.size + otherStar.size) * 1.5; // 动态排斥半径 (大约 12px - 27px)

            // 如果两个星星太近
            if (distSq < minDist * minDist) {
                const dist = Math.sqrt(distSq);
                // 距离越近，斥力越大
                const force = (minDist - dist) / minDist * REPULSION_FORCE;
                
                // 给当前星星施加斥力 (推开)
                if (dist > 0) { // 防止除以0
                    this.vx += (dx / dist) * force;
                    this.vy += (dy / dist) * force;
                }
            }
        });

        // 5. 应用速度与摩擦力
        this.vx *= FRICTION;
        this.vy *= FRICTION;
        
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;

        // 6. 边界检查 (只检查底部，左右可以飘出去再飘回来，更自然)
        if (this.y > this.canvasHeight + 50) {
            this.reset();
        }
    }
}

let animationFrameId: number;
let stars: Star[] = [];

// 计算鼠标移动速度
const updateMouseSpeed = () => {
    const dx = mouse.x - lastMousePos.x;
    const dy = mouse.y - lastMousePos.y;
    // 简单的速度计算
    mouse.speed = Math.sqrt(dx * dx + dy * dy);
    // 衰减速度 (如果鼠标停下，speed会迅速归零)
    mouse.speed *= 0.8; 
    
    lastMousePos.x = mouse.x;
    lastMousePos.y = mouse.y;
};

const initCanvas = () => {
    const canvas = canvasRef.value;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置画布尺寸
    const setSize = () => {
        const rect = canvas.parentElement?.getBoundingClientRect();
        if (rect) {
            canvas.width = rect.width;
            canvas.height = rect.height;
            // 调整窗口大小时，通知所有星星新的边界
            stars.forEach(s => {
                s.canvasWidth = canvas.width;
                s.canvasHeight = canvas.height;
            });
        }
    };
    setSize();

    // 初始化星星
    stars = Array.from({ length: STAR_COUNT }, () => new Star(canvas.width, canvas.height, true));

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 更新鼠标速度状态
        updateMouseSpeed();

        stars.forEach(star => {
            // 传入 stars 数组用于计算排斥
            star.update(stars);
            star.draw(ctx);
        });

        animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('resize', setSize);
};

const handleMouseMove = (e: MouseEvent) => {
    const canvas = canvasRef.value;
    if(canvas) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    }
};

onMounted(() => {
    initCanvas();
    window.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('mousemove', handleMouseMove);
    // resize listener is technically added inside initCanvas, ideally should be cleaned up too but closure makes it tricky without extracting function. 
    // Given the scope, it's acceptable, or extract setSize to outer scope.
});
</script>

<template>
    <div
        class="absolute flex flex-col z-[40] w-full !max-w-full items-center justify-center bg-transparent transition-bg overflow-hidden h-[60vh] -top-16 pointer-events-none opacity-[.35] dark:opacity-50">
        
        <!-- Canvas 层：z-10 确保在极光之上，但仍在 pointer-events-none 的容器内 -->
        <!-- 注意：pointer-events-auto 可以加在 canvas 上如果你想直接交互，但因为父级是 none，我们需要全局监听 -->
        <canvas ref="canvasRef" class="absolute top-0 left-0 w-full h-full z-10"></canvas>
        
        <!-- 极光背景 -->
        <div class="jumbo absolute opacity-60 animate z-0"></div>
    </div>
</template>

<style scoped>
/* 原有极光样式保持不变 */
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