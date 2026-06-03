import React from 'react';
import '../styles/About.css';

const AboutUsPage = () => {
  return (
    <>
      <section className="about">
        <div className="about-container">

          <h1 className="about-title">Биз жөнүндө</h1>

          <p className="about-text">
            <strong><mark>Kepka.kg</mark></strong> — бул жөн гана дүкөн эмес, бул сиздин күнүмдүк стилиңизди жана өзгөчөлүгүңүздү баса белгилеген заманбап баш кийимдердин жана ыңгайлуу кийимдердин мейкиндиги. Биз тренддерди байкап, кардарларыбызга эң актуалдуу жана сапаттуу моделдерди сунуштайбыз.
          </p>

          <p className="about-text">
            Биз үчүн ар бир деталь маанилүү. Продукцияларыбызды тандоодо материалдын тазалыгына, тигилишинин сапатына жана узакка чыдамдуулугуна өзгөчө көңүл бурабыз. Сиз издеген ыңгайлуулук менен заманбап мода ушул жерде айкалышат.
          </p>

          <h2 className="about-subtitle">Биздин максат жана баалуулуктар</h2>
          <p className="about-text">
            Биздин негизги максатыбыз — ар бир кардарга жогорку сапаттагы товарларды жеткиликтүү баада сунуштоо. Биз ар бир сатып алуучу өзүн ишенимдүү жана ыңгайлуу сезишин каалайбыз.
          </p>

          <div className="about-features">
            <h3 className="about-features-title">Эмне үчүн бизди тандашат?</h3>
            <ul className="about-list">
              <li><span className="icon">✔️</span> <strong>Күнүмдүк уникалдуу стиль:</strong> Ар кандай табитке ылайыктуу кенен тандоо.</li>
              <li><span className="icon">✔️</span> <strong>Кынтыксыз сапат:</strong> Ар бир тигилиши текшерилген, бышык жана жумшак материалдар.</li>
              <li><span className="icon">✔️</span> <strong>Ыңгайлуу сервис:</strong> Тез арада буйрутма берүү жана кардарларды сыйлоо.</li>
              <li><span className="icon">✔️</span> <strong>Жеткиликтүү баа:</strong> Сапатты ашыкча төлөмсүз алуу мүмкүнчүлүгү.</li>
            </ul>
          </div>

          <p className="about-footer">
            Kepka.kg — Сиздин ишенимдүү өнөктөшүңүз. Бизди тандаганыңыз үчүн рахмат!
          </p>

        </div>
      </section>
    </>
  )
}

export default AboutUsPage;