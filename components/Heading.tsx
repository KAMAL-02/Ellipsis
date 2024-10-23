import Image from 'next/image';

interface heading {
  heading : String
}

export default function Heading({heading}:heading) {
  return (
    <div className="flex items-center justify-center my-3">
      <div className="mr-4">
        <Image 
          src="/AI-4.png"
          alt="Logo"
          width={70}
          height={70}
        />
      </div>
      <h1 className="text-lg md:text-4xl font-bold text-white">
        {heading}
      </h1>
    </div>
  );
}
