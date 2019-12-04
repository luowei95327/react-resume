import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';

let store = process.env.NODE_ENV === 'production' ? (
  createStore(rootReducer)
) : (
  window.__REDUX_DEVTOOLS_EXTENSION__ ? (
      createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__())
  ) : (
      createStore(rootReducer)
  )
)

export default store;