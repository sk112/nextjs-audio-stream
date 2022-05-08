import { useAuth } from "./../../lib/hooks/context";
import Layout from '../../components/layout'
import { useEffect, useMemo, useState } from 'react'
import { Container } from "../../components/components";
import { useRouter } from "next/router";


export default function Home() {

    const context = useAuth()
    const [roomId, setRoomId] = useState(null)
    const router = useRouter()

    useEffect(() => {
        console.log(context)
        if (context.socket !== null) {

            context.socket.emit('create-room', context.author.author.email)
            context.socket.on('room-created', (roomId) => {
                console.log('room created..', roomId)
                setRoomId(roomId)
                router.push(`/app/${roomId}`)
            })
        }

    }, [context, router])

    return (<Layout>
        <Container>
            Hello Roomies!!! by {roomId}
        </Container>
    </Layout>)
}