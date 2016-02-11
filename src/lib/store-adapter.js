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
        
        this.store.read = function(id) {
            self.read(id); 
        }
        
        this.store.readAll = function() {
            self.readAll(); 
        }
        
        this.store.create = function(item) {
            self.create(item);
        }
        
        this.store.update = function(item) {
            self.update(item);
        }
        
        this.store.delete = function(id) {
            self.delete(id);
        }
    }
}

export default StoreAdapter;