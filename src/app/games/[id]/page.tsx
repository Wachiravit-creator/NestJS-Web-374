import Link from "next/link";
import { notFound } from "next/navigation";

import { games } from "@/data/games";


type GameDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: GameDetailPageProps) {
  const { id } = await params;

  const game = games.find(
    (game) => game.id === Number(id)
  );

  if (!game) {
    return {
      title: "ไม่พบเกม",
    };
  }

  return {
    title: `${game.name} | Game Backlog`,
  };
}

export default async function GameDetailPage({
  params,
}: GameDetailPageProps) {
  const { id } = await params;

  const game = games.find(
    (game) => game.id === Number(id)
  );

  if (!game) {
    notFound();
  }

  return (
    <main className="game-detail">
      <h1>{game.name}</h1>

      <p>
        <strong>Platform:</strong>{" "}
        {game.platform}
      </p>

      <p>
        <strong>
          เวลาที่คาดว่าจะเล่น:
        </strong>{" "}
        {game.hours} ชั่วโมง
      </p>

      <p>
        <strong>สถานะ:</strong>{" "}
        {game.status}
      </p>

      <Link
        className="back-link"
        href="/games"
      >
        ← กลับไปหน้า Game Backlog
      </Link>
    </main>
  );
}