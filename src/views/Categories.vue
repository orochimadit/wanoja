<template>
  <div>
    <v-container grid-list-md>
      <v-subheader>
        All Category 
      </v-subheader>
      <v-layout
        row
        wrap
      >
        <!-- lakukan perulangan pada properti categories -->
        <v-flex
          v-for="category in categories"
          :key="category.id"
          xs6
        >
          <v-card :to="'/category/'+ category.slug">
            <v-img
              v-if="category.image"
              :src="getImage(category.image)"
              height="150px"
            >
              <v-container
                fill-height
                fluid
                pa-2
              >
                <v-layout fill-height>
                  <v-flex
                    xs12
                    align-end
                    flexbox
                  >
                    <span
                      class="title white--text text-block"
                      v-text="category.name"
                    />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>

            <v-card-actions>
              <v-spacer />
              <v-btn icon>
                <v-icon>favorite</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>bookmark</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>share</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <template>
      <div class="text-xs-center">
        <!-- kode untuk link paging halaman -->
        <v-pagination
          v-model="page"
          :length="lengthPage"
          :total-visible="5"
          @input="go"
        />
      </div>
    </template>
  </div>
</template>
<style scoped>
.text-block {
    position: absolute;
    bottom: 5px;
    left: 5px;
    background-color: black;
    padding-left: 5px;
    padding-right: 5px;
    opacity: 0.7;
    width:100%;
}
</style>

<script>
import axios from 'axios'
import { constants } from 'fs';
  export default {
    data () {
      return {
        categories: [],
        page: 0,
        lengthPage: 0
      }
    },
    created(){
      this.go()
    },
    methods: {
      go(){
        // let url = '/categories'
        let url = `${process.env.VUE_APP_API_URL}categories/`
        if(this.page>0) url = '/categories?page='+this.page
        axios.get(url)
          .then((response) => {
            let response_data = response.data
            let categories = response_data.data
            this.lengthPage = response_data.meta.last_page // jumlah halaman di dapat dari meta endpoint categories
            this.categories = categories // daftar category dari endpoint categories
          })
          .catch((error) => {
            console.log(error.response)
          })
      },
    }
  }
</script>