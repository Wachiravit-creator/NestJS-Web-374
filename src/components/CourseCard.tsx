import type { Course } from "@/types/course";

type CourseCardProps = {
  course: Course;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
};

export default function CourseCard({
  course,
  isFavorite,
  onToggleFavorite,
}: CourseCardProps) {
  return (
    <article className="course-card">
      <h2>{course.title}</h2>

      <p>รหัสวิชา: {course.code}</p>

      <p>{course.credits} หน่วยกิต</p>

      <p>
        {course.isOpen
          ? "เปิดลงทะเบียน"
          : "ปิดลงทะเบียน"}
      </p>

      <button
        type="button"
        aria-pressed={isFavorite}
        onClick={() => onToggleFavorite(course.id)}
      >
        {isFavorite
          ? "อยู่ในรายการโปรด"
          : "เพิ่มเป็นรายการโปรด"}
      </button>
    </article>
  );
}