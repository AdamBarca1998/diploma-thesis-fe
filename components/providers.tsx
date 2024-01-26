"use client";

import {AppServer, ServerConfig} from "@/types/server";
import { ThemeProvider } from "@material-tailwind/react"; 
import { FC, PropsWithChildren, createContext, useContext, useState } from "react";


export const Providers = ({ children }: PropsWithChildren) => {

	return (
		<ThemeProvider>
			<ServersProvider>
					{children}
			</ServersProvider>
		</ThemeProvider>
	);
};

const ServersContext = createContext<AppServer[]>([]);

export const useServersContext = () => useContext(ServersContext);

export const ServersProvider: FC<PropsWithChildren> = ({ children }) => {

	const [servers, _] = useState<AppServer[]>([]);

	return (
		<ServersContext.Provider value={servers}>
			{children}
		</ServersContext.Provider>
	);
};