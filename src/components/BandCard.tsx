import Image from "next/image";
import type { Band } from "@/types/band";

type BandCardProps = {
  band: Band;
  isFollowed: boolean;
  isLiked: boolean;
  onFollow: () => void;
  onLike: () => void;
};

export default function BandCard({
  band,
  isFollowed,
  isLiked,
  onFollow,
  onLike,
}: BandCardProps) {
  return (
    <article className="band-card">
      <Image
        src={band.image}
        alt={band.name}
        width={500}
        height={300}
        className="band-image"
      />

      <div className="band-content">
        <h2>{band.name}</h2>

        <p>แนวเพลง: {band.genre}</p>

        <p>{band.description}</p>

        <h3>สมาชิก ({band.members.length} คน)</h3>

        <ul className="member-list">
          {band.members.map((member) => (
            <li key={member.id} className="member-item">
              <img
                src={member.image}
                alt={member.name}
                className="member-image"
              />

              <span>
                {member.name} - {member.role}
              </span>
            </li>
          ))}
        </ul>

        {/* ปุ่มติดตาม */}
        <button onClick={onFollow}>
          {isFollowed ? "เลิกติดตาม" : "ติดตาม"}
        </button>

        {/* ปุ่ม Like */}
        <button onClick={onLike}>
          {isLiked ? "❤️ Unlike" : "🤍 Like"}
        </button>

        {/* จำนวน Like */}
        <p>จำนวน Like: {isLiked ? 1 : 0}</p>
      </div>
    </article>
  );
}