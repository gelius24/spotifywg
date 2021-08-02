import { useEffect, useState } from 'react'
import axios from 'axios'
// import { url } from './Login'
const port = process.env.PORT || 3001
let url = ''
if (window.location.origin === 'http://localhost:3000'){
  url = 'http://localhost:3001'
} else {
    url = `${window.location.origin}:${port}`
}

export default function Auth(code) {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    // posting of the code (in exchange of access token)
    useEffect(() => {
        console.log(window.location.origin, port)
        console.log('url...', url)
        axios.post(`${url}/login`, {code})
        .then(res => {
            console.log(res);
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expiresInToken)
            window.history.pushState({}, null, '/')
        }).catch((e) => {
            // window.location = '/'
            console.log(e)
    })
    }, [code])

    useEffect(() => {
        if(!refreshToken || !expiresIn) return
        const interval = setInterval(() => {
            axios.post(`${url}/refresh`, {refreshToken})
        .then(res => {
            setAccessToken(res.data.accessToken)
            setExpiresIn(res.data.expiresIn)
        }).catch((e) => {
            console.log(e)
            // window.location = '/'
        })
        }, (expiresIn - 60) * 1000)
        return () => clearInterval(interval)
    }, [refreshToken, expiresIn])

    return accessToken
}
