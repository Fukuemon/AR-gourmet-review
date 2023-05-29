import Head from "next/head";
import Link from "next/link"
import Image from 'next/image'


export default function Layout({ children, title = "グルグラ by Nextjs"}) {
    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>
            {/* header部分　プロフィールと新規投稿 */}
            <header>
            <div className="navbar bg-base-100">
                <div className="navbar-start flex-1">
                    <a className="btn btn-ghost normal-case text-xl">グルメモ</a>
                </div>
                <div className="navbar-center">
                    <a className="btn btn-ghost normal-case text-xl">{title}</a>
                </div>  
                <div className="flex-none gap-2">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src=""/>
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                </a>
                            </li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            </header>
            <main className="flex flex-1 justify-center items-center flex-col w-screen">
                {children}
            </main>
            {/* footer部分。各ページへのリンクを作る */}
            <footer className={"w-full h-12 flex justify-center items-center border-t"}>
                {/* ボトムnavバー */}
                <div className="btm-nav">
                    <button>
                        <Link href="/">
                            <a className="text-red-300 hover:bg-gray-700 px-3 py-2 rounded">
                                <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path></svg>
                                    Home
                            </a>
                        </Link>
                    </button>
                    <button>
                        <Link href="/reviewpage">
                            <a className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">
                            <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                New Post
                            </a>
                        </Link>
                    </button>
                    <button>
                        <Link href="/artestview">
                            <a className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">
                            <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path stroke-linecap="round" stroke-line join="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"></path></svg>
                                AR view
                            </a>
                        </Link>
                    </button>
                </div>
            </footer>

        </div>
    );
}