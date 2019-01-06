<template>
    <div class='p-box'>
        <div class='p-content-box'>
            <Row>
                <i-col :xs="{span:0}" :sm="{span:24}" :md="{span:24}"><Title :title='title'></Title></i-col>
                <!-- <i-col class='oublish' :xs="{span:24}" :sm="{span:24}" :md="{span:24}">
                    <Tag style='margin-right:20px' v-for='(item,index) in lebalArray' :key="index" :name="item.lebalname" type="border" closable @click="handleClose2"  :color="colorArray[Math.round(Math.random()*(colorArray.length-1))]">{{item.lebalname}}</Tag>
                </i-col> -->
                <Tag style='margin-right:20px;margin-top:20px' v-for='(item,index) in lebalArray' fade :key="index" :name="item.lebalname" type="border" closable @on-close="closelebal"  :color="colorArray[Math.round(Math.random()*(colorArray.length-1))]">{{item.lebalname}}</Tag>
                
                <i-col style='position:relative;top:20px;'>
                    <Button v-show='add' @click='addNewTag' type='info'>+ newTag</Button>
                    <Input style='width:200px' v-model="inner" @on-blur='InputChange' v-show ='!add' />
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
            title:'标签管理',
            inner:'',
            add:true,
            colorArray:['primary','success','warning'],
            tagArray:[]
        }
    },
    computed:{
        ...mapState({
            lebalArray:state=>state.lebalArray
        })
    },
    watch:{

    },
    created(){
        this.getlebal()
    },
    components:{
        Title,
    },
    mounted(){

    },
    methods:{
        async closelebal(event,name){
           console.log(name)
           let res = await this.axios.post('/server/removelebal',{lebal:name})
           if(res.data.success){
                this.$Message.success(res.data.msg)
                this.getlebal()
            }
        },
        ...mapActions({
            'getlebal':'GETLEBAL'
        }),
        addNewTag(){
            this.add = false;
            this.inner = ''
        },
        async InputChange(e){
            this.add = true;
            if(this.inner==''){
                return false
            }
            this.tagArray.push({
                text:this.inner,
                color:this.colorArray[Math.round(Math.random()*(this.colorArray.length-1))]
            })
            
            let res = await this.axios.post('/server/addlebal',{lebal:this.inner})
            if(res){
                if(res.data.success){
                    this.$Message.success(res.data.msg)
                    this.getlebal()
                }
            }
        },

    },

    
}
</script>
<style lang="stylus" scoped>
    .p-box
        width 100%
        height  100%
        display flex
        justify-content center
        .p-content-box
            width 95%
            heihgt 80%
            .oublish
                div
                    margin-top:20px




</style>

