import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRef } from 'react'
import { Button, Container, FlexContainer, InputField } from '../components/components'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  const inputRef = useRef(null)
  



  const onClickHandler = (event: any) => {
    console.log(event)
    console.log('OnClikc handler!!')
  }
  return (
    <FlexContainer >

        <Container itemsat='end' extras='pb-10 border-b-2 border-gray-300/50'>
          
          <InputField inputRef={inputRef} />
          <Button  text="Join" onClickCallback={onClickHandler} extras='md:w-1/4 w-auto'/>
        </Container>
        <Container itemsat='end' extras='pt-10'>
          <Button text='Create Room' onClickCallback={() => console.log('creating')} extras='md:w-1/2 w-auto' />
        </Container>

    </FlexContainer>
  )
}

export default Home
