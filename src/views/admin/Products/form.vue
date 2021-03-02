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
                                        name="name"
                                        rules="required"
                                      >
                                      <v-text-field
                                        v-model="form.name"
                                        :error-messages="errors"      
                                        label="Name"
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="6"
                                    ><validation-provider
                                        v-slot="{ errors }"
                                        name="Title"
                                        rules="required|"
                                      >
                                      <v-text-field
                                        v-model="form.title"
                                        label="Title"
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
                                    v-if="majorcats"
                                  >
                                   <v-autocomplete
                                        v-model="majorcati"
                                        :items="majorcats"
                                        chips
                                        clearable
                                        hide-details
                                        hide-selected
                                        item-text="name"
                                        item-value="name"
                                        label="Search majorcat..."
                                        solo
                                        @change="GetMajorcategory(majorcati)"
                                      ><template v-slot:prepend-item>
                                          <v-row align="center" justify="center">
                                            <v-btn
                                            class="ma-1"
                                            color="primary"
                                            small
                                            @click="createmajorcat()"
                                            >
                                            add majorcat
                                            </v-btn>
                                          </v-row>
                                        </template>
                                        <template v-slot:no-data>
                                          <v-list-item>
                                            <v-list-item-title>
                                              Search for 
                                              <strong>majorcat</strong>
                                            </v-list-item-title>
                                          </v-list-item>
                                        </template>
                                        <template v-slot:selection="{ attr, on, item, selected }">
                                          <v-chip
                                            v-bind="attr"
                                            :input-value="selected"
                                            color="blue-grey"
                                            class="white--text"
                                            v-on="on"
                                          >
                                            <v-icon left>
                                              mdi-check-box-outline
                                            </v-icon>
                                            <span v-text="item.name"></span>
                                          </v-chip>
                                        </template>
                                        <template v-slot:item="{ item }">
                                          <v-list-item-avatar
                                            color="indigo"
                                            class="headline font-weight-light white--text"
                                          >
                                            {{ item.name.charAt(0) }}
                                          </v-list-item-avatar>
                                          <v-list-item-content>
                                            <v-list-item-title v-text="item.name"></v-list-item-title>
                                            <v-list-item-subtitle >{{item.title}}</v-list-item-subtitle>
                                          </v-list-item-content>
                                          <v-list-item-action>
                                            <v-icon>mdi-check-box-outline</v-icon>
                                          </v-list-item-action>
                                        </template>
                                      </v-autocomplete>
                                  </v-col>
                                  <v-col
                                      cols="12"
                                      md="6"
                                      v-if="majorcati"
                                    >
                                   <v-autocomplete
                                        v-model="categoryi"
                                        :items="categorylist"
                                        chips
                                        clearable
                                        hide-details
                                        hide-selected
                                        item-text="name"
                                        item-value="title"
                                        label="Search category..."
                                        solo
                                      ><template v-slot:prepend-item>
                                          <v-row align="center" justify="center">
                                            <v-btn
                                            class="ma-1"
                                            color="primary"
                                            small
                                            @click="createcategory()"
                                            >
                                            add category
                                            </v-btn>
                                          </v-row>
                                        </template>
                                        <template v-slot:no-data>
                                          <v-list-item>
                                            <v-list-item-title>
                                              Search for 
                                              <strong>category</strong>
                                            </v-list-item-title>
                                          </v-list-item>
                                        </template>
                                        <template v-slot:selection="{ attr, on, item, selected }">
                                          <v-chip
                                            v-bind="attr"
                                            :input-value="selected"
                                            color="blue-grey"
                                            class="white--text"
                                            v-on="on"
                                          >
                                            <v-icon left>
                                              mdi-check-box-outline
                                            </v-icon>
                                            <span v-text="item.name"></span>
                                          </v-chip>
                                        </template>
                                        <template v-slot:item="{ item }">
                                          <v-list-item-avatar
                                            color="indigo"
                                            class="headline font-weight-light white--text"
                                          >
                                            {{ item.name.charAt(0) }}
                                          </v-list-item-avatar>
                                          <v-list-item-content>
                                            <v-list-item-title v-text="item.name"></v-list-item-title>
                                            <v-list-item-subtitle >{{item.title}}</v-list-item-subtitle>
                                          </v-list-item-content>
                                          <v-list-item-action>
                                            <v-icon>mdi-check-box-outline</v-icon>
                                          </v-list-item-action>
                                        </template>
                                      </v-autocomplete>
                                    </v-col>
                                   </v-row>
                                     <v-row>
                                       <v-col
                                      cols="12"
                                      md="4"
                                    ><validation-provider
                                        v-slot="{ errors }"
                                        name="oldprice"
                                        rules="required|"
                                      >
                                      <v-text-field
                                        v-model="form.oldprice"
                                        label="Old Price"
                                        :error-messages="errors"   
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col> 
                                     <v-col
                                      cols="12"
                                      md="4"
                                    ><validation-provider
                                        v-slot="{ errors }"
                                        name="newprice"
                                        rules="required|"
                                      >
                                      <v-text-field
                                        v-model="form.newprice"
                                        label="New price"
                                        :error-messages="errors"   
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col> 
                                    <v-col
                                      cols="12"
                                      md="4"
                                    > <validation-provider
                                        v-slot="{ errors }"
                                        name="buy price"
                                        rules="required"
                                      >
                                      <v-text-field
                                        v-model="form.buyprice"
                                        :error-messages="errors"      
                                        label="Buying price"
                                        required
                                      ></v-text-field>
                                      </validation-provider>
                                    </v-col>

                                    
                                  </v-row>
                                   <v-row>
                                    <v-col
                                      cols="12"
                                      md="12"
                                    ><validation-provider
                                        v-slot="{ errors }"
                                        name="Description"
                                        rules="required"
                                      >
                                      <v-textarea
                                        v-model="form.description"
                                        name="input-7-1"
                                        label="Description"
                                        :error-messages="errors" 
                                        required
                                      ></v-textarea>
                                      </validation-provider>
                                    </v-col>
                                   </v-row>
                                   <v-row>
                                    <v-col
                                      cols="12"
                                      md="6"
                                    >   <v-file-input
                                        accept="image/*"
                                        label="Change Image"
                                        required
                                        type="file"
                                        @change="onFile"
                                      ></v-file-input>
                                      </v-col>
                                      <v-col
                                      cols="12"
                                      md="6"
                                      v-if="form.picture"
                                    >   <v-card >
                                      <v-img
                                        :src="`${host}/imgs/products/${form.picture}`"
                                        contain
                                        max-height="300"
                                        class="grey darken-4"
                                      ></v-img>
                                      <v-card-title class="title">
                                        {{form.name}}
                                      </v-card-title>
                                    </v-card>
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
  <categorymodal :dialogcategory="dialogcategory" :categoryclose="categoryclose" :majorcode="majorc"/>
  <majorcatmodal :dialogmajorcat="dialogmajorcat" :majorcatclose="majorcatclose"/>

</div>
</template>

<script>
 import axios from '../../../axios'
import cons from '@/helpers/myconstants'
import categorymodal from '@/components/modals/category'
import majorcatmodal from '@/components/modals/majorcat'

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
  name: "login",
  components: {
      ValidationProvider,
      ValidationObserver,
      categorymodal,
      majorcatmodal
    },
  data(){
    return{
        form:{
            name:'',
            title:'',
            description:'',
            majorcat:'',
            category:'',
            price:'',
            oldprice:'',
            newprice:'',
            buyprice:'',
            picture:null
        },
        dialogcategory: false,
        dialogmajorcat: false,
        host:'',
        majorcati:'',
        majorc: '',
        categoryi:'',
        majorcats:[],
        categorylist:[],
        errs:{},
        option:[],
        title:'Create Product',
        init:'api/products/view',
        redirect: '/products',
        store: 'api/products',
        majorcategory: 'api/majorcategorys',
        categs: 'api/categorys',
        snackbar:false,
        timeout:3000
    }
  },
  created(){
      this.fetchData(),
      this.host = cons.host
  },
  methods:{
    GetMajorcategory(name) {
      if (name) {
        // console.log(name)
        // console.log(this.majorcats)
        let majorcatinfo = this.majorcats.find(m => {
          return m.name == name
        })
        // console.log(majorcatinfo)
        this.majorc = majorcatinfo.majorcode
        this.categorylist = majorcatinfo.category
        // console.log(this.majorc)
      }
    },
    onFile(e){
      console.log(e)
      this.form.picture = e
    },
    Back(){
      this.$router.push(this.redirect)
    },
    View(code){
      this.$router.push(`${this.redirect}/show/${code }`)
    } ,
   async save(){
          try{
            if (this.form.picture){
                this.$store.commit("setLoaderTrue")
                  let fd = new FormData();
                  fd.append("picture", this.form.picture, this.form.picture.name)
                  fd.append("name", this.form.name)
                  fd.append("title", this.form.title)
                  fd.append("description", this.form.description)
                  fd.append("oldprice", this.form.oldprice)
                  fd.append("newprice", this.form.newprice)
                  fd.append("buyprice", this.form.buyprice)
                  fd.append("majorcategory", this.majorcati)
                  fd.append("category", this.categoryi)
              // axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
              const {data} = await axios.post(`${this.store}`, 
                fd ,{'Content-Type': 'multipart/form-data'})

                  if(data){
                  this.$router.push(this.redirect)
                  }
                  this.$store.commit("setLoader")
            } else{
                this.$store.commit("setLoaderTrue")
                  let fd = new FormData();
                  fd.append("name", this.form.name)
                  fd.append("title", this.form.title)
                  fd.append("description", this.form.description)
                  fd.append("oldprice", this.form.oldprice)
                  fd.append("newprice", this.form.newprice)
                  fd.append("buyprice", this.form.buyprice)
                  fd.append("majorcategory", this.majorcati)
                  fd.append("category", this.categoryi)
              // axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
              const {data} = await axios.post(`${this.store}`, 
                fd ,{'Content-Type': 'multipart/form-data'})

                  if(data){
                  this.$router.push(this.redirect)
                  }
                  this.$store.commit("setLoader")

            }
        }catch(err){
            this.snackbar = true
            this.errs = err
                this.$store.commit("setLoader")

        }

  },
  async fetchData(){
        try{
              this.$store.commit("setLoaderTrue")
            const {data} = await axios.get(`${this.majorcategory}`)
            
            // const {products} = data
            //  const ms = res.data
            // const ms = data.response
             const majors = data.map(d => {
                  return {name:d.name,title:d.title, majorcode:d.code, category:d.category}
                })
            
            console.log(data)
            this.majorcats = majors
            // this.categorylist = data.categorys
            
                this.$store.commit("setLoader")
          }catch(err){
          this.snackbar = true
            console.log(err)
            
          // this.errs = err.response.data
                this.$store.commit("setLoader")
          } 
      },
    createcategory(){
      this.dialogcategory = true
    },
      categoryclose() {
        this.dialogcategory = false
        this.fetchData()
      },
    createmajorcat(){
      this.dialogmajorcat = true
    },
      majorcatclose() {
        this.dialogmajorcat = false
        this.fetchData()
      },
  }
  }
</script>

<style>

</style>