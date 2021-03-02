<template>
  <v-container>
    
<DataViewer :source="source" :headers="headers" :create="create" :title="title" :show="show" />
  </v-container>

</template>
<script>
import DataViewer from '@/components/viewers/dataviewer.vue'
export default {
      name: 'Users',
    components:{
        DataViewer,
    },
      data(){
          return{
              title:'Users',
              source: '/api/users',
              create: '/users/create',
              show:'/users',
              headers:[
                { text: 'First Name', value: 'f_name' },
                { text: 'Last Name', value: 'l_name' },
                { text: 'Username', value: 'u_name' },
                { text: 'Email', value: 'email' },
                { text: 'Actions', value: 'actions', sortable: false },
              ]
          }
      },
}
</script>

<style>

</style>