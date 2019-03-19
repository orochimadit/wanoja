<template>
  <v-card>
    <v-toolbar
      dark
      color="primary"
    >
      <v-btn
        icon
        dark
        @click.native="close"
      >
        <v-icon>close</v-icon>
      </v-btn>
      <v-text-field
        v-model="keyword"
        hide-details
        append-icon="mic"
        flat
        label="Search"
        ref="txtSearch"
        prepend-inner-icon="search"
        solo-inverted
        @input="doSearch"
      />
    </v-toolbar>

    <v-divider />

    <v-subheader v-if="keyword.length>0">
      Result search "{{ keyword }}"
    </v-subheader>

    <v-alert
      :value="items.length==0 && keyword.length>0"
      color="warning"
    >
      Sorry, but no results were found.
    </v-alert>

    <!-- Hasil pencarian ditampilkan di sini -->
    <v-list
      v-if="items.length>0"
      two-line
    >
      <template v-for="(item) in items">
        <v-list-tile
          :key="item.id"
          avatar
          :to="'/product/'+ item.slug"
          @click="close"
        >
          <v-list-tile-avatar>
            <img :src="getImage('/products/'+item.cover)">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'
import { constants } from 'fs';
export default {
  name: 'Search',
  data () {
    return {
      keyword: '',
      items: []
    }
  },
  methods: {
    ...mapActions({
      setStatusDialog   : 'dialog/setStatus',
    }),
    close(){
      this.setStatusDialog(false)
    },
    doSearch(){
      let keyword = this.keyword
      if(keyword.length>0){
        let url = `${process.env.VUE_APP_BACKEND_URL}products/search/`+keyword
        axios.get(url)
        .then((response) => {
          let products = response.data.data
          this.items = products
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
      }
    },
    mounted(){
        if(this.$refs.txtSearch != undefined){
            this.$nextTick(() => this.$refs.txtSearch.focus())
        }
    }
  },
}
</script>