<template>
   <div class="notification-container">
      <NotificationBar
         v-for="notification of notifications"
         :key="notification.id"
         :notification="notification"
      />
   </div>
</template>

<script>
import NotificationBar from './NotificationBar.vue'
import { mapState } from 'vuex'

export default {
   components: {
      NotificationBar
   },
   computed: mapState('notificationModule', ['notifications'])
}
</script>

<style scoped>
.notification-container {
   position: fixed;
   bottom: 0;
   right: 40px;
}
</style>
