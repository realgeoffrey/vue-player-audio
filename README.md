# vue-player-audio

播放音频文件，支持设置播放时间区间（Vue组件）

1. npm：<https://www.npmjs.com/package/vue-player-audio>
2. demo：<https://realgeoffrey.github.io/vue-player-audio/demo/index.html>

### 安装
1. Node.js安装

    ```bash
    npm install vue-player-audio --save
    ```
2. 浏览器引用

    ```html
    <!-- 需要先引入vue：<script src="//unpkg.com/vue"></script> -->
    <script src="//unpkg.com/vue-player-audio"></script>
    ```

### 注册组件
1. Node.js注册

    1. 全局注册

        ```javascript
        import Vue from 'vue'
        import vuePlayerAudio from 'vue-player-audio'

        // 全局注册
        Vue.use(vuePlayerAudio, { component: 'PlayerAudio' }) // 组件名默认是：vue-player-audio
        // 或：Vue.component('PlayerAudio', vuePlayerAudio)
        ```
    2. 局部注册

        ```javascript
        import vuePlayerAudio from 'vue-player-audio'

        export default {
          components: {
            // 局部注册
            PlayerAudio: vuePlayerAudio
          }
        }
        ```
2. 浏览器注册

    1. 全局注册

        ```html
        <!-- 需要先引入vue：<script src="//unpkg.com/vue"></script> -->
        <!-- 需要先引入vue-player-audio：<script src="//unpkg.com/vue-player-audio"></script> -->

        <script>
        // 全局注册
        Vue.use(vuePlayerAudio, { component: 'vue-player-audio' }) // 组件名默认是：vue-player-audio
        // 或：Vue.component('vue-player-audio', vuePlayerAudio)
        </script>
        ```
    2. 局部注册

        ```html
        <!-- 需要先引入vue：<script src="//unpkg.com/vue"></script> -->
        <!-- 需要先引入vue-player-audio：<script src="//unpkg.com/vue-player-audio"></script> -->

        <script>
        new Vue({
          components: {
            // 局部注册
            'vue-player-audio': vuePlayerAudio
          }
        })
        </script>
        ```

### 用法
1. 参数

    ```vue
    <PlayerAudio
      :audio-src="音频src（必填）"
      :start-second="开始秒数（0）"
      :end-second="结束秒数，0表示直到音频结束，起码播放1秒（0）"

      :autoplay="自动播放（false）"
      :loop="循环播放（false）"
      :loop-gap-millisecond="循环播放间隔时间-毫秒，起码间隔50毫秒（50）"

      :controls="展示控制面板（false）"

      :preload="预加载模式，none、metadata、auto（'metadata'）"
    />
    ```

    >因为兼容性问题，`end-second`与`start-second`最少间隔1秒，`loop-gap-millisecond`最少设置50毫秒。
2. 插槽

    ```vue
    <PlayerAudio
      :audio-src="音频src（必填）"
      v-slot="audioData"
    >
      <br>
      是否在播放：{{ audioData.isPlaying }}
      <br>
      当前时间：{{ audioData.currentSecond }}
      <br>
      最大时间：{{ audioData.maxSecond }}
      <br>
    </PlayerAudio>
    ```

>可使用[audiosprite](https://github.com/tonistiigi/audiosprite)等音频组合工具把多个音频文件组合成一个，然后再使用本插件的音频播放时间区间，从而减少请求数。
