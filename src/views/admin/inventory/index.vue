<template>
<v-container>
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
 <v-row>
<v-col>
  <v-data-table
    :headers="headers"
    :items="items"
    class="elevation-1"
  >
   <template v-slot:[`item.oldprice`]="{ item }">
              
                {{ formatcurrency(item.oldprice) }}
            </template>
             <template v-slot:[`item.newprice`]="{ item }">
              
                {{ formatcurrency(item.newprice) }}
            </template> 
            <template v-slot:[`item.buyprice`]="{ item }">
              
                {{ formatcurrency(item.buyprice) }}
            </template>
    <template v-slot:top>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          
          <v-card>
            <v-card-title>
              <span class="headline">{{ editedItem.name }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.quantity"
                      label="Quantity"
                    ></v-text-field>
                  </v-col>
                   <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.oldprice"
                      label="OLd Price"
                    ></v-text-field>
                  </v-col>
                   <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.newprice"
                      label="New Price"
                    ></v-text-field>
                  </v-col>
                   <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.buyprice"
                      label="Buying price"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save(editedItem.code)"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="GetData"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</v-col>
 </v-row>
</v-container>
</template>
<script>
import formatMoney from '@/helpers/currencyformat'
 import axios from '@/axios'
  export default {
    data: () => ({
      dialog: false,
      title:'Inventory',
      source: '/api/products',
      update:'/api/inventory',
      search: '',
      headers:[
        { text: 'Name', value: 'name' }, 
        { text: 'Quantity', value: 'quantity' },
        { text: 'Old Price', value: 'oldprice' },
        { text: 'New price', value: 'newprice' },
        { text: 'Buying Price', value: 'buyprice' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      items: [],
      editedIndex: -1,
      editedItem: {
        quantity: 0,
        code:'',
        oldprice: 0,
        newprice: 0,
        buyprice:0
      },
      defaultItem: {
        quantity: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.GetData()
    },

    methods: {
      formatcurrency(d) {
          return formatMoney(d)
        },

        resetFilter(){
            this.search = ''
            this.GetData()
        },
      async save(code){
          try{
                this.$store.commit("setLoaderTrue")
                  let fd = new FormData();
                  fd.append("quantity", this.editedItem.quantity)
                  fd.append("oldprice", this.editedItem.oldprice)
                  fd.append("newprice", this.editedItem.newprice)
                  fd.append("buyprice", this.editedItem.buyprice)
              // axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
              await axios.put(`${this.update}/${code}`, 
                fd ,{'Content-Type': 'multipart/form-data'})
                  this.close()
                  this.GetData()
                  this.$store.commit("setLoader")

        }catch(err){
            this.snackbar = true
            this.errs = err
                  this.close()
                  this.GetData()
                this.$store.commit("setLoader")

        }

  },
       async GetData(){
        try{
          this.$store.commit("setLoaderTrue")
          let p = this
            // console.log(token)
           const {data} = await axios.get(`${this.source}?search=${p.search}`)
            this.items = data  

            // console.log(data)
          this.$store.commit("setLoader")
        }catch(err){
           console.log(err)
          this.$store.commit("setLoader")
        }
    },  

      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },


      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
    },
  }
</script>