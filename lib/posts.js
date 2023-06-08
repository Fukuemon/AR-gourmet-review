import Cookie from "universal-cookie";

const cookie = new Cookie();

//投稿一覧取得
export async function getPostList() {
  const token = cookie.get("access_token");
  console.log("Token: ", token); // ブラウザのコンソールにトークンを表示

  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/post/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${cookie.get("access_token")}`,
    },
  });
  const posts = await res.json();
  return posts;
}

//投稿一覧ID取得
export async function getPostIds() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/post/`, {
    method: "GET",
  });

  const posts = await res.json(); // ←この行が不足していました

  return posts.map((post) => {
    return {
      params: {
        // "params" が間違って "parmas" と入力されていました
        id: String(post.id),
      },
    };
  });
}

//投稿詳細取得
export async function getPostDetail(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/post/${id}/`,
    {
      method: "GET",
    }
  );
  const post = await res.json();
  return post;
}
