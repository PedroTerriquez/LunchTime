import Model from './model.js'

const Menu = new Model('/menus')

Menu.switch = (id, data) => {
	return Menu.self.request(`${Menu.apiUrl}/menus/switch/${id}`, Menu.self.VERBS.patch, data)
}

Menu.monthMenus = () => {
	return Menu.self.request(`${Menu.apiUrl}/menus/month`)
}

Menu.pushDish = (id, data) => {
  return Menu.self.request(`${Menu.apiUrl}/menus/pushDish/${id}`, Menu.self.VERBS.patch, data)
}

Menu.pullDish = (id, data) => {
  return Menu.self.request(`${Menu.apiUrl}/menus/pullDish/${id}`, Menu.self.VERBS.patch, data)
}

export default Menu
