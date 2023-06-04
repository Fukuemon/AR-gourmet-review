import { LockClosedIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Cookie from "universal-cookie"

const cookie = new Cookie();

export default function Auth() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);

    const login = async () => {
        try {
            await fetch( //エンドポイントをetchする
                `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/auth/jwt/create/`,
                {
                    method: "POST",
                    body: JSON.stringify({ email: email, password: password}),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            //fetchの結果をresで受け取る
            .then((res) => {
                if (res.status === 400) { //認証に失敗した場合
                    throw "authentication failed"; //エラーを返す
                } else if (res.ok) { //成功した場合
                    return res.json(); //JSONオブジェクトに変換して返す
                }
            })
            //cookieにアクセストークンを格納うする
            .then((data) => {
                const options = { path: "/" };
                cookie.set("access_token", data.access, options); //ルートのpath以下でcookieが使える
            });
            router.path("/main-page") //成功した場合main-pageに移動する
        } catch (err) {
            alert(err);
        }
        };  
    

return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt=""
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
        </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
            <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
            </label>
            <div className="mt-2">
                <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
            </div>

            <div>
            <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
                </label>
                <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                </a>
                </div>
            </div>
            <div className="mt-2">
                <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
            </div>

            <div>
            <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Sign in
            </button>
            </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Start a 14 day free trial
            </a>
        </p>
        </div>
    </div>
)
}