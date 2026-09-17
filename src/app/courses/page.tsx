import type { Metadata } from "next";
import CourseExplorer from "@/components/CourseExplorer";
import { courses } from "@/data/courses";
import ButtonComponet from "@/components/ButtonComponent";

export const metadata: Metadata = {
  title: "รายวิชาทั้งหมด",
};

export default function CoursesPage() {
  return (
    <main className="courses-page">
      <h1>รายวิชาทั้งหมด</h1>
      <ButtonComponet/>

      <CourseExplorer courses={courses} />
    </main>
  );
}