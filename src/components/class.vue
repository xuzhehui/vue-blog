<template>
    <div class='c-box'>
        <Row class='c-row'>
           <i-col class-name='mysorch' :xs="{span:24}" :sm="{span:0}" :lg="{span:0}">
                <RigthView/>
            </i-col>
            <i-col span='24' :xs="{span:24}" :sm="{span:15}" :lg="{span:15}">
                <div class='class-box'>
                    <p style='border-bottom:1px solid gray'>目前共计{{MapArray.length}}个分类</p>
                    <div class='content'>
                        <div v-for='item in MapArray'>
                            <p ><span @click="setlist(item.lebalname)">{{item.lebalname}}</span></p>
                        </div>   
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
           MapArray:[]
        }
    },
    created(){
        this.getDatas()
    },
    methods:{
        async getDatas(){
            let res = await this.axios.get('/server/getlebal');
            if(res){
                this.MapArray = res.data.result
            }
        },
        setlist(name){
            this.$router.push({
                name:'classlist',
                params:{
                    leb:name
                }
            })
        }
    },
    components:{
        RigthView,
    }
}
</script>

<style lang="stylus" scoped>
    .content
        width 100%
        height 100%
        border-radius 10px
        margin-top 20px
        
        p
            height 30px
            display inline-block
            line-height 30px
            cursor pointer
            transition 1s
            &:hover
                color rgb(87,197,247)
                display inline-block
                border-bottom 1px solid rgb(87,197,247)
    .class-box
        width 100%
        background white
        border-radius 10px
        margin-top 20px
        padding 20px
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


