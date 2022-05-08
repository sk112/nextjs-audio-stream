import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, FlexContainer, InputField } from "../../components/components";
import Layout from "../../components/layout";
import { useAuth } from "../../lib/hooks/context";

export default function Room() {
    const router = useRouter()

    /**
     *  {userid: peerid}
     */
    const [contacts, setContacts] = useState({})

    const context = useAuth()

    /**
     * TODO: peer leeaving room impl missing
     */
    const [peerid, setPeerid] = useState(null)
    const [peerObj, setPeerObj] = useState(null)

    /* Loc Peers Vars used for communication 
    *  to First Contact and Connect to another Loc Peer.
    */
    const [locPeers, setLocPeers] = useState({})

    useEffect(() => {
        import('peerjs').then(({ default: Peer }) => {
            var peer = new Peer(undefined, {
                host: '/',
                port: 9090,
                key: 'testingp',
                debug: 1
            });

            peer.on('open', (id) => {
                console.log('PEER MAIN: Main Peer ', id, ' connected!!')
                setPeerid(id)
            })
            peer.on('connection', (conn) => {
                conn.on('open', () => {
                    conn.on('data', (d) => {
                        console.log('PEER: (ondata event): ', d)

                        setLocPeers(prev => {
                            prev[d['spid']] = d['fid']

                            return {...prev}
                        })
                    })
                })
                conn.on('error', (err) => {
                    console.log('__________________________________ERROR conn: ', err)
                })
            })
            peer.on('error', err => {
                console.log('PPPPPPPPEER error :   ', err)
            })

            setPeerObj(peer)
        })

    }, [])



    useEffect(() => {

        if (context.socket !== null && context.author !== null && (peerid != null | undefined)) {

            context.socket.emit('join-room', router.query.room, context.author.author.email, peerid)
            context.socket.on('joined', (userid, peerid) => {

                setContacts(prev => {
                    if (userid !== context.author.author.email) {

                        prev[userid] = peerid
                    }

                    return { ...prev }
                })
            })

            context.socket.on('initial-joined-contacts', (peers) => {

                if (peers !== null) {
                    for (const [k, v] of Object.entries(peers)) {

                        setContacts(prev => {
                            if (context.author.author.email !== k) {
                                prev[k] = v[v.length - 1]
                            }

                            return { ...prev }
                        })
                    }
                }
            })
        }
    }, [context, peerid])

    return (
        <Layout>
            <div> {peerid}</div>
            <FlexContainer>
                <div className="h-full w-full grid grid-cols-2 grid-rows-1 gap-3">
                    {contacts !== undefined ?
                        Object.keys(contacts).map((userid, index) => {
                            return <Contact index={index} id={userid} peerid={contacts[userid]} peerObj={peerObj} selfpid={peerid} setLocPeers={setLocPeers} fid={locPeers[contacts[userid]]} userid={context.author.author.email}/>
                        }) :
                        <></>
                    }
                </div>
            </FlexContainer>
        </Layout>
    )
}

function Contact({ index, id, peerid, peerObj, selfpid, setLocPeers, fid, userid }) {

    const [msgs, setMsgs] = useState([])
    const inputRef = useRef(null)
    const [pConn, setPConn] = useState(null)

    // Loc Peer Variables.
    const [locPeerid, setLocPeerid] = useState(null)
    const [locPeerObj, setLocPeerObj] = useState(null)
    const [fpid, setFPid] = useState(null)

    useEffect(() => {
        import('peerjs').then(({ default: Peer }) => {
            var peer = new Peer(undefined, {
                host: '/',
                port: 9090,
                key: 'testingp',
                debug: 1
            });

            peer.on('open', (id) => {
                console.log('LOC PEER: Local Peer (onopen event)', id, ' connected!!')
                setLocPeerid(id)
                setLocPeers(prev =>{
                    prev[id] = null

                    return {...prev}
                })
            })

            peer.on('connection', (conn) => {
                conn.on('open', () => {
                    conn.on('data', (d) => {
                        console.log('LOC PEER: ', locPeerid, ' : (ondata event)', d)
                    })
                })
                conn.on('error', (err) => {
                    console.log('LOC PEER: (onerror dataconnection event):', err)
                })
                setPConn(conn)
            })
            peer.on('error', err => {
                console.log('LOC PEER: (onerror peer event): ', err)
            })
            setLocPeerObj(peer)
        })
    }, [locPeerid])


    useEffect(() => {
        if (pConn === null && locPeerid !== null) {
            pConnCreateCallback()
        }
    }, [pConn, locPeerid])

    useEffect(() => {
        if(fid !== null && locPeerObj !== null){
            console.log('LOC PEER: (effect(fid)): ', fid , ' at ', locPeerid)

            let conn = locPeerObj.connect(fid, {
                metadata: {
                    fromuser: userid
                }
            })
            conn.on('open', () => {
                conn.on('data', data => {
                    console.log('PEER CONTACT CONNECT: (ondata event): ', data, conn.metadata)
                })
    
                conn.send({
                    'type': 'CONNECT',
                    'pid': peerid,
                    'spid': selfpid,
                    'fid': locPeerid,
                    'desc': 'sending by first contact'
                })
            })

            setFPid(fid)
        }
    }, [fid])

    const pConnCreateCallback = useCallback(() => {

        let conn = peerObj.connect(peerid, {
            metadata: {
                fromuser: userid
            }
        })
        conn.on('open', () => {
            conn.on('data', data => {
                console.log('PEER CONTACT CONNECT: (ondata event): ', data, conn.metadata)
            })

            conn.send({
                'type': 'CONNECT',
                'pid': peerid,
                'spid': selfpid,
                'fid': locPeerid
            })
        })

        conn.on('error', err => {
            console.log('PEER CONTACT CONNECT: (onerror): ', err)
        })
    }, [peerObj, peerid, locPeerid])

    const onClickCallback = useCallback((event) => {
        event.preventDefault()
        console.log('ON CLICK: clicked')
        const data = inputRef.current.value
        pConn.send({
            'pid': selfpid,
            'plocid': locPeerid,
            'msg': 'Hello, ' + data
        })

    }, [pConn,locPeerid, selfpid])



    /**
     * TODO: min width containers.
     */
    return (
        <div key={index} className="flex flex-col border-4 border-slate-400 m-2 min-w-fit">
            <div className="flex flex-col h-20 bg-gray-400 justify-center items-center min-w-fit">
                {id}
                <small className="font-thin">{peerid}</small>
                <small className="font-thin">{locPeerid}</small>
            </div>
            <div className="flex-auto bg-red-500">

            </div>
            <div className="flex flex-row h-auto w-full">
                <InputField inputRef={inputRef} placeholder="Message here!" extras="w-5/6" />
                <Button text={"Send"} onClickCallback={onClickCallback} extras={"w-1/6 m-1"} />
            </div>
        </div>
    )
}


