import React, { useContext, useEffect, useState } from "react";
import { Context, ContextLiked, ContextPage, ContextPS, ContextNewRelease } from "../ContextApi";
import NewRealease from "./home/NewRealease";
import LikedSongsResult from "./LikedSongsResult";
import "./Main.css";
import TrackSearchResult from "./TrackSearchResult";
let tag = undefined

function Main() {
  const [searchResults, setSearchResults] = useContext(Context);
  const [playingTrack, setPlayingTrack] = useContext(ContextPS);
  const [likedSongs, setLikedSongs] = useContext(ContextLiked)
  const [newRelease, setnewRelease] = useContext(ContextNewRelease)
  const [page, setPage] = useContext(ContextPage)
  
  function chooseTrack(track) {
    if (tag !== undefined) tag.pause()
    setPlayingTrack(track);
    tag = document.createElement("audio");
    if(track.preview_url){
      tag.setAttribute("src", track.preview_url)
      tag.play();
      return;
    }
  }
  function chooseLikedTrack(song){
    if (tag !== undefined) tag.pause()
    setPlayingTrack(song);
    tag = document.createElement("audio");
    if(song.track.preview_url) {
      tag.setAttribute("src", song.track.preview_url)
      tag.play();
      return;
    }
  }
  console.log(newRelease)
  return (
    <div className="main">
      {
        page === 'Home' &&
        <div className="newSongs_box" >
          <h3>Derniers titres</h3> 
        {newRelease.map((newSong) => (
          <NewRealease
            song={newSong}
            key={newSong.uri}
            chooseTrack={chooseTrack}
          />
        ))}
      </div>
      }
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
            chooseLikedTrack={chooseLikedTrack}
          />
        ))}
      </div>
      }
    </div>
  );
}

export default Main;