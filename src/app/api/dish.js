import Model from './model.js'

const DishApi = new Model('/dishes')

DishApi.addReview = (id, data) => {
	return DishApi.self.request(`${DishApi.apiUrl}/dishes/${id}/reviews`, DishApi.self.VERBS.post, data)
}

DishApi.findBy = (query) => {
  const { name, ingredients } = query
  return DishApi.self.request(`${DishApi.apiUrl}/dishes?name=${name}`)
}

export default DishApi
