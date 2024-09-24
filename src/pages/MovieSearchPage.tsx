import React, { useEffect, useRef } from "react";
import { Input, List, Spin, message } from "antd";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchMovies, setQuery, setScrollPosition } from "../store/searchSlice";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

const MovieSearchPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, movies, status, page, totalResults, scrollPosition, error } =
    useAppSelector((state) => state.search);

  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const onSearch = (value: string) => {
    dispatch(setQuery(value));
    dispatch(fetchMovies({ query: value, page: 1 }));
  };

  const handleScroll = () => {
    if (
      listRef.current &&
      listRef.current.scrollTop + listRef.current.clientHeight >=
        listRef.current.scrollHeight - 100 &&
      status !== "loading" &&
      movies.length < totalResults
    ) {
      dispatch(fetchMovies({ query, page: page + 1 }));
    }
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = scrollPosition;
    }
  }, []);

  useEffect(() => {
    const currentRef = listRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
        dispatch(setScrollPosition(currentRef.scrollTop || 0));
      }
    };
  }, [movies, status]);

  useEffect(() => {
    if (status === "failed" && error) {
      message.error(error);
    }
  }, [status, error]);

  return (
    <div style={{ color: "white" }}>
      <Search
        placeholder="Search for a movie"
        enterButton="Search"
        size="large"
        defaultValue={query}
        onSearch={onSearch}
        style={{ marginBottom: "16px" }}
      />
      <div
        ref={listRef}
        style={{ maxHeight: "70vh", overflowY: "auto", paddingRight: "16px" }}
      >
        <List
          itemLayout="horizontal"
          dataSource={movies}
          renderItem={(item) => (
            <List.Item
              onClick={() => navigate(`/details/${item.imdbID}`)}
              style={{ cursor: "pointer" }}
            >
              <List.Item.Meta
                avatar={
                  <img
                    src={
                      item.Poster !== "N/A"
                        ? item.Poster
                        : "https://via.placeholder.com/50"
                    }
                    alt={item.Title}
                    style={{ width: 50 }}
                  />
                }
                title={<span style={{ color: "white" }}>{item.Title}</span>}
                description={`Year: ${item.Year}`}
              />
            </List.Item>
          )}
        />
        {status === "loading" && (
          <div style={{ textAlign: "center", padding: "16px" }}>
            <Spin />
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieSearchPage;
