import store from '@/store'
import User from '@/views/admin/users/index'
// import Category from '@/components/datatables/category'
// import userss from '@/components/datatables/users'
import UsersForm from '@/views/admin/users/form'
import UsersShow from '@/views/admin/users/show'
import UsersEdit from '@/views/admin/users/edit'


var token = store.getters.Token
var isadmin = store.getters.isadmin = true
export const Users = [
  {path: "/users",component: User, name: "product",
},

{path: "/users/create",component: UsersForm, beforeEnter(to, from, next) {
  if (token && isadmin){
    next()
  }else{
    next('/')
  }
}},
{path: "/users/show/:code",component: UsersShow, beforeEnter(to, from, next) {
  if (token && isadmin){
    next()
  }else{
    next('/')
  }
}},
{path: "/users/:code/edit",component: UsersEdit, beforeEnter(to, from, next) {
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
