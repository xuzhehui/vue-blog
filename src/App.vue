<template>
  <div id="app" style="background:rgb(240, 242, 245)">
    <canvas id='Canvas' width='100%' height='100%'></canvas>
    <router-view/>
    
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  computed: {
  },
  created() {
  },
  mounted() {
    let canvas = document.querySelector("#Canvas");
    let C = canvas.getContext("2d");
  },
};
</script>

<style lang='stylus'>
html, body
  width 100%
  height 100%
  background rgb(240, 242, 245)
  #app
    width 100%
    height 100%
    
    #Canvas
      position absolute
      width 100%
      height 100%
      top 0
      left 0
      z-index 0
</style>
