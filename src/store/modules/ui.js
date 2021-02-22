const state = {
  loading: false,
  snackshow: false,
  timeout: 5000,
  color: ''
}
const getters = {
getloader: (state)=> state.loading,
}

const mutations = {
setLoaderTrue(state){
  state.loading = true
},
setLoader(state){
 state.loading = false
}
}
export default{
state,
getters,
mutations
}