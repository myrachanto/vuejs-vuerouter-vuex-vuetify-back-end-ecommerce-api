import store from '@/store'
import Product from '@/views/admin/Products/index'
// import Category from '@/components/datatables/category'
// import Products from '@/components/datatables/product'
import ProductForm from '@/views/admin/Products/form'
import ProductShow from '@/views/admin/Products/show'
import ProductEdit from '@/views/admin/Products/edit'
import Inventory from '@/views/admin/inventory/index'
import Inventoryform from '@/views/admin/inventory/index'


var token = store.getters.Token
var isadmin = store.getters.isadmin = true
export const products = [
  {path: "/products",component: Product, name: "product",

  // children: [
  //   {
  //     path: ':code',
  //     component: Category,
  //     props: true,
  //     children: [
  //       {
  //         path: ':cat',
  //         component: Products,
  //         props: true
  //     }
  //   ]
  // }
// ]
},

{path: "/products/create",component: ProductForm, beforeEnter(to, from, next) {
  if (token && isadmin){
    next()
  }else{
    next('/')
  }
}},

{path: "/products/show/:code",component: ProductShow, beforeEnter(to, from, next) {
  if (token && isadmin){
    next()
  }else{
    next('/')
  }
}},
{path: "/products/:code/edit",component: ProductEdit, beforeEnter(to, from, next) {
  if (token && isadmin){
    next()
  }else{
    next('/')
  }
}},

{path: "/invetory/update",component: Inventory, beforeEnter(to, from, next) {
  if (token && isadmin){
    next()
  }else{
    next('/')
  }
}},
{path: "/invetory/update/:code",component: Inventoryform, beforeEnter(to, from, next) {
  if (token && isadmin){
    next()
  }else{
    next('/')
  }
}},

]
