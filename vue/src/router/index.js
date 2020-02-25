import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import Registration from '../views/Registration'
import ApplicationLog from '../components/application_log/ApplicationLog'
import ApplicationLogAppointment from '../components/application_log/ApplicationLogAppointment'
import ApplicationLogDelivery from '../components/application_log/ApplicationLogDelivery'
import ApplicationLogToIssue from '../components/application_log/ApplicationLogToIssue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
    redirect: { name: 'application_log' }
  },
  {
    path: '/application_log',
    name: 'application_log',
    component: ApplicationLog,
    redirect: { name: 'application_log_appointment' },
    children: [
      {
        path: 'appointment',
        name: 'application_log_appointment',
        component: ApplicationLogAppointment
      },
      {
        path: 'to_issue',
        name: 'application_log_to_issue',
        component: ApplicationLogToIssue
      },
      {
        path: 'delivery',
        name: 'application_log_delivery',
        component: ApplicationLogDelivery
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      layout: 'AuthLayout'
    }
  },
  {
    path: '/registration',
    name: 'registration',
    component: Registration
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
