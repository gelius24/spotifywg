import React, { useContext, useState } from 'react'
import './Sidebar.css'
import SidebarOption from './SidebarOption'
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import { ContextPage } from '../ContextApi';

function Sidebar({playlists}) {
  // const [{ playlists }, dispatch] = useDataLayerValue();
  const [page, setPage] = useContext(ContextPage)

  return (
    <div className='aside sidebar'>
        <img className='sidebar__logo' src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png'></img>
        <div onClick={() => setPage('Home')}><SidebarOption title='Home' Icon={HomeIcon} classN={page === 'Home' ? 'active' : ""} /></div>
        <div onClick={() => setPage('Search')}><SidebarOption title='Search' Icon={SearchIcon} classN={page === 'Search' ? 'active' : ""} /></div>
        <div onClick={() => setPage('Library')}><SidebarOption title='Library' Icon={LibraryMusicIcon} classN={page === 'Library' ? 'active' : ""} /></div>
        <br />
            
        <strong className='sidebar__title'>PLAYLISTS</strong>
        <hr />

            {playlists?.map((playlist) => (
                <SidebarOption title={playlist.name} key={playlist.name} />
            ))}   
       </div>
    )
}

export default Sidebar