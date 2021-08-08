import './Dashboard.css'
import Auth from "./auth"
import SpotifyWebApi from 'spotify-web-api-node'
import Header from './components/Header'
import Main from './components/Main'
import Player from './components/Player'
import { useContext, useEffect, useState } from 'react'
import { ContextLiked, ContextPS } from './ContextApi'
import Sidebar from './components/Sidebar'

const spotifyApi = new SpotifyWebApi({
    clientId: '293329c309994c0e9ca7c95bb6dc9bc3',
})

function Dashboard({code}) {
    const [playingTrack, setPlayingTrack] = useContext(ContextPS)
    const [likedSongs, setLikedSongs] = useContext(ContextLiked)
    const [nom, setNom] = useState('')
    const [profilePic, setProfilePic] = useState('')
    const accessToken = Auth(code)

    useEffect(() => {
      if (!accessToken) return
      spotifyApi.setAccessToken(accessToken)
  }, [accessToken, spotifyApi])

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.getMe()
    .then(function(data) {
      setNom(data.body.display_name)
      setProfilePic(data.body.images[0].url)
    }, function(err) {
      console.log('Something went wrong!', err);
    });
  }, [accessToken])

  useEffect(()=>{
    if(!nom) return
    spotifyApi.getUserPlaylists(nom)
    .then(function(data) {
      console.log('Retrieved playlists', data.body);
    },function(err) {
      console.log('Something went wrong!', err);
    });

    spotifyApi.getMySavedTracks({
      limit : 20,
      offset: 1
    })
    .then(function(data) {
      console.log(data.body.items);
      const favorites = data.body.items
      setLikedSongs(favorites)
      // console.log(favorites)
    }, function(err) {
      console.log('Something went wrong!', err);
    });
  }, [nom])

    return (
      <div className="dashboard1">
        <Header accessToken={accessToken} spotifyApi={spotifyApi} className='header' nom={nom} profilePic={profilePic} />
        {/* MAIN */}
        <Main accessToken={accessToken} spotifyApi={spotifyApi} playingTrack={playingTrack} className='main' trackUri={playingTrack?.preview_url} />
        {/* SIDEBAR */}
        <Sidebar className='aside' />
        {/* PLAYER */}
        <Player className='player' accessToken={accessToken} />
      </div>
    )
}
// albumUrl={playingTrack?.albumUrl}
export default Dashboard