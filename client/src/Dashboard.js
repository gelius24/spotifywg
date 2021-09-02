import './Dashboard.css'
import Auth from "./auth"
import SpotifyWebApi from 'spotify-web-api-node'
import Header from './components/Header'
import Main from './components/Main'
import Player from './components/Player'
import { useContext, useEffect, useState } from 'react'
import { ContextLiked, ContextPS, ContextNewRelease } from './ContextApi'
import Sidebar from './components/Sidebar'

const spotifyApi = new SpotifyWebApi({
    clientId: '293329c309994c0e9ca7c95bb6dc9bc3',
})

function Dashboard({code}) {
    const [playingTrack, setPlayingTrack] = useContext(ContextPS)
    const [likedSongs, setLikedSongs] = useContext(ContextLiked)
    const [newRelease, setNewRelease] = useContext(ContextNewRelease)
    const [nom, setNom] = useState('')
    const [id, setId] = useState(null)
    const [profilePic, setProfilePic] = useState('')
    const accessToken = Auth(code)
    const [userPlaylists, setUserPlaylists] = useState([])

    useEffect(() => {
      if (!accessToken) return
      spotifyApi.setAccessToken(accessToken)
  }, [accessToken, spotifyApi])

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.getMe()
    .then(function(data) {
      console.log(data.body)
      setNom(data.body.display_name)
      setId(data.body.id)
      setProfilePic(data.body.images[0].url)
    }, function(err) {
      console.log('Something went wrong!', err);
    });
  }, [accessToken])

  useEffect(()=>{
    if(!nom && !id) return
    spotifyApi.getUserPlaylists(id)
    .then(function(data) {
      console.log('playlist de l\'utilisateur >>>', data.body);
      setUserPlaylists(data.body.items)
    },function(err) {
      console.log('Something went wrong!', err);
    });

    spotifyApi.getMySavedTracks({
      limit : 20,
      offset: 1
    })
    .then(function(data) {
      // console.log(data.body.items);
      const favorites = data.body.items
      setLikedSongs(favorites)
      // console.log(favorites)
    }, function(err) {
      console.log('Something went wrong!', err);  
    });

    spotifyApi.getNewReleases({ limit : 5, offset: 0, country: 'SE' })
  .then(function(data) {
    console.log("Dernière sorties >>>>>>>",data.body);
      //.albums.items
      setNewRelease(data.body.albums.items)
    }, function(err) {
       console.log("Something went wrong!", err);
    });
    
  }, [nom, id])

    return (
      <div className="dashboard1">
        <Header accessToken={accessToken} spotifyApi={spotifyApi} className='header' nom={nom} profilePic={profilePic} />
        {/* MAIN */}
        <Main accessToken={accessToken} spotifyApi={spotifyApi} playingTrack={playingTrack} className='main' trackUri={playingTrack?.preview_url} />
        {/* SIDEBAR */}
        <Sidebar className='aside' playlists={userPlaylists} />
        {/* PLAYER */}
        <Player className='player' accessToken={accessToken} />
      </div>
    )
}
// albumUrl={playingTrack?.albumUrl}
export default Dashboard