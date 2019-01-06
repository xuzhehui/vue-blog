<template>
    <div style='width:100%;heigth:100%;display:flex;justify-content:center'>
        <Row class-name='see'>
            <i-col :xs="{span:24}" :sm="{span:24}" :md="{span:24}">
                <div class='see-title'>
                    <span>{{homeData[Zindex].title}}</span>
                    <span>作者:{{homeData[Zindex].userName}}</span>
                </div>
                <div class='active'>
                    <span>{{homeData[Zindex].time}}</span>
                    <div class='active-live'> 
                        <Icon size='13' type="md-pricetag" />
                        <Tag style='margin-left:5px' color="cyan">{{homeData[Zindex].lebalname}}</Tag>
                        <span>{{homeData[Zindex].visit}}阅读</span>
                    </div>
                </div>
                <div v-html="compiledMarkdown" class='content'> 

                </div>

                <div class='Catalog'>
                    <p @click="backData">{{'上一篇'}}</p>
                    <p @click='nextData'>{{'下一篇'}}</p>
                </div>

                <div class='Fabulous'>
                    <Button @click='addPoint'>
                        <Icon type="md-thumbs-up" size='15' />
                        {{homeData[Zindex].point}}
                    </Button>
                </div>
            </i-col>
        </Row>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import marked from 'marked'
import hljs from 'highlight.js'
import '../assets/css/hopscotch.css';
export default {
    data(){
        return {
            Zindex:this.$route.params.Zindex,
        }
    },
    created(){
        this.markdown()
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
                highlight: function (code, lang) {
                if (lang && hljs.getLanguage(lang)) {    
                        return hljs.highlight(lang, code, true).value;
                    } else {
                        return hljs.highlightAuto(code).value;
                    }
                }
            })
        },
        backData(e){
            if(this.Zindex==0){
                return false
            }
            this.Zindex--
        },
        nextData(e){
            if(this.Zindex==this.homeData.length-1){
                return false
            }
            this.Zindex++
        },
        getmarkData(){
            for(let i = 0;i<document.querySelectorAll('pre').length;i++){
                document.querySelectorAll('pre')[i].className='hljs'
            }
        },
        addPoint(){
            
        },
        mounted(){
            
        }

    },
    computed:{
        ...mapState({
            homeData:state=>state.homeData
        }),
        compiledMarkdown: function () {
           return　marked(this.homeData[this.Zindex].content,(err,data)=>{
               if(err){throw err}
               return data
               
           }) 
        }
    },
    watch:{
        Zindex(news,olds){
            setTimeout(()=>{
               this.getmarkData()
            },500)
           
        }
    },
    mounted(){
        for(let i = 0;i<document.querySelectorAll('pre').length;i++){
            document.querySelectorAll('pre')[i].className='hljs'
        }
        
    }
}
</script>

<style lang="stylus" scoped>
    .Fabulous
        display flex
        justify-content center
        margin-top 10px 
        margin-bottom 20px
    .Catalog
        display flex
        justify-content space-between
        margin-top 10px
        padding 20px
        background white
        p
            cursor pointer
            &:hover
                color rgb(45,183,245)
                transition .4s
    .content
        background white
        padding 20px
        font-size 16px
    .active
        display flex
        justify-content space-between
        height 50px
        align-items center
        padding 20px
        background white
        
    .active-live
        display flex
        align-items center
        
    .see-title
        width 100%
        display flex
        justify-content space-between
        align-items center
        background white
        height 50px
        margin-top 10px
        padding 20px
        border 1px solid rgba(0,0,0,.1)
        
    .see
        width 95%
        height 100%
        

</style>


