"use client";

import { useState, type ChangeEvent } from "react";
import CourseCard from "@/components/CourseCard";
import CourseForm, {
  type CourseDraft,
} from "@/components/CourseForm";
import type { Course } from "@/types/course";

type CourseExplorerProps = {
  initialCourses: Course[];
};

export default function CourseExplorer({
  initialCourses,
}: CourseExplorerProps) {
  const [keyword, setKeyword] = useState("");
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [onlyFavorite, setOnlyFavorite] = useState(false);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [editingId, setEditingId] = useState<string | null>(null);

  function handleKeywordChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    setKeyword(event.target.value);
  }

  function handleToggleFavorite(id: string) {
    setFavoriteIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((favoriteId) => favoriteId !== id)
        : [...prevIds, id]
    );
  }

  function handleCreate(draft: CourseDraft) {
    // เติม: เมธอดที่สร้างรหัสสุ่มไม่ซ้ำกันในรูปแบบ UUID 
    const newCourse: Course = {
      id: crypto.randomUUID(),
      code: draft.code.trim(),
      name: draft.name.trim(),
      credit: Number(draft.credit),
      instructor: draft.instructor.trim(),
      isOpen: true,
    };
  }
    function handleDelete(id: string) {
      setCourses(
        courses.filter((course) => course.id !== id)
      );

      setFavoriteIds((prevIds) =>
        prevIds.filter((favoriteId) => favoriteId !== id)
      );
    }

    function handleUpdate(id: string, draft: CourseDraft) {
      setCourses(
        courses.map((course) =>
          course.id === id
            ? {
              ...course,
              code: draft.code.trim(),
              name: draft.name.trim(),
              credit: Number(draft.credit),
              instructor: draft.instructor.trim(),
            }
            : course
        )
      );

      setEditingId(null);
    }

    function handleSave(draft: CourseDraft) {
      if (editingId === null) {
        handleCreate(draft);
        return;
      }

      handleUpdate(editingId, draft);
    }

    const editingCourse = courses.find((course) => course.id === editingId)

    const searchText = keyword.trim().toLowerCase();

    const visibleCourses = courses.filter((course) => {
      const matchesKeyword =
        course.name.toLowerCase().includes(searchText) ||
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
                onEdit={() => setEditingId(course.id)}
                onDelete={() => handleDelete(course.id)}
              />
            ))}
          </section>
        )}
        <CourseForm
          key={editingId ?? "new"}
          initialCourse={editingCourse}
          onSave={handleSave}
          onCancel={() => setEditingId(null)}
        />
      </div>
    );
  }