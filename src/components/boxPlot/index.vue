<template>
    <div
        class="box_plot temp"
        :class="{current}"
        :style="{ left: left + 'px', top: top + 'px' }"
        @mousedown="handleMousedown"
        @mouseup="handleMouseup"
    >
        <div ref="chart" :style="{ width: width + 'px', height: height + 'px' }"></div>
    </div>
</template>

<script src="./index.js"></script>

<style src="./index.scss" lang="scss" scoped></style>
