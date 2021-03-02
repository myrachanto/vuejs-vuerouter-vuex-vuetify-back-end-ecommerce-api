import store from '@/store'
import blog from '@/views/admin/blogs/index'
// import Category from '@/components/datatables/category'
// import blogss from '@/components/datatables/blogs'
import blogsForm from '@/views/admin/blogs/form'
import blogsShow from '@/views/admin/blogs/show'
import blogsEdit from '@/views/admin/blogs/edit'


var token = store.getters.Token
var isadmin = store.getters.isadmin = true
export const blogs = [
  {path: "/blogs",component: blog, name: "product",
},

{path: "/blogs/create",component: blogsForm, beforeEnter(to, from, next) {
  if (token && isadmin){
    next()
  }else{
    next('/')
  }
}},
{path: "/blogs/show/:code",component: blogsShow, beforeEnter(to, from, next) {
  if (token && isadmin){
    next()
  }else{
    next('/')
  }
}},
{path: "/blogs/:code/edit",component: blogsEdit, beforeEnter(to, from, next) {
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
