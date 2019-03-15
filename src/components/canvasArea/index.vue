<script>
import Bar from "../bar/index.vue";
import Pie from "../pie/index.vue";
import Lines from "../line/index.vue";
import Circles from "../circle/index.vue";
import Tables from "../table/index.vue";
import Border from "../border/index.vue";
import BoxPlot from "../boxPlot/index.vue";
import Tree from "../tree/index.vue";
import Scatter from "../scatter/index.vue";
import Radar from "../radar/index.vue";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "canvasArea",
  props: {
    res: Object
  },
  data() {
    return {};
  },

  components: {
    Bar,
    Pie,
    Lines,
    Circles,
    Tables,
    Border,
    BoxPlot,
    Tree,
    Scatter,
    Radar
  },

  computed: {
    ...mapGetters([
      'title',
      'current'
    ])
  },

  methods: {
    ...mapActions([
      "upData",
      "setCurrent"
    ])
  },

  render(h) {
    return (
      <div id={"app"}>
        <div class={"title"}>{this.title}</div>
        {this.res.border.map((item, index) => {
          return (
            <Pie
              on-setPosition={data => {
                this.upData({
                  type: "border",
                  index,
                  data
                });
              }}
              on-setCurrent={data => {
                this.setCurrent({
                  index,
                  type: "border"
                });
              }}
              class={{current: index == this.current.index && this.current.type == 'border'}}
              index={index}
              width={item.width}
              height={item.height}
              left={item.left}
              top={item.top}
              api={item.api}
            />
          );
        })}
        {this.res.bar.map((item, index) => {
          return (
            <Bar
              on-setPosition={data => {
                this.upData({
                  type: "bar",
                  index,
                  data
                });
              }}
              on-setCurrent={data => {
                this.setCurrent({
                  index,
                  type: "bar"
                });
              }}
              class={{current: index == this.current.index && this.current.type == 'bar'}}
              index={index}
              width={item.width}
              height={item.height}
              left={item.left}
              top={item.top}
              api={item.api}
            />
          );
        })}
        {this.res.lines.map((item, index) => {
          return (
            <Lines
              on-setPosition={data => {
                this.upData({
                  type: "lines",
                  index,
                  data
                });
              }}
              on-setCurrent={data => {
                this.setCurrent({
                  index,
                  type: "lines"
                });
              }}
              class={{current: index == this.current.index && this.current.type == 'lines'}}
              index={index}
              width={item.width}
              height={item.height}
              left={item.left}
              top={item.top}
              api={item.api}
            />
          );
        })}
        {this.res.pie.map((item, index) => {
          return (
            <Pie
              on-setPosition={data => {
                this.upData({
                  type: "pie",
                  index,
                  data
                });
              }}
              on-setCurrent={data => {
                this.setCurrent({
                  index,
                  type: "pie"
                });
              }}
              class={{current: index == this.current.index && this.current.type == 'pie'}}
              index={index}
              width={item.width}
              height={item.height}
              left={item.left}
              top={item.top}
              api={item.api}
            />
          );
        })}
        {this.res.circles.map((item, index) => {
          return (
            <Circles
              on-setPosition={data => {
                this.upData({
                  type: "circles",
                  index,
                  data
                });
              }}
              on-setCurrent={data => {
                this.setCurrent({
                  index,
                  type: "circles"
                });
              }}
              class={{current: index == this.current.index && this.current.type == 'circles'}}
              index={index}
              width={item.width}
              height={item.height}
              left={item.left}
              top={item.top}
              api={item.api}
            />
          );
        })}
        {this.res.tables.map((item, index) => {
          return (
            <Tables
              on-setPosition={data => {
                this.upData({
                  type: "tables",
                  index,
                  data
                });
              }}
              on-setCurrent={data => {
                this.setCurrent({
                  index,
                  type: "tables"
                });
              }}
              class={{current: index == this.current.index && this.current.type == 'tables'}}
              index={index}
              width={item.width}
              height={item.height}
              left={item.left}
              top={item.top}
              api={item.api}
            />
          );
        })}
        {this.res.boxPlot.map((item, index) => {
          return (
            <BoxPlot
              on-setPosition={data => {
                this.upData({
                  type: "boxPlot",
                  index,
                  data
                });
              }}
              on-setCurrent={data => {
                this.setCurrent({
                  index,
                  type: "boxPlot"
                });
              }}
              class={{current: index == this.current.index && this.current.type == 'boxPlot'}}
              index={index}
              width={item.width}
              height={item.height}
              left={item.left}
              top={item.top}
              api={item.api}
            />
          );
        })}
        {this.res.tree.map((item, index) => {
          return (
            <Tree
              on-setPosition={data => {
                this.upData({
                  type: "tree",
                  index,
                  data
                });
              }}
              on-setCurrent={data => {
                this.setCurrent({
                  index,
                  type: "tree"
                });
              }}
              class={{current: index == this.current.index && this.current.type == 'tree'}}
              index={index}
              width={item.width}
              height={item.height}
              left={item.left}
              top={item.top}
              api={item.api}
            />
          );
        })}
        {this.res.scatter.map((item, index) => {
          return (
            <Scatter
              on-setPosition={data => {
                this.upData({
                  type: "scatter",
                  index,
                  data
                });
              }}
              on-setCurrent={data => {
                this.setCurrent({
                  index,
                  type: "scatter"
                });
              }}
              class={{current: index == this.current.index && this.current.type == 'scatter'}}
              index={index}
              width={item.width}
              height={item.height}
              left={item.left}
              top={item.top}
              api={item.api}
            />
          );
        })}
        {this.res.radar.map((item, index) => {
          return (
            <Radar
              on-setPosition={data => {
                this.upData({
                  type: "radar",
                  index,
                  data
                });
              }}
              on-setCurrent={data => {
                this.setCurrent({
                  index,
                  type: "radar"
                });
              }}
              class={{current: index == this.current.index && this.current.type == 'radar'}}
              index={index}
              width={item.width}
              height={item.height}
              left={item.left}
              top={item.top}
              api={item.api}
            />
          );
        })}
      </div>
    );
  }
};
</script>

<style src="./index.scss" scoped lang="scss"></style>
