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
      <main className="animated-background min-h-screen bg-gradient-to-r dark:from-violet-950 dark:via-blue-950 dark:to-indigo-900 from-violet-100 via-blue-100 to-indigo-100">
        {children}
      </main>
    </ThemeProvider>
  );
};

export default RootLayoutClient;
