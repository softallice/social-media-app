const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/home' },
      {
        path: '/home',
        name: 'Home',
        component: () => import('pages/Home/Home.vue'),
        children: [
          {
            path: '/home/child',
            name: 'HomeChild',
            component: () => import('pages/Home/Child.vue'),
            children: [
              {
                path: '/home/child/grandchild',
                name: 'HomeChildGrandchild',
                component: () => import('pages/Home/Grandchild.vue'),
              }
            ]
          }
        ]
      },
      {
        path: '/posts',
        name: 'Posts',
        component: () => import('pages/Posts/Posts.vue'),
        children: [
          {
            path: '/posts/:id',
            name: 'Post',
            component: () => import('pages/Posts/Post.vue'),
          }
        ]
      },
      {
        path: '/questions',
        name: 'Questions',
        component: () => import('pages/Questions/Questions.vue'),
        children: [
          {
            path: '/questions/answer',
            name: 'Answer',
            component: () => import('pages/Questions/Answer.vue'),
          }
        ]
      },
      {
        path: '/images',
        name: 'Images',
        component: () => import('pages/Images/Images.vue'),
        children: [
          {
            path: '/images/:id',
            name: 'Image',
            component: () => import('pages/Images/Image.vue'),
          }
        ]
      },
      {
        path: '/qreader',
        name: 'Reader',
        component: () => import('pages/Qrcode/QrReader.vue'),
      },
      {
        path: '/qgenerator',
        name: 'Generator',
        component: () => import('pages/Qrcode/QrGenerator.vue'),
      },
      {
        path: '/mobile',
        name: 'MobileTest',
        component: () => import('pages/Mobile/Mobile.vue'),
      },
      {
        path: '/mobilescan',
        name: 'MobileScan',
        component: () => import('pages/Mobile/MobileScan.vue'),
      },
      {
        path: '/bluetooth',
        name: 'Bluetooth',
        component: () => import('pages/Bluetooth/Bluetooths.vue'),
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
