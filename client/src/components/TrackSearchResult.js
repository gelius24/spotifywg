import React from 'react'
import './TrackSearchResults.css'

export default function TrackSearchResult({track, chooseTrack}) {
    function handlePlay(){
        chooseTrack(track)
    }
    return (
        <div className="tracksSearchResults" style={{cursor: 'pointer'}} onClick={handlePlay}>
            <img src={track.albumUrl} style={{heigth: '64px', width: '64px'}} />
            <div className="text">
                <div>{track.title}</div>
                <div className="text-muted">{track.artist}</div>
            </div>
            {/* <audio id={trackUri} src={trackUri}></audio> */}
        </div>
    )
}
