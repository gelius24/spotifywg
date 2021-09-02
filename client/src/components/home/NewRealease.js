import React from 'react'
import '../TrackSearchResults.css'

function NewRealease({chooseTrack, song}) {
    function handlePlay(){
        // chooseTrack(song)
    }
    return (
        <div className="tracksSearchResults" style={{cursor: 'pointer'}} onClick={handlePlay} >
            <img src={song.images[song.images.length - 1].url} style={{heigth: '64px', width: '64px'}} />
            <div className="text">
                <div>{song.name}</div>
                <div className="text-muted">
                {song.artists[0].name}
                </div>
            </div>
        </div>
    )
}

export default NewRealease
