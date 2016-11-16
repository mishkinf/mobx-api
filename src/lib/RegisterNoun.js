import StoreAdapter from './StoreAdapter';

export default function(noun, store, adapter) {
    if(noun == undefined || store == undefined || adapter == undefined) {
        throw "You must supply a noun, store and adapter. Please refer to mobx-api documentation!";
    }
    if(adapter instanceof StoreAdapter == false) {
        throw "Error: adapter supplied does not extend StoreAdapter"
    }

    adapter.setupAdapter(noun, store);
};
