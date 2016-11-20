import StoreAdapter from './StoreAdapter';
import axios from 'axios';

class RestApiStoreAdapter {
  constructor(url, headers) {
    this.url = url;
    this.headers = headers;
  }

  getConfig() {
    return {
      headers: this.headers || {}
    };
  }

  readAll(store, noun) {
    store[noun].errors = [];
    store[noun].isFetching = true;

    return axios.get(this.endpoint('get', noun), this.getConfig())
      .then(response => this.setData(store, noun, response.data));
  }

  setData(store, noun, data) {
    store[noun].data = data[noun];
    store[noun].errors = [];
    store[noun].isFetching = false;
  }

  endpoint(verb, noun, item) {
    switch(verb) {
      case 'post':
      case 'get':
        return [this.url, noun].join('/');

      case 'put':
      case 'delete':
        return [this.url, noun, item.id].join('/');
    }

    return [this.url, noun].join('/');
  }

  action(store, verb, noun, item) {
    const endpoint = this.endpoint(verb, noun, item);
    return axios[verb](endpoint, item, this.getConfig())
      .then(() => this.readAll(store, noun));
  }
}

export default RestApiStoreAdapter;
