<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    title: string,
    link: string,
    target?: string
}>()

// 检测是否为外部链接
const isExternalLink = computed(() => {
    return /^(https?:|mailto:|tel:)/.test(props.link)
})

// 如果是内部链接且是 .md 文件，转换为 .html
const processedLink = computed(() => {
    if (isExternalLink.value) {
        return props.link
    }
    // 将 .md 转换为 .html，如果路径不带扩展名则保持原样
    return props.link.replace(/\.md$/, '.html')
})
</script>

<template>
    <ClientOnly>
        <div class="ncard">
            <!-- 外部链接使用普通 a 标签 -->
            <a v-if="isExternalLink" 
               :href="processedLink" 
               :target="props.target || '_blank'" 
               rel="noopener noreferrer">
                <div class="ncardBody">
                    <div class="card-title">{{ props.title }}</div>
                    <div class="card-text">
                        <slot></slot>
                    </div>
                </div>
            </a>
            <!-- 内部链接使用 a 标签但不设置 target，让 VitePress 处理路由 -->
            <a v-else :href="processedLink">
                <div class="ncardBody">
                    <div class="card-title">{{ props.title }}</div>
                    <div class="card-text">
                        <slot></slot>
                    </div>
                </div>
            </a>
        </div>
    </ClientOnly>
</template>

<style scoped>
.ncard {
    border: 1px solid #ebedf0;
    box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, .15);
    margin-bottom: 2em;
    border-radius: 8px;
    transition: all 200ms ease;
}

.ncard:hover {
    border: 1px solid var(--vp-c-brand);
    box-shadow: 2px 2px 1px 0 rgba(0, 0, 0, .1);
}

.ncardBody {
    padding: 1.8em;
}

a {
    color: var(--vp-c-text-1);
    text-decoration-line: none;
}

a::after {
    content: none !important;
}

.card-title {
    font-size: 1.5em;
    margin-bottom: .8em;
}

.card-text {
    font-size: 0.9em;
}
</style>