import StoreAdapter from './StoreAdapter';

class LocalStoreAdapter extends StoreAdapter {
    constructor() {
        super();
        this.global_count = 0
    }

    setupAdapter(noun, store) {
        super.setupAdapter(noun, store);
        localStorage.setItem(this.noun, JSON.stringify([]));
    }

    create(item) {
        var currentItems = JSON.parse(localStorage.getItem(this.noun));
        var insertItem = Object.assign({}, item, {id: this.global_count++});
        currentItems.push(insertItem);
        localStorage.setItem(this.noun, JSON.stringify(currentItems));
        this.store[this.noun].data = currentItems;

        return insertItem;
    }

    update(item) {
        var currentItems = JSON.parse(localStorage.getItem(this.noun));
        var currentItem = currentItems.filter(function(i) { return item.id == i.id })[0];

        Object.assign(currentItem, {}, item);
        localStorage.setItem(this.noun, JSON.stringify(currentItems));
        this.store[this.noun].data = currentItems;

        return currentItem;
    }

    readAll() {
        this.store[this.noun].data = JSON.parse(localStorage.getItem(this.noun));
        return this.store[this.noun].data;
    }

    read(id) {
        var currentItems = JSON.parse(localStorage.getItem(this.noun));
        var currentItem = currentItems.filter(function(item) { return item.id == id })[0];

        if(currentItem == null) throw new Error('Item with id ' + id + ' does not exist!');
        return currentItem;
    }

    delete(id) {
        var currentItems = JSON.parse(localStorage.getItem(this.noun));
        var deleteItem = currentItems.filter(function(item) { return id == item.id })[0];
        currentItems.splice(currentItems.indexOf(deleteItem), 1);
        localStorage.setItem(this.noun, JSON.stringify(currentItems));
        this.store[this.noun].data = currentItems;

        return currentItems;
    }
}

export default LocalStoreAdapter;
