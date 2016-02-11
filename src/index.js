import { transaction } from "mobservable";
import RestApiStoreAdapter from './lib/rest-api-store-adapter';
import LocalStoreAdapter from './lib/local-store-adapter';
import StoreAdapter from './lib/store-adapter';

exports.LocalStoreAdapter = LocalStoreAdapter;
exports.RestApiStoreAdapter = RestApiStoreAdapter;

exports.RegisterNoun = function(noun, store, adapter) {
    if(noun == undefined || store == undefined || adapter == undefined) {
        throw "You must supply a noun, store and adapter. Please refer to mobservable-api documentation!";
    }
    if(adapter instanceof StoreAdapter == false) {
        throw "Error: adapter supplied does not extend StoreAdapter"
    }
    
    transaction(() => {
        adapter.setupAdapter(noun, store);
        store[noun] = adapter;
    });
};