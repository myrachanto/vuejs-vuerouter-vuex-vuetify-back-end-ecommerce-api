<template>
  <v-container>
    
<DataViewer :source="source" :headers="headers" :create="create" :title="title" :show="show" />
  </v-container>

</template>
<script>
import DataViewer from '@/components/viewers/dataviewer.vue'
export default {
      name: 'Products',
    components:{
        DataViewer,
    },
      data(){
          return{
              title:'Products',
              source: '/api/products',
              create: '/products/create',
              show:'/products',
              headers:[
                { text: 'Name', value: 'name' },
                { text: 'Title', value: 'title' },
                { text: 'Actions', value: 'actions', sortable: false },
              ]
          }
      },
}
</script>

<style>

</style>