<template>
  <!-- toolbar vuetify dengan warna primary -->
  <v-toolbar
    dark
    color="primary"
  >
    <!-- header bagian kiri -->
    <v-toolbar-side-icon
      v-if="isHome"
      @click="setSideBar(!sideBar)"
    />
    <v-btn
      v-if="!isHome"
      icon
      @click="$router.go(-1)"
    >
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <!-- header bagian tengah -->
    <v-toolbar-title class="white--text">
      Wanoja
    </v-toolbar-title>

    <!-- separator supaya header bagaian kanan posisinya rata kanan -->
    <v-spacer />

    <!-- header bagian kanan -->
    <v-btn
      icon
      @click="cart()"
    >
      <v-badge
        left
        overlap
        color="orange"
      >
        <span
          v-if="countCart>0"
          slot="badge"
        > {{ countCart }} </span>
        <v-icon>shopping_cart</v-icon>
      </v-badge>
    </v-btn>

    <!-- kolom pencarian di bawah header -->
    <v-text-field
      v-if="isHome" 
      slot="extension"
      hide-details 
      append-icon="mic"
      flat
      label="Search"
      prepend-inner-icon="search"
      solo-inverted
      @click="setStatusDialog(true)"
    />
  </v-toolbar>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'CHeader',
  methods: {
    ...mapActions({
      setSideBar  : 'setSideBar',
      setStatusDialog   : 'dialog/setStatus', 
      setComponent   : 'dialog/setComponent',
    }),
    search(){
        this.setStatusDialog(true) 
        this.setComponent('search') // <= ini
        this.setSideBar(false)
    },cart(){
      this.setStatusDialog(true)
      this.setComponent('cart')
      this.setSidebar(false)
    }
  },
  computed: {
    ...mapGetters({
      sideBar : 'sideBar',
      countCart : 'cart/count',
    }),
    isHome () {
        return (this.$route.path==='/')
    },
  }
}
</script>