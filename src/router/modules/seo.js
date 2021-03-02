import store from '@/store'
import blog from '@/views/admin/seos/index'
// import Category from '@/components/datatables/category'
// import seoss from '@/components/datatables/seos'
import seosForm from '@/views/admin/seos/form'
import seosShow from '@/views/admin/seos/show'
import seosEdit from '@/views/admin/seos/edit'


var token = store.getters.Token
var isadmin = store.getters.isadmin = true
export const seos = [
  {path: "/seos",component: blog, name: "product",
},

{path: "/seos/create",component: seosForm, beforeEnter(to, from, next) {
  if (token && isadmin){
    next()
  }else{
    next('/')
  }
}},
{path: "/seos/show/:code",component: seosShow, beforeEnter(to, from, next) {
  if (token && isadmin){
    next()
  }else{
    next('/')
  }
}},
{path: "/seos/:code/edit",component: seosEdit, beforeEnter(to, from, next) {
  if (token && isadmin){
    next()
  }else{
    next('/')
  }
}},
// {path: "/products/update",component: Stock, beforeEnter(to, from, next) {
//   if (token && isadmin){
//     next()
//   }else{
//     next('/')
//   }
// }},

]
