import { cookies } from "next/headers";

export async function getCurrentUser() {
  const store = await cookies();
  let accessToken = store.get("access_token")?.value;

  if (!accessToken) return null;

  try {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (response.ok) {
      return await response.json();
    }

    // If token is invalid, try refresh
    if (response.status === 401) {
      const refreshToken = store.get("refresh_token")?.value;
      if (!refreshToken) return null;

      const refreshResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/token/refresh/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: refreshToken }),
        }
      );

      if (!refreshResponse.ok) return null;
      const { access, refresh } = await refreshResponse.json();

      // Store new tokens
      store.set("access_token", access, { path: "/" });
      store.set("refresh_token", refresh, { path: "/" });
      accessToken = access;

      // Retry fetching user
      response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (!response.ok) return null;
      return await response.json();
    }

    return null;
  } catch {
    return null;
  }
}
