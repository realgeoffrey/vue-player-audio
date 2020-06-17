<template>
  <span>
    <audio
      :src="audioSrc"
      :controls="controls"
      :preload="preload"

      @timeupdate="timeupdateHandler"
      @ended="endedHandler"
      @pause="pauseHandler"

      ref="audioDom"
    />

    <!-- 展示 -->
    <slot :isPlaying="isPlaying" :currentSecond="currentSecond" :maxSecond="maxSecond">
      <br>
      正在播放：{{ isPlaying }}
      <br>
      当前时间：{{ currentSecond }}
      <br>
      最大时间：{{ maxSecond }}
      <br>
    </slot>
  </span>
</template>

<script>
export default {
  props: {
    audioSrc: { // 音频src
      type: String,
      required: true
    },
    startSecond: { // 开始秒数
      type: Number,
      default: 0
    },
    endSecond: { // 结束秒数（`0`表示直到音频结束；起码播放1秒）
      type: Number,
      default: 0
    },

    autoplay: { // 是否自动播放
      type: Boolean,
      default: false
    },
    loop: { // 是否循环播放
      type: Boolean,
      default: false
    },

    loopGapMillisecond: { // 循环播放间隔时间-毫秒（因为兼容性问题，尽量设置在50毫秒以上）
      type: Number,
      default: 50
    },

    controls: { // 展示控制面板
      type: Boolean,
      default: false
    },
    preload: {  // 预加载模式（none metadata auto）
      type: String,
      default: 'metadata'
    }
  },
  data () {
    return {
      isPlaying: false,
      currentSecond: this.startSecond,
      maxSecond: 0,

      allowSetCurrentTime: true,

      setTimeoutId1: 0,
      setTimeoutId2: 0,
      setTimeoutId3: 0
    }
  },
  watch: {
    audioSrc () {
      this.beginPlay()
    },
    startSecond () {
      this.beginPlay()
    }
  },
  mounted () {
    this.beginPlay()
  },
  beforeDestroy () {
    clearTimeout(this.setTimeoutId1)
    clearTimeout(this.setTimeoutId2)
    clearTimeout(this.setTimeoutId3)
  },
  methods: {
    // 开始播放
    beginPlay (src = this.audioSrc) {
      if (src) {
        this.$refs.audioDom.currentTime = Math.max(this.startSecond, 0.000001)  // 设置currentTime从而获得音频maxSecond

        if (this.autoplay) {
          this.$refs.audioDom.play()
        }
      }
    },
    // 循环播放 或 播放完毕暂停
    loopPlayOrEndPause () {
      if (this.loop) { // 再次播放
        this.$refs.audioDom.currentTime = this.startSecond
        this.setTimeoutId2 = setTimeout(() => {
          try {
            this.$refs.audioDom.play()
          } catch (e) {
            // 事件都是异步的，所以可能audio被消除了之后才执行回调
            // console.warn(e)
          }
        }, this.loopGapMillisecond)
      } else {
        this.$refs.audioDom.pause()
        this.$refs.audioDom.currentTime = this.startSecond
      }
    },
    // 设置isPlaying
    setIsPlaying () {
      clearTimeout(this.setTimeoutId1)
      this.setTimeoutId1 = setTimeout(() => {
        try {
          this.isPlaying = !this.$refs.audioDom.paused
        } catch (e) {
          // 事件都是异步的，所以可能audio被消除了之后才执行回调
          // console.warn(e)
        }
      }, this.loopGapMillisecond + 20)
    },

    // timeupdate事件处理
    timeupdateHandler () {
      try {
        this.maxSecond = this.$refs.audioDom.duration
        this.currentSecond = this.$refs.audioDom.currentTime

        if (this.currentSecond < this.startSecond) { // 当前时间 < 开始时间
          if (this.allowSetCurrentTime) { // 1秒只能重置一次currentTime（兼容iOS：iOS设置了currentTime之后可能会回溯前一段时间开始播放）
            this.$refs.audioDom.currentTime = this.startSecond

            this.allowSetCurrentTime = false
            this.setTimeoutId3 = setTimeout(() => {
              this.allowSetCurrentTime = true
            }, 1000)
          }
        } else {
          // 播放结束
          if ((this.endSecond !== 0 && this.currentSecond >= this.endSecond) || (this.maxSecond !== 0 && this.currentSecond >= this.maxSecond)) {
            this.loopPlayOrEndPause()
          }
          this.setIsPlaying()
        }
      } catch (e) {
        // 事件都是异步的，所以可能audio被消除了之后才执行回调
        // console.warn(e)
      }
    },
    // ended事件处理
    endedHandler () {
      try {
        this.loopPlayOrEndPause()
      } catch (e) {
        // 事件都是异步的，所以可能audio被消除了之后才执行回调
        // console.warn(e)
      }
    },
    // pause事件处理
    pauseHandler () {
      this.setIsPlaying()
    }
  }
}
</script>
