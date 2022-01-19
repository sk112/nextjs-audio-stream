import { useEffect, useState } from 'react'
import { useAuth } from '../lib/hooks/context'
import { FlexContainer } from './components'
import NavBar from './navbar'

export default function Layout({ children, auth }) {

    const context = useAuth()
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        if (context.author)
            setLoggedIn(true)
    }, [context])

    return (
        <div className='flex flex-col h-screen bg-red-500'>
            {
                auth?
                <NavBar auth={loggedIn} btns={false}/>:
                <NavBar auth={loggedIn} btns={true}/>
            }
            <FlexContainer>
                {children}
            </FlexContainer>
        </div>
    )
} 