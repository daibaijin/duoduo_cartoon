
export const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue'),

    children: [
      // 首页
      {
        // path: 'home',
        path: '1',
        //path的别名
        alias: '',
        name: 'Home',
        component: () => import('../views/Home.vue'),
      },
      // 分类
      {
        // path: 'categories',
        path: '2', 
        name: 'Categories',
        component: () => import('../views/Categories.vue'),
      },
      // 更新
      {
        // path: 'leaderboard',
        path: '3', 
        name: 'Leaderboard',
        component: () => import('../views/Leaderboard.vue'),
      },
      // 排行榜
      {
        // path: 'updates',
        path: '4', 
        name: 'Updates',
        component: () => import('../views/Updates.vue'),
      },
      // 主站
      {
        // path: 'mstation',
        path: '5', 
        name: 'Mstation',
        component: () => import('../views/Mstation.vue'),
      },
      // 搜索
      {
        path: 'search',
        name: 'Search',
        component: () => import('../views/Search.vue'),
      },

  
    ]
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('../views/Detail.vue'),
  },
  {
    path: '/detail1',
    name: 'Detail1',
    component: () => import('../views/Detail1.vue'),
  },
  {
    path: '/content',
    name: 'Content',
    component: () => import('../views/Content.vue'),
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('../views/Test.vue'),
  },
  {
    path: '/my',
    name: 'My',
    component: () => import('../views/My.vue'),
  },

]