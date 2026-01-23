import { FC, ReactNode } from "react";

export type ReactComponent<Props = {}> = FC<Props & { children?: ReactNode }>;
