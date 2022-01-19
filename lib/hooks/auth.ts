import { format } from 'path/posix'
import { useEffect, useMemo, useState } from 'react'
import { User as CustomUserType} from '../../types/types'
import getFirebase from '../firebase'
import {getAuth, User} from 'firebase/auth'


const formatAuthUser = (user: User) => {
    const fUser: CustomUserType = {
        uuid: user.uid,
        email: user.email
    }
    return fUser
}
export default function useFirebaseAuth() {

    const [author, setAuthor] = useState<CustomUserType | null>(null)
    const [loading, setLoading] = useState(true)

    const onAuthStateChanged = async (authState: User|null) => {

        if (!authState) {
            setAuthor(null)
            setLoading(false)
            return;
        }

        setLoading(true)
        var formatedUser = formatAuthUser(authState)

        setAuthor(formatedUser)
        setLoading(false)
    }

    useEffect(() => {
        let instance = getFirebase()

        const unsubscribe =  getAuth(instance).onAuthStateChanged(onAuthStateChanged)
        return () => unsubscribe()
    }, [])

    return {
        author,
        loading
    }
}


