"use client";

import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import type { Game } from "@/types/game";

type GameFormProps = {
  editingGame: Game | null;
  onAdd: (game: Game) => void;
  onUpdate: (game: Game) => void;
  onCancel: () => void;
};

type FormData = {
  name: string;
  platform: string;
  hours: number;
  status: Game["status"];
};

type FormErrors = {
  name?: string;
  platform?: string;
  hours?: string;
};

const initialForm: FormData = {
  name: "",
  platform: "",
  hours: 0,
  status: "ยังไม่เริ่ม",
};

export default function GameForm({
  editingGame,
  onAdd,
  onUpdate,
  onCancel,
}: GameFormProps) {
  const [form, setForm] =
    useState<FormData>(initialForm);

  const [errors, setErrors] =
    useState<FormErrors>({});

  useEffect(() => {
    if (editingGame) {
      setForm({
        name: editingGame.name,
        platform: editingGame.platform,
        hours: editingGame.hours,
        status: editingGame.status,
      });

      setErrors({});
    } else {
      setForm(initialForm);
      setErrors({});
    }
  }, [editingGame]);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]:
        name === "hours"
          ? Number(value)
          : value,
    }));
  };

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name =
        "กรุณากรอกชื่อเกม";
    }

    if (!form.platform) {
      newErrors.platform =
        "กรุณาเลือกแพลตฟอร์ม";
    }

    if (
      !Number.isInteger(form.hours) ||
      form.hours <= 0
    ) {
      newErrors.hours =
        "จำนวนชั่วโมงต้องเป็นจำนวนเต็มบวก";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    if (editingGame) {
      onUpdate({
        id: editingGame.id,
        ...form,
      });
    } else {
      onAdd({
        id: Date.now(),
        ...form,
      });
    }

    setForm(initialForm);
    setErrors({});
  };

  const handleCancel = () => {
    setForm(initialForm);
    setErrors({});
    onCancel();
  };

  return (
    <form
      className="game-form"
      onSubmit={handleSubmit}
    >
      <h2>
        {editingGame
          ? "แก้ไขเกม"
          : "เพิ่มเกม"}
      </h2>

      <div className="form-group">
        <label htmlFor="name">
          ชื่อเกม
        </label>

        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="กรอกชื่อเกม"
        />

        {errors.name && (
          <p className="error-message">
            {errors.name}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="platform">
          แพลตฟอร์ม
        </label>

        <select
          id="platform"
          name="platform"
          value={form.platform}
          onChange={handleChange}
        >
          <option value="">
            -- เลือกแพลตฟอร์ม --
          </option>

          <option value="PC">
            PC
          </option>

          <option value="PlayStation">
            PlayStation
          </option>

          <option value="Xbox">
            Xbox
          </option>

          <option value="Nintendo Switch">
            Nintendo Switch
          </option>
        </select>

        {errors.platform && (
          <p className="error-message">
            {errors.platform}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="hours">
          เวลาที่คาดว่าจะเล่น (ชั่วโมง)
        </label>

        <input
          id="hours"
          name="hours"
          type="number"
          min="1"
          step="1"
          value={
            form.hours === 0
              ? ""
              : form.hours
          }
          onChange={handleChange}
          placeholder="เช่น 20"
        />

        {errors.hours && (
          <p className="error-message">
            {errors.hours}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="status">
          สถานะ
        </label>

        <select
          id="status"
          name="status"
          value={form.status}
          onChange={handleChange}
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
      </div>

      <div className="button-group">
        <button type="submit">
          {editingGame
            ? "บันทึกการแก้ไข"
            : "เพิ่มเกม"}
        </button>

        {editingGame && (
          <button
            className="cancel-button"
            type="button"
            onClick={handleCancel}
          >
            ยกเลิก
          </button>
        )}
      </div>
    </form>
  );
}