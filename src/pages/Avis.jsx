import React from "react";
import "./Avis.css";
const avisClients = [
  {
    name: "Salma B.",
    city: "Casablanca",
    stars: "★★★★★",
    text: "بصراحة الريحة زوينة بزاف، كتبقى لاصقة فالحوايج نهار كامل، وحتى من بعد كتبقى باينة خفيفة. حسيتها جودة واعرة وماشي بحال العطور العادية.",
  },
  {
    name: "Yassine M.",
    city: "Rabat",
    stars: "★★★★★",
    text: "خديتو هدية، والتغليف كان زوين والريحة فخمة. أول مرة نجرب شي حاجة وتبان ليا راقية بهاد الثمن. بصراحة تستاهل.",
  },
  {
    name: "Imane K.",
    city: "Marrakech",
    stars: "★★★★★",
    text: "أنا صعيبة فالعطور ولكن هادي عجباتني بزاف. ريحة نقية، دافئة، وكتعطي إحساس ديال الفخامة. حتى صحاباتي سولوني عليها.",
  },
  {
    name: "Oumaima R.",
    city: "Tanger",
    stars: "★★★★★",
    text: "وصلني الطلب بسرعة، والريحة بقات معايا من الصباح حتى لعشية. حاضرة وراقية. هادي غادي نعاود نطلبها.",
  },
  {
    name: "Hamza A.",
    city: "Fès",
    stars: "★★★★★",
    text: "عطر ديال المستوى، ريحة رجالية وفخمة، ماشي مزعجة وكتبان غالية. جربتها فالخدمة وكاع الناس لاحظوها.",
  },
  {
    name: "Nadia L.",
    city: "Agadir",
    stars: "★★★★★",
    text: "الريحة واعرة بزاف وكتشد مزيان . عجبني أنها ما كتبدلش بسرعة وكتبقى راقية. بالنسبة ليا تجربة ناجحة.",
  },
];

const floatingWords = ["Luxe", "Noir", "Dahbi", "Parfum", "Classe", "Qualité"];

export default function Avis() {
  return (
    <main className="avis-page">
      <section className="avis-hero">
        <div className="avis-glow avis-glow-one"></div>
        <div className="avis-glow avis-glow-two"></div>

        <div className="avis-hero-content">
          <p className="avis-eyebrow">Témoignages clients</p>
          <h1>
            Les Avis de nos <span>Clients</span>
          </h1>
          <p className="avis-subtitle">
            Des parfums raffinés, une qualité exceptionnelle et une tenue remarquable. Voici les avis de ceux qui ont testé Sahaba Parfum et ressenti la différence.
          </p>

          <div className="avis-stats">
            <div>
              <strong>4.9/5</strong>
              <small>Note moyenne</small>
            </div>
            <div>
              <strong>+120</strong>
              <small>Clients satisfaits</small>
            </div>
            <div>
              <strong>24h+</strong>
              <small>Présence élégante</small>
            </div>
          </div>
        </div>

        <div className="avis-perfume-card">
          <div className="avis-bottle">
            <span></span>
          </div>
          <p>Signature olfactive</p>
          <h2>Sahaba</h2>
          <small>Une touche de luxe dans chaque goutte</small>
        </div>
      </section>

      <div className="avis-marquee">
        <div className="avis-marquee-track">
          {[...floatingWords, ...floatingWords, ...floatingWords].map((word, index) => (
            <span key={`${word}-${index}`}>✦ {word}</span>
          ))}
        </div>
      </div>

      <section className="avis-grid-section">
        <div className="avis-section-title">
          <p>Ce qu’ils disent</p>
          <h2>Des avis qui sentent la confiance</h2>
        </div>

        <div className="avis-grid">
          {avisClients.map((avis, index) => (
            <article className="avis-card" style={{ "--delay": `${index * 0.12}s` }} key={avis.name}>
              <div className="avis-card-top">
                <div className="avis-avatar">{avis.name.charAt(0)}</div>
                <div>
                  <h3>{avis.name}</h3>
                  <p>{avis.city}</p>
                </div>
              </div>
              <div className="avis-stars">{avis.stars}</div>
              <p className="avis-text">“{avis.text}”</p>
              <div className="avis-card-line"></div>
            </article>
          ))}
        </div>
      </section>

      <section className="avis-luxury-banner">
        <div>
          <p>Expérience Sahaba</p>
          <h2>Ça se sent… sans parler.</h2>
        </div>
        <a href="/">Découvrir les parfums</a>
      </section>
    </main>
  );
}
