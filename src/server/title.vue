<template>
    <div class='title-box'>
        <Row>
            <i-col>{{title}}</i-col>
        </Row>
    </div>
</template>

<script>
export default {
    props:{
        title:String,
    },
    data(){
        return {

        }
    },
    mounted(){
        
    }
}
</script>

<style lang="stylus" scoped>
.title-box
    width 100%
    height 50px
    display flex
    align-items center
    font-size 18px
    font-weight bold 

</style>


