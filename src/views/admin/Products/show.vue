<template> 
<v-container class="ma-5">
                <v-row> 
               
  <v-card v-if="form"
            class="mx-auto"
          >
           <!-- <div
           class="height=300px"
           style="background:#CFD8DC"
           >
            <div class="d-flex justify-center">
              
            </div>  
            </div> -->
            <v-container>
            <v-row>
              <v-col md="6">
            <v-card-title class="display-1">Product Name:   {{form.name}}</v-card-title>
            <v-card-title >Title:   {{form.title}}</v-card-title>
            <v-card-title >Category:   {{form.category}}</v-card-title>
            <v-card-title >Major category:   {{form.majorcategory}}</v-card-title>
            <v-card-title >Description:  <p v-html="form.description"></p> </v-card-title>
            <v-card-title >Old Price:   ${{form.oldprice}}</v-card-title>
            <v-card-title >New Price:   ${{form.newprice}}</v-card-title>
            <v-card-title >Buying Price:   ${{form.buyprice}}</v-card-title>
              </v-col>
              <v-col md="6">
                <v-img v-if="form.picture"
              max-height="350"
              max-width="350"
              contain
              class="pa-7 "
              :src="`${host}/${form.picture}`"
            ></v-img>
              </v-col></v-row>
            </v-container>

          <div class="text-center mt-3">
                      <v-btn class="ma-3" dark @click="Back()">Back</v-btn>
                      <v-btn class="ma-3" color="blue accent-3" dark @click="Edit(form.code)">Edit</v-btn>
                    </div>
          </v-card>
  </v-row>
</v-container>
</template>
<script>
 import axios from '@/axios'
import cons from '@/helpers/myconstants'


export default {
  name: "Customershow",
  data(){
    return{
        form:{
            name:'',
            title:'',
            description:''
        },
        show: false,
        errs:{},
        option:{},
        title:'Create',
        init:'api/products',
        redirect: '/products',
        store: 'api/products',
        method: 'post',
        snackbar:false,
        timeout:3000
    }
  },
  created(){
      this.fetchData()
      this.host = cons.host
  },
  methods:{
    Edit(){
      this.$router.push(`${this.redirect}/${this.$route.params.code}/edit`)
    },
    Back(){
      this.$router.push(this.redirect)
    },
  
  async fetchData(){
      try{
              this.$store.commit("setLoaderTrue")
          const {data} = await axios.get(`${this.store}/${this.$route.params.code}`)
          this.form = data
                this.$store.commit("setLoader")
        }catch(err){
         this.snackbar = true
        //   console.log(err)
        this.errs = err.response.data
                this.$store.commit("setLoader")
        }
    }
  },    
  }
</script>

<style>

</style>