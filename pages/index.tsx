import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>State Management Showcase</title>
        <meta name="description" content="A project demonstrating React state management techniques." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Welcome to the State Management Showcase!</h1>
        <div className="flex flex-col space-y-4">
          <Link href="/counter-app" passHref>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-xl transition duration-300 transform hover:scale-105 shadow-md">
              Go to Counter App (useState - This will now use Context)
            </button>
          </Link>
          {/* We'll add links for other versions here later */}
        </div>
      </div>
    </>
  );
}