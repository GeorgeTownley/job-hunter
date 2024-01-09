"use client";

import { SessionProvider } from "next-auth/react";
import { FC } from "react";

type Props = {
  children: React.ReactNode;
};

export const Providers: FC<Props> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
