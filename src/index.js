import RestApiStoreAdapter from './lib/rest-api-store-adapter';
import LocalStoreAdapter from './lib/local-store-adapter';

exports.LocalStoreAdapter = LocalStoreAdapter;
exports.RestApiStoreAdapter = RestApiStoreAdapter;
exports.registerStoreAdapter = function(store, adapter) {
    store.adapter = adapter;
    
    store.create = function(noun, item) {
        store.adapter.create(item);
    };

    store.update = function(noun, item) {
        store.adapter.update(item);
    };

    store.read_all = function(noun) {
        store.adapter.read_all();    
    };

    store.delete = function(noun, id) {
        store.adapter.delete(id);
    };

    store.read = function(noun, id) {
        store.adapter.read(id);
    };
};
