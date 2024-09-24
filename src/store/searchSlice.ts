import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface SearchState {
  query: string;
  movies: Movie[];
  status: "idle" | "loading" | "succeeded" | "failed";
  page: number;
  totalResults: number;
  error: string | null;
  scrollPosition: number;
}

const initialState: SearchState = {
  query: "",
  movies: [],
  status: "idle",
  page: 1,
  totalResults: 0,
  error: null,
  scrollPosition: 0,
};

export const fetchMovies = createAsyncThunk(
  "search/fetchMovies",
  async ({ query, page }: { query: string; page: number }) => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_BASE_URL
      }?apikey=${API_KEY}&s=${query}&page=${page}`
    );
    return response.data;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    resetState(state) {
      state.query = "";
      state.movies = [];
      state.status = "idle";
      state.page = 1;
      state.totalResults = 0;
      state.error = null;
    },
    setScrollPosition(state, action) {
      state.scrollPosition = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload.Response === "True") {
          if (action.meta.arg.page === 1) {
            state.movies = action.payload.Search || [];
          } else {
            state.movies = [...state.movies, ...(action.payload.Search || [])];
          }
          state.totalResults = parseInt(action.payload.totalResults) || 0;
        } else {
          state.error = action.payload.Error || "No movies found";
          state.status = "failed";
        }
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch movies";
      });
  },
});

export const { setQuery, resetState, setScrollPosition } = searchSlice.actions;

export default searchSlice.reducer;
