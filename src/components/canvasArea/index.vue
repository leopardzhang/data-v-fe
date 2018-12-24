<script>
import Bar from "../bar/index.vue";
import Pie from "../pie/index.vue";
import Lines from "../line/index.vue";
import Circles from "../circle/index.vue";
import Tables from "../table/index.vue";
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
    Tables
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
      </div>
    );
  }
};
</script>

<style src="./index.scss" scoped lang="scss"></style>
