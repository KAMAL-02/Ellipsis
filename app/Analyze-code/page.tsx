import Footer from "@/components/Footer";
import Heading from "@/components/Heading";
import Navbar from "@/components/Navbar";
import Textarea from "@/components/Textarea";

export default function Home(){
    return (
        <div className="min-h-screen">
           <Navbar />
           <Heading />
           <Textarea />
           <Footer />
        </div>
    );
}