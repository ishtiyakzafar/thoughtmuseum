import { createStore, combineReducers, compose } from "redux";
import { loginCache } from "./cache";
import userReducer, { actionLogin } from "./reducer/user";
import messageReducer from "./reducer/message";

const rootReducer = combineReducers({
  userStore: userReducer,
  messageStore: messageReducer
});

const enhancers =
  (process.env.NODE_ENV !== 'production' &&
    typeof window !== 'undefined' &&
    compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())) ||
  compose();

export const store = createStore(rootReducer, {}, enhancers);

const [user, token, vendor, customer] = loginCache.fetch();
if (user && token) {
  store.dispatch(actionLogin(user, token, vendor, customer));
}

store.subscribe(() => console.log("Store updated", store.getState()));
