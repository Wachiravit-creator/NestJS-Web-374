"use client";

import { useMemo, useState } from "react";

import GameForm from "@/components/GameForm";
import GameList from "@/components/GameList";

import { games as initialGames } from "@/data/games";

import type {
  Game,
  GameStatus,
} from "@/types/game";


export default function GamesPage() {
  const [gameList, setGameList] =
    useState<Game[]>(initialGames);

  const [editingGame, setEditingGame] =
    useState<Game | null>(null);

  const [search, setSearch] =
    useState("");

  const [filterStatus, setFilterStatus] =
    useState<GameStatus | "ทั้งหมด">(
      "ทั้งหมด"
    );

  const [deleteId, setDeleteId] =
    useState<number | null>(null);

  const handleAdd = (game: Game) => {
    setGameList((previous) => [
      ...previous,
      game,
    ]);
  };

  const handleUpdate = (
    updatedGame: Game
  ) => {
    setGameList((previous) =>
      previous.map((game) =>
        game.id === updatedGame.id
          ? updatedGame
          : game
      )
    );

    setEditingGame(null);
  };

  const handleDelete = () => {
    if (deleteId === null) {
      return;
    }

    setGameList((previous) =>
      previous.filter(
        (game) =>
          game.id !== deleteId
      )
    );

    setDeleteId(null);
  };

  const handleStatusChange = (
    id: number,
    status: GameStatus
  ) => {
    setGameList((previous) =>
      previous.map((game) =>
        game.id === id
          ? {
              ...game,
              status,
            }
          : game
      )
    );
  };

  const filteredGames = useMemo(() => {
    return gameList.filter((game) => {
      const matchName =
        game.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchStatus =
        filterStatus === "ทั้งหมด" ||
        game.status === filterStatus;

      return (
        matchName && matchStatus
      );
    });
  }, [
    gameList,
    search,
    filterStatus,
  ]);

  const notStartedHours =
    gameList
      .filter(
        (game) =>
          game.status ===
          "ยังไม่เริ่ม"
      )
      .reduce(
        (total, game) =>
          total + game.hours,
        0
      );

  return (
    <main className="games-page">
      <h1>🎮 Game Backlog</h1>

      <p>
        จำนวนเกมทั้งหมด:{" "}
        <strong>
          {gameList.length}
        </strong>
      </p>

      <p>
        ชั่วโมงของเกมที่ยังไม่เริ่ม:{" "}
        <strong>
          {notStartedHours}
        </strong>{" "}
        ชั่วโมง
      </p>

      <GameForm
        editingGame={editingGame}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onCancel={() =>
          setEditingGame(null)
        }
      />

      <hr />

      <section className="search-box">
        <input
          type="text"
          value={search}
          onChange={(event) =>
            setSearch(
              event.target.value
            )
          }
          placeholder="🔍 ค้นหาชื่อเกม"
        />

        <select
          value={filterStatus}
          onChange={(event) =>
            setFilterStatus(
              event.target.value as
                | GameStatus
                | "ทั้งหมด"
            )
          }
        >
          <option value="ทั้งหมด">
            ทุกสถานะ
          </option>

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
      </section>

      <GameList
        games={filteredGames}
        onEdit={(game) =>
          setEditingGame(game)
        }
        onDelete={(id) =>
          setDeleteId(id)
        }
        onStatusChange={
          handleStatusChange
        }
      />

      {deleteId !== null && (
        <div className="delete-confirm">
          <p>
            คุณต้องการลบเกมนี้ใช่หรือไม่?
          </p>

          <button
            className="confirm-button"
            type="button"
            onClick={handleDelete}
          >
            ยืนยันการลบ
          </button>

          <button
            type="button"
            onClick={() =>
              setDeleteId(null)
            }
          >
            ยกเลิก
          </button>
        </div>
      )}
    </main>
  );
}