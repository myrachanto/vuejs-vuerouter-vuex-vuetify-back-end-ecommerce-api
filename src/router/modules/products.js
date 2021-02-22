// import store from '@/store'
import Product from '@/views/admin/Products/index'
import Category from '@/components/datatables/category'
import Products from '@/components/datatables/product'


// var token = store.getters.Token
// var isadmin = store.getters.isadmin = true
export const products = [
  {path: "/product/",component: Product, name: "product",
  children: [
    {
      path: ':code',
      component: Category,
      props: true,
      children: [
        {
          path: ':cat',
          component: Products,
          props: true
      }
    ]
  }
]
},

]
