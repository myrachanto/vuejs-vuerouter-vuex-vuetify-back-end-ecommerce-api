<template>
  <v-app id="inspire" app>
    <v-navigation-drawer
      v-model="drawer"
      app
    ><v-list>
      <v-list-item to="/user/messages">
        <v-list-item-avatar>
          <v-img :src="`${host}${picture}`"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{username}}</v-list-item-title>
        </v-list-item-content>
            <v-btn icon @click="logout">
              <v-icon >mdi mdi-logout</v-icon>
            </v-btn>
      </v-list-item> 

      <v-divider></v-divider>
       <v-list-item to="/dashboard"> 
        <v-list-item-icon>
          <v-icon>mdi mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-title >DashBoard</v-list-item-title>
       </v-list-item>
       <v-list-item to=""> 
        <v-list-item-icon>
          <v-icon>fas fa-globe</v-icon>
        </v-list-item-icon>
        <v-list-item-title >Orders</v-list-item-title>
       </v-list-item>
       <v-list-item to="/invetory/update"> 
        <v-list-item-icon>
          <v-icon>mdi-calculator</v-icon>
        </v-list-item-icon>
        <v-list-item-title >Inventory</v-list-item-title>
       </v-list-item>
       <v-list-item to="/products"> 
        <v-list-item-icon>
          <v-icon>fab fa-product-hunt</v-icon>
        </v-list-item-icon>
        <v-list-item-title >Product</v-list-item-title>
       </v-list-item>
       <v-list-item to="/seos"> 
        <v-list-item-icon>
          <v-icon>fab fa-searchengin</v-icon>
        </v-list-item-icon>
        <v-list-item-title >SEO</v-list-item-title>
       </v-list-item>
       <v-list-item to="/blogs"> 
        <v-list-item-icon>
          <v-icon>fas fa-blog</v-icon>
        </v-list-item-icon>
        <v-list-item-title >Blog</v-list-item-title>
       </v-list-item>
       <v-list-item to="/users"> 
        <v-list-item-icon>
          <v-icon>fas fa-users</v-icon>
        </v-list-item-icon>
        <v-list-item-title >Users</v-list-item-title>
       </v-list-item>
       <v-list-item to="/"> 
        <v-list-item-icon>
          <v-icon>fas fa-cogs</v-icon>
        </v-list-item-icon>
        <v-list-item-title >Settings</v-list-item-title>
       </v-list-item>
      
        
    </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title><span v-if="business">{{business}}</span><span v-else>Chantos Accounts</span></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text v-if="n === 0"
               :to="`/user/messages`"
          >
              <v-icon left dark>
                mdi-bell
              </v-icon>
              </v-btn>
              <v-btn text v-else
               :to="`/user/messages`">
                  <v-badge
              color="green"
              :content="n"
            >
              <v-icon left dark>
                mdi-bell
              </v-icon>
            </v-badge>
              </v-btn>
               <v-btn text v-if="m === 0"
              :to="`/user/messages`"
          >
              <v-icon left dark>
                mdi-email
              </v-icon>
              </v-btn>
              <v-btn text v-else
               :to="`/user/messages`">
                  <v-badge
              color="green"
              :content="m"
            >
              <v-icon left dark>
                mdi-email
              </v-icon>
            </v-badge>
              </v-btn>
            
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>
    <foot/>
  </v-app>
</template>

<script>
import cons from '../helpers/myconstants'
import axios from '../axios'
import foot from './foot'
  export default {
    data: () => ({ drawer: null,
        nortfications:[],
        messages:[],
        m:0,
        n:0,
        host:'',
     }),
    components:{
        foot
    },
    computed:{
        username(){
            return this.$store.getters.username
        },
        business(){
            return this.$store.getters.business
        },
        picture(){
          console.log(this.$store.getters.picture)
            return this.$store.getters.picture
        }
    },
    created() {
      // this.fetchMessages()
      // this.fetchNort()
      this.host = cons.host
      // this.newInvoice()
    
  },
    methods:{
         async logout(){
        try {
              this.$store.commit("setLoaderTrue")
                await axios.get(`/api/logout/${this.$store.getters.Token}`)
                    localStorage.removeItem('access_token')
                    localStorage.removeItem('username')
                    localStorage.removeItem('admin')
                    localStorage.removeItem('picture')
                    localStorage.removeItem('business')
                    this.$store.commit('logout')     
                    this.$router.replace('/login'); 
                this.$store.commit("setLoader")
            }catch(err){
                this.snackbar = true
                console.log(err.response.data) 
                this.errs = err.response.data
                this.$store.commit("setLoader")
            }
      },
    // async fetchMessages(){
    //     try{
    //           this.$store.commit("setLoaderTrue")
    //         const {data} = await axios.get("api/messages/unread")
    //         const {num, messages} = data
    //         this.m = num
    //         this.messages = messages
    //       }catch(err){
    //       this.snackbar = true
    //       //   console.log(err)
    //       this.errs = err.response.data 
    //       }
    //   },
    //    async fetchNort(){
    //     try{
    //           this.$store.commit("setLoaderTrue")
    //         const {data} = await axios.get("api/nortifications/unread")
    //         const {num, nortfications} = data
    //         this.n = num
    //         this.nortfications = nortfications
    //       }catch(err){
    //       this.snackbar = true
    //       //   console.log(err)
    //       this.errs = err.response.data
    //       }
    //   },
    }

  }
</script>