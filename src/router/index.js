import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import EventService from '@/services/EventService.js'
import GStore from '@/store'

const EventList = () =>
  import(/* webpackChunkName: "list" */ '@/views/EventList.vue')
const EventLayout = () =>
  import(/* webpackChunkName: "event" */ '@/views/event/Layout.vue')
const EventDetails = () =>
  import(/* webpackChunkName: "event" */ '@/views/event/Details.vue')
const EventRegister = () =>
  import(/* webpackChunkName: "event" */ '@/views/event/Register.vue')
const EventEdit = () =>
  import(/* webpackChunkName: "event" */ '@/views/event/Edit.vue')
const About = () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
const NotFound = () =>
  import(/* webpackChunkName: "error" */ '@/views/NotFound.vue')
const NetworkError = () =>
  import(/* webpackChunkName: "error" */ '@/views/NetworkError.vue')

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: route => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/events/:id',
    /* Alias */
    // alias: '/event/:id',
    name: 'EventLayout',
    props: route => ({ id: parseInt(route.params.id) }),
    component: EventLayout,
    beforeEnter: to => {
      return EventService.getEvent(to.params.id)
        .then(response => {
          GStore.event = response.data
        })
        .catch(error => {
          if (error.response && error.response.status == 404) {
            return {
              name: '404Resource',
              params: { resource: 'event' }
            }
          } else {
            return {
              name: 'NetworkError'
            }
          }
        })
    },
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit
      }
    ]
  },
  /* Redirect with chidren */
  // {
  //   path: '/event/:id',
  //   redirect: { name: 'EventDetails' },
  //   children: [
  //     { path: 'register', redirect: { name: 'EventRegister' } },
  //     { path: 'edit', redirect: { name: 'EventEdit' } }
  //   ]
  // },
  /* Redirect with wildcard */
  // {
  //   path: '/event/:afterEvent(.*)',
  //   redirect: to => {
  //     return { path: '/events/' + to.params.afterEvent }
  //   }
  // },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
