"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);

      const loginObj = {
        email,
        password,
      };

      const res = await api.post("/login-admin", loginObj, {
        withCredentials: true,
      });

      if (res.status === 201) {
        toast.success("Login successful");
        router.replace("/");
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="shadow-md p-5 rounded-md w-full max-w-[400px] flex flex-col gap-4 border border-gray-200">
        <div className="flex flex-col gap-1">
          <Label>Email:</Label>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Password:</Label>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button
          className="cursor-pointer"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
        </Button>
      </div>
    </div>
  );
}
