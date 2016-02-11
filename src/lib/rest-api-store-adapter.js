import StoreAdapter from './store-adapter';

class RestApiStoreAdapter extends StoreAdapter {
    constructor(store, noun, url) {
        super();
        this.store = store;
        this.noun = noun;
        this.url = url;
    }
    
    create(item) {
        console.log('rest adapter create');
        const requestStartTime = (new Date()).getTime();
        this.post(requestStartTime, item);
    }
    
    update(item) {
        console.log('rest adapter update');
        this.put(item);
    }
    
    read(id) {
        console.log('rest adapter read');
    }
    
    read_all() {
        console.log('Fetching: ', this.url);
        const requestStartTime = (new Date()).getTime();
        this.get(requestStartTime);
    }
    
    post(requestStartTime, item) {
        this.request_with_payload(requestStartTime, item, 'post');    
    }
    
    request_with_payload(requestStartTime, item, method) {
        var headers = new Headers({'Content-type': 'application/json'});

        var endpoint = '';
        const self = this;
        
        if(method == 'post') {
            endpoint = this.url + '/' + this.noun;
        } else {
            endpoint = this.url + '/' + this.noun + '/' + item.id;
        }

        fetch(endpoint,
        {
            mode: 'cors', 
            method: method,
            headers: headers,
            body: JSON.stringify({ article: item })
        })
        .then(response => {
            self.read_all();            
        })
        .catch((error) => {
            debugger;
            
            if(self.store[self.noun].lastRequest != null && requestStartTime < self.store[self.noun].lastRequest) {
                console.log('STALE ERROR RESPONSE', 'this response is older than another response! ', requestStartTime, self.store[this.noun].lastRequest);
                return;
            }
            
            // do something else
        });
    }
    
    put(item) {
        console.log('putting: ', item);
        const requestStartTime = (new Date()).getTime();
        this.request_with_payload(requestStartTime, item, 'put');
    }
    
    delete_item(requestStartTime, id) {
        const self = this;
        
        fetch(this.url + '/' + this.noun + '/' + id,
        {
            method: 'DELETE', 
            headers: { 
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => {
            // store[this.noun].data.append(item);
            self.read_all();
        })
        .catch((error) => {
            debugger;
            
            if(self.store[this.noun].lastRequest != null && requestStartTime < self.store[this.noun].lastRequest) {
                console.log('STALE ERROR RESPONSE', 'this response is older than another response! ', requestStartTime, self.store[this.noun].lastRequest);
                return;
            }
            
            // do something else
        });
    }
    
    get(requestStartTime) {
        const self = this;
        fetch(this.url + '/' + this.noun + '.json')
            .then(response => response.json())
            .then(json => {
                if(self.store[this.noun].lastRequest != null && requestStartTime < self.store[this.noun].lastRequest) {
                    console.log('STALE SUCCESS RESPONSE', 'this response is older than another response! ', requestStartTime, self.store[this.noun].lastRequest);
                    return;
                } 
                console.log('success: ', json[this.noun]);
                
                if(json.error != null || json.error != undefined) {
                    throw new Error('Not Found');
                }
                
                self.store[this.noun] = {
                    data: json[this.noun],
                    errors: [],
                    isFetching: false,
                    lastRequest: requestStartTime
                };
            })
            .catch((error) => {
                debugger;
                
                if(self.store[this.noun].lastRequest != null && requestStartTime < self.store[this.noun].lastRequest) {
                    console.log('STALE ERROR RESPONSE', 'this response is older than another response! ', requestStartTime, self.store[this.noun].lastRequest);
                    return;
                }
                
                self.store[this.noun] = {
                    data: [],
                    errors: error,
                    isFetching: false
                };
            });  
    }
    
    delete(id) {
        console.log('rest adapter delete');
        const requestStartTime = (new Date()).getTime();
        this.delete_item(requestStartTime, id);
    }
}

export default RestApiStoreAdapter;