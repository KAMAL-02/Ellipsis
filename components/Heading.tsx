import Image from 'next/image';

export default function Heading() {
  return (
    <div className="flex items-center justify-center my-6">
      <div className="mr-4">
        <Image 
          src="/AI-4.png"
          alt="Logo"
          width={100}
          height={100}
        />
      </div>
      <h1 className="text-2xl md:text-4xl font-bold text-white">
        Fix Code Issues
      </h1>
    </div>
  );
}
