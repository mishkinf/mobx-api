class StoreAdapter {
    constructor() {
        if(this.create === undefined) { throw new TypeError('Must override create method'); }
        if(this.update === undefined) { throw new TypeError('Must override update method'); }
        if(this.read === undefined) { throw new TypeError('Must override read method'); }
        if(this.readAll === undefined) { throw new TypeError('Must override read method'); }
        if(this.delete === undefined) { throw new TypeError('Must override delete method'); }
    }
    
    setupAdapter(noun, store) {
        this.noun = noun;
        this.store = store;
        
        const self = this;
        
        this.store[this.noun] = {
            data: [],
            errors: [],
            isFetching: false,
            lastRequest: null
        };
        
        store[noun].read = function(id) {
            self.read(id); 
        }
        
        store[noun].readAll = function() {
            self.readAll(); 
        }
        
        store[noun].create = function(item) {
            self.create(item);
        }
        
        store[noun].update = function(item) {
            self.update(item);
        }
        
        store[noun].delete = function(id) {
            self.delete(id);
        }
    }
}

export default StoreAdapter;