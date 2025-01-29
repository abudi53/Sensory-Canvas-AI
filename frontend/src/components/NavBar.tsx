"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import ThemeSwitch from "./ThemeSwitch";
import Link from "next/link";
import { logoutAction } from "@/app/actions";

export default function NavBar() {
  return (
    <nav className="w-full">
      <NavigationMenu className="sticky top-0 z-10 shadow-md flex p-4 px-10 w-full justify-between max-w-full">
        <NavigationMenuList className="flex space-x-4">
          <NavigationMenuItem>
            <Link href="/" passHref>
              <h1 className="text-xl font-bold">Sensory Canvas AI 🎨</h1>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuList className="flex space-x-4">
          <NavigationMenuItem>
            <Link href="/contact" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Contact
              </NavigationMenuLink>
            </Link>{" "}
            <Link href="/generate-art" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Generate Art
              </NavigationMenuLink>
            </Link>{" "}
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              onClick={async (e) => {
                e.preventDefault(); // Prevent default navigation
                try {
                  await logoutAction(); // Await the logout action
                } catch (error) {
                  console.error("Logout failed:", error);
                  // Optionally, display an error message to the user
                }
              }}
            >
              Sign out
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <ThemeSwitch />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
