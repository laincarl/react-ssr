import App from './container/index'
import List from './container/List'

export default [{
  path: '/',
  exact: true,
  component: App
}, {
  path: '/list',
  exact: true,
  component: List
}]
