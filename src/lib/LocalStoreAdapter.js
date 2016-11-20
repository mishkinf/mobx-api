class LocalStoreAdapter {
  action(store, verb, noun, item) {
    const currentItems = JSON.parse(localStorage.getItem(noun)) || [];
    const currentItem = item ? currentItems.find(i => i.id === item.id) : null;
    const currentStore = store[noun];

    return new Promise((resolve, reject) => {
      switch(verb) {
        case 'get':
        // this is not used as of yet
        break;

        case 'post':
          const countKey = noun + '_count';
          const previousCount = parseInt(localStorage.getItem(countKey)) || 0;
          const updatedCount =  previousCount + 1;
          localStorage.setItem(countKey, updatedCount);

          var insertItem = Object.assign({}, item, {id: updatedCount});
          currentItems.push(insertItem);
          localStorage.setItem(noun, JSON.stringify(currentItems));

          store[noun].data = currentItems;
        break;

        case 'put':
          Object.assign(currentItem, {}, item);
          localStorage.setItem(noun, JSON.stringify(currentItems));
          store[noun].data = currentItems;
        break;

        case 'delete':
          currentItems.splice(currentItems.indexOf(currentItem), 1);
          localStorage.setItem(noun, JSON.stringify(currentItems));
          store[noun].data = currentItems;
        break;
      }

      resolve();
    });
  }

  readAll(store, noun) {
    store[noun].data = JSON.parse(localStorage.getItem(noun)) || [];
  }
}

export default LocalStoreAdapter;
