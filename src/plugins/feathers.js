import Vue from 'vue'
import store from '../store'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import io from 'socket.io-client'
import myapi from './api'
import router from '../router'
 //'https://savinimilano-api.herokuapp.com/', 
const socket = io( 'https://savinimilano-api.herokuapp.com/' ,{
  transports: ['websocket'],
  polling: {
    extraHeaders: {
      Authorization: 'Basic000002121212121212222'
    }
  }
})//process.env.VUE_APP_APISERVER, {transports: ['websocket']})

const api = feathers()
  .configure(socketio(socket,{
    timeout:20000
  }))
  .configure(auth({ storage: window.localStorage }))

//set current user locale
store.commit('locale', window.navigator.userLanguage || window.navigator.language)

api.service('prodotti').find().then(response=>{
  store.dispatch('SetProducts',response.data)
}).catch(error=>{
  console.log ( error )
})  

/*
api.authenticate().then(user=>{
  store.dispatch('SetUser',user)
  store.dispatch('SetLogged',true)
  api.service('settings').find().then(response=>{
    console.log ( 'settings' , response.data )
    store.dispatch('SetSettings',response.data[0])
  })
  api.service('products').find({query:{type:'gusto',$sort:{name:1}}}).then(response=>{
    store.dispatch('SetProducts',response.data)
    console.log ( 'loaded products ...')
  }).catch(error=>{
    console.log ( error )
  })  
}).catch(error=>{
  router.push('login')
  console.log ( 'not authenticated ...')
})
*/

export default {
  install: function (Vue) {
    Vue.prototype.$api = api
  }
}
