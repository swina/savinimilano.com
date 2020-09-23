<template>
    <div class="top-0 left-0 h-screen w-full">
        <div v-if="!$store.getters.logged">
            <v-login/>
        </div>
        <div v-if="$store.getters.logged">
            <div class="w-full h-10 p-2 items-center bg-blue-700 text-white flex flex-row justify-between">
                <div class="w-3/4 flex flex-row cursor-pointer text-sm">
                    <div class="mr-2 p-1" @click="prodotti">Prodotti</div>
                    <div class="mr-2 p-1" @click="rappresentanze">Rappresentanze</div>
                    <div class="mr-2 p-1" @click="pagine">Pagine</div>
                    <div class="mr-2 p-1" @click="logo">Immagini</div>
                    <div class="mr-2 p-1" @click="scroller">Scroller</div>
                </div>
            </div>
            <div class="w-full">
                <component :is="component" :component="component" @message="setMessage"/>
            </div>
        </div>
        <transition name="fade">
            <div style="transform: translateX(-50%);left:50%;" class="border-l-4 border-blue-500 fixed bottom-0 m-auto shadow-xl mb-2 bg-gray-200 text-left p-4 w-1/2 z-50" v-if="message">
            {{ message }}
            </div>
        </transition>
    </div>
</template>

<script>
import VLogin from './Login.vue'
import VProducts from './Products.vue'
import VPages from './Pages.vue'
import VRappresentanze from './Rappresentanze.vue'
import VImages from './Images.vue'
import VScroller from './Scroller'
import VMessage from '@/components/message'

export default {
    name: 'Dashboard',
    components: {
        VLogin,
        VProducts,
        VPages,
        VRappresentanze,
        VImages,
        VScroller,
        VMessage,
    },
    data:()=>({
        component: null,
        message: ''
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
        },
        logo(){
            this.component = VImages
        },
        scroller(){
            this.component = VScroller
        },
        setMessage(msg){
            this.message = msg
        }

    },
    watch:{
        message(v){
            if ( v ){
                window.setTimeout(()=>{ this.message = '' }, 4000)
            }
        },
    }
}
</script>