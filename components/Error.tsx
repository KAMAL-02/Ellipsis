"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FileQuestion, MoveLeft, Compass, RefreshCcw } from "lucide-react";

export default function Error() {
  const router = useRouter();
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <Compass 
              className="w-32 h-32 text-muted-foreground opacity-10"
              style={{ transform: `rotate(${rotation}deg)` }}
            />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center">
            <FileQuestion className="w-24 h-24 text-primary mb-4" />
            <h1 className="text-4xl font-bold tracking-tight">404</h1>
            <p className="mt-2 text-xl font-semibold">Page Not Found</p>
          </div>
        </div>
        
        <p className="text-muted-foreground mt-4">
          Oops! It seems you've ventured into uncharted territory. The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button
            variant="default"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <MoveLeft className="w-4 h-4" />
            Go Back
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="flex items-center gap-2"
          >
            <RefreshCcw className="w-4 h-4" />
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
}