<template>
  <div>
    <v-subheader>Shipping Address</v-subheader>
    <div>
      <v-card flat>
        <v-container>
          <v-form
            ref="form"
            lazy-validation
          >
            <v-text-field
              v-model="name"
              label="Name"
              required
              append-icon="person"
            />

            <v-textarea
              v-model="address"
              label="Address"
              required
              auto-grow    
              rows="3"
            />

            <v-text-field
              v-model="phone"
              label="Phone"
              required
              append-icon="phone"
            />

            <v-select
              v-model="province_id"
              :items="provinces"
              item-text="province"
              item-value="id"
              label="Province"
              persistent-hint
              single-line
            /> 

            <v-select
              v-if="province_id>0"
              v-model="city_id"
              :items="citiesByProvince"
              item-text="city_name"
              item-value="id"
              label="City"
              persistent-hint
              single-line
            />
          </v-form>
          <v-card-actions>
            <v-btn
              color="success"
              dark
              @click="saveShipping"
            >
              <v-icon>save</v-icon> &nbsp;
              Save
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </div>
    <v-subheader>Your Shopping Cart</v-subheader>
    <div v-if="countCart>0">
      <v-card flat>
        <v-list two-line>
          <template v-for="item in carts">
            <v-list-tile
              :key="item.id"
              avatar
            >
              <v-list-tile-avatar>
                <img :src="getImage('/books/'+item.cover)">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title" />
                <v-list-tile-sub-title>
                  Rp. {{ item.price.toLocaleString('id-ID') }}
                  ({{ item.quantity }} item)
                </v-list-tile-sub-title>
                <v-list-tile-sub-title>
                  <v-divider />
                </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-list-tile-action-text>{{ item.weight }} kg</v-list-tile-action-text>
              </v-list-tile-action>  
            </v-list-tile>  
          </template>
        </v-list>
        <v-container>
          <v-card-actions>
            Subtotal
            <v-spacer />
            Rp. {{ totalPrice.toLocaleString('id-ID') }}
          </v-card-actions>
        </v-container>
      </v-card>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data () {
      return {
        name: '',
        address: '',
        phone: '',
        province_id: 0,
        city_id: 0,
      }
    },
    computed: {
      ...mapGetters({
        user        : 'auth/user',
        provinces   : 'region/provinces',
        cities      : 'region/cities',
        carts       : 'cart/carts',
        countCart     : 'cart/count',
        totalPrice    : 'cart/totalPrice',
        totalQuantity : 'cart/totalQuantity',
        totalWeight   : 'cart/totalWeight',
      }),
      citiesByProvince(){
        let province_id = this.province_id
        return this.cities.filter(function(city){           
            if (city.province_id==province_id) return city
        })
        },
    },
    methods: {
      ...mapActions({
          setAlert      : 'alert/set',
          setAuth      : 'auth/set',
          setProvinces  : 'region/setProvinces',
          setCities     : 'region/setCities',
      }),
      saveShipping(){
        let formData = new FormData()
        formData.set('name', this.name)
        formData.set('address', this.address)
        formData.set('phone', this.phone)
        formData.set('province_id', this.province_id)
        formData.set('city_id', this.city_id)

        let config = {
          headers: {
            'Authorization': 'Bearer ' + this.user.api_token,
          },
        }

        this.axios.post('/shipping', formData, config)
          .then((response) => {
              this.setAuth(response.data.data) 
              this.setAlert({
                  status : true,
                  text  : response.data.message,
                  type  : 'success',
              })
          })
          .catch((error) => {
              let responses = error.response
              this.setAlert({
                  status : true,
                  text  : responses.data.message,
                  type  : 'error',
              })
          })
      },
    },
    created(){
      this.name = this.user.name
      this.address = this.user.address
      this.phone = this.user.phone
      this.city_id = this.user.city_id
      this.province_id = this.user.province_id

      if(this.provinces && this.provinces.length==0){
        this.axios.get('/provinces')
        .then((response) => {
            this.setProvinces(response.data.data)
        })

        this.axios.get('/cities')
        .then((response) => {
            this.setCities(response.data.data)
        })
      }
    }
  }
</script>