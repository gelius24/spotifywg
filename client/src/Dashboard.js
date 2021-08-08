import './Dashboard.css'
import Auth from "./auth"
import SpotifyWebApi from 'spotify-web-api-node'
import Header from './components/Header'
import Main from './components/Main'
import Player from './components/Player'
import { useContext } from 'react'
import { ContextPS } from './ContextApi'
import Sidebar from './components/Sidebar'

const spotifyApi = new SpotifyWebApi({
    clientId: '293329c309994c0e9ca7c95bb6dc9bc3',
})

function Dashboard({code}) {
    const [playingTrack, setPlayingTrack] = useContext(ContextPS)
    const accessToken = Auth(code)

    return (
      <div className="dashboard1">
        {/* HEADER */}
        <Header accessToken={accessToken} spotifyApi={spotifyApi} className='header' />
        {/* MAIN */}
        <Main accessToken={accessToken} spotifyApi={spotifyApi} playingTrack={playingTrack} className='main' trackUri={playingTrack?.preview_url} />
        {/* SIDEBAR */}
        <Sidebar className='aside' />
        {/* PLAYER */}
        <Player className='player' accessToken={accessToken} albumUrl={playingTrack?.albumUrl} title={playingTrack?.title} artist={playingTrack?.artist} />
      </div>
    )
}

export default Dashboard