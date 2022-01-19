import { useRouter } from "next/router"
import { useCallback, useEffect } from "react"
import { Button, FlexContainer } from "../components/components"
import Layout from './../components/layout'

export default function Auth() {

    const router = useRouter()
    const handlerSignup = useCallback((event: any) => {
        router.push('/signup')
    }, [router])

    const handlerLogin = useCallback(e => {
        router.push('/login')
    }, [router])

    useEffect(() => {
        router.prefetch('/signup')
        router.prefetch('/login')
    }, [router])

    return (
        <Layout>
            <div>***Login or Signup to Enter..</div>
        </Layout>
    )
}