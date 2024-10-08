"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const font = Montserrat({ weight: '600', subsets: ['latin'] });

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative h-16 w-80 mr-4 hidden md:block">
          <Image fill alt="Logo" src="/logo4.png" />
        </div>
        <div className="relative h-20  w-20  md:hidden">
          <Image fill alt="Logo" src="/logo3.png" />
        </div>
        {/* <h1 className={cn("text-2xl font-bold text-white", font.className)}>
          Genius
        </h1> */}
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
          <Button variant="outline" className="rounded-full">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  )
}