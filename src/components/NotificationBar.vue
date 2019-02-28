<template>
   <div class="notification-bar" :class="notificationType">
      <p>{{ notification.message }}</p>
   </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
   props: {
      notification: {
         type: Object,
         required: true
      }
   },
   data() {
      return {
         timeout: null
      }
   },
   computed: {
      notificationType() {
         return `-text-${this.notification.type}`
      }
   },
   methods: mapActions('notificationModule', ['delete']),
   mounted() {
      this.timeout = setTimeout(() => this.delete(this.notification), 3000)
   },
   beforeDestroy() {
      clearInterval(this.timeout)
   }
}
</script>

<style scoped>
.notification-bar {
   margin: 1em;
}

.-text-success {
   color: green;
}
</style>
