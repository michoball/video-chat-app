import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import { rootReducer } from "./rootReducer";
import { rootSaga } from "./rootSaga";
import createSagaMiddleware from "redux-saga";

const sagaMiddleWare = createSagaMiddleware();

// const enhancer =
//   process.env.NODE_ENV !== "production"
//     ? [logger, sagaMiddleWare]
//     : [sagaMiddleWare];

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleWare],
  devTools: process.env.NODE_ENV !== "production",
});
sagaMiddleWare.run(rootSaga);
