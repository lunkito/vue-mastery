<template>
   <form @submit.prevent="submit">
      <input
         type="email"
         placeholder="Email..."
         v-model="email"
         :class="{ error: $v.email.$error }"
         @blur="$v.email.$touch()"
      />

      <div v-if="$v.email.$error">
         <p v-if="!$v.email.email" class="errorMessage">Enter a valid email</p>
         <p v-if="!$v.email.required" class="errorMessage">Email is required</p>
      </div>

      <button :disabled="$v.$invalid" type="submit">Submit</button>
      <p v-if="$v.$anyError" class="errorMessage">
         Please fill in the required fields
      </p>
   </form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
   data() {
      return {
         email: ''
      }
   },
   validations: {
      email: {
         required,
         email
      }
   },
   methods: {
      submit() {
         this.$v.$touch()
         if (!this.$v.$invalid) {
            console.log('Submit form')
         }
      }
   }
}
</script>

<style scoped></style>
