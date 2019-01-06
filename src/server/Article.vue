<template>
    <div class='p-box'>
        <div class='p-content-box'>
            <Row>
                <i-col :xs="{span:0}" :sm="{span:24}" :md="{span:24}"><Title :title='title'></Title></i-col>
                <i-col v-show="showactions" class='oublish' :xs="{span:24}" :sm="{span:24}" :md="{span:24}" v-for='(item,index) of viewData'>
                    <div class="view">
                        <div style="display:flex;align-items:center"><Avatar size='small' :src="href"/><span style="margin-left:5px">{{item.userName}}</span></div>
                        <p style="font-weight:bold">{{item.title}}</p>
                        <div class='icon'>
                            <p style='display:flex;align-items:center'><Icon size='15' type="md-timer" /><span style='margin-left:5px'>{{item.time}}</span></p>
                            <Divider type='vertical' orientation='center' />
                            <p style='display:flex;align-items:center'><Icon size='20' type="ios-eye" /><span style='margin-left:5px'>{{item.visit}}</span></p>
                            <Divider type='vertical' orientation='center' />
                            <p style="display:flex;align-items:center"><Icon size='14' type="md-thumbs-up" /><span  style='margin-left:5px'>{{item.point}}</span></p>
                        </div>
                    </div>
                    <div class='publish' :style='styleSheet'>
                        <span :style="item.int === 0 ? 'color:green' : 'color:black'">{{item.int===0 ? '已发布' : '草稿'}}</span>
                        <span @click = Rewrite(index)>编辑</span>
                        <Poptip class='tip'
                            placement='left'
                            confirm
                            title="确定要删除此条么?"
                            @on-ok="deleteItem(item)">
                           删除
                        </Poptip>
                        <span @click="PublishItem(item)">{{item.int===0 ? '撤回' : '发布'}}</span>
                    </div>
                </i-col>
                <i-col v-show='!showactions' >
                    列表空空如也
                </i-col>
            </Row>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import Title from './title.vue';
export default {
    data(){
        return {
            title:'文章管理',
            styleFlng:false,
            mobile_right_style:'display:flex;padding:10px;flex-direction:column;justify-content:space-between;align-items:center',
            pc_right_style:'width:300px;display:flex;padding:10px;justify-content:space-between;align-items:flex-end',
            viewData:[],
            href :'',
            publishColor:'color:black',
        }
    },
    computed:{
        ...mapState({
            userInfo:state=>state.userInfo.href
        }),
        styleSheet(){
            if(this.styleFlng){
                return this.pc_right_style
            }else{
                return this.mobile_right_style
            }
        },
        showactions(){
            if(this.viewData.length){
                return true;
            }else{
                return false
            }
        },
    },
    created(){
        this.getData();
        if(sessionStorage.getItem('href')){
            this.href = sessionStorage.getItem('href');
        } 
    },
    components:{
        Title,
    },
    mounted(){
        this.resize()
        window.onresize=this.resize;
    },
    methods:{
        getData(){
           this.axios.get('/server/getnotes').then(res=>{
                if(res.data.success){
                    this.viewData = res.data.result
                } 
            })     
        },
        resize(e){
            let winWidth  = window.innerWidth;
            this.styleFlng = winWidth < 768 ? false : true;
        },
        Rewrite(index){
            this.$router.push({
                name:'publishair',
                params:{
                    title:this.viewData[index].title,
                    content:this.viewData[index].content,
                    lebalname:this.viewData[index].lebalname,
                    id:this.viewData[index]._id,
                }
            })
        },
        async deleteItem(obj){
            let res = await this.axios.post('/server/removenotes',{title:obj.title})
            if(res){
                if(res.data.success){
                    this.$Message.success(res.data.msg)
                    this.getData()
                }
            }
        },
        async PublishItem(obj){
            let e = window.event.target.innerText;
            obj.int = e=='发布' ? 0 : 1;
            let res = await this.axios.post('/server/publishnotes',{id:obj._id,int:obj.int})
            if(res){
                if(res.data.success){
                    // this.publishColor = e == '发布' ? 'color:green' : 'color:black'
                    this.$Message.success(`${e}成功`)
                    this.getData()
                }
            }
        }
    },

    
}
</script>
<style lang="stylus" scoped>
    .publish
        cursor pointer
        span,.tip 
            &:hover
                color rgb(87,197,247)
    .icon
        display flex
        align-items center
    .view
        display flex
        flex-direction column
        justify-content space-between
        height 120px
        padding 10px
    .view-right
        padding 10px
        display flex
        flex-direction column
        justify-content space-between
        align-items center
    .p-box
        width 100%
        height  100%
        display flex
        justify-content center
        .p-content-box
            width 95%
            heihgt 80%
            .oublish
                background white
                border-radius 10px
                display flex
                justify-content space-between
                margin-top 10px
</style>

