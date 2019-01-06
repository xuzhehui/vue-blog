<template>
    <div class='meta'>
        <Header></Header>
        <router-view/>
    </div>
</template>
<script>
import Header from "@/components/header";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed:{

  },
  created(){
    this.$router.push({
      name:'home'
    });
    this.userInfo()
    this.GetnewsList()
  },
  components: {
    Header
  },
  methods:{
    ...mapActions({
      userInfo:'USERINFO',
      GetnewsList:'GETNEWSLIST'
    })
  }
};
</script>

<style lang="stylus" scoped>
    .meta
        width:100%
        height 100%
</style>
