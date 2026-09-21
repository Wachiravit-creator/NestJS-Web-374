"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Course } from "@/types/course";

type FormErrors = Partial<Record<keyof CourseDraft, string>>;

type CourseFormProps = {
  initialCourse?: Course;
  onSave: (draft: CourseDraft) => void;
  onCancel: () => void;
};

export type CourseDraft = {
  code: string;
  name: string;
  credit: string;
  instructor: string;
};

const emptyDraft: CourseDraft = {
  code: "",
  name: "",
  credit: "",
  instructor: "",
};

function toDraft(course?: Course): CourseDraft {
  if (!course) {
    return emptyDraft;
  }

  return {
    code: course.code,
    name: course.name,
    credit: String(course.credit),
    instructor: course.instructor,
  };
}

export default function CourseForm({
  initialCourse,
  onSave,
  onCancel,
}: CourseFormProps) {
  const [draft, setDraft] = useState<CourseDraft>(toDraft(initialCourse));

  const [errors, setErrors] = useState<FormErrors>({});

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setDraft((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof CourseDraft]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  }

  function validate(value: CourseDraft): FormErrors {
    const nextErrors: FormErrors = {};

    if (value.code.trim() === "") {
      nextErrors.code = "กรุณาระบุรหัสวิชา";
    }

    if (value.name.trim() === "") {
      nextErrors.name = "กรุณาระบุชื่อวิชา";
    }

    const credit = Number(value.credit);

    if (!Number.isInteger(credit) || credit < 1 || credit > 6) {
      nextErrors.credit = "หน่วยกิตต้องเป็นจำนวนเต็มตั้งแต่ 1 ถึง 6";
    }

    if (value.instructor.trim() === "") {
      nextErrors.instructor = "กรุณาระบุชื่อผู้สอน";
    }

    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(draft);

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSave(draft);

    if (!initialCourse) {
      setDraft(emptyDraft);
    }

    setErrors({});
  }

  return (
    <form className="course-form" onSubmit={handleSubmit} noValidate>
      {/* =========================
          หัวข้อฟอร์ม
         ========================= */}
      <div className="course-form-header">
        <div className="course-form-icon">{initialCourse ? "✏️" : "➕"}</div>

        <div className="course-form-title">
          <h2>{initialCourse ? "แก้ไขข้อมูลรายวิชา" : "เพิ่มรายวิชาใหม่"}</h2>

          <p>
            {initialCourse
              ? "แก้ไขรายละเอียดของรายวิชา"
              : "กรอกข้อมูลเพื่อเพิ่มรายวิชาเข้าสู่ระบบ"}
          </p>
        </div>
      </div>

      {/* =========================
          ช่องกรอกข้อมูล
         ========================= */}
      <div className="course-form-grid">
        {/* รหัสวิชา */}
        <div className="course-form-field">
          <label htmlFor="code">รหัสวิชา</label>

          <input
            id="code"
            name="code"
            type="text"
            value={draft.code}
            onChange={handleChange}
            aria-invalid={!!errors.code}
            aria-describedby={errors.code ? "code-error" : undefined}
          />

          {errors.code ? (
            <p id="code-error" className="course-form-error">
              ⚠ {errors.code}
            </p>
          ) : null}
        </div>

        {/* ชื่อวิชา */}
        <div className="course-form-field">
          <label htmlFor="name">ชื่อวิชา</label>

          <input
            id="name"
            name="name"
            type="text"
            value={draft.name}
            onChange={handleChange}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />

          {errors.name ? (
            <p id="name-error" className="course-form-error">
              ⚠ {errors.name}
            </p>
          ) : null}
        </div>

        {/* หน่วยกิต */}
        <div className="course-form-field">
          <label htmlFor="credit">หน่วยกิต</label>

          <input
            id="credit"
            name="credit"
            type="number"
            inputMode="numeric"
            min="1"
            max="6"
            value={draft.credit}
            onChange={handleChange}
            aria-invalid={!!errors.credit}
            aria-describedby={errors.credit ? "credit-error" : undefined}
          />

          {errors.credit ? (
            <p id="credit-error" className="course-form-error">
              ⚠ {errors.credit}
            </p>
          ) : null}
        </div>

        {/* ผู้สอน */}
        <div className="course-form-field">
          <label htmlFor="instructor">ผู้สอน</label>

          <input
            id="instructor"
            name="instructor"
            type="text"
            value={draft.instructor}
            onChange={handleChange}
            aria-invalid={!!errors.instructor}
            aria-describedby={
              errors.instructor ? "instructor-error" : undefined
            }
          />

          {errors.instructor ? (
            <p id="instructor-error" className="course-form-error">
              ⚠ {errors.instructor}
            </p>
          ) : null}
        </div>
      </div>

      {/* =========================
          ปุ่ม
         ========================= */}
      <div className="course-form-actions">
        <button type="submit" className="course-form-save">
          {initialCourse ? "บันทึกการแก้ไข" : "บันทึก"}
        </button>

        {initialCourse ? (
          <button
            type="button"
            className="course-form-cancel"
            onClick={onCancel}
          >
            ✕ ยกเลิก
          </button>
        ) : null}
      </div>
    </form>
  );
}