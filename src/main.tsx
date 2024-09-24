import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import MovieSearchPage from "./pages/MovieSearchPage";
import FavouriteMoviePage from "./pages/FavouriteMoviePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import { ConfigProvider, theme } from "antd";
import "./index.css";
import { store } from "./store";
import { Provider } from "react-redux";

const { darkAlgorithm } = theme;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          algorithm: darkAlgorithm,
          token: {
            colorBgBase: "#1e1e1e",
            colorText: "#ffffff",
          },
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<MovieSearchPage />} />
              <Route path="favourites" element={<FavouriteMoviePage />} />
              <Route path="details/:id" element={<MovieDetailPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
