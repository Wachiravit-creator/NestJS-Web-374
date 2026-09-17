"use client";

import Link from "next/link";

import type {
  Game,
  GameStatus,
} from "@/types/game";

type GameListProps = {
  games: Game[];
  onEdit: (game: Game) => void;
  onDelete: (id: number) => void;
  onStatusChange: (
    id: number,
    status: GameStatus
  ) => void;
};

export default function GameList({
  games,
  onEdit,
  onDelete,
  onStatusChange,
}: GameListProps) {
  if (games.length === 0) {
    return (
      <p>ไม่พบเกมที่ค้นหา</p>
    );
  }

  return (
    <section>
      <h2>รายการเกม</h2>

      <div className="game-list">
        {games.map((game) => (
          <article
            className="game-card"
            key={game.id}
          >
            <h3>{game.name}</h3>

            <p>
              <strong>
                Platform:
              </strong>{" "}
              {game.platform}
            </p>

            <p>
              <strong>
                เวลาที่คาดว่าจะเล่น:
              </strong>{" "}
              {game.hours} ชั่วโมง
            </p>

            <label
              htmlFor={`status-${game.id}`}
            >
              <strong>สถานะ:</strong>
            </label>

            <select
              className="game-status"
              id={`status-${game.id}`}
              value={game.status}
              onChange={(event) =>
                onStatusChange(
                  game.id,
                  event.target
                    .value as GameStatus
                )
              }
            >
              <option value="ยังไม่เริ่ม">
                ยังไม่เริ่ม
              </option>

              <option value="กำลังเล่น">
                กำลังเล่น
              </option>

              <option value="เล่นจบแล้ว">
                เล่นจบแล้ว
              </option>
            </select>

            <div className="game-actions">
              <Link
                className="game-link"
                href={`/games/${game.id}`}
              >
                ดูรายละเอียด
              </Link>

              <button
                type="button"
                onClick={() =>
                  onEdit(game)
                }
              >
                แก้ไข
              </button>

              <button
                className="delete-button"
                type="button"
                onClick={() =>
                  onDelete(game.id)
                }
              >
                ลบ
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}