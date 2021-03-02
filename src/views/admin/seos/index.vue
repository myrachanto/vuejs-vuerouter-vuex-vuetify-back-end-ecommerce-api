<template>
  <v-container>
    
<DataViewer :source="source" :headers="headers" :create="create" :title="title" :show="show" />
  </v-container>

</template>
<script>
import DataViewer from '@/components/viewers/dataviewer.vue'
export default {
      name: 'seos',
    components:{
        DataViewer,
    },
      data(){
          return{
              title:'seos',
              source: '/api/seos',
              create: '/seos/create',
              show:'/seos',
              headers:[
                { text: 'Title', value: 'title' },
                { text: 'Meta', value: 'meta' },
                { text: 'Actions', value: 'actions', sortable: false },
              ]
          }
      },
}
</script>

<style>

</style>