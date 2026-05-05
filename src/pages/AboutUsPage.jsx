import '../styles/About.css';

const AboutUsPage = () => {
  return (
    <>
      <section className="about">
      <div className="about-container">

        <h1 className="about-title">Биз жөнүндө</h1>

        <p className="about-text">
          Kepka.kg — кепка жана күнүмдүк кийимдерди саткан онлайн дүкөн.
        </p>

        <p className="about-text">
          Биз жөнөкөй, ыңгайлуу жана сапаттуу буюмдарды сунуштайбыз.
        </p>

        <h2 className="about-subtitle">Биздин максат</h2>
        <p className="about-text">
          Кардарларга арзан баада жакшы сапаттагы товар жеткирүү.
        </p>

        <ul className="about-list">
          <li>✔️ Күнүмдүк стиль</li>
          <li>✔️ Жакшы сапат</li>
          <li>✔️ Ыңгайлуу сервис</li>
        </ul>

        <p className="about-footer">
          Kepka.kg — жөнөкөй жана ишенимдүү дүкөн.
        </p>

      </div>
    </section>
    </>
  )
}
export default AboutUsPage