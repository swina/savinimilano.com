<template>
    <div>
        <transition name="fade" :data="message">
            <div style="transform: translateX(-50%);left:50%;" class="nuxpresso-admin border-l-4 border-blue-500 fixed bottom-0 m-auto shadow-xl mb-2 bg-gray-200 text-left p-4 w-1/2 z-50" v-if="ismessage">
            {{ ismessage }}
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'NuxpAdminMessage',
    data:()=>({
        ismessage: ''
    }),
    computed:{
        message(){
            this.ismessage = this.$attrs.message
        }
    },
    watch:{
        ismessage(v){
            if ( v ){
                window.setTimeout(()=>{ this.ismessage = '' }, 4000)
            }
        }
    }
}
</script>