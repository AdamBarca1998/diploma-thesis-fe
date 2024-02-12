'use client';

import { createContext, useContext } from 'react';
import { ZodSchema } from 'zod';

export type ZodRule = { name: string; fieldType: ZodSchema };

export const ZodContext = createContext<ZodRule[]>([]);

export const useZodContext = () => useContext(ZodContext);