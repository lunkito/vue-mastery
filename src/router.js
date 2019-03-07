import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import store from './store/store'
import NotFound from './views/NotFound.vue'
import NetworkIssue from './views/NetworkIssue.vue'
import ValidationExample from './views/ValidationExample.vue'

Vue.use(Router)

const router = new Router({
   mode: 'history',
   base: process.env.BASE_URL,
   routes: [
      {
         path: '/',
         name: 'event-list',
         props: true,
         component: () => import('./views/EventList.vue')
      },
      {
         path: '/event/create',
         name: 'event-create',
         component: () => import('./views/EventCreate.vue')
      },
      {
         path: '/event/:id',
         name: 'event-show',
         props: true,
         component: () => import('./views/EventShow.vue'),
         beforeEnter(routeTo, routeFrom, next) {
            getEvent(routeTo, next)
         }
      },
      {
         path: '/validation-example',
         name: 'validation-example',
         component: ValidationExample
      },
      {
         path: '/404',
         name: '404',
         props: true,
         component: NotFound
      },
      {
         path: '/network-issue',
         name: 'network-issue',
         component: NetworkIssue
      },
      {
         path: '*',
         redirect: { name: '404', params: { resource: 'page' } }
      }
   ]
})

router.beforeEach((routeTo, routeFrom, next) => {
   NProgress.start()
   next()
})

router.beforeResolve((to, from, next) => {
   if (to.name !== 'event-list') {
      return next()
   }

   store.dispatch('eventModule/fetchEvents', to.query.page).then(events => {
      to.params.events = events
      next()
   })
})

router.afterEach(() => {
   NProgress.done()
})

export default router

function getEvent(routeTo, next) {
   store
      .dispatch('eventModule/fetchEvent', routeTo.params.id)
      .then(event => {
         // If the parameter has the same name as a prop, it is sended as a prop
         // To send the event as a prop, props: true (few lines above)
         routeTo.params.event = event
         next()
      })
      .catch(error => {
         if (error.response && error.response.status === 404) {
            next({ name: '404', params: { resource: 'event' } })
         } else {
            next({ name: 'network-issue' })
         }
      })
}
