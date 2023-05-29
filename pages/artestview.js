import Layout from '../components/Layout'
import Image from 'next/image'
import Head from 'next/head';
import FileUpload from '../components/FileUpload';
import dynamic from 'next/dynamic';
import { useState } from 'react'

const DynamicModelViewer = dynamic(
    () => import('../components/ModelViewer'),
    { ssr: false } // This line is important. It's what prevents server-side render
)

export default function ARview() {
    const [modelSrc, setModelSrc] = useState("/slime.glb");

    return (
        <Layout title='ARView'>
            <Head>
                <title>AR Model Viewer</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex flex-1 justify-center items-center flex-col w-screen">
                <h1 className="text-2xl font-bold mb-4">
                3Dモデル表示ページ
                </h1>

                <div className="container max-w-screen-lg mx-auto">
                <FileUpload onUpload={setModelSrc} />

                </div>
                <div className="container max-w-screen-lg mx-auto h-64 sm:h-[60vh]">
                <DynamicModelViewer src={modelSrc} />
                </div>
            </main>
        </Layout>
    );
}