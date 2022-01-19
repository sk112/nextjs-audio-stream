import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Button, Container, FlexContainer, InputField } from "../components/components";
import Layout from "../components/layout";
import getFirebase from "../lib/firebase";
import { useAuth } from "../lib/hooks/context";

export default function SignUp() {
    const emailRef = useRef(null)
    const pass1Ref = useRef(null)

    const router = useRouter()
    const context = useAuth()
    const [error, setError] = useState(false);

    useEffect(() => {
        console.log('context', context)
        if (context?.author)
            router.push('/')

    }, [context, router])



    const onClickHandler = async (e: any) => {
        e.preventDefault()

        const email = emailRef.current.value
        const pass1 = pass1Ref.current.value

        let instance = getFirebase()
        console.log(instance, getAuth(instance).currentUser)
        try {
            const e: string = email
            // const user = await reateUserWithEmailAndPassword(getAuth(instance), e, pass1)
            signInWithEmailAndPassword(getAuth(instance), e, pass1)
                .then(user => {
                    console.log(user)
                    router.push('/')
                })
                .catch(err => {
                    console.log(err.code)
                    console.log(err.message)
                })
        } catch (e) {
            console.log(e)
        }

    }
    return (
        <Layout auth>
            <FlexContainer>
                <Container itemsat="center" extras='flex-col'>
                    <InputField inputRef={emailRef} placeholder="Email Address" />
                    <InputField inputRef={pass1Ref} placeholder="Password" />
                </Container>
                <Container itemsat="center">
                    <Button text='SignIn' onClickCallback={onClickHandler} extras='mt-2' />
                </Container>
            </FlexContainer>
        </Layout>
    )
}