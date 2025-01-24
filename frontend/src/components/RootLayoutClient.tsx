"use client";

import { ThemeProvider } from "./theme-provider";
import NavBar from "./NavBar";

interface Props {
  children: React.ReactNode;
}

const RootLayoutClient: React.FC<Props> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NavBar />
      <main>{children}</main>
    </ThemeProvider>
  );
};

export default RootLayoutClient;
