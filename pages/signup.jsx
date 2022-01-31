import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { Button, Container, FlexContainer, InputField } from "../components/components";
import Layout from "../components/layout";
import getFirebase from "../lib/firebase";

export default function SignUp() {
    const emailRef = useRef(null)
    const pass1Ref = useRef(null)
    const pass2Ref = useRef(null)

    const router = useRouter()

    const [error, setError] = useState(false);

    const onClickHandler = async (e) => {
        e.preventDefault()

        const email = emailRef.current.value
        const pass1 = pass1Ref.current.value
        const pass2 = pass2Ref.current.value

        console.log(email, pass1, pass2)
        if (pass1 === pass2) {
            let instance = getFirebase()
            console.log(instance, getAuth(instance).currentUser)
            try {
                const e = email
                
                createUserWithEmailAndPassword(getAuth(instance), e, pass1)
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
    }
    return (
        <Layout auth>
            <FlexContainer>
                <Container itemsat="center" extras='flex-col'>
                    <InputField inputRef={emailRef} placeholder="Email Address" />
                    <InputField inputRef={pass1Ref} placeholder="Password" />
                    <InputField inputRef={pass2Ref} placeholder="Confirm Password" />
                </Container>
                <Container itemsat="center">
                    <Button text='Create Account' onClickCallback={onClickHandler} extras='mt-2' />
                </Container>
            </FlexContainer>
        </Layout>
    )
}