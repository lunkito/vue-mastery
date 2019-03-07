<template>
   <div>
      <h1>Oops!</h1>
      <h3>It looks like you're experiencing some network issues</h3>
      <router-link :to="{ name: 'event-list' }">Home</router-link>
   </div>
</template>
