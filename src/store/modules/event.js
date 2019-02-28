import EventService from '../../services/EventService'

export const namespaced = true

export const state = {
   event: {},
   events: [],
   eventsLength: 0
}

export const mutations = {
   ADD_EVENT(state, event) {
      state.events.push(event)
   },
   SET_EVENT(state, event) {
      state.event = event
   },
   SET_EVENTS(state, events) {
      state.events = events
   },
   SET_EVENTS_LENGTH(state, length) {
      state.eventsLength = length
   }
}

export const actions = {
   fetchEvents({ commit, dispatch }, { perPage, page }) {
      EventService.getEvents(perPage, page)
         .then(response => {
            commit('SET_EVENTS', response.data)
            commit('SET_EVENTS_LENGTH', response.headers['x-total-count'])
         })
         .then(() => notify('success', 'Events fetched successfully', dispatch))
         .catch(err => notify('error', err.message, dispatch))
   },

   createEvent({ commit, dispatch }, event) {
      return EventService.postEvent(event)
         .then(() => commit('ADD_EVENT', event))
         .then(() => notify('success', 'Your event has been created', dispatch))
         .catch(err => {
            notify('error', err.message, dispatch)
            throw err
         })
   },

   fetchEvent({ commit, dispatch, getters }, id) {
      const event = getters.getEventById(id)

      if (event) {
         commit('SET_EVENT', event)
      } else {
         EventService.getEvent(id)
            .then(response => commit('SET_EVENT', response.data))
            .then(() =>
               notify('success', 'Event fetched successfully', dispatch)
            )
            .catch(err => notify('error', err.message, dispatch))
      }
   }
}

export const getters = {
   getEventById: state => id => state.events.find(event => event.id === id)
}

const notify = (type, message, dispatch) => {
   const notification = {
      type: type,
      message: message
   }
   dispatch('notificationModule/add', notification, { root: true })
}
