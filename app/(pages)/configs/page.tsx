import { fetchResources, fetchServerConfigs } from "@/api-utils/servers";
import { ServerDialog } from "@/app/_components/server-dialog";
import { ServerConfig } from "@/types/server";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {

  const configs = await fetchServerConfigs();

  return (
    <>
      <h1 className="text-4xl font-bold">Configs</h1>

      <div className="flex flex-wrap gap-4">
        {configs.map((config) => (
            <Suspense key={config.url + config.name + "Home"} fallback={
                <LoadingItem config={config}></LoadingItem>
            }>
                <ConfigItem config={config} key={config.name + config.url + 'configItem'} />
            </Suspense>
        ))}
      </div>

      <ServerDialog></ServerDialog>
    </>
  );
}

async function ConfigItem({ config }: { config: ServerConfig }) {

  const server = await fetchResources(config);
  const itemUrl = `configs/${config.name}`;

  if (server && server.state !== 'Error') {
    return (
        <Link href={itemUrl}>
            <div className="my-8">
                <div className="card w-64 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">
                    <p className="over-ellipsis">{config.name}</p>
                    </h2>

                    <p className="text-gray-500 over-ellipsis">{config.url}</p>

                    <i className="fa-solid fa-circle-check"></i>
                </div>
                </div>
            </div>
        </Link>
    );
  } else {
    return (
      <div className="my-8">
        <div className="card w-64 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              <p className="over-ellipsis">{config.name}</p>
            </h2>

            <p className="text-gray-500 over-ellipsis">{config.url}</p>

            <i className="fa-solid fa-triangle-exclamation"></i>
          </div>
        </div>
      </div>
    );
  }
}

async function LoadingItem({ config }: { config: ServerConfig }) {

    return (
        <div className="my-8">
            <div className="card w-64 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">
                        <p className="over-ellipsis">{config.name}</p>
                    </h2>

                    <p className="text-gray-500 over-ellipsis">{config.url}</p>

                    <div className="card-actions">
                        <i className="fa-solid fa-spinner fa-spin"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}
