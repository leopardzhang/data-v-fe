<template>
  <div id="content">
    <el-container style="height: 100vh;">
      <el-aside width="200px" style="background-color: rgb(26, 30, 36);">
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-news"></i>添加图表
            </template>
            <el-menu-item-group v-for="item in chartClass" :key="item.type">
              <el-menu-item index="1-1" @click="addItem(item.type)">{{ item.text }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
        <el-menu>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-setting"></i>其他设置
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="handleSetTitleOpen">设置标题</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-aside
        width="300px"
        style="background-color:#1a1e24; position: fixed; right: 0; top: 0; bottom: 0; left: auto; z-index: 10"
      >
        <div v-if="currentData">
          <div
            class="controler"
            style="background-color:#14161a; padding:12px 20px; border-bottom: 1px solid #282e3a;"
          >
            <el-row>
              <el-col
                :span="6"
                style="font-size: 10px; height: 26px; line-height: 26px; color:#dcdcdc;"
              >图标尺寸</el-col>
              <el-col :span="8">
                <el-input-number
                  size="mini"
                  controls-position="right"
                  :value="currentData.width"
                  :step="1"
                  :min="0"
                  @change="changeWidth"
                ></el-input-number>
              </el-col>
              <el-col :span="8" style="margin-left: 20px">
                <el-input-number
                  size="mini"
                  controls-position="right"
                  :value="currentData.height"
                  :min="0"
                  :step="1"
                  @change="changeHeight"
                ></el-input-number>
              </el-col>
            </el-row>
            <el-row>
              <el-col
                :span="6"
                style="margin-left:75px; color:#494d55; font-size:10px; margin-top:5px;"
              >宽度</el-col>
              <el-col
                :span="6"
                style="margin-left:43px; color:#494d55; font-size:10px; margin-top:5px;"
              >高度</el-col>
            </el-row>
            <el-row style=" margin-top:12px;">
              <el-col
                :span="6"
                style="font-size: 10px; height: 26px; line-height: 26px; color:#dcdcdc;"
              >图表位置</el-col>
              <el-col :span="8">
                <el-input-number
                  size="mini"
                  controls-position="right"
                  :value="currentData.left"
                  :step="1"
                  @change="changeLeft"
                ></el-input-number>
              </el-col>
              <el-col :span="8" style="margin-left: 20px">
                <el-input-number
                  size="mini"
                  controls-position="right"
                  :value="currentData.top"
                  :step="1"
                  @change="changeTop"
                ></el-input-number>
              </el-col>
            </el-row>
            <el-row>
              <el-col
                :span="6"
                style="margin-left:75px; color:#494d55; font-size:10px; margin-top:5px;"
              >横坐标</el-col>
              <el-col
                :span="6"
                style="margin-left:43px; color:#494d55; font-size:10px; margin-top:5px;"
              >纵坐标</el-col>
            </el-row>
          </div>
          <div class="input_box">
            <el-row class="input_item">
              <el-col
                :span="6"
                style="font-size: 10px; height: 26px; line-height: 26px; color:#dcdcdc;"
              >api地址</el-col>
              <el-col style="width:74%;">
                <el-input class="txt_inter" size="mini" :value="currentData.api" @input="changeApi"></el-input>
              </el-col>
            </el-row>
          </div>
          <div class="btn_box">
            <div class="btn_item" @click="bandleSubmit">保存</div>
          </div>
        </div>
      </el-aside>
      <el-container>
        <el-main>
          <div class="canvas">
            <canvasArea :res="res"/>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog title="设置标题" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="标题名称">
          <el-input v-model="title" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSetTitle">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import Bar from "./components/bar/index.vue";
import Pie from "./components/pie/index.vue";
import Lines from "./components/line/index.vue";
import Circles from "./components/circle/index.vue";
import canvasArea from "./components/canvasArea/index.vue";
import { mapGetters, mapActions, mapState } from "vuex";

import original from "./configs/original";
import baseUrl from "./configs/baseUrl";
import axios from "axios";

export default {
  name: "app",
  data() {
    return {
      chartClass: [
        {
          type: "lines",
          text: "折线图"
        },
        {
          type: "bar",
          text: "柱状图"
        },
        {
          type: "pie",
          text: "饼图"
        },
        {
          type: "circles",
          text: "环状图"
        }
      ],
      dialogFormVisible: false,
      title: ""
    };
  },

  computed: {
    ...mapGetters(["res", "current"]),
    ...mapState({
      currentData: state => {
        const store = state.charts;
        return store.current.type
          ? store.res[store.current.type][store.current.index]
          : "";
      }
    })
  },

  components: {
    Bar,
    Pie,
    Lines,
    Circles,
    canvasArea
  },

  created() {
    const _this = this;
    document.onkeyup = function() {
      let key = window.event.keyCode;
      if (key == 46) {
        _this.removeItem();
      }
    };
  },

  methods: {
    ...mapActions([
      "setData",
      "setRes",
      "setCurrent",
      "setTitle",
      "removeItem"
    ]),

    addItem(type) {
      if (this.res[type] && this.res[type].length) {
        this.setData({
          data: Object.assign({}, original[type]),
          way: true,
          type
        });
      } else {
        this.setData({
          data: Object.assign({}, original[type]),
          way: false,
          type
        });
      }
    },

    changeWidth(width) {
      this.currentData.width = width;
      this.changeCurrent();
    },

    changeHeight(height) {
      this.currentData.height = height;
      this.changeCurrent();
    },

    changeLeft(left) {
      this.currentData.left = left;
      this.changeCurrent();
    },

    changeTop(top) {
      this.currentData.top = top;
      this.changeCurrent();
    },

    changeApi(api) {
      this.currentData.api = api;
      this.changeCurrent();
    },

    changeCurrent() {
      let temp = this.currentData;
      this.setRes(temp);
    },

    /**
     * 设置标题
     */
    handleSetTitleOpen() {
      this.dialogFormVisible = true;
    },

    handleSetTitle() {
      this.setTitle(this.title);
      this.dialogFormVisible = false;
    },

    bandleSubmit() {
      const _this = this;
      const groupid = location.href.split("?")[1].split("=")[1];

      axios.get(baseUrl, {
        params: {
          code: _this.res,
          groupid
        }
      }).then(res => {
        if (res.data === 1) {
          _this.$message({
            message: "保存成功",
            type: "success"
          });
        } else {
          _this.$message.error('保存失败，请联系管理员或重试');
        }
      });
    }
  }
};
</script>

<style lang="scss">
#content {
  width: 100vw;
  height: 100vh;
  background: url(./assets/dotted.png) repeat;
  overflow: hidden;
}
.title {
  height: 40px;
  line-height: 40px;
  color: #fff;
  font-size: 20px;
  text-align: center;
}
.el-main {
  position: relative;
}

.canvas {
  width: 1920px;
  height: 1080px;
  background-image: url(./assets/bg.jpg);
  background-color: rgba(13, 42, 67, 0);
  transform: scale(0.43);
  position: absolute;
  transform-origin: 0 0;
  top: 20px;
  left: 20px;
  transition: 0.2s all ease-in-out;
  background-size: cover, contain;
  background-position: center, right bottom;
  background-repeat: no-repeat, no-repeat;
  box-shadow: rgba(0, 0, 0, 0.5) 0 0 30px 0;

  #app {
    width: 1920px;
    height: 1080px;
  }
}
.el-input-number--mini {
  width: 85px !important;

  input {
    background-color: #101216;
    height: 24px !important;
    color: #ccd5dc;
    border-color: #282e3a;
    padding: 0 30px 0 8px !important;
    text-align: left !important;
  }

  .el-input-number__increase {
    background-color: #101216;
    color: #ccd5dc;
    line-height: 10px !important;
    height: 10px !important;
    margin-top: 2px;
    border-color: #282e3a !important;
  }
  .el-input-number__decrease {
    background-color: #101216;
    color: #ccd5dc;
    line-height: 10px !important;
    height: 10px !important;
    border-color: #282e3a !important;
  }
}
.txt_inter {
  input {
    height: 24px !important;
    line-height: 24px !important;
    background: #101216;
    font-size: 10px;
    border-color: #282e3a !important;
  }
}
.input_box .input_item {
  padding: 10px 20px;
  border-bottom: 1px solid #282e3a;

  input {
    color: #ccd5dc !important;
    padding-left: 8px;
  }
}
.el-menu {
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  background-color: #1a1e24 !important;
  border-right: none !important;
  // border-left: 2px solid #1771e0;
  border-bottom: 1px solid #282e3a;
  overflow: hidden !important;
}

.el-menu-item,
.el-submenu__title {
  color: #ccc !important;

  &:hover {
    color: #303133 !important;
  }
}
.el-submenu__title:hover {
  background: #14161a !important;
  color: #ccc !important;
}
.el-menu-item-group {
  border: 1px solid #282e3a;
  border-left: none;
  border-right: none;
  border-bottom: none;

  .el-menu-item-group__title {
    display: none;
  }
  .el-menu-item {
    border-left: 1px solid #1a1e24;
  }
}
.el-menu-item:hover,
.el-menu-item:focus {
  background: #14161a !important;
  color: #fff !important;
  border-left: 1px solid #2a98fa;
}
.btn_box {
  padding: 13px 0 13px 86px;
}
.btn_box .btn_item {
  width: 74px;
  font-size: 10px;
  border: 1px solid #00baff;
  padding: 5px 10px;
  color: #24b1ff;
  text-align: center;
  cursor: pointer;
}
.btn_box .btn_item:hover {
  color: #293f52;
  background-image: linear-gradient(-225deg, #00d3f1 0, #12b3ff 100%);
  box-shadow: 0 0 15px 0 rgba(0, 193, 220, 0.37);
}
.el-dialog {
  background: #1f262b !important;
  border-top: 2px solid #0095ff;

  .el-dialog__title {
    color: #0095ff !important;
    font-size: 16px;
  }
  .el-dialog__body {
    padding: 10px 20px 10px 20px !important;
  }
  .el-form-item__label {
    font-size: 14px;
    color: #fff;
  }
  .el-input__inner {
    background: #1b2227 !important;
    border-color: #606063 !important;
    color: #fff;
    height: 35px;
    line-height: 35px;
  }
  .el-input__inner:hover {
    border-color: #5f8bc1 !important;
    color: #fff;
    height: 35px;
    line-height: 35px;
  }
  .el-button {
    padding: 8px 20px !important;
    font-size: 14px !important;
    border-radius: 20px !important;
  }
  .el-button--primary {
    background: #108ae0 !important;
    color: #fff !important;
    border: none;
  }
  .el-button--primary:hover {
    box-shadow: 0 0 8px 0 rgba(0, 193, 220, 0.37);
  }
  .el-button--default {
    background: #fff !important;
    color: #293f52 !important;
    border: none;
  }
  .el-button--default:hover {
    box-shadow: 0 0 8px 0 rgba(255, 255, 255, 0.37);
  }
}

.current {
  z-index: 10;
}
</style>
