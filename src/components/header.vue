<template>
    <div class='header-modul'>
        <Row class-name='header' alig='middle' type='flex'>
            <!-- 当页面小于795时 -->
            <i-col :xs="{ span: 5, push:2 }" :lg="{ span: 0, offset:1 }"  :sm="{span:0,offset:0}">
                <Dropdown @on-click="RouterPush" trigger="click">
                    <p class='header-p'>{{downloadItemName}}<Icon type="ios-folder-open" /></p>
                    <DropdownMenu  slot="list">
                             <div v-for='(index,item) in headerModule' @click='downloadItem(item)'>
                                 <DropdownItem :name='index.href'  :selected='index.Select' class='seticon'> <Icon size='15' :type="index.icon" />{{index.title}}</DropdownItem>
                             </div>
                    </DropdownMenu>
                </Dropdown>
            </i-col>

            <!-- 动画标识 -->
            <i-col :xs="{span:0}" :sm="{span:1,offset:2}" :md="{span:2}">
                <div class='transtation-moule'>
                     <transition name="slide-fade">
                         <p v-if='transtationModule.show' class='solid'></p>
                     </transition>
                     <transition name="top-fadeed">
                        <span v-if='transtationModule.show'>成长的足迹</span>
                     </transition>
                    <transition name="slide-fadeed">
                        <p v-if='transtationModule.show' class='solid'></p>
                    </transition>
                </div>
            </i-col>
            <!-- 当页面大于795时展开download下拉菜单 -->
            <i-col class-name='scale-down' :xs="{span:0}" :sm="{span:11,push:3}" :md="{span:10}">
                <Tabs @on-click="RouterPush" style='width:420px' >
                    <div v-for='(index,item) in headerModule'>
                        <TabPane :name='index.href'  :label="index.title" :icon="index.icon"></TabPane>
                    </div>
                </Tabs>
            </i-col>

            <!-- 登录与注册 -->
            <i-col class-name='login-register' :xs="{span:6,push:4}" :sm="{span:3,push:5}" :md="{span:3,push:5}">
                 <div v-if='showUser' class='showUser'>
                     <Button type="info" ghost @click='handleRender'>登录</Button>
                     <Button type="info" ghost @click='handleRender'>注册</Button>
                 </div>

                 <div sryle='margin-left:5px' v-if='showLogin' class='showLogin'>
                     <Avatar :src="sucessLoginHref" />
                     <Dropdown @on-click='doEach'>
                        <p>欢迎！<span style='color:rgb(87,197,247)'>{{successLoginText}}</span> </p>
                        <DropdownMenu  slot="list">
                            <DropdownItem v-for="(item,index) in UserModel" :name='item.title' style='display:flex;align-items:center;justify-content:space-around'>
                                <Icon size='15' :type="item.icon" /><span>{{item.title}}</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                 </div>
                 
            </i-col>
        </Row>

        <Modal v-model="Modal" width="360">
            <p slot="header" style="color:rgb(45,183,245);text-align:center">
                <span>{{ModalEvent}}</span>
            </p>
            <div class='login-content'>
                <Input v-model="user.userName"  prefix="ios-contact" placeholder="Enter your name" />
                <Input v-model="user.passWord" type='password' prefix="ios-key-outline" placeholder="Enter your password" />
                <div class='upload-box' v-if='showUpload'>
                    <div class='upload-img'>
                        <img :src="imgSrc" alt="">
                    </div>
                    <Upload
                        :data='user'
                        :before-upload="UpData"
                        :show-upload-list="false"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        type="drag"
                        action="/server/register"
                        style="display: inline-block;width:58px;">
                        <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon type="ios-camera" size="20"></Icon>
                        </div>
                    </Upload>
                </div>
            </div>
            <div slot="footer">
                <Button @click='repleaseUser' type="info" long>{{ModalEvent}}</Button>
            </div>
        </Modal>

        <Modal v-model="editPhoto" @on-visible-change='VisibileChange' width="360">
            <p slot="header" style="color:rgb(87,197,247);text-align:center">
                <span>{{RepleaseName}}</span>
            </p>
            <div v-show="ShowrepleasePass" style="display:flex;flex-direction:column;justify-content:space-around;align-items:center;height:100px">
                <Input v-model="oldpass" type='password' placeholder='please enter you old password' />
                <Input v-model="newpass" type='password' placeholder='please enter you new password' />
            </div>
            <div class='upload-box' v-if='ShowrepleaseAvatar'>
                    <div class='upload-img'>
                        <img :src="imgSrc" alt="">
                    </div>
                    <Upload
                        :before-upload="UpData"
                        :show-upload-list="false"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        type="drag"
                        action="/server/register"
                        style="display: inline-block;width:58px;">
                        <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon type="ios-camera" size="20"></Icon>
                        </div>
                    </Upload>
                </div>
            <div slot="footer">
                <Button type="info" size="large" long :loading="loading" @click="repleaseUserInfosenddata">{{RepleaseEvent}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      headerModule: [
        {
          title: "首页",
          Select: false,
          icon: "ios-home-outline",
          href:'home'
        },
        {
          title: "分类",
          Select: false,
          icon: "md-list-box",
          href:'class'
        },
        {
          title: "关于",
          Select: false,
          icon: "ios-contact-outline",
          href:'about'
        },
        {
          title: "简历",
          Select: false,
          icon: "ios-paper-outline",
          href:'resume'
        }
      ],
      UserModel:[
          {
              title:'后台管理',
              icon:'ios-paper-outline',
          },
          {
              title:'更换头像',
              icon:'ios-camera-outline',
          },
          {
              title:'修改密码',
              icon:'ios-key-outline',
          },
          {
              title:'退出登录',
              icon:'ios-exit-outline',
          }
      ],
      downloadItemName: "首页",
      Oldindex: 1, //记录当前点击的下标
      transtationModule: {
        //开启动画
        show: false
      },
      Modal:false,
      ModalEvent:'',
      user:{
        userName:'',
        passWord:'',
      },
      imgSrc:'',//预览路径
      showUpload:false,//登录时隐藏组件
      Uping:false,//手动上传
      SendData:new FormData(),//注册信息
      LoginData:null,//登录信息
      modelUrl:'',
      showUser:true,//登录前状态
      showLogin:false,//登录后的状态
      successLoginText:'',//登陆后展示的信息
      sucessLoginHref:'',//登陆后展示的信息
      editPhoto:false,//打开修改对话框
      loading:false,//修改上传图片时的loading效果
      RepleaseName:'',//修改框标题
      RepleaseEvent:'',//动态修改框确认按钮
      oldpass:'',
      newpass:'',
      ErrorMessage:'',//修改输入异常
      ShowrepleasePass:false,
      ShowrepleaseAvatar:false,
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    })
  },
  watch:{
      userInfo(news,olds){
          if(news!=null){
                this.showUser = false;
                this.showLogin = true;
                this.successLoginText = this.userInfo.userName;
                this.sucessLoginHref = `http://localhost:4001/${this.userInfo.href}`
                sessionStorage.setItem('href',this.sucessLoginHref)
                sessionStorage.setItem('type',this.userInfo.type)
                console.log('已登录')
          }else{
              this.showUser = true;
              this.showLogin = false;
              this.user.userName = ''
              this.user.passWord = ''
              this.imgSrc = ''
          }
      }
  },
  created() {
     
  },
  mounted() {
    this.transtationModule.show = !this.transtationModule.show;
    window.onresize = this.logihidden;
  },
  methods: {
    ...mapActions({
         
    }),
    downloadItem(index) {
      this.headerModule[this.Oldindex].Select = false;
      let e = window.event;
      this.headerModule[index].Select = true;
      this.downloadItemName = e.target.innerText;
      this.Oldindex = index;
    },

    logihidden(e) {
      //监听页面大小
      let winWidth = e.target.window.innerWidth;
      this.transtationModule.show = winWidth < 768 ? false : true;
    },

    handleRender(e){//登录与注册事件
    console.log(this.userInfo)
        let h = e.target.innerText;
        this.ModalEvent = h;
        this.showUpload = this.ModalEvent == '注册' ? true : false
        this.Modal=true;
    },

    regData(name,key){//验证用户输入的用户名与密码是否有符合要求
        let reg = /^[A-Za-z]/,regname = /^[\u4E00-\u9FA5]/;
        if(this.user.userName.length>5&&this.user.userName.length<16&&this.user.passWord.length>5&&this.user.passWord.length<16&&reg.test(name[0])){//reg.test(name)判断是否有中文
            return true
        }else{
            return false
        }
    },
    successLogin(data){//注册成功
        this.$store.state.userInfo = data.data.result
        this.$Message.success(data.data.msg)
        this.showUser = false;
        this.showLogin = true;
        this.successLoginText = data.data.userName
        this.sucessLoginHref = `http://localhost:4001/${data.data.href}`
        this.Modal = false;
        this.SendData = new FormData()
    },
    repleaseUser(){//点击（登录）注册
             return new Promise((reslolve,reject)=>{
               if(this.regData(this.user.userName,this.user.passWord)){
                   if(this.ModalEvent=='注册'){
                        this.modelUrl = '/server/register'
                        this.SendData.set('userName',this.user.userName)
                        this.SendData.set('passWord',this.user.passWord)
                        reslolve(this.SendData)
                   }else{
                        this.modelUrl = '/server/login'
                        let data = {
                            userName:this.user.userName,
                            passWord:this.user.passWord
                        }
                        this.LoginData = data
                        reslolve(this.LoginData)
                   } 
               }else{
                   reject()
               }
             }).then((data)=>{
                 this.axios(this.modelUrl,{
                     method:"post",
                     data:data
                     }).then(res=>{
                         if(res.data.success){
                             if(res.data.msg == '注册成功'){
                                    this.Modal = false;
                                    return this.$Message.success(res.data.msg)
                                }else{
                                    res.data.msg = res.data.msg=='登录成功' ? this.successLogin(res) : this.$Message.warning(res.data.msg)
                                }
                         }else{
                             return this.$Message.error(res.data.msg)
                         }
                     
                 }).catch(err=>{
                     return this.$Message.error('请求超时')
                 })
             }).catch(err=>{
                 return this.$Message.error('请输入5-15位首字符为字母的用户名')
             })
    },
    UpData(file){//获取file
        this.SendData.set("file",file);
        let reader = new FileReader();
        let _this = this
        reader.onload = function() {
            _this.imgSrc = this.result; 
        };
        reader.readAsDataURL(file)
        return this.Uping
    },

    RouterPush(name){//移动导航下拉跳转
        console.log(name)
        this.$router.push({
            name:name
        })
    },
    doEach(name){
       let version=null;
       version = name=='后台管理' ? this.RouterPush('serverHome') : (name == '更换头像' ? this.repleaseUserInfo(name) : (name == '修改密码' ? this.repleaseUserInfo(name) : this.outLogin()))
    },

    repleaseUserInfo(d){//打开修改弹框
        this.editPhoto = true;
        this.RepleaseName = d
        this.RepleaseEvent = this.RepleaseName == '修改密码' ? '修改' : '更换'
        let domEvent = this.RepleaseEvent;
        domEvent = domEvent == '修改' ? this.ShowrepleasePass = true : this.ShowrepleaseAvatar = true
    },
    repleaseUserInfosenddataSuccess(message){//修改成功
         this.editPhoto = false;
         this.$Message.success(message.msg);
         if(message.result){
            // this.$store.state.userInfo = message.result
            this.$store.state.userInfo = message.result;
            
         }

    },
    RegPassword(){
        if(this.oldpass.length>5&&this.oldpass.length<15&&this.newpass.length>5&&this.newpass.length<15){
            return true;
        }else{
            this.ErrorMessage = '请输入长度在5位以上16位以下的密码'
            return false
        }
    },
    RegAvatar(){
        if(this.SendData.get('file')){
            return true
        }else{
            this.ErrorMessage = '请选择头像'
            return false
        }
    },
    repleaseRegmodule(eventName){
        if(eventName=='修改'){
            return this.RegPassword()
        }else{
            return this.RegAvatar()
        }
    },
    async repleaseUserInfosenddata(){//确认修改（上传）
        if(!this.repleaseRegmodule(this.RepleaseEvent)){
            return this.$Message.error(this.ErrorMessage)
        }
        this.loading = true;
        if(this.RepleaseEvent=='修改'){
            try{
                let res = await this.axios.post('/server/repleasePassword',{userName:this.userInfo.userName,oldpassword:this.oldpass,newpassword:this.newpass})
                if(res){
                    this.loading = false;
                    res = res.data.success ? this.repleaseUserInfosenddataSuccess(res.data) : this.$Message.error(res.data.msg)
                    
                }
            }catch(e){
                return this.$Message.error('服务器异常')
            }
        }else{
            this.SendData.set('userName',this.userInfo.userName)
            let res = await this.axios.post('/server/repleaseAvatar',this.SendData)
            if(res){
                this.loading = false;
                res = res.data.success ? this.repleaseUserInfosenddataSuccess(res.data) : this.$Message.error(res.data.msg)
                
            }
        }
    },
    VisibileChange(e){
        if(!e){
            this.ShowrepleasePass = false;
            this.ShowrepleaseAvatar = false
        }
    },
    async outLogin(){//退出
        let res = await this.axios.post('/server/loginOut')
        if(res){
            this.$store.state.userInfo=res.data.result
        }

    }
  }
};
</script>
<style lang='stylus' scoped>
@import '../assets/css/header.styl'

</style>
