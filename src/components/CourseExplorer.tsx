"use client";

import { useState, type ChangeEvent } from "react";
import CourseCard from "@/components/CourseCard";
import type { Course } from "@/types/course";

type CourseExplorerProps = {
  courses: Course[];
};

export default function CourseExplorer({
  courses,
}: CourseExplorerProps) {
  const [keyword, setKeyword] = useState("");
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [onlyFavorite, setOnlyFavorite] = useState(false);

  function handleKeywordChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    setKeyword(event.target.value);
  }

  function handleToggleFavorite(id: number) {
    setFavoriteIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((favoriteId) => favoriteId !== id)
        : [...prevIds, id]
    );
  }

  const searchText = keyword.trim().toLowerCase();

  const visibleCourses = courses.filter((course) => {
    const matchesKeyword =
      course.title.toLowerCase().includes(searchText) ||
      course.code.includes(searchText);

    const matchesFavorite =
      !onlyFavorite || favoriteIds.includes(course.id);

    return matchesKeyword && matchesFavorite;
  });

  return (
    <div>
      {/* เครื่องมือค้นหา */}
      <div className="course-tools">
        <div className="course-search">
          <span className="search-icon"></span>

          <input
            type="search"
            aria-label="ค้นหารายวิชา"
            value={keyword}
            onChange={handleKeywordChange}
            placeholder="ค้นหาชื่อวิชาหรือรหัสวิชา..."
          />
        </div>

        {/* จำนวนรายการโปรด */}
        <div className="course-favorite-count">
          รายการโปรด: <strong>{favoriteIds.length}</strong> รายวิชา
        </div>

        {/* ปุ่มแสดงรายการโปรด */}
        <button
          type="button"
          className="favorite-filter-btn"
          onClick={() =>
            setOnlyFavorite((prev) => !prev)
          }
        >
          {onlyFavorite
            ? "แสดงรายวิชาทั้งหมด"
            : "แสดงรายการโปรด"}
        </button>
      </div>

      {/* ไม่พบข้อมูล */}
      {visibleCourses.length === 0 ? (
        <div className="course-empty">
          <div className="empty-icon">🔎</div>

          <h2>ไม่พบรายวิชา</h2>

          <p>
            ลองค้นหาด้วยชื่อวิชา หรือรหัสวิชาอื่น
          </p>
        </div>
      ) : (
        <section className="course-grid">
          {visibleCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isFavorite={favoriteIds.includes(course.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </section>
      )}
    </div>
  );
}