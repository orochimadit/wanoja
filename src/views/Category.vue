<template>
  <div>
    <v-container grid-list-md>
      <v-subheader> {{ category.name }} </v-subheader>
      <v-card-media
        v-if="category.image"
        :src="getImage(category.image)"
        height="150px"
      />
      <v-subheader> Products by "{{ category.name }}" category" </v-subheader>
      <v-layout
        row
        wrap
      >
        <!-- data books yang berelasi akan ditampilkan menggunakan looping -->
        <v-flex
          v-for="book in products"
          :key="book.id"
          xs6
        >
          <v-card :to="'/product/'+ book.slug">
            <v-card-media
              v-if="book.cover" 
              :src="getImage(book.cover)"
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
                      v-text="book.title"
                    />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-media>

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

      <template>
        <div class="text-xs-center">
          <v-pagination
            v-model="page"
            :length="lengthPage"
            :total-visible="5"
            @input="go"
          />
        </div>
      </template>
    </v-container>
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
export default {
    data () {
      return {
        category: {}, // penampung satu objek category
        products: [], // penampung daftar buku pada category tersebut
        page: 0,
        lengthPage: 0
      }
    },
    created(){
        this.go()
    },
    methods: {
      go(){
        let slug = this.$route.params.slug
        // let url = '/categories/slug/'+slug
        let url = `${process.env.VUE_APP_API_URL}categories/slug/`+slug
        if(this.page>0) url = url + '?page='+this.page
        url = encodeURI(url)
        axios.get(url)
          .then((response) => {
            let response_data = response.data
            let category = response_data.data
            this.category = category
            this.products = category.products.data
            this.lengthPage = category.products.last_page
            console.log(response)
          })
          .catch((error) => {
            console.log(error.response)
          })
      }
    }
}
</script>