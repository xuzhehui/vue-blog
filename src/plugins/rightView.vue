<template>
    <div>
        <div class='avatar-radius-box'>
            <div class='radius-box'>
                <img src="../assets/avatar.jpg" alt="">
            </div>
            <p>ecmascript</p>
            <p>记录着成长的每一步足迹</p>
        </div>

        <div class='news' v-if='!count'>
            <p>最新文章</p>
                <Divider  orientation='center'/>
            <Timeline >
                <TimelineItem v-for='item in newsList' color="green">{{item.title}}</TimelineItem>
            </Timeline>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  props:{
      count:Boolean,
  },
  data() {
    return {};
  },
  created(){
      
  },
  computed:{
      ...mapState({
          newsList:state=>state.newsList
      })
  },
  mounted(){
  }
};
</script>

<style lang="stylus" scoped>
    .news
        width 100%
        padding 10px
        background white
        margin-top 10px
        border-radius 10px
    .radius-box
        width 140px
        height 140px
        border-radius 50%
        overflow hidden
        img
            width 100%
            height 100%
    .avatar-radius-box
        width 100%
        height 220px
        display flex
        flex-direction column
        align-items center
        justify-content space-around
        background white
        border-radius 10px
        
    .mysorch
        margin-top 10px
        border-radius 10px
</style>

