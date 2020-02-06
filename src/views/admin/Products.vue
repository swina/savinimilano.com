<template>
    <div class="flex flex-col">
        <div class="w-full flex flex-row cursor-pointer" v-if="$store.getters.sectors.keys">
            <template v-for="(sector,index) in $store.getters.sectors.keys">
                <div :key="'sector_' + index" class="mr-2 uppercase bg-gray-400 rounded p-2" @click="filter(sector)">
                    {{sector}}
                </div>
            </template>
            <input type="text" v-model="search" placeholder="cerca prodotto"/>
           
        </div>
        <div class="w-full flex flex-row">
            <div class="w-3/4 p-2">
            <template v-for="(product,i) in data">
                <div v-if="product.Prodotto" :key="'product_' + i" class="flex flex-col">
                    <div class="flex flex-row p-2 text-sm relative">
                        <div class="w-2/3 flex flex-row p-2 border-b">
                            {{product.Prodotto}}
                        </div>
                        <button @click="setProduct(product)" class="absolute right-0">Modifica</button>
                    </div>
                    <div :class="edit(product.Id) + ' w-full p-8'" v-if="product">
                        <template v-for="(field , index) in fields">
                            <div :key="'edit_' + index" class="flex flex-col p-2 rounded bg-gray-300 text-left">
                                <label>{{field.label}}</label>
                                <input v-if="field.type != 'textarea' && field.type != 'file'" :type="field.type" v-model="product[field.name]"/>
                                <input v-if="field.type === 'file'" :type="field.type" @change="onFileChange"/>
                                <textarea v-if="field.type === 'textarea' && field.type != 'file'" v-model="product[field.name]"></textarea>
                                
                            </div>
                        </template>
                        <button @click="save(i)">Salva</button>
                    </div>
                </div>    
            </template>
            </div>
            <div  v-if="product" class="fixed top-0 right-0 w-1/4 p-2 mt-10 pt-10 h-screen bg-gray-200">
                <h2>Immagine</h2>
                <img :src="image" class="m-auto"/>
                <button v-if="image" @click="removeImage=true,image=''">Rimuovi</button>
            </div>
        </div>
        <div v-if="loading" class="z-10 fixed top-0 right-0 bg-red-600 text-white p-2">Loading...</div>
    </div>
</template>

<script>
export default {
    name: 'AdminProducts',
    data:()=>({
        data: [],
        loading: false,
        search:'',
        id: null,
        product: null,
        removeImage: false,
        image: '',
        fields:[
            {
                name: 'Prodotto',
                label: 'Prodotto',
                type: 'text'
            },
            {
                name: 'description',
                label: 'Descrizione',
                type: 'textarea'
            },
            {
                name: 'image',
                label: 'Immagine',
                type: 'file'
            },
            { 
                name: 'attivo',
                label: 'Attivo',
                type: 'checkbox'
            }
        ]
    }),
    watch:{
        search(v){
            this.initProducts()
            if ( v.length > 3 ){
                this.filterSearch ( v.toLowerCase() )
            }
        }
    },

    methods:{
        filter(sector){
            this.data = this.$store.getters.products.filter ( prod => {
                return prod.Settore === sector && prod.attivo === 1 && prod.Settore.length > 0
            })
            this.data.sort ( (a,b) => a.Prodotto < b.Prodotto ? -1 : 1 )
            this.search = ''
        },
        filterSearch(str){
                this.loading = true
                this.initProducts()
                let array = []
                this.data.map ( prod => {
                    if ( prod.Prodotto ){
                        if ( prod.Prodotto.toLowerCase() .indexOf ( str ) > -1 ){
                            console.log ( prod.Prodotto.toLowerCase() )
                            array.push ( prod )
                        }
                    }
                })
                this.data = array
                this.loading = false
           
          
        },
        initProducts(){
            this.data = this.$store.getters.products
            this.loading = false
        },
        setProduct(product){
            this.id = product.Id
            this.product = product
            this.image = product.image 
        },
        edit(id){
            return id === this.id ? '' : 'hidden'
        },
        onFileChange(event){
            this.loading = true
            var files = event.target.files || event.dataTransfer.files;
            if (!files.length)
                return;
            this.createImage(files[0]);
        },
        createImage(file) {
            var image = new Image();
            var reader = new FileReader();
            var vm = this;

            reader.onload = (e) => {
                vm.image = e.target.result;
            };
            reader.readAsDataURL(file);
            this.loading = false
        },
        save(i){
            this.loading = true
            let vm = this
            let product = this.product
            if ( this. image ){
                product.image = this.image
            }
            if ( this.removeImage ){
                product.image = ''
            }
            product.attivo = 1
            if ( !this.product.attivo ){
                product.attivo = 0 
            }
            let id = this.product.Id
            this.$api.service('prodotti').patch ( id , product ).then ( result => {
                this.removeImage = false
                console.log ( result )
                this.data[i] = result
                this.product = result
                this.loading = false
                this.id = id
            }).catch ( error => {
                this.loading = false
            })
        }

    },
    mounted(){
        this.loading = true
        this.$products()
        this.initProducts()
    }
}
</script>