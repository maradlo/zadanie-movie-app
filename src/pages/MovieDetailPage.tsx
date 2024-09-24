import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin, Descriptions, Button, Tooltip, message } from "antd";
import axios from "axios";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addFavourite, removeFavourite } from "../store/favouritesSlice";

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const favourites = useAppSelector((state) => state.favourites.favourites);

  const isFavourite = favourites.some((fav) => fav.imdbID === id);

  const handleFavouriteClick = () => {
    if (movie) {
      if (isFavourite) {
        dispatch(removeFavourite(movie.imdbID));
        message.info(`${movie.Title} removed from favourites.`);
      } else {
        dispatch(addFavourite(movie));
        message.success(`${movie.Title} added to favourites.`);
      }
    }
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      const API_KEY = import.meta.env.VITE_API_KEY;
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }?apikey=${API_KEY}&i=${id}&plot=full`
        );
        if (response.data.Response === "False") {
          throw new Error(
            response.data.Error || "Failed to fetch movie details"
          );
        }
        setMovie(response.data);
      } catch (error: any) {
        console.error("Failed to fetch movie details:", error);
        message.error(error.message || "Failed to fetch movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading || !movie) {
    return (
      <div style={{ textAlign: "center", padding: "16px" }}>
        <Spin />
      </div>
    );
  }

  return (
    <div style={{ color: "white" }}>
      <h1 style={{ display: "flex", alignItems: "center" }}>
        {movie.Title}
        <Tooltip
          title={isFavourite ? "Remove from favourites" : "Add to favourites"}
        >
          <Button
            type="text"
            icon={
              isFavourite ? (
                <StarFilled style={{ color: "#fadb14", marginLeft: "8px" }} />
              ) : (
                <StarOutlined style={{ color: "#fadb14", marginLeft: "8px" }} />
              )
            }
            onClick={handleFavouriteClick}
          />
        </Tooltip>
      </h1>
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/200"
        }
        alt={movie.Title}
        style={{ width: 200 }}
      />
      <Descriptions
        title="Movie Info"
        bordered
        column={1}
        style={{ marginTop: "16px" }}
      >
        <Descriptions.Item label="Year">{movie.Year}</Descriptions.Item>
        <Descriptions.Item label="Genre">{movie.Genre}</Descriptions.Item>
        <Descriptions.Item label="Director">{movie.Director}</Descriptions.Item>
        <Descriptions.Item label="Actors">{movie.Actors}</Descriptions.Item>
        <Descriptions.Item label="Plot">{movie.Plot}</Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default MovieDetailPage;
