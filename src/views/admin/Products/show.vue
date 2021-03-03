<template> 
<v-container class="ma-5">
                <v-row> 
                <v-card
                  class="mx-auto"
                  max-width="344"
                >
                  <v-img
                    :src="`${host}/${form.picture}`"
                    height="200px"
                  ></v-img>

                  <v-card-title>
                    {{form.name}}
                  </v-card-title>

                  <v-card-subtitle>
                    {{form.title}}
                  </v-card-subtitle>
                  <v-card-subtitle>
                   Old price:  ${{form.oldprice}}
                  </v-card-subtitle>
                  <v-card-subtitle>
                    New price: ${{form.newprice}}
                  </v-card-subtitle>
                  <v-card-subtitle>
                    Buy Price: ${{form.buyprice}}
                  </v-card-subtitle>

                  <v-card-text>
                        {{form.description}}
                      </v-card-text>

                    <div class="text-center mt-3">
                      <v-btn class="ma-3" dark @click="Back()">Back</v-btn>
                      <v-btn class="ma-3" color="teal accent-3" @click="Edit()">Edit</v-btn>
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