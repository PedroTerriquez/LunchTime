import Model from './model.js'

const DishApi = new Model('/dishes')

DishApi.addReview = (id, data) => {
	return DishApi.self.request(`${DishApi.apiUrl}/dishes/${id}/reviews`, DishApi.self.VERBS.post, data)
}

export default DishApi
