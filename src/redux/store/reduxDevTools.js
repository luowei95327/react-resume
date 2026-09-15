import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';

// `process.env` is not available in the browser (Vite only substitutes
// `process.env.NODE_ENV`), so the dev-only devtools enhancer is wired up
// through import.meta.env instead.
const enhancer =
  import.meta.env.DEV && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined;

const store = createStore(rootReducer, enhancer);

export default store;
