<template>
  <div class="text-center">
    <v-overlay :value="getLoader"
    z-index="5"
    >
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
  export default {
    data: () => ({
      overlay: false,
    }),
    computed:{
        getLoader(){
          console.log(this.$store.getters.getloader)
            return this.$store.getters.getloader
        },
    }
  }
</script>

<style>

</style>