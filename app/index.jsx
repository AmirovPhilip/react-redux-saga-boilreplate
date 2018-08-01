import { renderApp } from './App'
import { Root } from './containers/Root'

const element = document.getElementById('app')

if (element) {
  renderApp(Root, element)
}
