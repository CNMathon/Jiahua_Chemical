<template>
  <div id="videoArea" class="video">
    <video
      id="my-video"
      class="video-js vjs-default-skin"
      controls
      preload="auto"
    >
      <source :src="vSrc" type="video/mp4" />
    </video>
  </div>
</template>
<script>
import videojs from "video.js";
import "videojs-contrib-hls";
export default {
  name: "video",
  data() {
    return {
      vSrc:'http://vjs.zencdn.net/v/oceans.mp4'
    };
  },
  mounted() {
    var videoPlayer = document.getElementById('my-video');
    if (typeof (videoPlayer) != "undefined") {
      var myPlayer = videojs('my-video');
      myPlayer.dispose();
    }
    let vArea=document.getElementById('videoArea');
    vArea.innerHTML=`<video
      id="my-video"
      class="video-js vjs-default-skin"
      controls
      preload="auto"
    >
      <source src=${this.vSrc} type="video/mp4" />
    </video>`
    videojs("my-video", {
      autoplay: false,
      aspectRatio: "16:9",
      fluid: true,
      bigPlayButton: true,
      textTrackDisplay: false,
      posterImage: true,
      errorDisplay: false,
      controlBar: {
        playToggle: true,
        volumeMenuButton: false,
        currentTimeDisplay: false,
        timeDivider: false,
        durationDisplay: false,
        progressControl: false,
        liveDisplay: false,
        remainingTimeDisplay: false,
        playbackRateMenuButton: false,
        fullscreenToggle: true
      }
    });
  },
  methods: {}
};
</script>
<style lang="scss">
.video {
  width: 690px;
  height: auto;
  background: rgba(0, 0, 0, 0.3);
  margin: 0 auto;
  margin-top: 20px;
  .video-js {
    position: relative;
    .vjs-control {
      height: auto;
    }
    .vjs-big-play-button {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .vjs-control-bar {
      align-items: center;
      justify-content: space-between;
      button {
        .vjs-icon-placeholder:before {
          line-height: 0;
        }
      }
    }
    .vjs-picture-in-picture-control,
    .vjs-volume-panel {
      display: none;
    }
  }
}
</style>
