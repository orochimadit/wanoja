<template>
  <v-app>
    <!-- component header -->
    <c-header />

    <!-- component sidebar -->
    <c-side-bar />

    <!-- konten utama -->
    <v-content>
      <v-slide-y-transition mode="out-in">
        <router-view></router-view>
      </v-slide-y-transition>
    </v-content>

    <!-- component footer -->
    <c-footer />
 <c-alert />
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <search />
    </v-dialog>
  </v-app>
</template>

<script>
  import CHeader from '@/components/CHeader.vue'
  import CFooter from '@/components/CFooter.vue'
  import CSideBar from '@/components/CSideBar.vue'
export default {
  name: 'App',
  components:{
    CHeader,
    CFooter,
    CSideBar,
      CAlert: () => import(/* webpackChunkName: "c-alert" */ '@/components/CAlert.vue'),
         Search: () => import(/* webpackChunkName: "search" */ '@/views/Search.vue')
  },
  mounted(){
    console.log(process.env)
}
}
</script>