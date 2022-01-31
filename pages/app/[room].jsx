import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Button, FlexContainer } from "../../components/components";
import Layout from "../../components/layout";
import { useAuth } from "../../lib/hooks/context";
import Peer from 'peerjs'

export default function Room() {
    const router = useRouter()
    const [contacts, setContacts] = useState([])
    const context = useAuth()
    const peerObj = useMemo(() => {
        var peer = new Peer(undefined, {
            host: '/',
            port: 9090,
            key: 'testingp',
            debug: 3
        });

        peer.on('open', (id) => {
            console.log('Peer ', id, ' connected!!')
        })

        peer.on('connection', conn => {
            conn.on('open',() => {

                conn.on('data', data => {
                    console.log('received msg', data)
                })
            })
        })

        return peer
    }, [])

    useEffect(() => {

        if (context.socket !== null && context.author !== null) {
            context.socket.emit('join-room', router.query.room, context.author.author.email, peerObj.id)

            context.socket.on('joined', (userid, peerid) => {
                setContacts(prev => {

                    peerObj.connect(peerid, {
                        metadata: userid
                    })

                    return [...prev, userid]
                })
            })
        }

    }, [context])

    return (
        <Layout>

            <FlexContainer>
                <div className="h-full w-full grid grid-cols-4 grid-rows-2 gap-3">
                    {
                        contacts.map(c => {
                            return <Contact id={c} />
                        })
                    }
                </div>
            </FlexContainer>
        </Layout>
    )
}

function Contact({ id }) {

    return (
        <div className="flex justify-center items-center border-4 border-slate-400 m-2 min-w-min rounded-lg">
            <div className="h-40 w-40 bg-gray-400 flex justify-center items-center rounded-full">
                {id}
            </div>
        </div>
    )
}