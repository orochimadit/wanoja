<template>
  <div class="about">
    <v-container>
      <v-subheader class="title">
        {{ product.title }}
      </v-subheader>
      <v-card-media
        v-if="product.cover"
        :src="getImage('/products/'+product.cover)"
        height="200px"
      />

      <v-subheader> Information </v-subheader>
      <table class="v-table">
        <tbody>
          <tr>
            <th class="text-xs-left">
              Author
            </th><td>{{ product.author }}</td>
          </tr>
          <tr>
            <th class="text-xs-left">
              Merk
            </th><td>{{ product.merk }}</td>
          </tr>
          <tr>
            <th class="text-xs-left">
              Price
            </th><td v-if="product.price">
              Rp. {{ product.price.toLocaleString('id-ID') }}
            </td>
          </tr>
          <tr>
            <th class="text-xs-left">
              Weight
            </th><td>{{ product.weight }} kg</td>
          </tr>
          <tr>
            <th class="text-xs-left">
              Stock
            </th><td>{{ product.stock }}</td>
          </tr>
          <tr>
            <th class="text-xs-left">
              Categories
            </th>
            <td>
              <template
                v-for="category in product.categories"
                v-key="category.id"
              >
                {{ category.name }}, 
              </template>
            </td>
          </tr>
        </tbody>
      </table>

      <v-subheader> Description </v-subheader>
      <p class="body-2">
        {{ product.description }}
      </p>

      <div style="position:relative">
        <v-btn
          block
          color="success"
          :disabled="product.stock==0"
          @click="buy"
        >
          <v-icon>save_alt</v-icon> &nbsp;
          BUY
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
export default {
    data () {
      return {
        product: {},
      }
    },
    methods: {
       ...mapActions({
          addCart  : 'cart/add',
          setAlert  : 'alert/set',
      }),
      buy(){
             this.addCart(this.product)
               this.setAlert({
            status : true,
            text  : 'Added to cart',
            type  : 'success',
        })
      }
    },
    created(){
        let slug = this.$route.params.slug
        let url = `${process.env.VUE_APP_BACKEND_URL}products/slug/`+slug
        console.log(url)
        axios({
            Method:'GET',
            url})
        .then((response) => {
            console.log(response)
          let product = response.data.data
          this.product = product
        })
        .catch((error) => {
          let responses = error.response
          console.log(responses)
        })
    }
}
</script>