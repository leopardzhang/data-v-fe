<template>
  <div
      id="table"
      class="tables temp"
      :style="{ left: left + 'px', top: top + 'px' }"
      @mousedown="handleMousedown"
      @mouseup="handleMouseup">
    <el-table :data="tableData" :style="{ width: width + 'px', height: height + 'px' }">
      <el-table-column
        v-for="item in table"
        :prop="item.prop"
        :label="item.name"
        :key="item.prop">
      </el-table-column>
    </el-table>
  </div>
</template>

<script src="./index.js"></script>

<style src="./index.scss" lang="scss" scoped></style>
