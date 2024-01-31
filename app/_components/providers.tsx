"use client";

import { ThemeProvider } from "@material-tailwind/react"; 
import { PropsWithChildren} from "react";


export const Providers = ({ children }: PropsWithChildren) => {

	return (
		<ThemeProvider>
			{children}
		</ThemeProvider>
	);
};