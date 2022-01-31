import { useRouter } from "next/router"
import { useCallback, useEffect } from "react"
import { Button, FlexContainer } from "../components/components"
import { useAuth } from "../lib/hooks/context"
import Layout from '../components/layout'

export default function Auth() {

    const router = useRouter()
    const context = useAuth()

    const handlerSignup = useCallback((event) => {
        router.push('/signup')
    }, [router])

    const handlerLogin = useCallback(e => {
        router.push('/login')
    }, [router])

    useEffect(() => {

        if(context.author)
            router.push('/')

        router.prefetch('/signup')
        router.prefetch('/login')
    }, [context.author, router])

    return (
        <Layout>
            <div>***Login or Signup to Enter..</div>
        </Layout>
    )
}