<template>
    <div class="w-full flex flex-row flex-wrap justify-around">
            <template v-for="(menu,index) in $store.getters.menu_footer">
                <div :key="'footer_' + index" class="text-left border-double border-t-4 text-xs px-4 py-2">
                    <div class="border-b pb-2 uppercase mb-2">{{menu.title}}</div>
                    <template v-for="(item,i) in menu.items">
                        <div :key="'item_' + index + '_' + i" class="pb-1 cursor-pointer">
                            <router-link :to="item.path">{{item.title}}</router-link>
                        </div>
                    </template>
                </div>
            </template>
            <template v-for="(sector,index) in menu">
                <div :key="'sector_' + index" class="text-left border-double border-t-4 text-xs px-4 py-2">
                    <div class="border-b pb-2 uppercase mb-2">
                        {{sector.title}}
                    </div>
                    <template v-for="(item,i) in sector.items">
                        <div :key="'sector_item_' + index + '_' + i" class="cursor-pointer">
                            <router-link :to="'/prodotti/' + $slug(sector.title)">{{item}}</router-link>
                        </div>
                    </template>
                </div>
            </template>
    </div>
</template>

<script>
export default {
    name: 'Footer',
    data:()=>({
        menu: []
    }),
    mounted(){
        this.$store.getters.sectors.keys.forEach ( sector => {
            
            let prods = this.$store.getters.products.filter(product=>{
                return product.Settore === sector
            })
            if ( sector != 'Farmaceutico' ){
                this.menu.push ( 
                    {
                        title: sector ,
                        items: this.$arrayGroup(prods,'Campo_Applicativo','attivo').keys
                    }
                )
            } else {
                 this.menu.push ( 
                    {
                        title: sector ,
                        items: this.$arrayGroup(prods,'Categorie','attivo').keys
                    }
                )
            }
        })
    }
}
</script>