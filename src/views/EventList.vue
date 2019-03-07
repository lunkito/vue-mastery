<template>
   <div>
      <h1>Events for {{ user.name }}</h1>
      <event-card v-for="event in events" :key="event.id" :event="event" />
      <router-link
         v-if="page !== 1"
         :to="{ name: 'event-list', query: { page: this.page - 1 } }"
      >
         Previous page
      </router-link>
      <router-link
         v-if="hasMorePages"
         :to="{ name: 'event-list', query: { page: this.page + 1 } }"
      >
         Next page
      </router-link>
   </div>
</template>

<script>
import EventCard from '../components/EventCard.vue'
import { mapState, mapActions } from 'vuex'

export default {
   components: {
      EventCard
   },
   props: {
      events: {
         type: Array,
         required: true
      }
   },
   methods: mapActions('eventModule', ['fetchEvents']),
   computed: {
      page() {
         return parseInt(this.$route.query.page) || 1
      },
      hasMorePages() {
         return this.eventsLength > this.page * 3
      },
      ...mapState({
         user: state => state.userModule.user,
         eventsLength: state => state.eventModule.eventsLength
      })
   }
}
</script>

<style scoped>
a {
   margin-right: 12px;
}
</style>
