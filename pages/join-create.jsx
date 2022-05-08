
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { Button, Container, FlexContainer, InputField } from '../components/components'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'

const Home = () => {

  const inputRef = useRef(null)
  const router = useRouter()

  const onClickHandler = (event) => {
    const mid = inputRef.current.value

    router.push(`/app/${mid}`)
  }

  const onCreateClickHandler = (event) => {
    // event.preventDefault()
    console.log('click crteate room')
    router.push('/app')
  }
  return (
    <Layout >

        <Container itemsat='end' extras='pb-10 border-b-2 border-gray-300/50'>
          
          <InputField inputRef={inputRef} placeholder={'Meeting ID'} extras="mr-5 w-5/6"/>
          <Button  text="Join" onClickCallback={onClickHandler} extras='md:w-1/4 w-auto'/>
        </Container>
        <Container itemsat='end' extras='pt-10'>
          <Button text='Create Room' onClickCallback={onCreateClickHandler} extras='md:w-1/2 w-auto' />
        </Container>

    </Layout>
  )
}

export default Home
