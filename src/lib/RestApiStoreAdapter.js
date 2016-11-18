import StoreAdapter from './StoreAdapter';
import axios from 'axios';

class RestApiStoreAdapter extends StoreAdapter {
  constructor(url, nounSingular) {
    super();
    this.url = url;
    this.nounSingular = nounSingular;
    this.catchErrors = this.catchErrors.bind(this);
  }

  config = {
    // headers: {'Content-Type': 'application/json'}
  };

  setupAdapter(noun, store) {
    super.setupAdapter(noun, store);
    this.endpoint = this.url + '/' + this.noun;
    this.readAll();
  }

  create(item) {
    this.post(item);
  }

  update(item) {
    this.put(item);
  }

  read(id) {
    console.warn('Read operation of RestApiStoreAdapter not implemented');
  }

  readAll() {
    axios.get(this.endpoint, this.config)
      .then(response => this.setData(response.data))
      .catch((error) => this.catchErrors(error, 'get'));
  }

  setData(data) {
    this.store[this.noun].data = data[this.noun];
    this.store[this.noun].errors = [];
    this.store[this.noun].isFetching = false;
  }

  post(item) {
    axios.post(this.endpoint, item, this.config)
      .then(() => this.readAll())
      .catch((error) => this.catchErrors(error, 'post', item));
  }

  put(item) {
    const putEndpoint = [this.endpoint, item.id].join('/');

    axios.put(putEndpoint, item, this.config)
      .then(() => this.readAll())
      .catch((error) => this.catchErrors(error, 'put', item));
  }

  delete(id) {
    const deleteEndpoint = [this.endpoint, id].join('/');

    axios.delete(deleteEndpoint, this.config)
      .then(() => this.readAll())
      .catch((error) => this.catchErrors(error, 'delete', id));
  }

  catchErrors = (error, action, data) => {
    console.error('Request Failed for noun: ', this.noun, ', Action: ', action, data);
  };
}

export default RestApiStoreAdapter;
