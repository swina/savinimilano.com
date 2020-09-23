<template>
    <div class="w-full flex flex-col">
        <div class="w-full bg-black text-white text-xl">Scroller</div>
        <div class="w-64 h-32 text-center border pb-4 m-auto" v-if="scroller">
		   <img style="max-width:100%;max-height:120px;width:auto" class="mt-1 scroll m-auto" height="120" v-if="images && index < images.length" :src="images[index].image"/>
	    </div>
        <div class="w-full flex flex-row flex-wrap p-2 m-auto justify-center">
            <div v-for="(img,i) in images" class="relative w-20 h-20 rounded border p-1 mr-2 items-center mb-2">
                <img :src="img.image" class="w-30 h-auto max-h-100 m-auto" style="max-height:100%"/>
                <div class="text-xs absolute hover:bg-red-500 hover:text-white top-0 right-0 cursor-pointer bg-gray-300 mr-1 rounded-full h-4 w-4" @click="imageIsScroller(img.id,0),images.splice(i,1),ids.splice(i,1),index=i-1">X</div>
            </div>
        </div>
        <div class="bg-gray-200"><h4>Aggiungi Immagini</h4></div>
        <div class="flex flex-row flex-wrap p-2 h-64 overflow-y-auto">
            
            <div v-for="(img,i) in uriImages" class="relative w-32 h-32 rounded border p-1 mr-2 flex flex-col items-center mb-2">
                <img :src="img.image" class="w-30 h-auto max-h-100 m-auto" style="max-height:100%"/>
                <div class="text-xs absolute hover:bg-red-500 hover:text-white top-0 right-0 cursor-pointer bg-gray-300 mr-1 rounded-full h-4 w-4" @click="imageIsScroller(img.id,1),images.push({id: img.id , image: img.image})">+</div>
            </div>
            
        </div>
        <div class="w-full border p-2 my-2 mr-2 bg-gray-400 flex flex-col items-center">
                Carica immagine: <input type="file" class="imageUpload w-30" @change="uploadImage"/>
            </div>
        <!--
        <template v-for="(img, index) in images">
            <div :key="'image_' + index" class="w-full flex flex-row items-center border-b p-2">
                <div class="w-1/3">
                    <img :src="img" width="120"/>
                </div>
                <div>
                    <button class="text-xs px-2 py-1" @click="deleteImg(index)">Rimuovi</button>
                </div>
            </div>
        </template>
        -->
        <div class="modal bg-white z-50 border rounded p-8 shadow" v-if="modal">
            <h3>Conferma rimozione immagine</h3>
            <button @click="modal=!modal">Annulla</button> <button class="bg-green-300 ml-4" @click="remove()">Conferma</button> 
        </div>
        <div class="z-40 bg-black opacity-50 fixed top-0 left-0 h-screen w-screen text-center" v-if="loading">
            <div class="z-10 absolute bottom-0 right-0 bg-red-600 text-white p-2">Caricamento immagini ... attendere!</div>
        </div>
        

    </div>
</template>

<script>
import scroller from '@/views/Scroller'
export default {
    name: 'Scroller',
    components: { scroller },
    data:()=>({
        modal: false,
        ids:[],
        images: [],
        index: 0,
        page: null,
        id: null,
        loading: false,
        imageSrc: null,
        dataURI: null,
        uriImages: null,
        current: null
    }),
    computed:{
        scroller(){
            this.images = this.$store.getters['scroller']
            return true
        }
    },
    methods:{
        uploadImage: function() {
            let vm = this    
            var file = document
                .querySelector('input[type=file]')
                .files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                vm.imageSrc = e.target.result             
                vm.dataURI = e.target.result
                vm.save()
            };
            reader.onerror = function(error) {
                alert(error);
            };
            reader.readAsDataURL(file);
        },
        save(){
            let vm = this
            this.loading = true
            this.$api.service('images').create ( {
                image: vm.dataURI
            }).then ( response => {
                vm.loading = false
                vm.$emit ( 'message' , 'Immagine caricata')
                vm.dataURI = null
                vm.imageSrc = null
                vm.uriImages.push ( response )
            }).catch ( error => {
                vm.$emit ( 'message' , 'Errore nel caricamento')
            })
        },
        remove(){
            this.modal = false
            
            this.$api.service('images').remove ( this.uriImages[this.current].id ).then ( response => {
                this.$emit ( 'message' , 'L\'immagine è stata rimossa' )
                this.uriImages.splice ( this.current , 1)
            }).catch ( error => {
                this.$emit ( 'message' , 'Errore! Immagine non rimossa')
                console.log ( error )
            })
        },
        scroll(){
			let self = this
			if ( this.images ){
                if ( !this.timer){
                    this.timer = setInterval ( () => {
                        this.blur = 'opacity-0'
                        self.index < self.images.length-1 ? self.index++ : self.index = 0
                    },2000)
                } else {
                    clearInterval(this.timer)
                    this.timer= null
                }
            }
        },
        imageIsScroller(id,flag){
            this.$api.service ( 'images' ).patch ( id , { scroller: flag } )
        }
      
    },
    mounted(){
        this.loading = true
        this.uriImages = this.$store.getters['images']
        
        //this.$api.service('images').find().then( result => {
            //this.uriImages = result.data
            this.images = this.$store.getters['scroller']
            this.loading = false
			this.scroll()
        //})
        this.$api.service('images').on('removed' , ( data )=> {
            this.$store.dispatch ( 'SetImages' , this.uriImages )
        })
        this.$api.service('images').on('patched',(data)=>{
            console.log ( 'image updated' )
            this.$store.dispatch ( 'SetImages' , this.uriImages )
        })
    }
}
</script>

<style scoped>
.modal {
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    position:fixed;
}
</style>