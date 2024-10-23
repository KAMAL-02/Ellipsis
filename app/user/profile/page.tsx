import { getServerSession } from "next-auth";
import ProfileSection from "@/components/ProfileSection";
import { authOptions } from "@/auth";
import { toast } from "react-toastify";
import prisma from "@/db";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Error from "@/components/Error";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  console.log("session is:", session);

  if (!user) {
    return (
      <div className="min-h-screen bg-transparent flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center bg-transparent shadow-lg rounded-lg p-6 max-w-md w-full border border-blue-500">
            <h1 className="text-3xl font-bold text-white mb-4">Sign In Required</h1>
            <p className="text-white mb-6">Please sign in to view your profile.</p>
            <a 
              href="/api/auth/signin"
              className="inline-block bg-black bg-opacity-10 text-white px-4 py-2 rounded-md hover:bg-opacity-20 border border-blue-500 transition duration-200"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    );
  }
  

  const dbuser = await prisma.user.findUnique({
    where: { githubId: String(user.id) },
  })
  if (!dbuser) {
    toast.error(
      "No user found",
      {
        containerId: 'GlobalApplicationToast',
      })
    return <>
     <Error />
    </>
  }

  const comments =  await prisma.comment.findMany({
    where:{userId: dbuser.id},
    orderBy: { createdAt: 'desc' },
  })

  return ( 
    <div>
        <Navbar />
        <ProfileSection user={user} comments={comments} />
        <Footer />
    </div>
  );
}