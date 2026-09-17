import type { Band } from "@/types/band";

export const bands: Band[] = [
  {
    id: 1,
    name: "Three Man Down",
    genre: "Pop Rock",
    description: "วงดนตรีไทยแนว Pop Rock ที่มีเพลงเป็นเอกลักษณ์และได้รับความนิยม",
    image: "/images/bands/band1.jpg",
    members: [
      {
        id: 1,
        name: "กิต",
        role: "Vocal",
        image: "/images/member/กิต.jpg",
      },
      {
        id: 2,
        name: "ตูน",
        role: "Guitar",
        image: "/images/member/ตูน.jpg",
      },
      {
        id: 3,
        name: "เต",
        role: "Drums",
        image: "/images/member/เต.jpg",
      },
      {
        id: 4,
        name: "เส็ง ",
        role: "keyboard",
        image: "/images/member/เส็ง.jpg",
      },
    ],
  },

  {
    id: 2,
    name: "MEAN",
    genre: "Pop",
    description: "วงดนตรีไทยแนว Pop ที่มีเพลงรักและเพลงที่มีเนื้อหาโดดเด่น",
    image: "/images/bands/band2.jpg",
    members: [
      {
        id: 1,
        name: "โปเต้",
        role: "Vocal",
        image: "/images/member/โปเต้.jpg",
      },
      {
        id: 2,
        name: "ปาล์ม",
        role: "keyborad",
        image: "/images/member/ปาล์ม.jpg",
      },
      {
        id: 3,
        name: "พัด",
        role: "Guitar",
        image: "/images/member/พัด.jpg",
      },
      {
        id: 4,
        name: "กัน",
        role: "bass",
        image: "/images/member/กัน.jpg",
      },
    ],
  },

  {
    id: 3,
    name: "Mirrr",
    genre: "Pop",
    description: "วงดนตรีที่มีแนวเพลง Pop และมีสไตล์ดนตรีที่เป็นเอกลักษณ์",
    image: "/images/bands/band3.jpg",
    members: [
      {
        id: 1,
        name: "โต",
        role: "Vocal",
        image: "/images/member/โต.jpg",
      },
      {
        id: 2,
        name: "นาว",
        role: "Guitar",
        image: "/images/member/นาว.jpg",
      },
    ],
  },
];