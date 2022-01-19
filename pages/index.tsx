import { getAuth } from "firebase/auth";
import { NextApiRequest, NextApiResponse } from "next";
import Router, { useRouter } from "next/router";
import { useCallback, useEffect, useRef } from "react";
import useSWR from "swr";
import { Button, FlexContainer } from "../components/components";
import { useAuth } from "../lib/hooks/context";
import Layout from './../components/layout'

export default function App() {

    const context = useAuth()
    const router = useRouter()

    useEffect(() => {

        console.log('context', context)
        if (!context?.loading && !context?.author)
            router.push('/auth')
    }, [context, router])

    return (
        <Layout>
                Hello World!
        </Layout>
    )
}
