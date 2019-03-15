<template>
    <div
        class="border temp"
        :class="{current}"
        :style="{ left: left + 'px', top: top + 'px' }"
        @mousedown="handleMousedown"
        @mouseup="handleMouseup"
    >
        <div class="border_inner" ref="border" :style="{ width: width + 'px', height: height + 'px', backgroundImage: `url(${api})` }"></div>
    </div>
</template>

<script src="./index.js"></script>

<style src="./index.scss" lang="scss" scoped></style>
