import Vue from 'vue';
import Router from 'vue-router';
import Join from './views/Join.vue';
import JoinBoard from './views/JoinBoard.vue';
import CreateBoard from './views/CreateBoard.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Join',
      component: Join,
    },{
      // path: '/rtcp/:roomId/:isHoster', 
      path: '/whiteboard/',
      name: 'CreateBoard',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: CreateBoard,
    },{
      // path: '/rtcp/:roomId/:isHoster', 
      path: '/whiteboard/join',
      name: 'JoinBoard',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: JoinBoard,
    },
  ],
});
