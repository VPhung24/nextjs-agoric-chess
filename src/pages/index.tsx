import { Inter } from "next/font/google";
import ChessBoard from "@/components/ChessBoard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen justify-center items-center bg-snowball p-4">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
        <ChessBoard />
      </div>
    </main>
  );
}
