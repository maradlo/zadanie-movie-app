import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import favouritesReducer from "./favouritesSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    favourites: favouritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
