

export default function Room(){

    const context = useAuth()
    const roomId = useMemo(() => {

        context.socket.emit('create-room', context.author.uuid)
        context.socket.on('room-created', (roomId) => {
            console.log('room created..', roomId)
        })
        return id;
    }, [])  


    return (

        <Layout>
                Hello Roomies!!!
        </Layout>
    )
}