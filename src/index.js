import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '../src/Layout';
import { Provider } from 'react-redux';
import configureStore from '../src/redux/index';


const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Layout/>
  </Provider>
)

ReactDOM.render(<App/>, document.getElementById('root'));
