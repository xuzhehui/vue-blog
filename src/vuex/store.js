import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        userInfo:null,
        allUser:[],//用户中心数据集合
        Pages:null,//用户中心翻页下表
        userLodin:false,//用户中心表格loading
        lebalArray:[],//分类标签集合
        newsList:[],//最新文章集合,
        homeData:[],

    },
    getters:{

    },
    mutations:{
        SyncData(state,payload){
            state.homeData = payload
        }
    },
    actions:{
        USERINFO(y){//判断用户登录信息
            axios.post('/server/userInfo').then(res=>{
                y.state.userInfo = res.data.result 
            })
        },

        GETUSER(y,payload){//用户管理中心 
            y.state.userLodin = true
            
            axios.get(`/server/finduser?pageIndex=${payload.pages}`).then(res=>{
                y.state.userLodin = false
                let _res = res.data.result;
                _res.map((v,i,arr)=>{
                    v.type = v.type==1 ? '用户' : (v.type==2 ? '管理员' : '游客')
                })
                y.state.allUser = _res
                y.state.Pages = res.data.totalPages*15
            })
        },
        GETLEBAL(context,payload){
            axios.get('/server/getlebal').then(res=>{
                if(res.data.success){
                    context.state.lebalArray = res.data.result;
                }
            })
        },

        
        GETNEWSLIST(context){
            axios.get('/server/newslebal').then(res=>{
                if(res.data.success){
                    context.state.newsList = res.data.result
                }
            })
        }
    },
    modules:{

    }
})