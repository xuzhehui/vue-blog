<template>
    <div class='p-box'>
        <div class='p-content-box'>
            <Row>
                <i-col :xs="{span:0}" :sm="{span:24}" :md="{span:24}"><Title :title='title'></Title></i-col>
                <i-col class='oublish' :xs="{span:24}" :sm="{span:24}" :md="{span:24}">
                    <div>
                        <span>标题</span>
                        <Input type="text" v-model="note.title" placeholder="请输入标题"/>
                    </div>
                    <div>
                        <span>正文</span>
                        <Input type="textarea" v-model="note.content" :autosize='{minRows:4}'  placeholder="请输入正文"/>
                    </div>
                    <div>
                        <span>分类</span>
                        <Select @on-change='changeSelect' v-model='note.lebalname' filterable placeholder='请选择分类'>
                            <Option v-for='(item,index) in lebalArray' :value='item.lebalname' :label="item.lebalname"></Option>
                        </Select>
                    </div>
                    <div>
                         <Button type="info" @click="SendAir">{{interfice}}</Button>
                         <Button style='margin-left:10px' type="info" @click='previewData'>预览</Button>
                    </div>
                </i-col>

                <i-col  :xs="{span:24}" :sm="{span:24}" :md="{span:24}">
                    <Modal
                        title="文章预览"
                        width='900'
                        v-model="preview"
                        footer-hide
                        scrollable
                        :styles="{top: '100px',height:'600px',overflow:'hidden'}">
                        <div style='font-size:16px;overflow-y:auto;height:400px;' v-html='compiledMarkdown'></div>
                    </Modal>
                </i-col>
            </Row>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import Title from './title.vue';
import marked from 'marked'
import hljs from 'highlight.js'
import '../assets/css/hopscotch.css';
export default {
    data(){
        return {
            title:'发布文章',
            preview:false,
            note:{
                title:'',//标题
                lebalname:'',//分类名
                content:'',//正文
            },
            interfice:''
        }
    },
    computed:{
        ...mapState({
            lebalArray:state=>state.lebalArray
        }),
        compiledMarkdown: function () {
           return　marked(this.note.content,(err,data)=>{
               if(err){throw err}
               return data
               
           }) 
        }
    },
    created(){
        this.markdown()
        this.getlebal();
    },
    watch:{
        
    },
    components:{
        Title,
    },
    mounted(){
        if(this.$route.params.lebalname&&this.$route.params.title){
            this.note = this.$route.params;
            this.interfice = '更新'        
        }else{
            this.interfice = '保存' 
        }
    },
    methods:{
        markdown() {
            marked.setOptions({
                renderer: new marked.Renderer(),
                gfm: true,
                tables: true,
                breaks: false,
                pedantic: false,
                smartLists: true,
                sanitize: true,
                smartypants: false,
                highlight: function (code, lang, callback) {
                    require('pygmentize-bundled')({ lang: lang, format: 'html' }, code, function (err, result) {
                        callback(err, result.toString());
                    });
                },
                highlight: function (code, lang) {
                if (lang && hljs.getLanguage(lang)) {    
                        return hljs.highlight(lang, code, true).value;
                    } else {
                        return hljs.highlightAuto(code).value;
                    }
                }
            })
        },
        getmarkData(){
            for(let i = 0;i<document.querySelectorAll('pre').length;i++){
                document.querySelectorAll('pre')[i].className='hljs'
            }
        },
        ...mapActions({
            'getlebal':'GETLEBAL'
        }),
        changeSelect(){
            
        },
        async SendAir(){
           if(this.note.title==''||this.note.title==null){
             return this.$Message.error('请输入文章标题')
            }else if(this.note.content==''||this.note.content==null){
                return this.$Message.error('文章内容不可为空哦')
            }else if(this.note.lebalname==''||this.note.lebalname==null){
                return this.$Message.error('请选择分类')
            }
            
            let res = await this.axios.post('/server/addnotes',this.note)
            if(res){
                if(res.data.success){
                    this.$Message.success(res.data.msg)
                    if(res.data.msg=='更新成功'){
                        this.$router.push({
                            name:'article'
                        })
                    }
                }
            }
        },
        previewData(){
            this.getmarkData()
            this.preview = true;
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

