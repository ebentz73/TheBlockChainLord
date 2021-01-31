import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { addOneToWatchlist } from "../../store/watchlist";
import "./AssetDetails.css";

export default function AssetDetails({ asset }) {
  const dispatch = useDispatch();
  const watchlistId = useSelector((state) => state.loading.watchlistId);
  const handleAddToWatchlist = () => {
    dispatch(addOneToWatchlist(watchlistId, asset.id));
  };
  return (
    <>
      {asset && (
        <div className="assetsDetails-container">
          <div className="assetsDetails-header">
            <div>
              <img src={asset.assetDetails.logo}></img>
              <h3>{asset.name}</h3>
              <h6>{asset.symbol}</h6>
            </div>
            <div>
              <a
                href={`https://www.reddit.com/r/${asset.assetDetails.subreddit}`}
              >
                <i className="fab fa-reddit-alien"></i>
              </a>
              <a href={asset.assetDetails.urls.website[0]}>
                <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
            <button onClick={handleAddToWatchlist}>Add to Watchlist</button>
          </div>
          <div className="assetDetails-body">
            <p>{asset.assetDetails.description}</p>
            <div>
              Tags:
              <div>{asset.tags}</div>
            </div>
          </div>

          <div className="assetDetails-quote"></div>
        </div>
      )}
    </>
  );
}
