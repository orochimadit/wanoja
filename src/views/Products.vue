<template>
  <div>
    <v-container grid-list-md>
      <v-subheader>
        Products
      </v-subheader>
      <v-layout
        row
        wrap
      >
        <v-flex
          v-for="(book, index) in products"
          :key="index"
          xs6
        >
          <v-card :to="'/product/'+ book.slug">
            <v-card-media
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
    </v-container>

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
        products: [],
        page: 0,
        lengthPage: 0
      }
    },
    created(){
      this.go()
    },
    methods: {
      go(){
        // let url = '/books'
        let url = `${process.env.VUE_APP_API_URL}products/`
        if(this.page>0) url = '/products?page='+this.page
        axios({
            Method:'GET',
            url})
          .then((response) => {
              console.log(response)
            let response_data = response.data
            let products = response_data.data
            this.lengthPage = response_data.meta.last_page
            this.products = products
          })
          .catch((error) => {
            console.log(error.response)
          })
      },
    }
  }

</script>