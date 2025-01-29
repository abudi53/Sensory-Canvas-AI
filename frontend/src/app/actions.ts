"use server";

import { encodedRedirect } from "@/utils/utils";
import { serverClient } from "@/lib/server-client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData): Promise<void> {
  // try {
  const response = await serverClient({
    endpoint: "/login/",
    method: "POST",
    body: {
      username: formData.get("username"),
      password: formData.get("password"),
    },
  });

  const data = await response.json();

  if (response.ok) {
    const cookieStore = await cookies();

    // Set cookies with proper configuration
    cookieStore.set("access_token", data.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    cookieStore.set("refresh_token", data.refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    // Explicit return after setting cookies
    return redirect("/");
  }

  return encodedRedirect("error", "/login", "Login failed");
  // } catch {
  //   return encodedRedirect("error", "/login", "Connection error");
  // }
}

export async function registerAction(formData: FormData) {
  try {
    const response = await serverClient({
      endpoint: "/register/",
      method: "POST",
      body: {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
      },
    });

    if (response.ok) {
      return loginAction(formData);
    }

    const data = await response.json();
    return { error: data.detail || "Registration failed" };
  } catch {
    return { error: "Connection error" };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  // try {
  const refreshToken = cookieStore.get("refresh_token")?.value;

  // Only attempt server logout if refresh token exists
  if (refreshToken) {
    const response = await serverClient({
      endpoint: "/logout/",
      method: "POST",
      body: { refresh_token: refreshToken },
    });

    // Handle specific token expiration error (401 Unauthorized)
    if (response.status === 401) {
      console.log("Token already expired, proceeding with client-side cleanup");
    } else if (!response.ok) {
      console.error("Logout failed:", await response.text());
    }
  }

  // Always clear cookies regardless of token state
  cookieStore.set("access_token", "", {
    maxAge: -1,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
  cookieStore.set("refresh_token", "", {
    maxAge: -1,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });

  return redirect("/login");
  // } catch (error) {
  //   // Fallback cleanup in case of network errors
  //   cookieStore.set("access_token", "", { maxAge: -1, path: "/" });
  //   cookieStore.set("refresh_token", "", { maxAge: -1, path: "/" });
  //   return redirect("/login");
  // }
}
