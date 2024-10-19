"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (!session) {
    return <p>Please sign in</p>;
  }

  const  getSession = async () =>{
    const response = await fetch('/api/post-comment', {
      method: 'POST',  // Using POST method
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        owner: 'KAMAL-02',
        repo: 'side-bar-menu',
        pull_number: 2,
        feedback: 'This is a test comment.',
      }),
    });
    console.log(response);
  }

  return (
    <div>
      <p>Your user ID is: {session.user?.id}</p>
      <p>Your access token is: {session.accessToken}</p>

      <button
        onClick={getSession}
      >
        CLICK
      </button>
    </div>
  );
}
