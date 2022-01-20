
import { useCallback, useEffect, useMemo, useState } from 'react'
import { User as CustomUserType } from '../../types/types'
import getFirebase from '../firebase'
import { getAuth, User } from 'firebase/auth'
import { io } from 'socket.io-client'


export default function useFirebaseAuth() {

    const [author, setAuthor] = useState(null)
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState(null)
    const [socket, setSocket] = useState(null)

    const onAuthStateChanged = useCallback(async (authState) => {

        if (!authState) {
            setAuthor(null)
            setLoading(false)
            setToken(null)
            return;
        }

        setLoading(true)
        let formatedUser = {
            author: {
                email: authState.email,
                uid: authState.uid
            },
            loading: false
        }

        setAuthor(formatedUser)
        setLoading(false)

        getAuth(getFirebase())
            .currentUser?.getIdToken()
            .then(token => setToken(token))

    }, [])

    useEffect(() => {
        let instance = getFirebase()

        const cb = getAuth(instance).onAuthStateChanged(onAuthStateChanged)
        return () => cb()
    }, [onAuthStateChanged])


    useEffect(() => {

        setSocket((prev) => {
            if (prev === null) {

                if (token !== null) {
                    const socket = io.connect('ws://localhost:3001/', {
                        query: { token }
                    }, () => {
                        console.log('socket with token connect')
                    })

                    return socket
                }
                return null
            }
            prev.disconnect()
            return null
        })

    }, [token])

    return {
        author,
        loading,
        socket,
        token
    }
}


