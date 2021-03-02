<template>
<div>
 <v-container fluid>
    <v-row>
<v-col>
    <v-toolbar
    >
<v-toolbar-title>{{title}}</v-toolbar-title>
<v-spacer></v-spacer>
    </v-toolbar>
    <template>
  <v-expansion-panels>
    <v-expansion-panel
    >
      <v-expansion-panel-header>
        filter
      </v-expansion-panel-header>
      <v-expansion-panel-content>
       <v-row>
        <v-col
          cols="12"
          md="9"
        >
          <v-text-field
            v-model="search"
            label="Search query"
            required
          ></v-text-field>
        </v-col>
       

        <v-col
          cols="12"
          md="2"
        >
         <v-btn class="ma-2" 
      depressed
      color="success"
      @click="GetData"
    >
      Search
    </v-btn>
         <v-btn class="ma-2" 
      depressed
      color="primary"
      @click="resetFilter"
    >
      Reset
    </v-btn>
        </v-col>
      </v-row></v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
    </template>
</v-col>
 </v-row>
        <v-row align="center"
              justify="center"
              >
                <v-col v-if="inventory"
                class="auto"
                cols="12"
                sm="8"
                md="3">
                 <Dcard :title="inventory.name" :total="formatcurrency(inventory.total)" :desc="inventory.description" :icon="`mdi-cash-plus`" />
                </v-col>
                 <v-col  v-if="products"
                class="auto"
                cols="12"
                sm="8"
                md="3">
                 <Dcard :title="products.name" :total="formatcurrency(products.total)" :desc="products.description" :icon="`mdi-cash-minus`" />
                </v-col>
                 <v-col  v-if="blogs"
                class="auto"
                cols="12"
                sm="8"
                md="3">
                 <Dcard :title="blogs.name" :total="formatcurrency(blogs.total)" :desc="blogs.description" :icon="blogs.Icon"  />
                </v-col> <v-col  v-if="users"
                class="auto"
                cols="12"
                sm="8"
                md="3">
                 <Dcard :title="users.name" :total="formatcurrency(users.total)" :desc="users.description" :icon="users.Icon"   />
                </v-col> 
                <v-col></v-col>
      </v-row>
  </v-container>
</div>
</template>

<script>
import formatMoney from '@/helpers/currencyformat'
import axios from '@/axios'
import Dcard from '@/components/cards/dashboardcard'
export default {
    data(){
    return{
      inventory:{},
      products:{},
      blogs:{},
      users:{}, 
      errs:{},  
      source: 'api/dashboard',
      search:'',
      title:'Dashboard',
    }
  },

  components:{
    
    Dcard
  },
  created() {
      this.GetData()
      // this.newInvoice()
    
  },
  methods:{

      formatcurrency(d) {
          return formatMoney(d)
        },
    
    selected(val){
          if (val === 'custom'){
            this.custom = true
          }else {
            this.custom = false
          }
        },   
   resetFilter(){
            this.search = 'search'
            this.GetData()
        },
      async GetData(){
          try{
              this.$store.commit("setLoaderTrue")
            var p = this
            const {data} = await axios.get(`${this.source}?search=${p.search}`)
           const { inventory, users,products,blogs } = data
           this.inventory = inventory
           this.users = users
           this.products = products
           this.blogs = blogs
                this.$store.commit("setLoader")
        }catch(err){
         this.snackbar = true
        //   console.log(err)
        this.errs = err.response.data
                this.$store.commit("setLoader")
        }
    }
  }

}
</script>

<style>

</style>