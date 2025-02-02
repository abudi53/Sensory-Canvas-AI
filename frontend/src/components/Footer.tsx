// components/Footer.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background mt-auto">
      <Card className="border-0 rounded-none">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Sensory Canvas AI</h3>
              <p className="text-sm text-muted-foreground">
                Creating artistic experiences through AI-powered generation
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="https://portfolio-six-livid-73.vercel.app/">
                      About Us
                    </Link>
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/generate-art">Generate Art</Link>
                  </Button>
                </li>
              </ul>
            </div>

            {/* Newsletter
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Stay Updated</h4>
              <form className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="max-w-[200px]"
                />
                <Button type="submit" size="sm">
                  Subscribe
                </Button>
              </form>
            </div> */}

            {/* Social Media */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Connect With Us</h4>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon" asChild>
                  <Link href="#">
                    <Facebook className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <Link href="#">
                    <Twitter className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <Link href="#">
                    <Instagram className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <Link href="#">
                    <Linkedin className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>

        {/* Copyright */}
        <CardFooter className="border-t py-4">
          <div className="w-full text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Sensory Canvas AI. All rights reserved.
          </div>
        </CardFooter>
      </Card>
    </footer>
  );
}
