import React, {useState, createContext} from 'react'

export const Context = createContext();
export const ContextPS = createContext([]);
export const ContextLiked = createContext([])
export const ContextPage = createContext('')
export const ContextNewRelease = createContext([])

export const ContextProvider = props =>  {
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()
    const [likedSongs, setLikedSongs] = useState([])
    const [newRelease, setnewRelease] = useState([])
    const [page, setPage] = useState('Search')
  
    return (
      <ContextNewRelease.Provider value={[newRelease, setnewRelease]}>
      <Context.Provider value={[searchResults, setSearchResults]}>
        <ContextPage.Provider value={[page, setPage]}>
        <ContextPS.Provider value={[playingTrack, setPlayingTrack]}>
          <ContextLiked.Provider value={[likedSongs, setLikedSongs]}>
          {props.children}
          </ContextLiked.Provider>
        </ContextPS.Provider>
        </ContextPage.Provider>
      </Context.Provider>
      </ContextNewRelease.Provider>
    )
}