"use client"
import { signIn } from "next-auth/react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github } from "lucide-react"

export default function SignIn() {
  const handleSignIn = () => {
    signIn("github", { callbackUrl: "/" })
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <Image
        src="/Background.jpeg"
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute z-0"
      />
      <div className="relative z-10">
        <Card className="w-[350px] bg-black  backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription className="text-white">Sign in to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleSignIn} className="w-full">
              <Github className="mr-2 h-4 w-4" />
              Sign in with GitHub
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}