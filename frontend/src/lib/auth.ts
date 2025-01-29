import { cookies } from "next/headers";

export async function getCurrentUser() {
  const accessToken = (await cookies()).get("access_token")?.value;

  if (!accessToken) return null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}
