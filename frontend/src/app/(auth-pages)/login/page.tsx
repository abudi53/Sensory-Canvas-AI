// import { loginAction } from "@/actions/auth";
// import { redirect } from "next/navigation";
// import { getCurrentUser } from "@/lib/auth";

// export default async function LoginPage() {
//   const user = await getCurrentUser();
//   if (user) redirect("/dashboard");

//   return (
//     <form action={loginAction} className="max-w-sm mx-auto pt-10">
//       <div className="mb-4">
//         <label className="block mb-2">Username</label>
//         <input
//           name="username"
//           type="text"
//           required
//           className="w-full p-2 border rounded"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block mb-2">Password</label>
//         <input
//           name="password"
//           type="password"
//           required
//           className="w-full p-2 border rounded"
//         />
//       </div>
//       <button
//         type="submit"
//         className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//       >
//         Login
//       </button>
//     </form>
//   );
// }
import { loginAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <form className="flex-1 flex flex-col min-w-64">
      <h1 className="text-2xl font-medium">Sign in</h1>
      <p className="text-sm text-foreground">
        Don&apos;t have an account?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          Sign up
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="username">Username</Label>
        <Input name="username" placeholder="Your username" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Password</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
        <SubmitButton pendingText="Signing In..." formAction={loginAction}>
          Sign in
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
