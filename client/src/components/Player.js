import React, { useContext, useEffect, useState } from "react";
import "./Player.css";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import { ContextPS } from "../ContextApi";

export default function Player({ accessToken }) {
  const [playingTrack, setPlayingTrack] = useContext(ContextPS);
  if (!accessToken) return null;
  console.log(playingTrack);
  return (
    <div className="player1">
      <div className="play100">
        <div className="player">
          <div className="box">
            {playingTrack && (
              <img
                src={
                  playingTrack.albumUrl ||
                  playingTrack.track.album.images[
                    playingTrack.track.album.images.length - 1
                  ].url
                }
              />
            )}
            <div className="txt">
              <p>{playingTrack?.title || playingTrack?.track.name}</p>
              <p>
                {playingTrack?.artist ||
                  playingTrack?.track.album.artists[0].name}
              </p>
            </div>
          </div>
          <PlayCircleFilledWhiteIcon style={{ fontSize: "4rem" }} />
          <input type="range" style={{ color: "green", fontSize: "4rem" }} />
        </div>
      </div>
    </div>
  );
}
