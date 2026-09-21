import { notFound } from "next/navigation";
import { courses } from "@/data/courses";
import type { Metadata } from "next";

type CoursePageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function CoursePage({ params }: CoursePageProps) {
    const { id } = await params;
    const course = courses.find((item) => item.id === id);

    // เติม: ฟังก์ชันที่สั่งให้แสดงหน้า 404 
    if (!course) {
        notFound();
    }

    return (
        <article>
            <h1>{course.name}</h1>
            <p>รหัสวิชา {course.code}</p>
            <p>หน่วยกิต {course.credit}</p>
            <p>ผู้สอน {course.instructor}</p>
        </article>
    );
}
export async function generateMetadata(
    { params }: CoursePageProps
): Promise<Metadata> {
    // เติม: คำสั่งที่ใช้รอค่าจาก Promise 
    const { id } = await params;
    const course = courses.find((item) => item.id === id);

    return {
        title: course ? course.name : "ไม่พบรายวิชา",
    };
}