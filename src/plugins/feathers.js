import Vue from 'vue'
import store from '../store'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import io from 'socket.io-client'
import myapi from './api'
import router from '../router'
 //'https://savinimilano-api.herokuapp.com/', 
const socket = io( 'http://localhost:3030/',{
  transports: ['websocket'],
  polling: {
    extraHeaders: {
      Authorization: 'Basic000002121212121212222'
    }
  }
})//process.env.VUE_APP_APISERVER, {transports: ['websocket']})

function arrayGroup ( arr , key , summ = {} ){
  // @arr = array of objects (required)
  // @key = key to group (required)
  // @summ = key to sum
  // group array of objects on given key, sum on key , count for given key
  // return object grouped
  //    keys = grouped keys
  //    values = values for the each grouped keys
  //    sums = sum of values of field x for each grouped keys
  //    counters = counter for each grouped key
  if ( arr != 'undefined' ){
    let counter = 0
    let sums = []
    let counters = []
    let sum_field = summ
    let total = 0
    let grouped = arr.reduce((h, item) => Object.assign(h, { [item[key]]:( h[item[key]] || [] ).concat(item) }), {})
    let keys = Object.keys(grouped)
    if ( summ ){
      Object.values(grouped).map(item=>{
        total = 0
        counter = 0
        item.map(i=>{
          counter++
          total += parseFloat(i[sum_field])
        })
        sums.push(total)
        counters.push(counter)
      })
    }
    return {
      keys: Object.keys(grouped),
      values: Object.values(grouped),
      sums: sums,
      counters: counters
    }
  }
  return null
}

const api = feathers()
  .configure(socketio(socket,{
    timeout:20000
  }))
  .configure(auth({ storage: window.localStorage }))

//set current user locale
store.commit('locale', window.navigator.userLanguage || window.navigator.language)
api.service ( 'images' ).find ( ).then ( result => {
  store.dispatch('SetImages',result.data )
})
/*api.service ( 'prodotti' ).find({query: { $sort : { Settore: 1 , Ordine_Campo: 1 , Divisione:1 }}}).then ( response => {
  store.dispatch ( 'SetProducts' , response.data )
  let sectors = arrayGroup ( response.data , 'Settore' , 'attivo' )
  store.dispatch ( 'SetSectors' , sectors )
  let applications = arrayGroup ( response.data , 'Campo_Applicativo' , 'attivo' )
  let categories = arrayGroup( response.data ,'Categorie','attivo')
  store.dispatch ( 'SetApplications' , applications )
  store.dispatch ( 'SetCategories' , categories )
})
api.service('pagine').find().then ( response => {
  store.dispatch('SetPagine',response.data)
})
*/

/*
api.service('prodotti').find().then(response=>{
  store.dispatch('SetProducts',response.data)
}).catch(error=>{
  console.log ( error )
})
*/  

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
