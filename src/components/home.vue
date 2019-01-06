<template>
    <div class='home'>
        <Row class-name='homeRow'>
           <i-col class-name='mysorch' :xs="{span:24}" :sm="{span:0}" :lg="{span:0}">
                <RigthView/>
            </i-col>
            <i-col v-for="(index,item) in list" class-name='home-data'  span='24' :xs="{span:24}" :sm="{span:15}" :lg="{span:15}">
                <div class='home-data-content'>
                    <div class='avatar'>
                        <div class='avatar-img'>
                            <Avatar :src="href+index.avatar"/>
                            <span style='margin-left:5px;margin-top:5px'>{{index.userName}}</span>
                        </div>
                        <span>{{index.time}}</span>
                    </div>
                    <div class='home-data-title'>
                        <p @click="seeModel(item)" class='hover-title'>{{index.title}}</p>
                    </div>
                    <div class='home-data-buttom'>
                        <p style='display:flex;align-items:center'><Icon type="md-thumbs-up" /><span style='margin-left:5px'>{{index.point}}</span></p>
                        <Divider type='vertical' orientation='center' />
                        <p style='display:flex;align-items:center'><Icon size='20' type="ios-eye" /><span style='margin-left:5px'>{{index.visit}}</span></p>
                        <Divider type='vertical' orientation='center' />
                        <p><Icon size='13' type="md-pricetag" /><Tag style='margin-left:5px' color="cyan">{{index.lebalname}}</Tag></p>
                    </div>
                </div>
            </i-col>
            <!-- 右显 -->
            <i-col class-name='brief' :xs="{span:0}" :sm="{span:8,push:16}">
                <RigthView/>
            </i-col> 
            
            <i-col v-if='pages == pageEnd ? 0 : 1' class='nextPage' :xs="{span:24}" :sm="{span:15}" :lg="{span:15}">
               <span @click="getNextPages">加载更多</span>
            </i-col>
            <BackTop :height="500" :bottom="100" >
                <Icon style='color:gray' type="md-plane" />
            </BackTop> 
        </Row>
        
    </div>
</template>

<script>
    import RigthView from '../plugins/rightView'
import { mapState,mapMutations } from 'vuex';
    export default{
        data(){
            return {
                list:[],
                pages:1,
                pageEnd:null,
                href:'http://localhost:4001/',
                master:[]
            }
        },
        created(){
            this.getData(this.pages)
        },
        computed:{
            ...mapState({
                homeData:state=>state.homeData
            })
        },
        mounted(){
           console.log(this.list) 
        },
        methods:{
            ...mapMutations({
                SyncData:'SyncData'
            }),
            async getData(page){
                let res = await this.axios.get(`/server/getAllnotes?int=0&pageIndex=${page}`)
                if(res){
                    if(res.data.success){
                        this.list = this.list.concat(res.data.result);
                        this.SyncData(this.list)
                        this.pageEnd = res.data.totalPages;
                    }
                }
            },
            getNextPages(){
                return new Promise((reslove,reject)=>{
                    if(this.pages<this.pageEnd){
                        ++this.pages;
                        this.getData(this.pages)
                    }else{
                        this.pages = this.pageEnd
                        this.$Message.warning('没有更多数据喽')
                    }
                })
            },
            seeModel(index){
                this.homeData[index].visit+=1;
                this.axios.post('/server/addvisit',{id:this.homeData[index]._id,visit:this.homeData[index].visit})
                //把更新后的数据发送到后台记录
                this.$router.push({
                    name:'seeview',
                    params:{
                        Zindex:index
                    }
                })//以markdown形式展现
            }
        },
        components:{
            RigthView,
        }
    }
</script>
<style lang="stylus" scoped>
    .nextPage
        display:flex
        justify-content:center
        margin-top:10px
        background:white
        height 30px
        border-radius 10px
        align-items center
        cursor pointer
        &:hover
            color rgb(45,183,245)

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
        

    .hover-title
        border-bottom 2px solid transparent;
        border-width 1
        transition 1s
        cursor pointer
        &:hover
            border-bottom 2px solid black
    .source
        width 120px
        border 1px solid rgba(167,134,56,.5)
        text-align center
        border-radius 5px
        margin-left 5px
        span
            width 100%
            height 100%
            background  pink
            display inline-block
            background rgba(167,134,56,.2)
            border-radius 5px
            color rgb(177,144,6)
    .avatar-img
        width auto
        display flex
        justify-content flex-start
        align-items center
    .home-data-buttom
        display flex
        justify-content flex-start
        align-items center
    .home-data-content
        width 96%
        height 85%
        .avatar
            display flex
            justify-content space-between
            align-items center
            width 100%
        .home-data-title
            width 100%
            height 50px
            display flex
            align-items center
            font-size 14px
            font-weight bold 
            
    .home
        width 100%
        height 100%
        display flex
        justify-content center
        .homeRow
            width 95%
            height auto
            .home-data
                border-radius 10px
                height:130px
                margin-top:10px
                background white
                display flex
                justify-content center
                align-items center
            .brief
                margin-top 10px
                position absolute
                border-radius 10px
</style>
