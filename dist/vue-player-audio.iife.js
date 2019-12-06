var vuePlayerAudio=function(){"use strict";var e=function(e,t,n,o,i,r,s,a,d,u){"boolean"!=typeof s&&(d=a,a=s,s=!1);var c,l="function"==typeof n?n.options:n;if(e&&e.render&&(l.render=e.render,l.staticRenderFns=e.staticRenderFns,l._compiled=!0,i&&(l.functional=!0)),o&&(l._scopeId=o),r?(c=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),t&&t.call(this,d(e)),e&&e._registeredComponents&&e._registeredComponents.add(r)},l._ssrRegister=c):t&&(c=s?function(){t.call(this,u(this.$root.$options.shadowRoot))}:function(e){t.call(this,a(e))}),c)if(l.functional){var h=l.render;l.render=function(e,t){return c.call(t),h(e,t)}}else{var f=l.beforeCreate;l.beforeCreate=f?[].concat(f,c):[c]}return n};const t={props:{audioSrc:{type:String,required:!0},startSecond:{type:Number,default:0},endSecond:{type:Number,default:0},autoplay:{type:Boolean,default:!1},loop:{type:Boolean,default:!1},loopGapMillisecond:{type:Number,default:50},controls:{type:Boolean,default:!1},preload:{type:String,default:"metadata"}},data:function(){return{isPlaying:!1,currentSecond:this.startSecond,maxSecond:0,setTimeoutId:0,allowSetCurrentTime:!0}},watch:{audioSrc:function(){this.beginPlay()},startSecond:function(){this.beginPlay()}},mounted:function(){this.beginPlay()},beforeDestroy:function(){clearTimeout(this.setTimeoutId)},methods:{beginPlay:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.audioSrc;e&&(this.$refs.audioDom.currentTime=Math.max(this.startSecond,1e-6),this.autoplay&&this.$refs.audioDom.play())},loopPlayOrEndPause:function(){var e=this;this.loop?(this.$refs.audioDom.currentTime=this.startSecond,setTimeout((function(){e.$refs.audioDom.play()}),this.loopGapMillisecond)):(this.$refs.audioDom.pause(),this.$refs.audioDom.currentTime=this.startSecond)},setIsPlaying:function(){var e=this;clearTimeout(this.setTimeoutId),this.setTimeoutId=setTimeout((function(){e.isPlaying=!e.$refs.audioDom.paused}),this.loopGapMillisecond+20)},timeupdateHandler:function(){var e=this;this.maxSecond=this.$refs.audioDom.duration,this.currentSecond=this.$refs.audioDom.currentTime,this.currentSecond<this.startSecond?this.allowSetCurrentTime&&(this.$refs.audioDom.currentTime=this.startSecond,this.allowSetCurrentTime=!1,setTimeout((function(){e.allowSetCurrentTime=!0}),1e3)):((0!==this.endSecond&&this.currentSecond>=this.endSecond||0!==this.maxSecond&&this.currentSecond>=this.maxSecond)&&this.loopPlayOrEndPause(),this.setIsPlaying())},endedHandler:function(){this.loopPlayOrEndPause()},pauseHandler:function(){this.setIsPlaying()}}};var n=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",[n("audio",{ref:"audioDom",attrs:{src:e.audioSrc,controls:e.controls,preload:e.preload},on:{timeupdate:e.timeupdateHandler,ended:e.endedHandler,pause:e.pauseHandler}}),e._v(" "),e._t("default",[n("br"),e._v("\n    正在播放："+e._s(e.isPlaying)+"\n    "),n("br"),e._v("\n    当前时间："+e._s(e.currentSecond)+"\n    "),n("br"),e._v("\n    最大时间："+e._s(e.maxSecond)+"\n    "),n("br")],{isPlaying:e.isPlaying,currentSecond:e.currentSecond,maxSecond:e.maxSecond})],2)};n._withStripped=!0;const o=e({render:n,staticRenderFns:[]},void 0,t,void 0,!1,void 0,!1,void 0,void 0,void 0);return o.install=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e.component(t.component||"vue-player-audio",o)},o}();
