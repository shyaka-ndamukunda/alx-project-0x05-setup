import Link from 'next/link'; // Import Link

const Home: React.FC = () => {
  return (
    <main className="flex flex-col h-screen justify-center items-center text-4xl font-semibold">
      <h1>Welcome to alx-project-0x04!</h1>
      <p className="text-lg mt-4">Exploring State Management</p>

      <Link href="/counter-app"> {/* Add this Link component */}
        <button className=" border px-4 py-2 text-lg mt-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200">
          Go to useState Counter App
        </button>
      </Link>
    </main>
  )
}

export default Home;