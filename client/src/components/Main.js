import React , {useContext, useState} from 'react'
import { Context, ContextPS } from '../ContextApi'
import './Main.css'
import TrackSearchResult from './TrackSearchResult'

function Main({accessToken}) {
    const [searchResults, setSearchResults] = useContext(Context)
    const [playingTrack, setPlayingTrack] = useContext(ContextPS)

    function chooseTrack(track){
        setPlayingTrack(track)
    }

    return (
        <div className='main'>
            <div className="tracks-box" style={{overflowY: 'auto'}}>
              {searchResults.map(track => (
                <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack} />
              ))}
            </div>
        </div>
    )
}

export default Main
