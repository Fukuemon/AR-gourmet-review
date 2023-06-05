// ReactとNext.jsのライブラリをインポートします
import { useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";

// カスタムコンポーネントをインポートします
import Layout from "../components/Layout";
import FileUpload from "../components/FileUpload";

// ModelViewerコンポーネントを動的にインポートします
// これにより、コンポーネントはクライアントサイドでのみロードされ、サーバーサイドレンダリング時にはロードされません
const DynamicModelViewer = dynamic(() => import("../components/ModelViewer"), {
  ssr: false,
});

// モデル選択のロジックを扱うためのカスタムフックです
const useModel = (defaultModel) => {
  const [modelSrc, setModelSrc] = useState(defaultModel);

  // ファイル名と表示名を含むオブジェクトとして3Dモデルの配列を更新しました
  const models = [
    { filename: "/slime.glb", displayName: "スライム" },
    { filename: "/ステーキコンボ.glb", displayName: "ステーキ" },
    { filename: "/model1.glb", displayName: "ランチプレート" },
    { filename: "/sneaker.glb", displayName: "スニーカー" },
  ];

  // ユーザーが新しいモデルを選択したときに、modelSrcの状態を選択されたモデルのファイル名に更新します
  const handleModelChange = (event) => {
    const selectedModel = models.find(
      (model) => model.displayName === event.target.value
    );
    setModelSrc(selectedModel.filename);
  };

  return { modelSrc, models, handleModelChange };
};

export default function ARview() {
  // デフォルトの3Dモデルのファイルパスを設定します
  const defaultModel = "/slime.glb";
  // useModelフックから、選択されているモデルのファイルパス、利用可能な全モデルのリスト、モデル選択時のハンドラー関数を取得します
  const { modelSrc, models, handleModelChange, handleModelUpload } =
    useModel(defaultModel);

  return (
    <Layout title="ARView">
      <Head>
        <title>AR Model Viewer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-1 justify-center items-center flex-col w-screen">
        <h1 className="text-2xl font-bold mb-4">3Dモデル表示ページ</h1>

        <div className="container max-w-screen-lg mx-auto">
          <h1 className="mx-3">モデル切り替え</h1>
          {/* ユーザーが異なる3Dモデルを選択できるようにするselect要素。表示名に基づいて選択します。 */}
          <select
            onChange={handleModelChange}
            className="border border-black-100 rounded-lg p-2"
          >
            {models.map((model, index) => (
              // 各モデルオブジェクトをselectのオプションとして表示します。valueは表示名です。
              <option key={index} value={model.displayName}>
                {model.displayName}
              </option>
            ))}
          </select>
        </div>
        <div className="container max-w-screen-lg mx-auto h-64 sm:h-[60vh] border border-purple-100 rounded-lg mt-4 mb-4">
          {/* 3Dモデルを表示するDynamicModelViewerコンポーネント。表示するモデルはmodelSrcの状態によります。 */}
          <DynamicModelViewer src={modelSrc} />
        </div>

        <h1 className="m-5 text-1xl font-bold mb-2">
          モデルをアップロードしたい場合
        </h1>

        {/* ユーザーが新しい3DモデルをアップロードできるようにするFileUploadコンポーネント */}
        <FileUpload onUpload={handleModelUpload} />
      </main>
    </Layout>
  );
}
