<template>
   <form @submit.prevent="createEvent">
      <BaseSelect
         :options="categories"
         label="Select a category"
         v-model="event.category"
         class="field"
         :class="{ error: $v.event.category.$error }"
         @blur="$v.event.category.$touch()"
      />
      <template v-if="$v.event.category.$error">
         <p v-if="!$v.event.category.required" class="errorMessage">
            Please select a category
         </p>
      </template>

      <h3>Name & describe your event</h3>
      <BaseInput
         label="Title"
         v-model="event.title"
         type="text"
         placeholder="Add an event title"
         class="field"
         :class="{ error: $v.event.title.$error }"
         @blur="$v.event.title.$touch()"
      />
      <template v-if="$v.event.title.$error">
         <p v-if="!$v.event.title.required" class="errorMessage">
            Title is required
         </p>
      </template>

      <BaseInput
         label="Description"
         v-model="event.description"
         type="text"
         placeholder="Add a description"
         class="field"
         :class="{ error: $v.event.description.$error }"
         @blur="$v.event.description.$touch()"
      />
      <template v-if="$v.event.description.$error">
         <p v-if="!$v.event.description.required" class="errorMessage">
            Description is required
         </p>
      </template>

      <h3>Where is your event?</h3>
      <BaseInput
         label="Location"
         v-model="event.location"
         type="text"
         placeholder="Add a location"
         class="field"
         :class="{ error: $v.event.location.$error }"
         @blur="$v.event.location.$touch()"
      />
      <template v-if="$v.event.location.$error">
         <p v-if="!$v.event.location.required" class="errorMessage">
            Location is required
         </p>
      </template>

      <h3>When is your event?</h3>
      <div class="field">
         <label>Date</label>
         <datepicker
            v-model="event.date"
            placeholder="Select a date"
            :input-class="{ error: $v.event.date.$error }"
            @closed="$v.event.date.$touch()"
         />
      </div>
      <template v-if="$v.event.date.$error">
         <p v-if="!$v.event.date.required" class="errorMessage">
            Date is required
         </p>
      </template>

      <BaseSelect
         :options="times"
         label="Select a time"
         v-model="event.time"
         class="field"
         :class="{ error: $v.event.time.$error }"
         @blur="$v.event.time.$touch()"
      />
      <template v-if="$v.event.time.$error">
         <p v-if="!$v.event.time.required" class="errorMessage">
            Please select a time
         </p>
      </template>

      <BaseButton type="submit" className="-fill-gradient">Submit</BaseButton>
   </form>
</template>

<script>
import { mapState } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import NPogress from 'nprogress'
import { required } from 'vuelidate/lib/validations'

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
   validations: {
      event: {
         category: { required },
         title: { required },
         description: { required },
         location: { required },
         date: { required },
         time: { required }
      }
   },
   methods: {
      createEvent() {
         this.$v.$touch()

         if (!this.$v.$invalid) {
            NPogress.start()
            this.$store
               .dispatch('eventModule/createEvent', this.event)
               .then(() =>
                  this.$router.push({
                     name: 'event-show',
                     params: { id: this.event.id }
                  })
               )
               .then(() => (this.event = this.createFreshEvent()))
               .catch(() => NPogress.done())
         }
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
