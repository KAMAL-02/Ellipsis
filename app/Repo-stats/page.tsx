import Footer from "@/components/Footer";
import GitHubMetricsDashboard from "@/components/GithubMetricsDashboard";
import Navbar from "@/components/Navbar";

export default function RepoStats(){
    return (
        <div className="min-h-screen">
            <Navbar />
            <GitHubMetricsDashboard />
            <Footer />
        </div>
    );
}