"use client"

import { TodoForm } from "@/components/todoForm/todoForm";

export default function Home() {
  return (
    <main className="h-screen w-screnn flex flex-col items-center text-2xl bg-blue-400">
      <TodoForm />
    </main>
  );
}
