<template>
  <v-container fill-height fluid>
        <v-row align="center"
              justify="center"
              >
                <v-col 
                class="auto"
                cols="12"
                sm="8"
                md="4">
                <majorcategory />
                </v-col>
                <v-col 
                class="auto"
                cols="12"
                sm="8"
                md="8">
                <router-view>
                </router-view>
                </v-col>
        </v-row>
  </v-container>
</template>

<script>
import majorcategory from '../../../components/datatables/majorcategory.vue'
export default {
  components: { majorcategory },

}
</script>

<style>

</style>