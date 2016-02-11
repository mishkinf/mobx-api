import StoreAdapter from './store-adapter';

class LocalStoreAdapter extends StoreAdapter {
    constructor(noun) {
        super();
        this.noun = noun;
        this.global_count = 0

        localStorage.setItem(this.noun, JSON.stringify([]));
        
        this.state = {
            data: [],
            errors: [],
            isFetching: false,
            lastRequest: null
        };
    }
    
    data() {
        return this.state.data;
    }
    
    create(item) {
        var currentItems = JSON.parse(localStorage.getItem(this.noun));
        var insertItem = Object.assign({}, item, {id: this.global_count++});
        currentItems.push(insertItem);
        localStorage.setItem(this.noun, JSON.stringify(currentItems));
        this.state.data = currentItems;
        
        return insertItem;
    }
    
    update(item) {
        var currentItems = JSON.parse(localStorage.getItem(this.noun));
        var currentItem = currentItems.filter(function(i) { return item.id == i.id })[0];
                
        Object.assign(currentItem, {}, item);
        localStorage.setItem(this.noun, JSON.stringify(currentItems));
        this.state.data = currentItems;
        
        return currentItem;
    }
    
    readAll() {
        this.state.data = JSON.parse(localStorage.getItem(this.noun)); 
        return this.state.data;
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
        this.state.data = currentItems;
        
        return currentItems;  
    }
}

export default LocalStoreAdapter;