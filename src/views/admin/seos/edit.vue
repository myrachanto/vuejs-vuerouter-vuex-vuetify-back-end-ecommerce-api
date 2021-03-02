<template>  
<div>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="8">
          <v-card class="elevation-12">
                  <ValidationObserver
                    ref="observer"
                    v-slot="{}"
                  >
               <v-row class="fill-height">
                 
                 <v-col cols="12" md="12">
                    <v-card-text class="mt-12">
                      <h1 class="text-center display-2 teal--text text--accent-3">
                        {{title}}
                      </h1>
                      
                      <template >  
                                  <v-snackbar
                                  :timeout="timeout"
                                  v-model="snackbar"
                                  :value="true"
                                  absolute
                                  left
                                  shaped
                                  top
                                  dismisable
                                  color="red"
                                >
                              <h2>{{errs.error}}</h2>
                              <p>{{errs.message}}</p>
                                </v-snackbar>
                            
                          </template>
                        <v-form>
                                 <v-container>
                                  <v-row>
                                    <v-col
                                      cols="12"
                                      md="6"
                                    > <validation-provider
                                        v-slot="{ errors }"
                                        name="Title"
                                        rules="required"
                                      >
                                      <v-text-field
                                        v-model="form.title"
                                        :error-messages="errors"      
                                        label=" title"
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="6"
                                    ><validation-provider
                                        v-slot="{ errors }"
                                        name="Meta"
                                        rules="required|"
                                      >
                                      <v-text-field
                                        v-model="form.meta"
                                        label="Meta"
                                        :error-messages="errors"   
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>
                                  </v-row>
                                      <v-row>
                                         <v-col
                                      cols="12"
                                      md="6"
                                    ><validation-provider
                                        v-slot="{ errors }"
                                        name="header1"
                                        rules="required|"
                                      >
                                      <v-text-field
                                        v-model="form.header_1"
                                        label="Header 1"
                                        :error-messages="errors"   
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>
                                  <v-col
                                    cols="12"
                                    md="6"
                                  >
                                    <validation-provider
                                        v-slot="{ errors }"
                                        name="header2"
                                        rules="required"
                                      >
                                      <v-text-field
                                        v-model="form.header_2"
                                        label="Header 2"
                                        :error-messages="errors" 
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                  </v-col>
                                  
                                   </v-row>
                                 
                                  
                                </v-container>
                        
                      </v-form>
                      <!-- <h3 class="text-center mt-3">have an account with us </h3> -->
                    </v-card-text>
                    <div class="text-center mt-3">
                      <v-btn class="ma-3" dark @click="Back()">Back</v-btn>
                      <v-btn class="ma-3" color="teal accent-3" @click="save()">Save</v-btn>
                    </div>
                    </v-col>
               </v-row>
                  </ValidationObserver>
              
          </v-card>
        </v-col>
      </v-row>
    </v-container>

</div>
</template>

<script>
 import axios from '@/axios'
import cons from '@/helpers/myconstants'

  import { required, email, max } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
 setInteractionMode('eager')

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

  extend('email', {
    ...email,
    message: 'Email must be valid',
  })

export default {
  name: "seocreate",
  components: {
      ValidationProvider,
      ValidationObserver,
    },
  data(){
    return{
        form:{
            title: '',
            meta: '',
            header_1: '',
            header_2: '',
            intro: '',
            body: '',
            summary: '',
            picture:{}
        },
        majorcats:[],
        errs:{},
        option:[],
        title:'Edit seo',
        init:'api/seos/view',
        redirect: '/seos',
        store: 'api/seos',
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
    Back(){
      this.$router.push(this.redirect)
    },
    View(id){
      this.$router.push(`${this.redirect}/show/${id }`)
    } ,
   async save(){
          try{
              this.$store.commit("setLoaderTrue")
                 let fd = new FormData();
                 fd.append("title", this.form.title)
                 fd.append("meta", this.form.meta)
                 fd.append("header1", this.form.header_1)
                 fd.append("header2", this.form.header_2)
            // axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
            const {data} = await axios.put(`${this.store}/${this.$route.params.code}`, 
               fd ,{'Content-Type': 'multipart/form-data'})

                if(data){
                this.$router.push(this.redirect)
                }
                this.$store.commit("setLoader")
        }catch(err){
            this.snackbar = true
            this.errs = err
                this.$store.commit("setLoader")

        }

  },

  async fetchData(){
        try{
              this.$store.commit("setLoaderTrue")
            const {data} = await axios.get(`${this.store}/${this.$route.params.code}`)
            
            // const {user} = data
            if(data){
            this.form = data
            }
                this.$store.commit("setLoader")
          }catch(err){
          this.snackbar = true
          //   console.log(err)
          this.errs = err.response.data
                this.$store.commit("setLoader")
          } 
      }, 
  }
  }
</script>

<style>

</style>