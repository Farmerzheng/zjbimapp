<template>
  <div id="barcode" />
</template>
<script>
import { imageHttpUrl } from '@/config/index'
export default {
  name: 'scan',
  props: {
    description: {
      type: String,
      default: '请扫描二维码',
    },
  },
  data() {
    return {
      code: '',
      barcode: null,
      titleView: null,
      gobackView: null,
      descriptionView: null,
    }
  },
  computed: {
    webview() {
      return plus.webview.currentWebview()
    },
  },
  mounted() {
    this.startScan()
  },
  methods: {
    startScan() {
      if (!window.plus) {
        this.$toast.fail('未找到插件')
        this.goHistory()
        return
      }

      if (!this.titleView) {
        this.initViews()
      }

      this.barcode = new plus.barcode.Barcode('barcode', [plus.barcode.QR], {
        frameColor: '#00ff00',
        scanbarColor: '#00ff00',
      })
      this.barcode.onmarked = this.onmarked
      this.barcode.start()

      this.titleView.show()
      this.gobackView.show()
      this.descriptionView.show()
    },
    initViews() {
      if (!window.plus) {
        this.$toast.fail('未找到插件')
        this.goHistory()
        return
      }

      this.titleView = new plus.nativeObj.View(
        'scan-title-text',
        {
          top: '30px',
          left: '30%',
          width: '40%',
          height: '40px',
        },
        [
          {
            id: 'titleText',
            tag: 'font',
            text: '二维码',
            textStyles: {
              color: '#FFFFFF',
              size: '18px',
            },
          },
        ]
      )

      this.gobackView = new plus.nativeObj.View(
        'scan-goback-button',
        {
          top: '22px',
          left: '15px',
          width: '40px',
          height: '40px',
        },
        [
          {
            id: 'gobackButton',
            tag: 'img',
            src: window.location.origin + imageHttpUrl + '/img/goback.png',
            position: {
              top: '20px',
              width: '18px',
              height: '18px',
            },
          },
        ]
      )
      this.gobackView.addEventListener('click', this.goHistory, false)

      this.descriptionView = new plus.nativeObj.View(
        'scan-description-text',
        {
          bottom: '27%',
          left: '30%',
          width: '40%',
          height: '40px',
        },
        [
          {
            id: 'descriptionText',
            tag: 'font',
            text: this.description,
            textStyles: {
              color: '#FFFFFF',
            },
          },
        ]
      )
    },
    reScan() {
      this.barcode.start()
    },
    cancelScan() {
      this.barcode.cancel()
      this.barcode.close()

      this.titleView.hide()
      this.gobackView.hide()
      this.descriptionView.hide()
    },
    goHistory() {
      if (window.plus) {
        this.cancelScan()
      }
      this.$emit('go-back')
    },
    onmarked(type, result) {
      switch (type) {
        case plus.barcode.QR:
          type = 'QR'
          break
        case plus.barcode.EAN13:
          type = 'EAN13'
          break
        case plus.barcode.EAN8:
          type = 'EAN8'
          break
        default:
          type = '其它' + type
          break
      }

      // this.code = result
      console.log(result)
      this.$emit('success', result)
      this.cancelScan()
    },
  },
}
</script>
<style lang="scss">
#barcode {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba($color: #000, $alpha: 0.85);
}
</style>
