# mobx-api
[![npm version](https://badge.fury.io/js/mobx-api.svg)](https://badge.fury.io/js/mobx-api)

Mobx API provides an easy interface to perform CRUD operations against APIs, localstorage, etc.. The design of mobx-api is to inspire writing code that is very clear and boilerplate-free when handling calls to APIs.

## Examples

* Example: Look at the [mobx-api-example](https://github.com/mishkinf/mobx-api-example).

### RESTful API Integration
Using a truly RESTful api (see the provided [example Ruby on Rails api](https://github.com/mishkinf/rails_api_example)), we leverage a mobx api adapter with our mobx stores to an api by simply:
```javascript
// store.js
import {observable} from 'mobx';
import {RestApiStoreAdapter, RegisterNoun } from 'mobx-api';

const apiHost = 'http://localhost:3001/api';
const store = observable({
    articles: { }
});

RegisterNoun('articles', store, new RestApiStoreAdapter(apiHost));

export default store;
```
...and then we can simply leverage our api in React Components...
```javascript
@observer
class ArticlesList extends Component {
     render() {
        const { store } = this.props;
        const articles = store.articles;

        return (
            <div style={style}>
                <button style={inputStyle} onClick={this.addArticle}>Add Article</button>

                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {articles.data.map(article => {
                        return (<tr key={article.id}>
                            <td>{article.id}</td>
                            <td>
                                <InlineEdit
                                    activeClassName="editing"
                                    text={article.title}
                                    paramName="title"
                                    change={(data) => this.updateField({id: article.id, title: data.title})}
                                    />
                            </td>
                            <td>
                             <InlineEdit
                                    activeClassName="editing"
                                    text={article.author}
                                    paramName="author"
                                    change={(data) => this.updateField({id: article.id, author: data.author})}
                                    />
                            </td>
                            <td><button onClick={() => store.articles.delete(article.id)}>Delete</button></td>
                        </tr>);
                    })}
                    </tbody>
                </Table>
            </div>
        );    
     }

    updateField(data) {
        const { store } = this.props;
        store.articles.update(data);
    }

    addArticle = (e) => {
        const { store } = this.props;
        var fakeArticle = { title: Faker.commerce.productName(), author: Faker.name.findName() };
        store.articles.create(fakeArticle);
    }
};
```
## Adapters in mobx-api
#### RestApiStoreAdapter
A mobx-api adapter to leverage a RESTFul api (currently using the fetch api).
```javascript
import {observable} from 'mobx';
import {RestApiStoreAdapter, RegisterNoun } from 'mobx-api';

const apiHost = 'http://localhost:3001/api';
const store = observable({
    articles: { }
});

RegisterNoun('articles', store, new RestApiStoreAdapter(apiHost));

export default store;
```
#### LocalStoreAdapter
A mobx-api adapter to leverage your browsers localstorage.
```javascript
import {observable} from 'mobx';
import {LocalStoreAdapter, RegisterNoun } from 'mobx-api';

const store = observable({
    articles: { }
});

RegisterNoun('articles', store, new LocalStoreAdapter()) :

export default store;
```
## Write your own adapter
With mobx-api it's easy to write your own adapter to connect to any type of server / data store. mobx api leverages a simple interface to support CRUD operations. Please refer to the implementation of LocalStorageAdapter or RestApiStoreAdapter for a more specific example. The class below shows what functions to implement in order to create your own adapter.
```javascript
import StoreAdapter from './store-adapter';

class SampleStoreAdapter extends StoreAdapter {
    constructor() {
        super();
    }

    setupAdapter(noun, store) {
        super.setupAdapter(noun, store);
        // initialize your store
    }

    create(item) {
        // Make async or synchronous call to any API and then mutate the mobx store
    }

    update(item) {
        // Make async or synchronous call to any API and then mutate the mobx store
    }

    readAll() {
        // Make async or synchronous call to any API and fetch all times then mutate the mobx store
    }

    delete(id) {
       // Make async or synchronous call to any API and delete object from store in your success callback
    }
}
```

## Philosophy
Mobserable API attempts to abstract the data layer into a standard interface in which all CRUD operations can be performed with as little boilerplate as possible. In contradiction, Redux has a relatively high amount of boilerplate when communicating with relatively standard types of back-ends (APIs, ElasticSearch, etc..)

mobx API

## What others are saying...

> _It's literally the most amazing thing_
> &dash; Mishkin Faustini, Developer

## Contributing

* Feel free to send pr requests.
* Use `npm test` to run the basic test suite, `npm run converage` for the test suite with coverage and `npm run perf` for the performance tests.
