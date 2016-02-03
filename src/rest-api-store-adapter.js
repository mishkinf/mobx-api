const StoreAdapter = require('store-adapter');

export default class RestApiStoreAdapter extends StoreAdapter {
    constructor(noun, url) {
        super();
        this.noun = noun;
        this.url = url;
    }
    
    create() {
        
    }
    
    update() {
        
    }
    
    read() {
        
    }
    
    delete() {
        
    }
}