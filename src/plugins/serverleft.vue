<template>
    <div class='i-box'>
        <Menu style='height:100%' width='auto' :active-name="state" @on-select='gter'>
            <MenuItem name="serverStart" >
                <Icon type="md-document" />
                首页
            </MenuItem>
            <MenuItem name="publishair">
                <Icon type="ios-book" />
                发布文章
            </MenuItem>
            <MenuItem name="article">
                 <Icon type="logo-buffer" />
                文章管理
            </MenuItem>
            <MenuItem name="user" v-if='desited == 2 ? true : false'>
               <Icon type="md-people" />
                用户管理
            </MenuItem>
            <MenuItem name="label" v-if='desited == 2 ? true : false'>
                <Icon type="md-bookmarks" />
                标签管理
            </MenuItem>
            <MenuItem name="home">
                <Icon type="ios-keypad" />
                主界面
            </MenuItem>
        </Menu>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
    data(){
        return {
            state:'',
            desited:''
        }
    },
    computed:{
        
    },
    created(){
        if(sessionStorage.getItem('type')){
            this.desited = sessionStorage.getItem('type')
        }
        if(sessionStorage.getItem('foc')){
            this.state = sessionStorage.getItem('foc')
        }else{
            this.state = 'serverStart'
        }
    },
    methods:{
        gter(name){
            let e = window.event.target.innerText;
            if(name=='home'){
                sessionStorage.setItem('foc','serverStart')
            }else{
                sessionStorage.setItem('foc',name)
            }
            
            this.$router.push({
                name:name,
                params:{
                    title:e
                }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.i-box
    width 100%
    height 100%

</style>


