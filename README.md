# mobx-api
[![npm version](https://badge.fury.io/js/mobx-api.svg)](https://badge.fury.io/js/mobx-api)

Mobx API provides an easy interface to perform CRUD operations against RESTful APIs, localStorage, sessionStorage, etc.. The design of mobx-api is to inspire writing code that is very clear and boilerplate-free when handling calls to APIs. It follows the Flux architecture as prescribed by Facebook and it is an alternative to using frameworks like Redux.

## Examples
* Example: Look at the [mobx-api-example](https://github.com/mishkinf/mobx-api-example).

### RESTful API Integration
Using a truly RESTful api (see the provided [example Ruby on Rails api](https://github.com/mishkinf/rails_api_example)), we leverage a mobx api adapter with our mobx stores to an api by simply:
```javascript
// store.js
import { observable, autorun, isObservable } from 'mobx';
import { LocalStoreAdapter, SessionStoreAdapter, RestApiStoreAdapter, StoreAdapter } from 'mobx-api';

const apiHost = 'http://localhost:3001/api';
const store = observable({
    articles: { }
});

const localStoreAdapter = new LocalStoreAdapter();
storeAdapter.registerAdapter('articles', localStoreAdapter);

store.articles.readAll();

export default store;
```
...and then we can simply leverage our api in React Components...
```javascript
import React, {Component, PropTypes} from 'react';
import {observer} from 'mobx-react';

@observer
class ArticlesList extends Component {
  static propTypes = {
    articles: PropTypes.object.isRequired,
    isFakeApi: PropTypes.bool.isRequired,
    setFakeApi: PropTypes.func.isRequired
  };

  render() {
    const { articles , isFakeApi } = this.props;

    return (
      <div style={styles.main}>
        <button style={styles.input} onClick={this.addArticle}>Add Article</button>

        <br/>

        <label style={styles.toggle}>
          <Toggle defaultChecked={isFakeApi} onChange={this.toggleFakeApi} /> Use Fake Api
        </label>

        { articles.data.length > 0 ? this.renderArticlesTable() : <h3>There are no articles yet!</h3>}
      </div>
    );
  }

  renderArticlesTable() {
    return (
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          { this.renderArticles() }
        </tbody>
      </Table>
    );
  }

  renderArticles() {
    const { articles } = this.props;

    return articles.data.map(article => {
      return (
        <tr key={article.id.toString() + article.title}>
          <td>{article.id}</td>
          <td>
            <InlineEdit
              activeClassName="editing"
              text={article.title}
              paramName="title"
              change={(data) => this.updateField({id: article.id, title: data.title})} />
          </td>
          <td>
            <InlineEdit
              activeClassName="editing"
              text={article.author}
              paramName="author"
              change={(data) => this.updateField({id: article.id, author: data.author})} />
          </td>
          <td><button onClick={() => articles.delete(article)}>Delete</button></td>
        </tr>);
      }
    );
  }

  customValidateText(text) {
    return (text.length > 0 && text.length < 64);
  }

  updateField(data) {
    const { articles } = this.props;

    articles.update(data);
  }

  addArticle = (e) => {
    const { articles } = this.props;

    const fakeArticle = { title: Faker.commerce.productName(), author: Faker.name.findName() };
    articles.create(fakeArticle);
  }
};
```

## Adapters in mobx-api
#### RestApiStoreAdapter
A mobx-api adapter to leverage a RESTFul api (using Axios)
```javascript
import { RestApiStoreAdapter } from 'mobx-api';
```
#### LocalStoreAdapter
A mobx-api adapter to leverage your browsers localStorage.
```javascript
import { LocalStoreAdapter } from 'mobx-api';
```
#### SessionStoreAdapter
A mobx-api adapter to leverage your browsers sessionStorage.
```javascript
import { SessionStoreAdapter } from 'mobx-api';
```

## Write your own adapter
With mobx-api it's easy to write your own adapter to connect to any type of server / data store. mobx-api leverages a simple interface to support CRUD operations. Please refer to the implementation of LocalStorageAdapter or RestApiStoreAdapter for a more specific example. The class below shows what functions to implement in order to create your own adapter.

## Philosophy
Mobx API attempts to abstract the data layer into a standard interface in which all CRUD operations can be performed with as little boilerplate as possible. In contradiction, Redux has a relatively high amount of boilerplate when communicating with relatively standard types of back-ends (APIs, ElasticSearch, etc..)

Mobx API

## What others are saying...

> _It's literally the most amazing thing_
> &dash; Mishkin Faustini, Developer

## Contributing

* Feel free to send pr requests.
* Use `npm test` to run the basic test suite, `npm run converage` for the test suite with coverage and `npm run perf` for the performance tests.
