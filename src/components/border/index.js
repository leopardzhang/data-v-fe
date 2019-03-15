import scale from '../../configs/scale' // 伸缩比

export default {
    name: 'Border',
    props: {
        width: Number,
        height: Number,
        left: Number,
        top: Number,
        api: String
    },

    data() {
        return {
            positionX: '',
            positionY: '',
            current: false
        }
    },

    methods: {
        handleMousedown(e) {
            const _this = this;
            this.$emit('setCurrent', {});
            this.current = true;

            let odiv = e.currentTarget;
            let disX = e.clientX / scale - odiv.offsetLeft;
            let disY = e.clientY / scale - odiv.offsetTop;
            document.onmousemove = (e) => {
                let left = e.clientX / scale - disX;
                let top = e.clientY / scale - disY;

                this.positionX = top;
                this.positionY = left;

                odiv.style.left = left + 'px';
                odiv.style.top = top + 'px';

                _this.$emit('setPosition', {
                    left: Math.ceil(left),
                    top: Math.ceil(top),
                    width: _this.width,
                    height: _this.height
                });
            };
            document.onmouseup = () => {
                _this.$emit('setCurrent', {});
                document.onmousemove = null;
                document.onmouseup = null;
            };
        },
        handleMouseup() {
            this.current = false;
        }
    }
}
