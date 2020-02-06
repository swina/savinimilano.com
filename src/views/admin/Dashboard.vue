<template>
    <div class="top-0 left-0 h-screen w-full">
        <div v-if="!$store.getters.logged">
            <v-login/>
        </div>
        <div v-if="$store.getters.logged">
            <div class="w-full h-10 p-2 items-center bg-blue-700 text-white flex flex-row justify-between">
                <div class="w-3/4 flex flex-row cursor-pointer">
                    <div class="mr-2" @click="prodotti">Prodotti</div>
                    <div class="mr-2" @click="rappresentanze">Rappresentanze</div>
                    <div class="mr-2" @click="pagine">Pagine</div>
                </div>
            </div>
            <div class="w-full">
                <component :is="component" :component="component"/>
            </div>
        </div>
    </div>
</template>

<script>
import VLogin from './Login.vue'
import VProducts from './Products.vue'
import VPages from './Pages.vue'
import VRappresentanze from './Rappresentanze.vue'

export default {
    name: 'Dashboard',
    components: {
        VLogin,
        VProducts,
        VPages,
        VRappresentanze
    },
    data:()=>({
        component: null
    }),
    beforeMount(){
        this.$api.authenticate().then ( user => {
            this.$store.dispatch ( 'SetUser' , user )
            this.$store.dispatch ( 'SetLogged' , true )
        })
    },
    methods:{
        prodotti(){
            this.component = VProducts
        },
        pagine(){
            this.component = VPages
        },
        rappresentanze(){
            this.component = VRappresentanze
        }
    }
}
</script>