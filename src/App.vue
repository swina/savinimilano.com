<template>
  <div id="app" class="w-full flex flex-col">
      <div v-if="$route.fullPath.indexOf('admin') === -1">
        <div class="md:mx-20 flex flex-row items-start" style="height:103px;">
          <div>
            <router-link to="/"><img src="http://savinimilano.com/img/logo-savini.png"/></router-link>
          </div>
          <div class="w-4/5 text-sm flex flex-row flex-wrap items-center bg-grigio border-b-4" style="border-color:#cbcbcb; height:48px; top:0;">
            
            <router-link :class="'mr-20 ' + active('/azienda/chi-siamo')" to="/azienda/chi-siamo">Azienda</router-link>
            <router-link :class="'mr-20 ' + active('/azienda/contatti')" to="/azienda/contatti">Contatti</router-link>
            <router-link :class="'mr-20 ' + active('/azienda/privacy-policy')" to="/azienda/privacy-policy">Privacy Policy</router-link>
          </div>
        </div>

        <div v-if="$route.path==='/'">
          <div class="text-center" style="background:#c6d8e4">
            <img class="m-auto" src="http://savinimilano.com/img/slide1.png"/>
          </div>
        </div>
      
        <div class="mt-10 md:mx-20" v-if="$route.fullPath != '/azienda/privacy-policy'">
            <v-header/>
        </div>
      

        <div class="md:mx-20">
          <router-view/>
        </div>
      </div>
      
      <div v-if="$route.fullPath.indexOf('admin') === -1">
  
        <div class="mt-10">
          <v-footer v-if="products"/>
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
  },
  methods:{
    active(path){
      return this.$route.fullPath === path ? 'font-bold text-red-700' : ''
    }
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
