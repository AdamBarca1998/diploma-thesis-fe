"use client";

import { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useContext, useState } from 'react';
import { ZodSchema } from 'zod';

export type ZodRule = { name: string; fieldType: ZodSchema };

interface ZodContextType {
    zodRules: ZodRule[];
    setZodRules: Dispatch<SetStateAction<ZodRule[]>>;
}

const ZodContext = createContext<ZodContextType>({ zodRules: [], setZodRules: () => {} });

export const ZodProvider: FC<PropsWithChildren> = ({children}) => {
    const [zodRules, setZodRules] = useState<ZodRule[]>([]);

    return <ZodContext.Provider value={{ zodRules, setZodRules }}>{children}</ZodContext.Provider>;
};

export const useZodContext = () => useContext(ZodContext);
