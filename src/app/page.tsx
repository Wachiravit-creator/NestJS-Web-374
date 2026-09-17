export default function HomePage() {
  const siteName = "CSMJU";
  const description = "เว็บไซต์รวบรวมข้อมูลรายวิชา";
  const courseCount: number = 5;
  const isOpen: boolean = true;

  const topics: string[] = ["HTML", "CSS", "TypeScript", "Next.js"];

  return (
    <main className="page">

      {/* ชื่อเว็บไซต์ */}
      <article className="siteTitle">
        <p>CSMJU</p>
        <h1>{siteName}</h1>
        <span>เว็บไซต์รวบรวมข้อมูลรายวิชา</span>
      </article>


      {/* รายละเอียดเว็บไซต์ */}
      <section className="intro">

        <h2>เกี่ยวกับเว็บไซต์</h2>

        <p>{description}</p>

        <div className="infoBox">

          <div className="infoItem">
            <h3>จำนวนรายวิชา</h3>
            <p>{courseCount} รายวิชา</p>
          </div>

          <div className="infoItem">
            <h3>สถานะระบบ</h3>

            <p className={isOpen ? "statusOpen" : "statusClosed"}>
              {isOpen ? "เปิดใช้งาน" : "ปิดใช้งาน"}
            </p>

          </div>

        </div>
      </section>


      {/* หัวข้อ */}
      <section className="intro">

        <h2 className="sectionTitle">
          หัวข้อที่เกี่ยวข้อง
        </h2>

        <ul className="topicList">
          {topics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>

      </section>


      {/* รายละเอียด */}
      <section className="intro aboutSection">

        <h2>เว็บไซต์นี้เหมาะสำหรับ</h2>

        <p>
          เว็บไซต์นี้ถูกออกแบบมาเพื่อเป็นแหล่งรวบรวมข้อมูลรายวิชา สำหรับนักเรียนและนักศึกษา โดยสามารถค้นหาข้อมูลเกี่ยวกับรายวิชา หัวข้อการเรียนรู้ และเนื้อหาที่เกี่ยวข้องกับสาขาได้อย่างสะดวก
        </p>

      </section>

    </main>
  );
}