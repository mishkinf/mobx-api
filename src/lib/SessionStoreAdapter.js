class SessionStoreAdapter {
  action(store, verb, noun, item) {
    const currentItems = JSON.parse(sessionStorage.getItem(noun)) || [];
    const currentItem = item ? currentItems.find(i => i.id === item.id) : null;
    const currentStore = store[noun];

    switch(verb) {
      case 'get':
      // this is not used as of yet
      break;

      case 'post':
        const countKey = noun + '_count';
        const previousCount = parseInt(sessionStorage.getItem(countKey)) || 0;
        const updatedCount =  previousCount + 1;
        sessionStorage.setItem(countKey, updatedCount);

        var insertItem = Object.assign({}, item, {id: updatedCount});
        currentItems.push(insertItem);
        sessionStorage.setItem(noun, JSON.stringify(currentItems));
        store[noun].data = currentItems;
      break;

      case 'put':
        Object.assign(currentItem, {}, item);
        sessionStorage.setItem(noun, JSON.stringify(currentItems));
        store[noun].data = currentItems;
      break;

      case 'delete':
        currentItems.splice(currentItems.indexOf(currentItem), 1);
        sessionStorage.setItem(noun, JSON.stringify(currentItems));
        store[noun].data = currentItems;
      break;
    }
  }

  readAll(store, noun) {
    store[noun].data = JSON.parse(sessionStorage.getItem(noun)) || [];
  }
}

export default SessionStoreAdapter;
