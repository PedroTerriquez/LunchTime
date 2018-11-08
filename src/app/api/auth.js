import Model from './model.js'

const AuthApi = new Model('')

AuthApi.login = (data) => {
	return Menu.self.request(`${Menu.apiUrl}/login`, Menu.self.VERBS.post, data)
}

export default AuthApi;
