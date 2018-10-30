import axios from 'axios';

const Model = function Model(apiPath = '', apiFormat = '') {
	this.apiUrl = 'https://islunchtime.herokuapp.com/api';
  this.apiPath = apiPath;
  this.apiFormat = apiFormat;
}

Model.VERBS = { delete: 'delete', get: 'get', patch: 'patch', post: 'post' };

Model.errorMessage = function errorMessage(err) {
  return { messages: err.response.data, status: err.response.status };
};

Model.request = function request(url, method = Model.VERBS.get, data = {}) {
  return new Promise((resolve, reject) => {
    axios({ method, url, data })
      .then(response => resolve(response.data))
      .catch(err => reject(Model.errorMessage(err)));
  });
};

Model.prototype = {
  self: Model,
  rute(id = null) {
    const idUrl = id ? `/${id}` : '';
    return `${this.apiUrl}${this.apiPath}${idUrl}${this.apiFormat}`;
  },
  all() {
    return this.self.request(this.rute());
  },
  find(modelId) {
    return this.self.request(this.rute(modelId));
  },
  add(model) {
    return this.self.request(this.rute(), this.self.VERBS.post, model);
  },
  update(model) {
    return this.self.request(this.rute(model.id), this.self.VERBS.patch, model);
  },
  destroy(modelId) {
    return this.self.request(this.rute(modelId), this.self.VERBS.delete);
  }
};

export default Model;
