"use client";

interface Props {
  children: React.ReactNode;
}

const RootLayoutClient: React.FC<Props> = ({ children }) => {
  return (
    <main className="min-h-full animated-background bg-gradient-to-r dark:from-violet-950 dark:via-blue-950 dark:to-indigo-900 from-violet-100 via-blue-100 to-indigo-100">
      {children}
    </main>
  );
};

export default RootLayoutClient;
