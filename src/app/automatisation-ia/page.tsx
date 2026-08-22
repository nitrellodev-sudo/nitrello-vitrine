import type { Metadata } from "next";
import Link from "next/link";
import CalButton from "@/components/CalButton";
import CalEmbedScript from "@/components/CalEmbedScript";
import FloatingCTA from "@/components/FloatingCTA";
import RevealOnScroll from "@/components/RevealOnScroll";
import WorkflowAnimation from "@/components/WorkflowAnimation";
import MethodProgress from "@/components/MethodProgress";
import WorkflowDemo from "@/components/WorkflowDemo";

export const metadata: Metadata = {
  title: {
    absolute: "Automatisation par l'IA · Nitrello",
  },
  description:
    "J'analyse ton quotidien, je repère les tâches répétitives et je construis l'outil sur mesure qui s'en occupe à ta place. Installation et formation comprises.",
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

const CAL_URL = "https://cal.com/nicolas-2j0lvm/echange";

export default function AutomatisationIaPage() {
  return (
    <>
      {/* Listeners invisibles : reveal au scroll + les deux animations de la page */}
      <RevealOnScroll />
      <WorkflowAnimation />
      <MethodProgress />
      <FloatingCTA />
      <CalEmbedScript />

      {/* Sprite d'icônes de la page (référencé via <use href="#i-..."/>) */}
      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}
        aria-hidden="true"
      >
        {/* i-mail, i-sparkles et i-database ont suivi le workflow dans
            <WorkflowDemo />, qui porte désormais son propre sprite `wf-i-`.
            i-file et i-bell restent ici : les cap-cards les utilisent. */}
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
            <Link href="/" className="ia-back reveal">
              <svg className="ia-icon" aria-hidden="true">
                <use href="#i-arrow-left" />
              </svg>
              Retour à l&apos;accueil
            </Link>
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
              <CalButton
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
              </CalButton>
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
          <WorkflowDemo />
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
            <h2 className="h-section">Une automatisation, <em>cinq temps.</em></h2>
            <p className="lede">
              La même méthode que pour tout projet que je livre, appliquée à
              l&apos;automatisation. Pas de promesse magique : tu sais
              exactement ce que je fais, et pourquoi, à chaque étape.
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
                <div className="ia-method-tag">Contact</div>
                <h3>On se parle, sans engagement</h3>
                <p>
                  Un appel de 45 minutes. Je vois comment tu bosses, où passent
                  tes heures, quels outils tu utilises. Je te dis honnêtement si
                  je suis le bon interlocuteur.
                </p>
              </div>
            </div>
            <div className="ia-method-step reveal">
              <div className="ia-method-num">02</div>
              <div className="ia-method-body">
                <div className="ia-method-tag">Étude</div>
                <h3>Je repère, je chiffre, tu valides</h3>
                <p>
                  Toutes les tâches ne se valent pas. Je trouve les points de
                  ton process où l&apos;automatisation apporte un vrai gain,
                  j&apos;écarte ce qui n&apos;en vaut pas la peine, et je te
                  montre combien de temps et d&apos;argent tu vas récupérer. Tu
                  décides en connaissance de cause.
                </p>
              </div>
            </div>
            <div className="ia-method-step reveal">
              <div className="ia-method-num">03</div>
              <div className="ia-method-body">
                <div className="ia-method-tag">Build</div>
                <h3>Je construis l&apos;automatisation</h3>
                <p>
                  Je développe sur mesure, adapté à ton métier et à tes outils
                  existants. Tu vois avancer au fur et à mesure, pas à la fin.
                </p>
              </div>
            </div>
            <div className="ia-method-step reveal">
              <div className="ia-method-num">04</div>
              <div className="ia-method-body">
                <div className="ia-method-tag">Livraison</div>
                <h3>J&apos;installe et je te forme</h3>
                <p>
                  Je l&apos;installe, je la teste, je m&apos;assure
                  qu&apos;elle tourne. Puis je te forme et je documente :
                  l&apos;outil ne sert à rien si tu ne sais pas t&apos;en
                  servir. Tu es autonome.
                </p>
              </div>
            </div>
            <div className="ia-method-step reveal">
              <div className="ia-method-num">05</div>
              <div className="ia-method-body">
                <div className="ia-method-tag">Suivi</div>
                <h3>Ton outil vit, je reste joignable</h3>
                <p>
                  Une automatisation tourne tous les jours, branchée à tes
                  outils. Je garde un œil dessus et je l&apos;ajuste quand ton
                  besoin bouge, dans le cadre du contrat de maintenance détaillé
                  plus bas.
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
                Fini le copier-coller entre tes outils. La demande d&apos;un
                client atterrit toute seule dans ton suivi de chantiers ou
                d&apos;interventions.
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
                Devis de chantier sans réponse, factures impayées, clients sans
                nouvelles : plus rien ne passe à la trappe.
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
                Demandes de devis, questions sur un planning, réclamations :
                les mails qui reviennent sont traités sans que tu t&apos;en
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
                Devis, comptes rendus de chantier ou d&apos;intervention,
                factures : produits automatiquement, prêts à envoyer.
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
                Ton CRM, ta boîte mail, ton planning et ta compta qui se
                parlent enfin entre eux.
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
              <h3>Rien ne part sans ta validation</h3>
              <p>
                Une machine qui écrit à tes clients à ta place, ça inquiète, et
                c&apos;est légitime. Je conçois les flux pour que tu gardes la
                main : ce qui sort de chez toi passe par toi, tant que tu
                n&apos;as pas décidé le contraire.
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
              Automatiser une relance mail ou toute une chaîne de production, ce
              n&apos;est pas le même chantier : te donner un « à partir de X € »
              serait te mentir.
            </p>
            <p>
              J&apos;étudie ton cas et je chiffre tes économies. Un outil se
              construit une fois, puis il travaille sans salaire, là où une tâche
              faite à la main te coûte chaque mois.{" "}
              <strong>
                Tu n&apos;investis que si le calcul est rentable pour toi.
              </strong>
            </p>
            <CalButton
              href={CAL_URL}
              target="_blank"
              rel="noopener"
              className="btn btn-primary"
            >
              Discutons de ton cas · 45{" "}min, gratuit
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
            </CalButton>
            {/* Le détail de la logique de chiffrage vit sur la home, une seule
                fois : ici on renvoie plutôt que de la recopier. */}
            <p className="price-more">
              <Link href="/#pricing">Comment je chiffre un projet</Link>
            </p>
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
              Un échange de 45 minutes suffit pour identifier tes premières
              pistes. Gratuit, sans engagement. Tu repars avec des idées
              concrètes, que tu travailles avec moi ou non.
            </p>
            <CalButton
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
            </CalButton>
          </div>
        </div>
      </section>

      {/* Floating CTA : reste visible pendant le scroll, même chemin de
          conversion que la home (modal Cal.com, fallback lien direct) */}
      <CalButton
        href={CAL_URL}
        className="float-cta"
        id="float-cta"
        ariaLabel="Réserver un appel de 45 minutes"
      >
        <span className="float-cta-dot" aria-hidden="true"></span>
        <span>Réserver un appel<span className="float-cta-label-long"> · 45 min</span></span>
        <svg className="float-cta-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
      </CalButton>
    </>
  );
}
