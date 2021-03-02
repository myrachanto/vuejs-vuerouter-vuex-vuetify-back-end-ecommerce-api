<template>
  <v-dialog
          v-model="dialogcategory"
          max-width="500px"
        >
          <v-card>
            <v-card-title>
              <span class="headline">{{title}}</span>
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
                      v-model="form.name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="form.title"
                      label="Title"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      md="12"
                    >
                      <v-textarea
                        v-model="form.description"
                        label="Description"
                        required
                      ></v-textarea>
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
                @click="save" 
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
</template>

<script>
 import axios from '@/axios'
export default {
    props: ['dialogcategory','categoryclose', "majorcode"],
    data(){
      return{
        form:{
          name:'',
          title:'',
          description:''
        },
        store:'api/categorys',
        title: 'Category',
        // majorcode: props.majorcode
      }
    },
    methods:{
      close(){
          this.categoryclose()
      },
      async save(){
           try{
              this.$store.commit("setLoaderTrue")
            let fd = new FormData();
                 fd.append("name", this.form.name)
                 fd.append("title", this.form.title)
                 fd.append("description", this.form.description)
                 fd.append("majorcategory", this.majorcode)
                await axios.post(this.store, fd ,{'Content-Type': 'multipart/form-data'})
                this.close()
                this.$store.commit("setLoader")
          }catch(err){
            this.close()
            console.log(err)
                this.$store.commit("setLoader")
          }
        }
    }

}
</script>

<style>

</style>