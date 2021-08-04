import React, {useState, createContext} from 'react'

export const Context = createContext();
export const ContextPS = createContext([]);

export const ContextProvider = props =>  {
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()
  
    return (
      <Context.Provider value={[searchResults, setSearchResults]}>
        <ContextPS.Provider value={[playingTrack, setPlayingTrack]}>
          {props.children}
        </ContextPS.Provider>
      </Context.Provider>
    )
}