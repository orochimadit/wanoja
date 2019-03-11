<template>
  <v-navigation-drawer v-model="drawer" absolute fixed clipped>
    <!-- header toolbar pada sidebar supaya lebih cantik -->
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="drawer=false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Vueshop</v-toolbar-title>
      </v-toolbar>

      <v-list>
        <v-list-tile>  
        <!-- tombol register -->
          <v-btn
            depressed
            block
            round
            color="secondary"
            class="white--text"
          >
            Register
            <v-icon right dark>person_add</v-icon>
          </v-btn>
        </v-list-tile>
        <v-list-tile> 
        <!-- tombol login -->
          <v-btn
            block
            round
            depressed
            color="accent lighten-1"
            class="white--text"
          >
            Login
            <v-icon right dark>lock_open</v-icon>
          </v-btn>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <!-- menu navigasi pada properti data items -->
        <v-list-tile
          v-for="(item,index) in items"
          :key="index"
          :href="item.route" 
          :to="{name: item.route}"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'c-side-bar',
    data: () => ({
      // variabel untuk mengontrol visibilitas dari sidebar
      
      // variabel berisi daftar menu navigasi aplikasi
      items: [
          { title: 'Home', icon: 'dashboard', route: 'home' },
          { title: 'About', icon: 'question_answer', route: 'about' },
      ]
    }),
    computed: {
      // mapping state sideBar menggunakan map getter
      ...mapGetters({
        sideBar       : 'sideBar',
      }),
      // ubah properti data drawer menjadi computed dimana nilainya membaca dari state sideBar
      drawer: {
        get () {
          return this.sideBar
        },
        set (value) {
          console.log("value on drawer", value)
          this.setSideBar(value)
        }
      },
    },
    methods: {
      // mapping action setSideBar pada store menggunakan map action
      ...mapActions({
        setSideBar  : 'setSideBar',
      }),

    },
}
</script>