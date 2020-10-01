<template>
   <div class="w-full text-right m-auto" v-if="$store.getters.scroller && isScrolling">
	   <div class="w-64 h-32 text-center border pb-4">
		   <img style="max-width:100%;max-height:120px;width:auto" class="mt-1 scroll m-auto" height="120" v-if="$store.getters.scroller && $store.getters.scroller[index].image" :src="$store.getters.scroller[index].image"/>
	   </div>
   </div>
</template>

<script>
export default {
	name: 'ScrollerHome',
	data:()=>({
		images: null,
		index: 0,
		timer: null,
		slides: 0
	}),
	watch: {
		index(i){
			this.blur = 'opacity-100'
		}
	},
	computed:{
		isScrolling(){
			this.slides = this.$store.getters.scroller.length
			if ( this.slides ) this.scroll(this.slides)
			return true
		}
	},
	methods:{
		scroll(items){
			let self = this
			if ( !this.timer && items ){
				this.timer = setInterval ( () => {
					this.blur = 'opacity-0'
					self.index < items-1 ? self.index++ : self.index = 0
				},2000)
			} else {
				clearInterval(this.timer)
				this.timer= null
			}
		}
	},
}
</script>
<style scoped>
.scroll {
	transition: opacity 1s ease-in-out; 
}
</style>