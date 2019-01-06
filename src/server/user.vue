<template>
    <div class='p-box'>
        <div class='p-content-box'>
            <Row>
                <i-col :xs="{span:0}" :sm="{span:24}" :md="{span:24}"><Title :title='title'></Title></i-col>
                <i-col style='text-align:center' class='oublish' :xs="{span:24}" :sm="{span:24}" :md="{span:24}">
                    <Table border :columns="columns1" :loading='loading' :data="data"></Table>
                    
                </i-col>
                <i-col style='text-align:center;margin-top:20px' :xs="{span:24}" :sm="{span:24}" :md="{span:24}"><Page :page-size="15" @on-change='ChabgePages' :total="Page"/></i-col>
            </Row>
            <Modal v-model="setUser" width="360">
                <p slot="header" style="color:rgb(87,197,247);text-align:center">
                    <span>{{modulText}}</span>
                </p>
                <div  style="text-align:center">
                     <RadioGroup v-show="repleaserModul" v-model="radius">
                        <Radio label="用户">
                            <span>用户</span>
                        </Radio>
                        <Radio label="游客">
                            <span>游客</span>
                        </Radio>
                    </RadioGroup>
                    <p v-show="deleteModul">是否删除 <span style='color:red'>{{deleteUSerName}}</span> 用户?</p>
                </div>
                <div slot="footer">
                    <Button type="info" size="large" long @click='repleaseuserData'>{{modulTarget}}</Button>
                </div>
            </Modal>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import Title from './title.vue';
export default {
    
    data(){
        return {
            title:'用户管理',
            setUser:false,//是否显示修改弹窗
            radius:'',
            modulText:'',
            modulTarget:'',
            repleaserModul:false,
            deleteModul:false,
            deleteUSerName:'',
            columns1: [
                    {
                        title: '用户名',
                        key: 'userName',
                        align:'center',
                    },
                    {
                        title: '身份',
                        key: 'type',
                        align:'center',
                    },
                    {
                        title: '修改权限',
                        render: (h, params) => {
                            return h('div', {style:{
                                width:'100%',
                                height:'100%',
                                display:'flex',
                                justifyContent:'center'
                            }},[
                                h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    style:{
                                        marginRight:'5px'
                                    },
                                    on: {
                                        click:()=>{
                                            let e = window.event.target.innerText;
                                            this.deleteModul = false
                                            this.repleaserModul = true
                                            this.deleteUSerName = params.row.userName
                                            this.modulTarget=e;
                                            this.setUser = true;
                                            this.modulText = '修改用户权限'
                                            this.radius = params.row.type 
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click:()=>{
                                            let e = window.event.target.innerText;
                                            this.deleteUSerName = params.row.userName
                                            this.deleteModul = true;
                                            this.repleaserModul = false;
                                            this.modulTarget=e;
                                            this.setUser = true;
                                            this.modulText = '删除用户'
                                        }
                                    }
                                }, '删除')
                            ]); 
                        },
                         align:'center',
                    }
                ],
                pageIndex : 1,
        }
    },
    computed:{
        ...mapState({
            data:state=>state.allUser,
            Page:state=>state.Pages,
            loading:state=>state.userLodin
        })
    },
    created(){
        this.getUser({pages:this.pageIndex})
    },
    components:{
        Title,
    },
    mounted(){
        
    },
    methods:{
        ...mapActions({
            'getUser':'GETUSER'
        }),
        async deleterUser(){//删除用户
            let res = await this.axios.post('/server/userType',{userName:this.deleteUSerName});
            if(res){
                if(res.data.success){
                    this.$Message.success(res.data.msg)
                    this.setUser = false;
                    this.getUser({pages:this.pageIndex})  
                }
            }
        },
        async repleaseUser(){
            this.radius = this.radius=='游客' ? 0 : 1
            let res = await this.axios.post('/server/userType',{userName:this.deleteUSerName,type:this.radius})
            if(res){
                if(res.data.success){
                    this.setUser = false;
                    this.$Message.success(res.data.msg)
                    this.getUser({pages:this.pageIndex})
                }
            }
        },
        repleaseuserData(e){
            let event = e.target.innerText;
            event = event == '修改' ? this.repleaseUser() : this.deleterUser()
        },
        ChabgePages(Page){
            this.pageIndex = Page
            this.getUser({pages:this.pageIndex,show:this.loading})
        }
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

