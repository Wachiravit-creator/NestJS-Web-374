"use client";

import { useState } from "react";
import BandCard from "@/components/BandCard";
import { bands } from "@/data/bands";

export default function BandsPage() {
  const [search, setSearch] = useState("");
  const [followedBands, setFollowedBands] = useState<number[]>([]);
  const [likedBands, setLikedBands] = useState<number[]>([]);

  const filteredBands = bands.filter((band) =>
    band.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFollow = (bandId: number) => {
    setFollowedBands((current) =>
      current.includes(bandId)
        ? current.filter((id) => id !== bandId)
        : [...current, bandId]
    );
  };

  const toggleLike = (bandId: number) => {
    setLikedBands((current) =>
      current.includes(bandId)
        ? current.filter((id) => id !== bandId)
        : [...current, bandId]
    );
  };

  return (
    <main className="bands-page">
      <h1>วงดนตรีที่ชื่นชอบ</h1>

      <input
        type="text"
        placeholder="ค้นหาชื่อวง..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p>ติดตามอยู่ {followedBands.length} วง</p>

      <section className="band-grid">
        {filteredBands.length > 0 ? (
          filteredBands.map((band) => (
            <BandCard
              key={band.id}
              band={band}
              isFollowed={followedBands.includes(band.id)}
              isLiked={likedBands.includes(band.id)}
              onFollow={() => toggleFollow(band.id)}
              onLike={() => toggleLike(band.id)}
            />
          ))
        ) : (
          <p>ไม่พบวงดนตรีที่ค้นหา</p>
        )}
      </section>
    </main>
  );
}