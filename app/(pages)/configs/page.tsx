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
                <Item config={config} icon="fa-solid fa-spinner fa-spin"></Item>
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
            <Item config={config} icon="fa-solid fa-circle-check"></Item>
        </Link>
    );
  } else {
    return (
      <Item config={config} icon="fa-solid fa-triangle-exclamation"></Item>
    );
  }
}

async function Item({ config, icon }: { config: ServerConfig, icon: String }) {

  return (
      <div className="mt-8">
        <div className="indicator">
          <div className="card w-64 bg-base-100 shadow-xl">
              <div className="card-body">
                  <h2 className="card-title">
                      <p className="over-ellipsis">{config.name}</p>
                  </h2>

                  <p className="text-gray-500 over-ellipsis">{config.url}</p>
              </div>
          </div>

          <span className="indicator-item badge">
            <i className={`${icon}`}></i>
          </span> 
        </div>
      </div>
  );
}
