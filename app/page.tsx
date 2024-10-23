
import LandingPage from "@/components/LandingPage";

export default function Home(){
  return <main className="relative">
    <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/Background.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>
  <LandingPage />
</main>
}