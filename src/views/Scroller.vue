<template>
   <div class="w-full text-right m-auto">
	   <div class="w-64 h-32 text-center border pb-4" v-if="scroller">
		   <img style="max-width:100%;max-height:120px;width:auto" class="mt-1 scroll m-auto" height="120" v-if="images" :src="images[index].image"/>
	   </div>
   </div>
</template>

<script>
export default {
	name: 'Scroller',
	data:()=>({
		images: null,
		index: 0,
		timer: null
	}),
	computed: {
		scroller(){
			this.images = this.$store.getters.scroller
			this.scroll()
			return true
		}
	},
	watch: {
		index(i){
			this.blur = 'opacity-100'
		}
	},
	methods:{
		scroll(){
			let self = this
			
			if ( !this.timer){
				this.timer = setInterval ( () => {
					this.blur = 'opacity-0'
					self.index < self.images.length ? self.index++ : self.index = 0
				},2000)
			} else {
				clearInterval(this.timer)
				this.timer= null
			}
		}
	},
	beforeMount(){
		this.images = this.$store.getters.images
		/*
		this.$api.service('pagine').find({query:{title:'scroller'}}).then ( resp=> {
			let images = JSON.parse(resp.data[0].json).images
			this.images = images.map ( img => {
				return img.replace('http://savinimilano.com/','/')
			})
			this.scroll()
		})
		*/

	}
}
</script>
<style scoped>
.scroll {
	transition: opacity 1s ease-in-out; 
}
</style>