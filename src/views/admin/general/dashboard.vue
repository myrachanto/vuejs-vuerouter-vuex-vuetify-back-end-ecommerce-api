<template>
<div>
 <v-container fluid>
        <v-row align="center"
              justify="center"
              >
                <v-col v-if="stocks"
                class="auto"
                cols="12"
                sm="8"
                md="6">
                 <Dcard :title="stocks.name" :total="formatcurrency(stocks.total)" :desc="stocks.description" :icon="`mdi-cash-plus`" :rout="`/invetory/update`"/>
                </v-col>
                <v-col v-if="inventory"
                class="auto"
                cols="12"
                sm="8"
                md="6">
                 <Dcard :title="inventory.name" :total="formatcurrency(inventory.total)" :desc="inventory.description" :icon="`mdi-cash-plus`" :rout="`/invetory/update`"/>
                </v-col>
                 <v-col  v-if="products"
                class="auto"
                cols="12"
                sm="8"
                md="4">
                 <Dcard :title="products.name" :total="String(parseInt(products.total))" :desc="products.description" :icon="`mdi-cash-minus`" :rout="`/products`" />
                </v-col>
                 <v-col  v-if="blogs"
                class="auto"
                cols="12"
                sm="8"
                md="4">
                 <Dcard :title="blogs.name" :total="String(parseInt(blogs.total))" :desc="blogs.description" :icon="`fas fa-blog`" :rout="`/blogs`"   />
                </v-col> <v-col  v-if="users"
                class="auto"
                cols="12"
                sm="8"
                md="4">
                 <Dcard :title="users.name" :total="String(parseInt(users.total))" :desc="users.description" :icon="`fas fa-users`"  :rout="`/users`"  />
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
      stocks:{},
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
           const { inventory, users,products,blogs, stocks } = data
           this.inventory = inventory
           this.users = users
           this.products = products
           this.blogs = blogs
           this.stocks = stocks
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