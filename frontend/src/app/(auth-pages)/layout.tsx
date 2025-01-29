import { Card } from "@/components/ui/card";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center pt-8 min-h-screen">
      <Card className="max-w-fit flex flex-col gap-12 items-center p-8">
        <div>{children}</div>
      </Card>
    </div>
  );
}
