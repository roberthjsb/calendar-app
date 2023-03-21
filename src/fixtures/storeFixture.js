import { render as renderRL } from "@testing-library/react";
import { Provider } from "react-redux";
import {
  combineReducers,
  createStore
} from "redux";
import uiReducer from "../reducers/uiReducer";
import calendarReducer from "../reducers/calendarReducer";
import authReducer from "../reducers/authReducer";


const reducers = {
  ui: uiReducer,
  calendar: calendarReducer,
  auth: authReducer,
};

const root = combineReducers(reducers);
export const testStore = (state) => {
  const store= createStore(root,state);
  return store;
};

const renderWithRedux = (
  ui,
  {
    initialState,
    store = createStore(root, initialState),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return renderRL(ui, { wrapper: Wrapper, ...renderOptions });
};


export { renderWithRedux };
