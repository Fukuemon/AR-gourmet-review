import Image from "next/image";
import Link from "next/link";

export default function Post({ post }) {
  // URLをデコード
  const decodedUrl = decodeURIComponent(post.menu_item_photo);
  console.log(decodedUrl);

  return (
    <div className="border rounded-md overflow-hidden shadow-md my-3">
      <Image
        src={decodedUrl} // デコードされたURLを使う
        alt={post.menu_item}
        width={500}
        height={300}
        layout="responsive"
        objectFit="cover"
      />
      <div className="p-4">
        <h2 className="font-bold text-lg">{post.menu_item}</h2>
        <div className="text-gray-700 mt-2">{post.review_text}</div>
        <div className="mt-3">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {"¥" + post.price}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {"Score: " + post.score}
          </span>
        </div>
        <div className="flex items-center mt-2">
          <Link href={"/post/" + post.id}>
            <a className="text-indigo-500 hover:text-indigo-600 text-sm">
              詳細を見る
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
