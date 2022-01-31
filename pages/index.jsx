import Router, { useRouter } from "next/router";
import { useCallback, useEffect, useRef } from "react";
import { Button, FlexContainer } from "../components/components";
import { useAuth } from "../lib/hooks/context";
import Layout from '../components/layout'

export default function App() {

    const context = useAuth()
    const router = useRouter()

    useEffect(() => {

        console.log('context', context)
        if (!context?.loading && !context?.author)
            router.push('/auth')

        

    }, [context, router])

    const onClickHandler = (e) => {
        e.preventDefault()

        context.socket.emit('ping', 'test123')
        router.push('/join-create')
    }

    return (
        <Layout>
            Hello World!
            <Button text="Go To Rooms" onClickCallback={onClickHandler} />
        </Layout>
    )
}
