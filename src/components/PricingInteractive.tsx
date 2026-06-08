"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Tier = {
  id: number;
  num: string;
  title: string;
  subtitle: string;
  desc: string;
  price: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

const TIERS: readonly Tier[] = [
  {
    id: 0,
    num: "01",
    title: "Vitrine",
    subtitle: "sur mesure",
    desc: "Pour les indépendants et PME qui veulent un site qui leur ressemble, pas un template parmi d'autres.",
    price: "1 200",
    features: [
      "Design personnalisé",
      "3 à 6 pages",
      "Formulaire intelligent",
      "Hébergement & mise en ligne",
      "Livré en 1 à 2 semaines",
    ],
    cta: "En parler",
    featured: true,
  },
  {
    id: 1,
    num: "02",
    title: "MVP",
    subtitle: "startup",
    desc: "Pour valider une idée vite. On livre une V1 utilisable et on ajuste avec les premiers retours.",
    price: "4 000",
    features: [
      "Cadrage produit & user-flow",
      "Périmètre réduit à l'essentiel",
      "Front + back + admin simple",
      "V1 en ligne, testable",
      "Suivi des premiers retours",
    ],
    cta: "En parler",
  },
  {
    id: 2,
    num: "03",
    title: "Application",
    subtitle: "web ou mobile",
    desc: "Plateforme métier, SaaS, marketplace, espace client, configurateur, app iOS / Android. Côté utilisateur comme côté admin.",
    price: "6 000",
    features: [
      "Cadrage UX & maquettes",
      "Authentification & rôles",
      "Base de données dédiée",
      "Back-office sur mesure",
      "Intégrations API · 1 mois de suivi",
    ],
    cta: "Démarrer le projet",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

type Position = "prev" | "center" | "next" | "hidden";

function getPosition(tierId: number, activeId: number, total: number): Position {
  if (tierId === activeId) return "center";
  if (tierId === (activeId - 1 + total) % total) return "prev";
  if (tierId === (activeId + 1) % total) return "next";
  return "hidden";
}

export default function PricingInteractive() {
  const [activeId, setActiveId] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 600);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const goNext = () => setActiveId((activeId + 1) % TIERS.length);
  const goPrev = () => setActiveId((activeId - 1 + TIERS.length) % TIERS.length);

  const lateralOffset = isMobile ? "100vw" : "55%";

  return (
    <div className="pricing-carousel">
      <div className="pricing-carousel__track">
        {TIERS.map((tier) => {
          const position = getPosition(tier.id, activeId, TIERS.length);
          const isCenter = position === "center";
          return (
            <motion.button
              key={tier.id}
              type="button"
              className={[
                "pricing-card-c",
                `is-${position}`,
                tier.featured ? "is-featured" : "",
              ].join(" ").trim()}
              onClick={() => setActiveId(tier.id)}
              aria-current={isCenter ? "true" : "false"}
              aria-label={`Offre ${tier.title} ${tier.subtitle}, à partir de ${tier.price} euros HT${isCenter ? "" : ", cliquer pour sélectionner"}`}
              tabIndex={0}
              animate={{
                x: position === "prev" ? `-${lateralOffset}` : position === "next" ? lateralOffset : "0%",
                scale: isCenter ? 1 : 0.85,
                opacity: isCenter ? 1 : 0.5,
                zIndex: isCenter ? 10 : 1,
              }}
              transition={{ duration: 0.4, ease: EASE }}
              drag={isMobile && isCenter ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.3}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) goNext();
                else if (info.offset.x > 50) goPrev();
              }}
            >
              {tier.featured && (
                <span className="pricing-card-c__tag">Le plus demandé</span>
              )}

              <div className="pricing-card-c__head">
                <span className="pricing-card-c__num">{tier.num}</span>
                <h3 className="pricing-card-c__title">
                  {tier.title} <em>{tier.subtitle}</em>
                </h3>
              </div>

              <div className="pricing-card-c__price">
                <span className="pricing-card-c__from">à partir de</span>
                <span className="pricing-card-c__value">
                  {tier.price}<span className="pricing-card-c__unit"> € HT</span>
                </span>
              </div>

              <p className="pricing-card-c__desc">{tier.desc}</p>

              <ul className="pricing-card-c__list">
                {tier.features.map((feat) => (
                  <li key={feat}>{feat}</li>
                ))}
              </ul>

              <span
                role="link"
                className={`pricing-card-c__cta ${tier.featured ? "is-primary" : ""}`}
                onClick={(e) => {
                  if (!isCenter) return;
                  e.stopPropagation();
                  window.location.hash = "contact";
                }}
              >
                {tier.cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="pricing-carousel__dots" role="tablist" aria-label="Naviguer entre les offres">
        {TIERS.map((tier) => (
          <button
            key={tier.id}
            type="button"
            role="tab"
            className={`pricing-carousel__dot ${activeId === tier.id ? "is-active" : ""}`}
            onClick={() => setActiveId(tier.id)}
            aria-label={`Voir ${tier.title}`}
            aria-selected={activeId === tier.id}
          />
        ))}
      </div>
    </div>
  );
}
