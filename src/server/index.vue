<template>
    <div class="server-box">

        <Row class='serverMedia' style='height:100%;'>
            <i-col style="height:40px;background:white;position:fixed;left:0;top:0;z-index:200" :xs="{span:24}" :sm="{span:0}" :md="{span:0}">
                    <ServerleftM />
            </i-col>
            <i-col style="height:50px" :xs="{span:24}" :sm="{span:0}" :md="{span:0}"></i-col>

            <i-col style='height:100%;' :xs="{span:0}" :sm="{span:4}" :md="{span:4}">
                    <Serverleft/>
            </i-col>

            <i-col style="height:100%" :xs="{span:24}" :sm="{span:20}" :md="{span:20}">
                <router-view></router-view>
            </i-col>     
        </Row>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import Serverleft from '../plugins/serverleft.vue'
import ServerleftM from '../plugins/serverleftM.vue'
export default {
    data(){
        return {

        }
    },
    created(){
        this.userInfo()
    },
    components:{
        Serverleft,
        ServerleftM
    },
    methods:{
        ...mapActions({
            userInfo:'USERINFO',
        })
    }
}
</script>

<style lang="stylus" scoped>
    .server-box
        width 100%
        height 100%
        background rgb(240,242,245)


</style>


