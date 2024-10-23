import Navbar from "@/components/Navbar";
import PRform from "@/components/PRform";
import Footer from "@/components/Footer";
import Heading from "@/components/Heading2";

export default function PRsummary(){
    return <div className="min-h-screen">
        <Navbar />
        <Heading />
        <PRform />
        <Footer />
    </div>
}