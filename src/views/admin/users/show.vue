<template> 
<v-container class="ma-5">
                <v-row> 
                <v-card
                  class="mx-auto"
                  max-width="344"
                >
                  <v-img
                    :src="`${host}${form.picture}`"
                    height="200px"
                  ></v-img>

                  <v-card-title>
                    {{form.f_name}} {{form.l_name}}
                  </v-card-title>
                  <v-card-title>
                    {{form.u_name}} {{form.phone}}
                  </v-card-title>

                  <v-card-subtitle>
                    {{form.email}}
                  </v-card-subtitle>

                  <v-card-text>
                    {{form.address}}
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
  name: "Usersinfo",
  data(){
    return{
        form:{
        },
        show: false,
        errs:{},
        option:{},
        title:'Create',
        init:'api/users',
        redirect: '/users',
        store: 'api/users',
        method: 'post',
        snackbar:false,
        timeout:3000
    }
  },
  created(){
    console.log(this.form.picture)
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