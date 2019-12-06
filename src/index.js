import vuePlayerAudio from './vue-player-audio.vue'

vuePlayerAudio.install = (Vue, options = {}) => {
  Vue.component(options.component || 'vue-player-audio', vuePlayerAudio)
}

export default vuePlayerAudio
