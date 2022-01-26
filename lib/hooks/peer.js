import { useMemo } from "react";
import { Peer } from 'peer'

export default function usePeer({ id }){

    const [peer, setPeer] = useState(null)

    const setPeerwithNewConnectionId = (id) => {
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

    return [peer, setPeerwithNewConnectionId]
}