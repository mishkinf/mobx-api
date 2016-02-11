import StoreAdapter from './store-adapter';

class RestApiStoreAdapter extends StoreAdapter {
    constructor(url) {
        super();
        this.url = url;
        this.state = {
            data: [],
            errors: [],
            isFetching: false,
            lastRequest: null
        };
    }
    
    setNoun(noun) {
        this.noun = noun;
    }
    
    data() {
        return this.state.data;
    }
    
    create(item) {
        const requestStartTime = (new Date()).getTime();
        this.post(requestStartTime, item);
    }
    
    update(item) {
        this.put(item);
    }
    
    read(id) {
        console.log('WARNING: Read operation of RestApiStoreAdapter not implemented');
    }
    
    readAll() {
        const requestStartTime = (new Date()).getTime();
        this.get(requestStartTime);
    }
    
    post(requestStartTime, item) {
        this.requestWithPayload(requestStartTime, item, 'post');    
    }
    
    requestWithPayload(requestStartTime, item, method) {
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
            self.readAll();            
        })
        .catch((error) => {
            debugger;
            
            if(self.state.lastRequest != null && requestStartTime < self.state.lastRequest) {
                console.log('STALE ERROR RESPONSE', 'this response is older than another response! ', requestStartTime, self.state.lastRequest);
                return;
            }
            
            // do something else
        });
    }
    
    put(item) {
        const requestStartTime = (new Date()).getTime();
        this.requestWithPayload(requestStartTime, item, 'put');
    }
    
    deleteItem(requestStartTime, id) {
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
            self.readAll();
        })
        .catch((error) => {
            debugger;
            
            if(self.state.lastRequest != null && requestStartTime < self.state.lastRequest) {
                console.log('STALE ERROR RESPONSE', 'this response is older than another response! ', requestStartTime, self.state.lastRequest);
                return;
            }
        });
    }
    
    get(requestStartTime) {
        const self = this;
        fetch(this.url + '/' + this.noun + '.json')
            .then(response => response.json())
            .then(json => {
                if(self.state.lastRequest != null && requestStartTime < self.state.lastRequest) {
                    console.log('STALE SUCCESS RESPONSE', 'this response is older than another response! ', requestStartTime, self.state.lastRequest);
                    return;
                } 
        
                if(json.error != null || json.error != undefined) {
                    throw new Error('Not Found');
                }
                
                self.state = {
                    data: json[this.noun],
                    errors: [],
                    isFetching: false,
                    lastRequest: requestStartTime
                };
            })
            .catch((error) => {
                debugger;
                
                if(self.state.lastRequest != null && requestStartTime < self.state.lastRequest) {
                    console.log('STALE ERROR RESPONSE', 'this response is older than another response! ', requestStartTime, self.state.lastRequest);
                    return;
                }
                
                self.state = {
                    data: [],
                    errors: error,
                    isFetching: false,
                    lastRequest: null
                };
            });  
    }
    
    delete(id) {
        const requestStartTime = (new Date()).getTime();
        this.deleteItem(requestStartTime, id);
    }
}

export default RestApiStoreAdapter;