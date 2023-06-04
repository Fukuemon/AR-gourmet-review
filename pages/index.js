import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'  // Fix this line
import Auth from '../components/Auth'

export default function Home() {
  return (
    <Layout showHeader={false} showFooter={false}>
      <Auth />
    </Layout>
  )
}
