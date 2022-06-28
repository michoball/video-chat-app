import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { rootReducer } from "./rootReducer";
import { rootSaga } from "./rootSaga";
import createSagaMiddleware from "redux-saga";

const sagaMiddleWare = createSagaMiddleware();

const enhancer =
  process.env.NODE_ENV !== "production"
    ? [logger, sagaMiddleWare]
    : [sagaMiddleWare];

export const store = configureStore({
  reducer: rootReducer,
  middleware: enhancer,
  devTools: process.env.NODE_ENV !== "production",
});
sagaMiddleWare.run(rootSaga);
