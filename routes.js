import Index from './pages'
import Goods from './pages/goods'
import Detail from './pages/goods/detail'
export default [{
  path: '/',
  exact: true,
  component: Index,
}, {
  path: '/goods',
  component: Goods,
  routes: [{
    path: '/goods/detail/:id',
    component: Detail,
  }]
}]
