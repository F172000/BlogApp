"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.ok) {
      setLoading(false);
      router.push("/blog");
    } else {
      setLoading(false);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="bg-slate-50 p-12 rounded-lg shadow-lg flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h1 className="text-3xl mb-4 text-center">Sign In</h1>
        <label htmlFor="email">Email</label>
        <input
        id="email"
          className="block w-full rounded-md border-1 border-gray-300 bg-gray-200 px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
        id="password"
          className="block w-full rounded-md border-1 border-gray-300 bg-gray-200 px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 "
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white"
          type="submit"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
