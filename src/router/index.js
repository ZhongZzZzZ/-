import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const router = new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component:  () => import('../views/index'),
            children:[
                {
                    path:'/addQues',
                    name:'addQues',
                    component:() => import('../views/addQues/addQues')
                },
                {
                    path:'/editQues/:paperCode/:id',
                    name:'editQues',
                    component:() => import('../views/editQues/editQues')
                },
                {
                    path:'/trashBin',
                    name:'trashBin',
                    component:() => import('../views/trashBin/trashBin')
                },
                {
                    path:'/myQuestionnaire',
                    name:'myQuestionnaire',
                    component:() => import('../views/myQuestionnaire/myQuestionnaire')
                },

                {
                    path:'/showQuesAnswer/:paperCode/:title',
                    name:'showQuesAnswer',
                    component:() => import('../views/showQuesAnswer/showQuesAnswer')
                },

            ]
        },
        {
          path:'/answerSuccess',
          name:'answerSuccess',
          component:()=>import('../views/answerSuccess')
        },
        {
            path:'/showQues/:paperCode/:status',
            name:'showQues',
            component:() => import('../views/showQues/showQues')
        },
        {
            path:'*',
            name:'404NotFound',
            component:()=>import('../views/404page')
        }
    ]
})
