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

interface User {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface NavbarProps {
  user: User;
}

const Navbar = ({ user }: NavbarProps) => {
  return (
    <nav className="sticky top-0 z-10 shadow-md flex w-full justify-between max-w-full bg-inherit">
      <NavigationMenu className="flex p-4 px-10 w-full justify-between max-w-full">
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
            {user ? (
              <Link href={"/"} legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  onClick={async (e) => {
                    e.preventDefault();
                    try {
                      await logoutAction();
                    } catch (error) {
                      console.error("Logout failed:", error);
                    }
                  }}
                >
                  Sign out
                </NavigationMenuLink>
              </Link>
            ) : (
              <Link href="/sign-in" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Sign in
                </NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
          <NavigationMenuItem>
            <ThemeSwitch />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default Navbar;
