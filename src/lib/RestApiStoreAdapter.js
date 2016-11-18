import StoreAdapter from './StoreAdapter';
import axios from 'axios';

class RestApiStoreAdapter {
  constructor(url) {
    this.url = url;
    this.catchErrors = this.catchErrors.bind(this);
  }

  config = {
    // headers: {'Content-Type': 'application/json'}
  };

  readAll(store, noun) {
    axios.get(this.endpoint('get', noun), this.config)
      .then(response => this.setData(store, noun, response.data))
      .catch((error) => this.catchErrors(error, 'get'));
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
    axios[verb](endpoint, item, this.config)
      .then(() => this.readAll(store, noun))
      .catch((error) => this.catchErrors(error, verb, item));
  }

  catchErrors = (error, action, data) => {
    console.error('Request Failed for noun: ', this.noun, ', Action: ', action, data);
  };
}

export default RestApiStoreAdapter;
