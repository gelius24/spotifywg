import React, { useContext, useEffect, useState } from "react";
import { Context, ContextLiked, ContextPage, ContextPS } from "../ContextApi";
import LikedSongsResult from "./LikedSongsResult";
import "./Main.css";
import TrackSearchResult from "./TrackSearchResult";
let tag = undefined

function Main() {
  const [searchResults, setSearchResults] = useContext(Context);
  const [playingTrack, setPlayingTrack] = useContext(ContextPS);
  const [likedSongs, setLikedSongs] = useContext(ContextLiked)
  const [page, setPage] = useContext(ContextPage)
  
  function chooseTrack(track) {
    if (tag !== undefined) tag.pause()
    setPlayingTrack(track);
    tag = document.createElement("audio");
    if(track.preview_url) tag.setAttribute("src", track.preview_url);
    if(track.track.preview_url) tag.setAttribute("src", track.track.preview_url);
    tag.play();
    console.log(tag);
  }

  return (
    <div className="main">
      {
        page === 'Search' && 
        <div className="tracks-box" >
        {searchResults.map((track) => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
      </div>
      }
      {
        page === 'Library' &&
        <div className="liked-box" > 
      {likedSongs.map((song) => (
          <LikedSongsResult
            song={song}
            key={song.track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
      </div>
      }
      
      
    </div>
  );
}

export default Main;