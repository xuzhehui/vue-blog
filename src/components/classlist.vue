<template>
    <div class='c-box'>
        <Row class='c-row'>
           <i-col class-name='mysorch' :xs="{span:24}" :sm="{span:0}" :lg="{span:0}">
                <RigthView/>
            </i-col>
            <i-col span='24' :xs="{span:24}" :sm="{span:15}" :lg="{span:15}">
                <div class='list-box'>
                    <p class='list-title'>{{title}}</p>
                </div>
            </i-col>

            <i-col v-for="(index,item) in MapArray" class-name='home-data'  span='24' :xs="{span:24}" :sm="{span:15}" :lg="{span:15}">
                <div class='home-data-content'>
                    <div class='avatar'>
                        <div class='avatar-img'>
                            <Avatar :src="'http://localhost:4001/'+index.avatar"/>
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

             <i-col class-name='brief' :xs="{span:0}" :sm="{span:8,push:16}">
                <RigthView/>
             </i-col> 
        </Row>
    </div>
</template>

<script>
import RigthView from '../plugins/rightView'
export default {
    data(){
        return {
           MapArray:null,
           title:'未定义'
        }
    },
    created(){
        if(this.$route.params.leb){
            this.title = this.$route.params.leb;
        }else{
            this.title = sessionStorage.getItem('list_title')
        }
        this.getDatas()  
    },
    methods:{
        async getDatas(){
            let res = await this.axios.get(`/server/lebalSerch?lebname=${this.title}`);
            if(res){
               this.MapArray = res.data.result
            }
        },
        seeModel(index){
            console.log(index)
            this.MapArray[index].visit+=1;
            this.axios.post('/server/addvisit',{id:this.MapArray[index]._id,visit:this.MapArray[index].visit})
            sessionStorage.setItem('list_title',this.title)
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
    .hover-title
        border-bottom 2px solid transparent;
        border-width 1
        transition 1s
        cursor pointer
        &:hover
            border-bottom 2px solid black
    .home-data
        border-radius 10px
        height:130px
        margin-top:10px
        background white
        display flex
        justify-content center
        align-items center
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
    .list-title
        width 100%
        height 50px
        line-height 50px
        border-bottom 1px solid gray
    .list-box
        width 100%
        height 100%
        background white
        margin-top 10px
        border-radius 10px
        padding 10px
    .c-box
        width 100%
        height 100%
        display flex
        justify-content center
        .c-row
            width 95%
            height auto 
            display flex
            flex-direction column
        .brief
            margin-top 10px
            position absolute
            border-radius 10px
        .mysorch
            margin-top 10px
            border-radius 10px

</style>


