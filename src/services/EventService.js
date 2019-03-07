import axios from 'axios'
import NProgress from 'nprogress'

const client = axios.create({
   baseURL: 'http://localhost:3000',
   withCredentials: false,
   timeout: 6000
})

client.interceptors.request.use(requestConfig => {
   NProgress.start()
   return requestConfig
})

client.interceptors.response.use(response => {
   NProgress.done()
   return response
})

export default {
   getEvents(perPage, page) {
      return client.get(`/events?_limit=${perPage}&_page=${page}`)
   },
   getEvent(id) {
      return client.get(`/events/${id}`)
   },
   postEvent(event) {
      return client.post('/events', event)
   }
}
