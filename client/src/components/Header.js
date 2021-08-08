import {Avatar} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import { useEffect, useState, useContext } from 'react';
import { Context } from '../ContextApi';
import './Header.css'

function Header({accessToken, spotifyApi}) {
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useContext(Context)

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken, spotifyApi])

    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return
        let cancel = false
        spotifyApi.searchTracks(search).then(res => {
            if (cancel) return
            setSearchResults(res.body.tracks.items.map((track) => {
                const smImg = track.album.images.reduce((smallest, image) => {
                    if(image.height < smallest.height) return image
                    return smallest
                }, track.album.images[0])
                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: smImg.url,
                    preview_url: track.preview_url
                }
            }))
        })
        return () => cancel = true
    }, [search, accessToken, spotifyApi])

    return (
        <div className='header'>
            <div className='header'>
            <div className='header__left'>
                <SearchIcon />
                <input 
                    placeholder='Search for Artists, Songs or Album'
                    type='text'
                    value={search}
                    onChange = {e => setSearch(e.target.value)}
                />
            </div>
            <div className='header__right'>
                <Avatar  />
                <h4>Woody Gelius</h4>
            </div>
        </div>
        </div>
    )
}

export default Header
