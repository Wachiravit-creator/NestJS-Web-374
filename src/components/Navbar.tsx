import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="navbar" aria-label="เมนูหลัก">
      <ul className="navList">
        <li>
          <Link className="navLink" href="/">
            หน้าแรก
          </Link>
        </li>
        <li>
          <Link className="navLink" href="/courses">
            รายวิชา
          </Link>
        </li>
        <li>
          <Link className="navLink" href="/about">
            เกี่ยวกับ
          </Link>
        </li>
        <li>
          <Link className="navLink" href="/bands">
            ศิลปิน
          </Link>
        </li>
      </ul>
    </nav>
  );
}
