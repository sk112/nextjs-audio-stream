// import Peer from "peerjs";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button, InputField } from "../../components/components";
import Layout from "../../components/layout";
import { useAuth } from "../../lib/hooks/context";

export default function App() {

    const context = useAuth()
    const [peerid, setPeerId] = useState(null)
    const [peerObj, setPeerObj] = useState(null)
    const userRef = useRef(null)
    const [pConn, setPConn] = useState(null)

    useEffect(() => {
        import('peerjs').then(({ default: Peer }) => {

            var peer = new Peer(undefined, {
                host: '/',
                port: 9090,
                debug: 3,
                key: 'testingp'
            })

            peer.on('open', (id) => {
                console.log('Peer connection opened..', id)
                setPeerId(id)
            })

            peer.on('disconnect', () => {
                console.log('disconnnnected...')
                peer.reconnect()
            })
            peer.on('connection', (conn) => {
                console.log('________________attempting to create connectoion.............', conn.metadata)
                conn.on('open', () => {
                    conn.on('data', (data) => {
                        console.log('connection conn msg received...at ', data, conn.metadata)
                    })
                    console.log('first connection')
                })

                setPConn(conn)
            })

            setPeerObj(peer)
        })
    }, [])

    const onClickHandler = (event) => {
        event.preventDefault()

        const to = userRef.current.value

        // if (pConn && pConn.open) {
        //     console.log('closing conn..')
        //     pConn.close()
        // }
        // peerObj.on('connection', (conn) => {
        //     console.log('connected....')
        //     conn.on('open', () => {
        //         conn.on('data', data => {
        //             console.log('msg rec: ', data)
        //         })
        //         console.log('new connection')
        //     })
        //     conn.on('error', err => console.log(err))
        //     setPConn(conn)
        // })

        let conn = peerObj.connect(to, {
            metadata: {
                user: 'user'
            }
        })

        conn.on('open', () => console.log('conn oppnedd'))
        conn.on('error', err => console.log(err))
        conn.on('data', data => console.log(data))

        setPConn(conn)
    }

    const onClickSendData = () => {
        pConn.send('Hello World!! by' + peerid)
    }

    return (
        <Layout>
            <div>
                <InputField inputRef={userRef} placeholder={'msg'} />
                <Button text={'connect'} onClickCallback={onClickHandler} />

                <br />

                <Button text={'send'} onClickCallback={onClickSendData} />
            </div>
        </Layout>
    )
}