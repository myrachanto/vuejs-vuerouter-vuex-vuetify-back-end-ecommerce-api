import router from '../../router'

const state = {
    token: localStorage.getItem('access_token') || null,
    username: localStorage.getItem('username') || null,
    picture: localStorage.getItem('picture') || null,
    admin: localStorage.getItem('admin') || null,
    usercode: localStorage.getItem('usercode') || null,
    business: localStorage.getItem('business') || null,
    errs: {},
}
const getters ={
    loggedIn(state){
        return state.token != undefined
    },
    Token(state){
        return state.token
    },
    Isadmin(state){
        return state.admin === true
    },
    picture(state){
        return state.picture
    },
    username: (state)=> state.username,

    usercode: (state)=> state.usercode,
    business: (state)=> state.business,
} 
const actions ={ 
        
}
const mutations = {
    
    usernewdata: (state, data) => {
        state.info.unshift(data),
        router.push('/login');
    },
    userlogin: (state, data) => { 
        (state.token = data.Token),
        (state.username = data.uname),
        (state.picture = data.picture),
        (state.admin = data.admin),
        (state.usercode = data.usercode),
        (state.business = data.business)
        // router.push('/dashboard');
    }, 
    logout: (state)=> { 
        (state.token = null),
        (state.username = null),
        (state.picture = null),
        (state.admin = null),
        (state.usercode = null),
        (state.business = null),
        router.replace('/');
    },
    setError: (state, errs)=> {
        (state.errs = errs),
        (state.snackbar = true)
    },
}

export default{
    state,
    getters,
    actions,
    mutations
}