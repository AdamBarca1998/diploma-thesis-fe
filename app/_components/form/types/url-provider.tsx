"use client";

import { FC, PropsWithChildren, createContext, useContext, useState } from 'react';

const UrlContext = createContext<string>("");

export const UrlProvider: FC<PropsWithChildren<{url: string}>> = ({
    children,
	url
}) => {
    return <UrlContext.Provider value={url}>{children}</UrlContext.Provider>;
};

export const useUrlContext = () => useContext(UrlContext);
