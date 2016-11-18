class StoreAdapter {
  nounToAdapter = {};
  constructor(store) {
    this.store = store;
  }

  registerAdapter(noun, adapter) {
    this.nounToAdapter[noun] = adapter;
    const store = this.store;

    store[noun] = {
      data: [],
      errors: [],
      isFetching: false
    };

    console.log('adapter being used: ', this.nounToAdapter[noun]);

    store[noun].readAll = () => this.nounToAdapter[noun].readAll(store, noun);
    store[noun].create = (item) => this.nounToAdapter[noun].action(store, 'post', noun, item);
    store[noun].read = (item) => this.nounToAdapter[noun].action(store, 'get', noun, item);
    store[noun].update = (item) => this.nounToAdapter[noun].action(store, 'put', noun, item);
    store[noun].delete = (item) => this.nounToAdapter[noun].action(store, 'delete', noun, item);
  }
}

export default StoreAdapter;
