import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'  // Fix this line
import Auth from '../components/Auth'

export default function Home() {
  return (
    <div  className="flex justify-center items-center flex-col min-h-screen text-white ">
    <Layout showHeader={false} showFooter={false}>
      <Auth />
    </Layout>
    </div>
  )
}
