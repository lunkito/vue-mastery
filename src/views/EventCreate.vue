<template>
   <div>
      <form @submit.prevent="createEvent">
         <label>Select a category</label>
         <select v-model="event.category">
            <option v-for="cat in categories" :key="cat">{{ cat }}</option>
         </select>

         <h3>Name & describe your event</h3>
         <div class="field">
            <label>Title</label>
            <input
               v-model="event.title"
               type="text"
               placeholder="Add an event title"
            />
         </div>

         <div class="field">
            <label>Description</label>
            <input
               v-model="event.description"
               type="text"
               placeholder="Add a description"
            />
         </div>

         <h3>Where is your event?</h3>
         <div class="field">
            <label>Location</label>
            <input
               v-model="event.location"
               type="text"
               placeholder="Add a location"
            />
         </div>

         <h3>When is your event?</h3>

         <div class="field">
            <label>Date</label>
            <datepicker v-model="event.date" placeholder="Select a date" />
         </div>

         <div class="field">
            <label>Select a time</label>
            <select v-model="event.time">
               <option v-for="time in times" :key="time">{{ time }}</option>
            </select>
         </div>

         <input type="submit" class="button -fill-gradient" value="Submit" />
      </form>
   </div>
</template>

<script>
import { mapState } from 'vuex'
import Datepicker from 'vuejs-datepicker'

export default {
   components: {
      Datepicker
   },
   data() {
      const times = []
      for (let i = 1; i <= 24; i++) {
         times.push(`${i}:00`)
      }
      return {
         event: this.createFreshEvent(),
         times
      }
   },
   methods: {
      createEvent() {
         this.$store
            .dispatch('eventModule/createEvent', this.event)
            .then(() =>
               this.$router.push({
                  name: 'event-show',
                  params: { id: this.event.id }
               })
            )
            .then(() => (this.event = this.createFreshEvent()))
      },
      createFreshEvent() {
         const user = this.$store.state.userModule.user
         const id = Math.floor(Math.random() * 99999)

         return {
            user: user,
            id,
            category: '',
            organizer: user,
            title: '',
            description: '',
            location: '',
            date: '',
            time: '',
            attendees: []
         }
      }
      // ...mapActions('eventModule', ['createEvent'])
   },
   computed: {
      ...mapState({
         categories: 'categories'
      })
   }
}
</script>

<style scoped>
.field {
   margin-bottom: 24px;
}
</style>