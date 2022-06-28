import Head from 'next/head'
import {useEffect} from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from './components/Header'
import {useAuth} from './context/AuthContext'
import { useRouter } from 'next/router'

export default function Home() {
    const {currentUser} = useAuth()
    const router = useRouter();
    console.log(currentUser)
    useEffect(()=>{
        if(!currentUser){
            router.push('/login')
        }
    },[currentUser,router])
    return (
        <div className="bg-light w-100 h-100">
            <Header />
            <div className="h-100">
        
            </div>
        </div>
    )
}

