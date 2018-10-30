import Model from './model.js'

const Menu = new Model('/menus');

Menu.switch = (id, data) => {
	return Menu.self.request(`${Menu.apiUrl}/menus/switch/${id}`, Menu.self.VERBS.patch, data);
}

Menu.monthMenus = () => {
	return Menu.self.request(`${Menu.apiUrl}/menus/month`);
}

export default Menu;
