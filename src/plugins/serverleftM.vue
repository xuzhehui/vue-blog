<template>
    <div class='m-box'>
        <div class='m-box-content'>
            <Dropdown trigger='click'>
                <Icon type="md-open" size='16' />
                <DropdownMenu slot="list">
                    <div @click="RouterPath">
                        <DropdownItem data-value='serverStart'><Icon type="md-document" />首页</DropdownItem>
                        <DropdownItem data-value='publishair'><Icon type="ios-book" />发布文章</DropdownItem>
                        <DropdownItem data-value='article'><Icon type="logo-buffer" />文章管理</DropdownItem>
                        <DropdownItem  data-value='user' v-if='desited == 2 ? true : false'><Icon type="md-people" />用户管理</DropdownItem>
                        <DropdownItem data-value='label' v-if='desited == 2 ? true : false'><Icon type="md-bookmarks" />标签管理</DropdownItem>
                        <DropdownItem data-value='home' divided> <Icon type="ios-keypad" />主界面</DropdownItem>
                    </div>
                </DropdownMenu>
            </Dropdown>
            <p>{{touterTitle}}</p>
            <Badge>
                <Icon type="ios-home" size='16'/>
            </Badge>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            touterTitle:'首页',
        }
    },
    created(){
        if(sessionStorage.getItem('title')){
            this.touterTitle = sessionStorage.getItem('title')
        };
        if(sessionStorage.getItem('type')){
            this.desited = sessionStorage.getItem('type')
        }
        if(sessionStorage.getItem('foc')){
            this.state = sessionStorage.getItem('foc')
        }else{
            this.state = 'serverStart'
        }
    },
    methods:{
        RouterPath(e){
            this.touterTitle = e.target.innerText
            if(this.touterTitle=='主界面'){
                sessionStorage.removeItem('title')
            }else{
                sessionStorage.setItem('title',this.touterTitle)
            }
            this.$router.push({
                name: e.target.dataset.value
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
.m-box
    width 100%
    height 100%
    display flex
    justify-content center
    .m-box-content
        width 95%
        height 100%
        display flex
        justify-content space-between
        align-items center
</style>


