import type { Metadata } from "next";
import RevealOnScroll from "@/components/RevealOnScroll";
import WorkflowAnimation from "@/components/WorkflowAnimation";
import MethodProgress from "@/components/MethodProgress";

export const metadata: Metadata = {
  title: {
    absolute: "Automatisation par l'IA · Nitrello",
  },
  description:
    "J'analyse ton quotidien, je repère les tâches répétitives, je chiffre ce qu'elles te coûtent, puis je construis l'outil sur mesure qui s'en occupe à ta place. Installation et formation comprises.",
  alternates: {
    canonical: "https://nitrello.com/automatisation-ia",
  },
  openGraph: {
    title: "Automatisation par l'IA · Nitrello",
    description:
      "Le temps que tu perds sur des tâches répétitives, l'IA peut le récupérer. J'étudie ton cas, je chiffre tes économies, je construis l'outil qui travaille à ta place.",
    url: "https://nitrello.com/automatisation-ia",
    type: "website",
    locale: "fr_FR",
  },
};

const CAL_URL = "https://cal.com/nicolas-2j0lvm/30min";

export default function AutomatisationIaPage() {
  return (
    <>
      {/* Listeners invisibles : reveal au scroll + les deux animations de la page */}
      <RevealOnScroll />
      <WorkflowAnimation />
      <MethodProgress />

      {/* Sprite d'icônes de la page (référencé via <use href="#i-..."/>) */}
      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}
        aria-hidden="true"
      >
        <symbol id="i-mail" viewBox="0 0 24 24">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </symbol>
        <symbol id="i-sparkles" viewBox="0 0 24 24">
          <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z" />
        </symbol>
        <symbol id="i-database" viewBox="0 0 24 24">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14a9 3 0 0 0 18 0V5" />
          <path d="M3 12a9 3 0 0 0 18 0" />
        </symbol>
        <symbol id="i-file" viewBox="0 0 24 24">
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
          <path d="M10 9H8" />
        </symbol>
        <symbol id="i-bell" viewBox="0 0 24 24">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </symbol>
        <symbol id="i-refresh" viewBox="0 0 24 24">
          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
          <path d="M21 3v5h-5" />
          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
          <path d="M3 21v-5h5" />
        </symbol>
        <symbol id="i-inbox" viewBox="0 0 24 24">
          <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
          <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        </symbol>
        <symbol id="i-bot" viewBox="0 0 24 24">
          <path d="M12 8V4H8" />
          <rect width="16" height="12" x="4" y="8" rx="2" />
          <path d="M2 14h2" />
          <path d="M20 14h2" />
          <path d="M15 13v2" />
          <path d="M9 13v2" />
        </symbol>
        <symbol id="i-link" viewBox="0 0 24 24">
          <path d="M9 17H7A5 5 0 0 1 7 7h2" />
          <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
          <line x1="8" x2="16" y1="12" y2="12" />
        </symbol>
        <symbol id="i-arrow-left" viewBox="0 0 24 24">
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </symbol>
      </svg>

      {/* HERO */}
      <section className="ia-hero">
        <div className="ia-hero-bg" aria-hidden="true">
          <div className="ia-glow g1"></div>
          <div className="ia-glow g2"></div>
        </div>
        <div className="container">
          <div className="ia-hero-content">
            <a href="/" className="ia-back reveal">
              <svg className="ia-icon" aria-hidden="true">
                <use href="#i-arrow-left" />
              </svg>
              Retour à l&apos;accueil
            </a>
            <div className="eyebrow reveal">Automatisation sur mesure</div>
            <h1 className="reveal r-1">
              Le temps que tu perds sur des tâches répétitives,{" "}
              <span className="accent">l&apos;IA peut le récupérer.</span>
            </h1>
            <p className="lede reveal r-2">
              J&apos;analyse ton quotidien, je repère ce qui te fait perdre du
              temps, je chiffre ce que ça te coûte, puis je construis
              l&apos;outil qui s&apos;en occupe à ta place. Installation et
              formation comprises.
            </p>
            <div className="ia-hero-actions reveal r-3">
              <a
                href={CAL_URL}
                target="_blank"
                rel="noopener"
                className="btn btn-primary"
              >
                Trouvons ce que tu peux automatiser
                <svg
                  className="arrow"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#wf-anchor" className="btn btn-ghost">
                Voir un exemple concret
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M12 5v14M5 13l7 7 7-7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* LE CONSTAT */}
      <section className="ia-section">
        <div className="container">
          <div className="ia-head reveal">
            <div className="eyebrow">Le constat</div>
            <h2 className="h-section">
              Combien d&apos;heures par semaine sur des tâches qu&apos;un outil
              ferait à ta place ?
            </h2>
            <p className="lede">
              La plupart des entreprises perdent des heures chaque semaine sur
              des tâches répétitives qu&apos;elles ne remettent même plus en
              question. Parce que ça a toujours marché comme ça.
            </p>
          </div>
          <div className="cost-grid">
            <div className="cost-card reveal">
              <div className="task">
                Recopier des informations d&apos;un outil à un autre
              </div>
              <div className="cost">
                <strong>30 min</strong> par jour
                <br />
                <strong>2h30</strong> par semaine
                <br />
                <strong>110h</strong> par an
              </div>
            </div>
            <div className="cost-card reveal r-1">
              <div className="task">
                Relancer à la main les clients et les devis
              </div>
              <div className="cost">
                Des ventes perdues
                <br />
                par simple <strong>oubli</strong>
              </div>
            </div>
            <div className="cost-card reveal r-2">
              <div className="task">
                Trier, classer et répondre aux mails qui reviennent
              </div>
              <div className="cost">
                Une <strong>charge mentale</strong>
                <br />
                qui ne s&apos;arrête
                <br />
                jamais
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXEMPLE CONCRET · WORKFLOW ANIMÉ */}
      <section className="ia-section" id="wf-anchor">
        <div className="container">
          <div className="ia-head reveal">
            <div className="eyebrow">Un exemple concret</div>
            <h2 className="h-section">
              Une demande client qui se traite{" "}
              <span className="accent">toute seule.</span>
            </h2>
            <p className="lede">
              Voici un cas réel : un mail de demande arrive, et tout
              s&apos;enchaîne sans que tu touches à rien. Regarde le flux
              tourner.
            </p>
          </div>
          <div className="wf-stage reveal">
            <div className="wf-grid-bg" aria-hidden="true"></div>
            <div className="wf-inner">
              <div className="wf-track" id="wf-track">
                <div className="wf-node">
                  <div className="wf-node-box">
                    <div className="wf-node-tag">Déclencheur</div>
                    <div className="wf-ico">
                      <svg className="ia-icon" aria-hidden="true">
                        <use href="#i-mail" />
                      </svg>
                    </div>
                    <div className="wf-label">Mail reçu</div>
                    <div className="wf-sublabel">une demande arrive</div>
                  </div>
                </div>
                <div className="wf-connector">
                  <span className="spark"></span>
                </div>
                <div className="wf-node">
                  <div className="wf-node-box">
                    <div className="wf-node-tag">IA</div>
                    <div className="wf-ico">
                      <svg className="ia-icon" aria-hidden="true">
                        <use href="#i-sparkles" />
                      </svg>
                    </div>
                    <div className="wf-label">L&apos;IA lit le mail</div>
                    <div className="wf-sublabel">nom, besoin, contact</div>
                  </div>
                </div>
                <div className="wf-connector">
                  <span className="spark"></span>
                </div>
                <div className="wf-node">
                  <div className="wf-node-box">
                    <div className="wf-node-tag">Données</div>
                    <div className="wf-ico">
                      <svg className="ia-icon" aria-hidden="true">
                        <use href="#i-database" />
                      </svg>
                    </div>
                    <div className="wf-label">CRM rempli</div>
                    <div className="wf-sublabel">fiche créée seule</div>
                  </div>
                </div>
                <div className="wf-connector">
                  <span className="spark"></span>
                </div>
                <div className="wf-node">
                  <div className="wf-node-box">
                    <div className="wf-node-tag">Document</div>
                    <div className="wf-ico">
                      <svg className="ia-icon" aria-hidden="true">
                        <use href="#i-file" />
                      </svg>
                    </div>
                    <div className="wf-label">Devis généré</div>
                    <div className="wf-sublabel">prêt à envoyer</div>
                  </div>
                </div>
                <div className="wf-connector">
                  <span className="spark"></span>
                </div>
                <div className="wf-node">
                  <div className="wf-node-box">
                    <div className="wf-node-tag">Auto</div>
                    <div className="wf-ico">
                      <svg className="ia-icon" aria-hidden="true">
                        <use href="#i-bell" />
                      </svg>
                    </div>
                    <div className="wf-label">Relance programmée</div>
                    <div className="wf-sublabel">si pas de réponse</div>
                  </div>
                </div>
              </div>
              <div className="wf-legend">
                <span className="pill">
                  <span className="led"></span> Workflow actif · tourne 24h/24
                </span>
              </div>
            </div>
          </div>
          <p className="wf-caption reveal">
            De la réception du mail à la relance,{" "}
            <strong>zéro intervention humaine</strong>. Toi, tu fais autre
            chose.
          </p>
        </div>
      </section>

      {/* MA MÉTHODE */}
      <section className="ia-section">
        <div className="container">
          <div className="ia-head reveal">
            <div className="eyebrow">Ma méthode</div>
            <h2 className="h-section">5 étapes claires.</h2>
            <p className="lede">
              Pas de promesse magique. Tu sais exactement ce que je fais, et
              pourquoi, à chaque étape.
            </p>
          </div>
          <div className="ia-method-wrap" id="ia-method-wrap">
            <div className="ia-method-line" aria-hidden="true"></div>
            <div
              className="ia-method-line-fill"
              id="ia-method-fill"
              aria-hidden="true"
            ></div>
            <div className="ia-method-step reveal">
              <div className="ia-method-num">01</div>
              <div className="ia-method-body">
                <h3>J&apos;étudie ton fonctionnement</h3>
                <p>
                  On échange. Je vois comment tu bosses, où passent tes heures,
                  quels outils tu utilises. Je repère les tâches répétitives qui
                  pèsent sur ton quotidien.
                </p>
              </div>
            </div>
            <div className="ia-method-step reveal">
              <div className="ia-method-num">02</div>
              <div className="ia-method-body">
                <h3>Je repère ce qui peut être automatisé</h3>
                <p>
                  Toutes les tâches ne se valent pas. Je trouve les points de
                  ton process où l&apos;automatisation apporte un vrai gain, et
                  j&apos;écarte ce qui n&apos;en vaut pas la peine.
                </p>
              </div>
            </div>
            <div className="ia-method-step reveal">
              <div className="ia-method-num">03</div>
              <div className="ia-method-body">
                <h3>Je chiffre tes économies</h3>
                <p>
                  Avant de construire quoi que ce soit, je te montre combien de
                  temps et d&apos;argent tu vas récupérer. Tu décides en
                  connaissance de cause.
                </p>
              </div>
            </div>
            <div className="ia-method-step reveal">
              <div className="ia-method-num">04</div>
              <div className="ia-method-body">
                <h3>Je construis et j&apos;installe l&apos;outil</h3>
                <p>
                  Je développe l&apos;automatisation sur mesure, adaptée à ton
                  métier et à tes outils existants. Je l&apos;installe, je la
                  teste, je m&apos;assure qu&apos;elle tourne.
                </p>
              </div>
            </div>
            <div className="ia-method-step reveal">
              <div className="ia-method-num">05</div>
              <div className="ia-method-body">
                <h3>Je te forme</h3>
                <p>
                  L&apos;outil ne sert à rien si tu ne sais pas t&apos;en
                  servir. Je te forme, je documente, je reste joignable. Tu es
                  autonome.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CE QUE J'AUTOMATISE */}
      <section className="ia-section">
        <div className="container">
          <div className="ia-head reveal">
            <div className="eyebrow">Ce que j&apos;automatise</div>
            <h2 className="h-section">
              Concrètement, qu&apos;est-ce que je peux mettre en place ?
            </h2>
            <p className="lede">
              Quelques exemples de ce qu&apos;on peut construire. Ta situation
              déterminera ce qui a vraiment du sens pour toi.
            </p>
          </div>
          <div className="cap-grid">
            <div className="cap-card reveal">
              <div className="cap-ico">
                <svg className="ia-icon" aria-hidden="true">
                  <use href="#i-refresh" />
                </svg>
              </div>
              <h3>Saisie et transfert de données</h3>
              <p>
                Fini le copier-coller entre tes outils. Les informations
                circulent toutes seules.
              </p>
            </div>
            <div className="cap-card reveal r-1">
              <div className="cap-ico">
                <svg className="ia-icon" aria-hidden="true">
                  <use href="#i-bell" />
                </svg>
              </div>
              <h3>Relances automatiques</h3>
              <p>
                Clients, devis, factures impayées : plus rien ne passe à la
                trappe.
              </p>
            </div>
            <div className="cap-card reveal r-2">
              <div className="cap-ico">
                <svg className="ia-icon" aria-hidden="true">
                  <use href="#i-inbox" />
                </svg>
              </div>
              <h3>Tri et réponse aux mails</h3>
              <p>
                Les demandes qui reviennent sont traitées sans que tu t&apos;en
                occupes.
              </p>
            </div>
            <div className="cap-card reveal">
              <div className="cap-ico">
                <svg className="ia-icon" aria-hidden="true">
                  <use href="#i-file" />
                </svg>
              </div>
              <h3>Génération de documents</h3>
              <p>
                Devis, comptes-rendus, factures produits automatiquement, prêts
                à envoyer.
              </p>
            </div>
            <div className="cap-card reveal r-1">
              <div className="cap-ico">
                <svg className="ia-icon" aria-hidden="true">
                  <use href="#i-bot" />
                </svg>
              </div>
              <h3>Agents IA sur mesure</h3>
              <p>
                Un assistant qui surveille, alerte et agit selon les règles que
                tu fixes.
              </p>
            </div>
            <div className="cap-card reveal r-2">
              <div className="cap-ico">
                <svg className="ia-icon" aria-hidden="true">
                  <use href="#i-link" />
                </svg>
              </div>
              <h3>Connexion de tes outils</h3>
              <p>
                Ton CRM, ta boîte mail et ta compta qui se parlent enfin entre
                eux.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* POURQUOI MOI */}
      <section className="ia-section">
        <div className="container">
          <div className="ia-head reveal">
            <div className="eyebrow">Pourquoi moi</div>
            <h2 className="h-section">Pourquoi me confier ça ?</h2>
          </div>
          <div className="why-grid">
            <div className="why-card reveal">
              <div className="why-num">01</div>
              <h3>Je construis vraiment, je ne fais pas que conseiller</h3>
              <p>
                Je suis développeur. L&apos;outil, c&apos;est moi qui le code,
                qui l&apos;installe, qui le maintiens. Pas de sous-traitance, pas
                d&apos;intermédiaire.
              </p>
            </div>
            <div className="why-card reveal r-1">
              <div className="why-num">02</div>
              <h3>Je chiffre avant de vendre</h3>
              <p>
                Tu ne signes jamais à l&apos;aveugle. Le gain est calculé et
                présenté avant que tu t&apos;engages.
              </p>
            </div>
            <div className="why-card reveal r-2">
              <div className="why-num">03</div>
              <h3>Je reste joignable</h3>
              <p>
                Une fois l&apos;outil livré, je ne disparais pas. Formation,
                documentation, support : tu n&apos;es jamais seul face à ta
                machine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMBIEN ÇA COÛTE */}
      <section className="ia-section">
        <div className="container">
          <div className="price-card reveal">
            <div className="price-glow" aria-hidden="true"></div>
            <h2>Combien ça coûte ?</h2>
            <p>
              Honnêtement, je ne peux pas te donner un prix maintenant. Et
              c&apos;est normal.
            </p>
            <p>
              Automatiser une relance mail ou automatiser toute une chaîne de
              production, ce n&apos;est pas le même chantier. Te donner un « à
              partir de X € » serait te mentir.
            </p>
            <p>
              Ma logique est différente : j&apos;étudie ton cas, je chiffre tes
              économies. Un outil se construit une fois, puis il travaille sans
              salaire, là où une tâche faite à la main te coûte chaque mois.{" "}
              <strong>
                Tu n&apos;investis que si le calcul est rentable pour toi.
              </strong>
            </p>
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener"
              className="btn btn-primary"
            >
              Discutons de ton cas · 30{" "}min, gratuit
              <svg
                className="arrow"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* MAINTENANCE */}
      <section className="ia-section">
        <div className="container">
          <div className="ia-head reveal">
            <div className="eyebrow">Après la livraison</div>
            <h2 className="h-section">Un outil qui vit, ça s&apos;entretient.</h2>
            <p className="lede">
              Une automatisation tourne tous les jours, branchée à tes outils.
              Pour qu&apos;elle reste fiable dans le temps, je propose un contrat
              de maintenance mensuel · tu sais exactement ce qu&apos;il couvre.
            </p>
          </div>
          <div className="why-grid is-duo">
            <div className="why-card reveal">
              <div className="why-num">✓</div>
              <h3>Compris dans le forfait</h3>
              <p>
                Surveillance de l&apos;outil, correction des bugs, petits
                ajustements de l&apos;existant et mises à jour techniques. Je
                garde un œil dessus et je reste joignable, avec un délai de
                réponse défini.
              </p>
            </div>
            <div className="why-card reveal r-1">
              <div className="why-num">+</div>
              <h3>Facturé à part</h3>
              <p>
                Une nouvelle fonctionnalité, une nouvelle automatisation, une
                refonte : ça, c&apos;est un nouveau chantier. Je te fais un devis
                séparé, tu décides en connaissance de cause.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="ia-final">
        <div className="container">
          <div className="reveal">
            <h2>
              On trouve les heures que tu peux{" "}
              <span className="accent">récupérer</span> ?
            </h2>
            <p>
              Un échange de 30 minutes suffit pour identifier tes premières
              pistes. Gratuit, sans engagement. Tu repars avec des idées
              concrètes, que tu travailles avec moi ou non.
            </p>
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener"
              className="btn btn-primary"
            >
              Réserver mon créneau
              <svg
                className="arrow"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
