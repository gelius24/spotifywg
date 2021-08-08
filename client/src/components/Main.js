import React, { useContext, useState } from "react";
import { Context, ContextPS } from "../ContextApi";
import "./Main.css";
import TrackSearchResult from "./TrackSearchResult";
let tag = undefined

function Main() {
  const [searchResults, setSearchResults] = useContext(Context);
  const [playingTrack, setPlayingTrack] = useContext(ContextPS);
  const [lecture, setLecture] = useState(false);

  function chooseTrack(track) {
    if (tag !== undefined) tag.pause()
    setPlayingTrack(track);
    tag = document.createElement("audio");
    tag.setAttribute("src", track.preview_url);
    tag.play();
    setLecture(true);
    tag.setAttribute("onEnded", "setLecture(false)");
    console.log(tag);
  }

  return (
    <div className="main">
      <div className="tracks-box" style={{ overflowY: "auto" }}>
        {searchResults.map((track) => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
      </div>
    </div>
  );
}

export default Main;