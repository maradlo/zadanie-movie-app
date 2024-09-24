import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  [key: string]: any;
}

interface FavouritesState {
  favourites: Movie[];
}

const initialState: FavouritesState = {
  favourites: JSON.parse(localStorage.getItem("favourites") || "[]"),
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addFavourite(state, action: PayloadAction<Movie>) {
      const movie = action.payload;
      const exists = state.favourites.find(
        (fav) => fav.imdbID === movie.imdbID
      );
      if (!exists) {
        state.favourites.push(movie);
        localStorage.setItem("favourites", JSON.stringify(state.favourites));
      }
    },
    removeFavourite(state, action: PayloadAction<string>) {
      state.favourites = state.favourites.filter(
        (movie) => movie.imdbID !== action.payload
      );
      localStorage.setItem("favourites", JSON.stringify(state.favourites));
    },
  },
});

export const { addFavourite, removeFavourite } = favouritesSlice.actions;

export default favouritesSlice.reducer;
