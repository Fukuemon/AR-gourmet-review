import { LockClosedIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useRouter } from "next/router";
import Cookie from "universal-cookie";

const cookie = new Cookie();

export default function Auth() {
  const router = useRouter();

  // useState フック：　email, password, isLogin の状態を管理
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  // ログインの非同期関数を定義
  const login = async () => {
    try {
      // fetch を用いて、指定された API エンドポイントに POST リクエストを送信
      await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}authen/jwt/create/`, {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        //fetchの結果をresで受け取る
        .then((res) => {
          if (res.status === 400) {
            //認証に失敗した場合
            throw "authentication failed"; //エラーを返す
          } else if (res.ok) {
            //成功した場合
            return res.json(); //JSONオブジェクトに変換して返す
          } else {
            throw new Error(`Unexpected response: ${res.statusText}`);
          }
        })
        //cookieにアクセストークンを格納うする
        .then((data) => {
          if (data && "access" in data) {
            const options = { path: "/" };
            cookie.set("access_token", `${data.access}`, options); //ルートのpath以下でcookieが使える
          } else {
            throw new Error("Invalid login data");
          }
        });
      router.push("/main-page"); //成功した場合main-pageに移動する
    } catch (err) {
      alert(err);
    }
  };

  // email を用いた認証の非同期関数
  const authEmail = async (e) => {
    e.preventDefault();
    if (isLogin) {
      //ログインの場合
      login();
    } else {
      try {
        //registerAPIで新規アカウントを作成する
        await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/register/`, {
          method: "POST",
          body: JSON.stringify({ email: email, password: password }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          if (res.status === 400) {
            throw "authentication failed";
          }
        });
        //作成したら、そのままログインする
        login();
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt=""
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {/* 　ログインか新規作成かを判断 */}
          {isLogin ? "ログイン" : "アカウント作成"}
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {/* onSubmitでauthEmail関数を実行するようにする */}
        <form className="mt-8 space-y-6" onSubmit={authEmail}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Emailを入力"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="パスワードを入力"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="text-sm">
              {/* クリックするとisLoginの状態が反転する */}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="cursor-pointer font-medium text-blue hover:text-indigo-500"
              >
                {isLogin
                  ? "まだアカウントを作っていない場合はこちら"
                  : "ログインはこちら"}
              </span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLogin ? "ログイン" : "新規作成"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
