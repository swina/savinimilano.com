<template>
  <div id="app" class="w-full flex flex-col">
      <div v-if="$route.fullPath.indexOf('admin') === -1">

        <div class="w-full m-auto relative">
          <div class="absolute w-full top-0 left-0 flex flex-row" style="min-height:46px;height:46px;z-index:-1">
            <div class="w-2/3 bg-transparent"></div>
            <div class="w-1/3 bg-grigio border-b-4" style="border-color:#cbcbcb"></div>
          </div>
          <div class="z-10 container m-auto flex flex-row items-start ">
            <router-link to="/"><img src="img/logo-savini.png"/></router-link>
            <div class="w-4/5 text-sm flex flex-row flex-wrap items-center bg-grigio border-b-4" style="border-color:#cbcbcb; height:46px; top:0;">
              
              <router-link :class="'mr-20 ' + active('/azienda/chi-siamo')" to="/azienda/chi-siamo">Azienda</router-link>
              <router-link :class="'mr-20 ' + active('/azienda/contatti')" to="/azienda/contatti">Contatti</router-link>
              <router-link :class="'mr-20 ' + active('/azienda/privacy-policy')" to="/azienda/privacy-policy">Privacy Policy</router-link>
            </div>
          </div>
          
        </div>

        <div v-if="$route.path==='/'">
          <div class="text-left" style="background:#c6d8e4">
            <img class="container m-auto" src="img/slide1.png"/>
          </div>
        </div>
      
        <div class="mt-10 container m-auto" v-if="$route.fullPath != '/azienda/privacy-policy'">
            <v-header/>
        </div>
      

        <div class="container m-auto">
          <router-view/>
        </div>
      </div>
      
      <div v-if="$route.fullPath.indexOf('admin') === -1">
  
        <div class="container m-auto mt-10">
          <v-footer/>
        </div>
        <div class="mt-10 text-center text-xs p-2">
          CLAUDIO SAVINI & FIGLI S.R.L. - Via Vincenzo Monti 44, 20123 Milano - P.IVA 00750280158 - Cap. sociale Euro 46.800,00 i.v. - Registro delle imprese di Milano n. REA 407734
        </div>

      </div>
      <div v-if="$route.fullPath.indexOf('admin') > -1">
        <router-view/>
      </div>
  </div>
</template>

<script>
import VHeader from './views/Header.vue'
import VFooter from './views/Footer.vue'

export default {
  name : 'App',
  components : {
    VHeader,
    VFooter
  },
  data:()=>({
    products: null
  }),
  beforeMount(){
    //this.products = this.$store.getters.products
    /*
    this.$api.service ( 'prodotti' ).find({query: { $sort : { Settore: 1 , Ordine_Campo: 1 , Divisione:1 }}}).then ( response => {
      this.products = response.data
      this.$store.dispatch ( 'SetProducts' , this.products )
      let sectors = this.$arrayGroup ( this.products , 'Settore' , 'attivo' )
      this.$store.dispatch ( 'SetSectors' , sectors )
      let applications = this.$arrayGroup ( this.products , 'Campo_Applicativo' , 'attivo' )
      let categories = this.$arrayGroup(this.products,'Categorie','attivo')
      this.$store.dispatch ( 'SetApplications' , applications )
      this.$store.dispatch ( 'SetCategories' , categories )
    })
    this.$api.service('pagine').find().then ( response => {
      this.$store.dispatch('SetPagine',response.data)
    })
    */
  },
  methods:{
    active(path){
      return this.$route.fullPath === path ? 'font-bold text-red-700' : ''
    }
  },
  mounted(){
    //this.products = this.$store.getters.products
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
