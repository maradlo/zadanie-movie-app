import React from "react";
import { List, Button } from "antd";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { removeFavourite } from "../store/favouritesSlice";
import { StarFilled } from "@ant-design/icons";

const FavouriteMoviePage: React.FC = () => {
  const favourites = useAppSelector((state) => state.favourites.favourites);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRemoveFavourite = (imdbID: string) => {
    dispatch(removeFavourite(imdbID));
  };

  return (
    <div style={{ color: "white" }}>
      <h1>Your Favourite Movies</h1>
      {favourites.length === 0 ? (
        <p>You have no favourite movies yet.</p>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={favourites}
          renderItem={(item) => (
            <List.Item
              onClick={() => navigate(`/details/${item.imdbID}`)}
              style={{ cursor: "pointer" }}
              actions={[
                <Button
                  type="text"
                  icon={<StarFilled style={{ color: "#fadb14" }} />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFavourite(item.imdbID);
                  }}
                  key="remove-favourite"
                />,
              ]}
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
      )}
    </div>
  );
};

export default FavouriteMoviePage;
