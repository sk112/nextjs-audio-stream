
// import { Peer } from 'peer'

import { useEffect, useState } from "react"
// import { Peer } from 'peer'

export default function PeerComponent({ id }) {

    const [peer, setPeer] = useState(null)

    useEffect(() => {
        // import('peer').then(({ default: Peer }) => {

        //     var peer = new Peer(id, {
        //         host: '/',
        //         port: 9090,
        //         key: 'testingp',
        //         debug: 3
        //     });

        //     peer.on('open', (id) => {
        //         console.log('Peer ', id, ' connected!!')
        //     })

        //     setPeer(peer)
        // })

        const init = async () => {
            const { Peer } = await import('peer')

            var peer = new Peer(id, {
                host: '/',
                port: 9090,
                key: 'testingp',
                debug: 3
            });

            peer.on('open', (id) => {
                console.log('Peer ', id, ' connected!!')
            })

            setPeer(peer)
        }
        // init()
    }, [])


    return (<>
        Hellow
    </>)

}