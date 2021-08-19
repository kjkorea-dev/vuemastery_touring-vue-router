import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import EventLayout from '../views/event/Layout.vue'
import EventDetails from '../views/event/Details.vue'
import EventRegister from '../views/event/Register.vue'
import EventEdit from '../views/event/Edit.vue'
import About from '../views/About.vue'
import NotFound from '../views/NotFound.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
