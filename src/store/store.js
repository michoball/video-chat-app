import { compose, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { rootReducer } from "./rootReducer";
import { rootSaga } from "./rootSaga";
import createSagaMiddleware from "redux-saga";

const sagaMiddleWare = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: [logger, sagaMiddleWare],
});
sagaMiddleWare.run(rootSaga);
