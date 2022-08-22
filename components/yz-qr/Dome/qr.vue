    <template>
        <view class="content">
            <!-- 通过 ref 为子组件赋予一个 ID 引用,访问子组件实例 -->
            <yz-qr ref="qrPath" :text="text" :size="size" :colorDark="colorDark" :colorLight="colorLight"></yz-qr>
        </view>
    </template>

    <script>
        export default {
            data() {
                return {
                    canvasQrPath: '',
                    text: 'WYSDD2021090600000001-1',
                    size: 200,
                    colorDark: '#000000',
                    colorLight: '#ffffff'
                }
            },
            onLoad() {
                this.getQrPath()
            },
            methods: {
                getQrPath() {
                    var that = this;
                    setTimeout(function() {
                        that.canvasQrPath = that.$refs.qrPath.canvasQrPath;
                        // console.log('获取二维码地址:', that.canvasQrPath)
                    }, 1000)
                }
            }
        }
    </script>

    <style>

    </style>