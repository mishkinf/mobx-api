# mobservable-api
Mobeservable API provides an easy interface to perform CRUD operations against APIs, localstorage, etc.. 

## Examples

* Example: Look at the [mobservable-api-example](https://github.com/mishkinf/mobservable-api-example).

### RESTful API Integration
Using a truly RESTful api (see the provided [example Ruby on Rails api](https://github.com/mishkinf/rails_api_example)), we leverage a mobservable api adapter with our mobservable stores to an api by simply:
```javascript
// store.js
import {observable, autorun, isObservable} from 'mobservable';
import {RestApiStoreAdapter, RegisterNoun } from 'mobservable-api';

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
## Types of Adapters in mobservable-api
#### RestApiStoreAdapter
A mobservable-api adapter to leverage a RESTFul api (currently using the fetch api). 
```javascript
import {observable, autorun, isObservable} from 'mobservable';
import {RestApiStoreAdapter, RegisterNoun } from 'mobservable-api';

const apiHost = 'http://localhost:3001/api';
const store = observable({
    articles: { }
});

RegisterNoun('articles', store, new RestApiStoreAdapter(apiHost));

export default store;
```
#### LocalStoreAdapter
A mobservable-api adapter to leverage your browsers localstorage.
```javascript
import {observable, autorun, isObservable} from 'mobservable';
import {LocalStoreAdapter, RegisterNoun } from 'mobservable-api';

const store = observable({
    articles: { }
});

RegisterNoun('articles', store, new LocalStoreAdapter()) :

export default store;
```

## Philosophy
Mobserable API attempts to abstract the data layer into a standard interface in which all CRUD operations can be performed. 

* [Official homepage introduction](http://mishkinf.github.io/mobservable-api)

Mobservable API

## What others are saying...

> _It's literally the most amazing thing_
> &dash; Mishkin Faustini, Developer

## Contributing

* Feel free to send pr requests.
* Use `npm test` to run the basic test suite, `npm run converage` for the test suite with coverage and `npm run perf` for the performance tests.
