import React from 'react'
import './TrackSearchResults.css'

function LikedSongsResult({song, chooseTrack}) {
    console.log(song)
    function handlePlay(){
        chooseTrack(song)
    }
    return (
        <div className="tracksSearchResults" style={{cursor: 'pointer'}} onClick={handlePlay} >
            <img src={song.track.album.images[song.track.album.images.length - 1].url} style={{heigth: '64px', width: '64px'}} />
            <div className="text">
                <div>{song.track.name}</div>
                <div className="text-muted">
                {song.track.artists[0].name}
                </div>
            </div>
        </div>
    )
}

export default LikedSongsResult
