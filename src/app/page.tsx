"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";
import { useState } from "react";

function Error({ message }: { message: string }) {
  return <div className="text-red-500 text-sm mt-2">{message}</div>;
}

export default function Home() {
  const [userType, setUserType] = useState<"admin" | "user">("user");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // const router = useRouter();
  const handleLogin = async (e: any) => {

  }



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-sky-100 dark:from-blue-950 dark:to-sky-900">

      <div className=" bg-gradient-to-r from-green-300 via-blue-500 to-green-300 h-100 w-full flex items-center justify-center ">
        <div className="text-white text-5xl">LOGO</div>
        <div className="text-white p-20 flex items-center flex-col gap-4">
          <h1 className="text-6xl font-bold">Nocturnals</h1>
          <h5 >Lorem ipsum dolor sit amet </h5>
        </div>
      </div>

      <div className="flex items-center justify-center gap-10 mt-28">
        <div className="flex flex-col items-center gap-6 p-10 w-1/4">
          <div>Image</div>
          <div className="text-2xl font-semibold">Feature 1</div>
          <div className="text-gray-400 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacinia mi quis euismod ultrices.</div>
        </div>
        <div className="flex flex-col items-center gap-6 p-10 w-1/4">
          <div>Image</div>
          <div className="text-2xl font-semibold">Feature 1</div>
          <div className="text-gray-400 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacinia mi quis euismod ultrices.</div>
        </div>
        <div className="flex flex-col items-center gap-6 p-10 w-1/4">
          <div>Image</div>
          <div className="text-2xl font-semibold">Feature 1</div>
          <div className="text-gray-400 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacinia mi quis euismod ultrices.</div>
        </div>
      </div>


      <div className="mt-28  w-1/2 mb-5">
        <Card className="w-full flex flex-col gap-12">
          <CardHeader className="flex flex-col items-center">
            <CardTitle className="text-2xl font-semibold">Login</CardTitle>
            {error && <Error message={error} />}
            <CardDescription>
              to your account if you already have one
            </CardDescription>
            {error && <Error message={error} />}
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Input
                name="email"
                type="email"
                placeholder="Enter Email"
                onChange={handleLogin}
              />
            </div>
            {error && <Error message={error} />}
            <div className="space-y-1">
              <Input
                name="password"
                type="password"
                placeholder="Enter Password"
                onChange={handleLogin}
              />
            </div>
            <div className="flex bg-gray-200 p-1 rounded-md justify-between text-sm">
              <div onClick={() => setUserType("admin")} className={` w-1/2 py-2 ${userType === "admin" ? "bg-white rounded-sm" : "text-gray-500"} text-center`}>Admin</div>
              <div onClick={() => setUserType("user")} className={` w-1/2 py-2 ${userType === "user" ? "bg-white rounded-sm" : "text-gray-500"} text-center`}>User</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleLogin}>
              {"Login"}
            </Button>
          </CardFooter>
        </Card>
      </div>



    </div>
  );
}
