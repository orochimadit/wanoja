<template>
  <div>
  <!-- Bagian pertama yaitu Category -->
  <v-container grid-list-md>
    <v-subheader>
      Random Category 
      <v-spacer></v-spacer>
      <!-- link ke route categories  yang nantinya akan kita definisikan routing dan componentnya -->
      <router-link to="/categories">See All</router-link>
    </v-subheader>

    <v-layout row wrap>
      <!-- variabel categories ini nanti akan kita isi dengan data dari endpoint category -->
      <v-flex v-for="category in categories"  
      :key="category.id" xs6>
        <v-card :to="'/category/'+ category.slug">
          <!-- untuk load image supaya lebih rapi akan kita buatkan method getImage -->
          <v-img
            :src="getImage('/categories/'+category.image)"
            height="150px"
          >
            <v-container fill-height fluid pa-2>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <!-- nama category-nya akan ditampilkan di sini -->
                  <span class="title white--text text-block" v-text="category.name"></span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>

          <!-- icon dummy saja, nantinya kamu bisa sesuaikan -->
          <v-card-actions>
            <v-spacer></v-spacer>
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

  <!-- Bagian kedua yaitu Book -->
  <v-container grid-list-md>
    <v-subheader>
      Top Books 
      <v-spacer></v-spacer>
      <!-- link ke route books yang nantinya akan kita definisikan routing dan componentnya -->
      <router-link to="/products">See All</router-link>
    </v-subheader>
    <v-layout row wrap>
      <!-- data buku kita tampilkan dalam dua kolom (xs6) -->
      <v-flex
        v-for="(product, index) in products" xs6 :key="index">
        <v-card :to="'/products/'+ product.slug">
          <v-img
            :src="getImage('/products/'+product.cover)"
            height="150px"
          >
            <v-container fill-height fluid pa-2>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="title white--text text-block" v-text="product.title"></span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>

          <v-card-actions>
            <v-spacer></v-spacer>
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
  </div>
</template>
<style scoped>
/* mengatur posisi judul */
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
  data: () => ({
    categories: [], // kita definisikan sebagai array kosong
    products: []
  }),
  methods: {
    getImage (image){
        if(image!=null && image.length>0){
            return "http://larashop-api.test/images"+ image
        }
        // default image jika tidak ditemukan, 
        // letakkan image ini pada folder /public/img di project Vue
        return "/img/unavailable.png"
    },
  },
  created(){

    let count = 4
    // request ke endpoint category random dengan parameter count = 4
    let url = `${process.env.VUE_APP_BACKEND_URL}categories/random/${count}`
    //    let url = 'https://jsonplaceholder.typicode.com/todos';
    console.log("ENV", process.env.VUE_APP_BACKEND_URL, url)
    axios(
      { method: 'GET',
       url,}
    )
        .then((response) => {
            console.log(response)
           let categories = response.data.data
            // ketika dapat datanya maka nilainya dimasukkan ke dalam properti data categories
            this.categories = categories
           
        })
        .catch((error) => {
            let responses = error.response
            console.log(responses)
        })

    let countP = 8
    let urlProduct = `${process.env.VUE_APP_BACKEND_URL}products/top/${countP}` 
    // request ke endpoint top Product dengan parameter count = 8
    console.log(urlProduct)
    axios(
      {
        method: 'GET',
        urlProduct
       })
        .then((response) => {
          console.log(response)
            let products = response.data.data
            this.products = products
        })
        .catch((error) => {
            let responses = error.response
            console.log(responses)
        })
  }
  
}
</script>
