import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Home from '@/components/home'
import Class from '@/components/class'
import Classlist from '@/components/classlist'
import About from '@/components/about'
import Serverhome from '@/server/index.vue'
import ServerStart from '@/server/home'
import PublishAir from '@/server/publishair'
import User from '@/server/user'
import Label from '@/server/label'
import Article from '@/server/Article'
import Seeview from '@/components/seeview'
import Resume from '@/components/resume'

Vue.use(Router)

export default new Router({
  // mode:'history',
  routes: [
    {
      path:'/',
      name:'index',
      component:Index,
      children:[
        {
          path:'/home',
          name:'home',
          component:Home
        },
        {
          path:'/class',
          name:'class',
          component:Class
        },
        {
          path:'/classlist',
          name:'classlist',
          component:Classlist
        },
        {
          path:'/about',
          name:'about',
          component:About
        },
        {
          path:'/seeview',
          name:'seeview',
          component:Seeview
        },
        {
          path:'/resume',
          name:'resume',
          component:Resume
        }
      ]
    },
    {
      path:'/server',
      name:'serverHome',
      component:Serverhome,
      redirect:'/server/home',
      children:[
        {
            path:'/server/home',
            name:'serverStart',
            component:ServerStart
        },
        {
          path:'/server/publishair',
          name:'publishair',
          component:PublishAir
        },
        {
          path:'/server/user',
          name:'user',
          component:User
        },
        {
          path:'/server/label',
          name:'label',
          component:Label
        },
        {
          path:'/server/article',
          name:'article',
          component:Article
        }
      ]
    }
  ]
})
