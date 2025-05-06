"use client";

interface Props {
  children: React.ReactNode;
}

const RootLayoutClient: React.FC<Props> = ({ children }) => {
  return (
    <main className="min-h-full bg-gradient-to-t dark:from-black dark:via-gray-900 dark:to-gray-900 from-white via-gray-100 to-gray-100">

    {/* <main className="min-h-full animated-background bg-gradient-to-r dark:from-violet-950 dark:via-blue-950 dark:to-indigo-900 from-violet-100 via-blue-100 to-indigo-100"> */}
      {children}
    </main>
  );
};

export default RootLayoutClient;
