import { Inter } from "next/font/google";
import ChessBoard from "@/components/ChessBoard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex flex-col h-screen justify-center items-center bg-snowball">
      <div className="w-1/2">
        <ChessBoard />
      </div>
    </main>
  );
}
