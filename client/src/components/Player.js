import React, { useEffect, useState } from 'react'
import './Player.css'
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';

export default function Player({accessToken, trackUri, artist, albumUrl, title}) {
    const [play, setPlay] = useState(false)
    

    useEffect(() => {
        setPlay(true)
    }, [trackUri])

    if (!accessToken) return null
    return (
        <div className='player1'>  
          
          <div className="play100">
          <div className='player'>
              <div className="box">
                {albumUrl && <img src={albumUrl} />}
                <div className="txt"><p>{title}</p><p>{artist}</p></div>
              </div>
              <PlayCircleFilledWhiteIcon style={{ fontSize: '4rem', }} />
              <input type="range" style={{color: 'green', fontSize: '4rem'}}/>
            </div>
          </div>
        </div>
        
    )
}