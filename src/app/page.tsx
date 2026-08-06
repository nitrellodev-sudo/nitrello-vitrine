import Image from "next/image";
import Link from "next/link";
import CalButton from "@/components/CalButton";
import CalEmbedScript from "@/components/CalEmbedScript";
import ContactForm from "@/components/ContactForm";
import FaqAccordion from "@/components/FaqAccordion";
import FloatingCTA from "@/components/FloatingCTA";
import PhareTypewriter from "@/components/PhareTypewriter";
import HologramPortrait from "@/components/HologramPortrait";
import RecentBlogPostsSection from "@/components/RecentBlogPostsSection";
import RevealOnScroll from "@/components/RevealOnScroll";


export default function Home() {
  return (
    <div>
      {/* Composants invisibles : posent les listeners sur les éléments existants */}
      <RevealOnScroll />
      <FaqAccordion />
      <FloatingCTA />
      <HologramPortrait />
      <CalEmbedScript />

      {/* ============================================================
           HERO
           ============================================================ */}
      <section id="hero">
        <div className="hero-flow" aria-hidden="true">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>
        <div className="hero-mark" aria-hidden="true"></div>
        <div className="container">
          <div className="hero-inner">
            <div className="hero-copy">
              <div className="eyebrow reveal">Nicolas Tinnirello, Freelance</div>
              <h1 className="h-display reveal r-1">
                Je transforme ton temps perdu en <span className="accent">argent</span> gagné.
              </h1>
              <p className="lede reveal r-2">
                Automatisation, outils de gestion, sites sur-mesure. Chaque projet commence par une conversation.
              </p>
              <div className="hero-actions reveal r-3">
                <a href="#contact" className="btn btn-primary">
                  En discuter
                  <svg className="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </a>
                <a href="#work" className="btn btn-ghost">Voir les réalisations</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
           TICKER , marquee de spécialités (densité éditoriale)
           ============================================================ */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          <span className="ticker-item">Automatisation IA</span><span className="ticker-dot"></span>
          <span className="ticker-item">Agents &amp; assistants</span><span className="ticker-dot"></span>
          <span className="ticker-item">Outil de gestion</span><span className="ticker-dot"></span>
          <span className="ticker-item">CRM sur-mesure</span><span className="ticker-dot"></span>
          <span className="ticker-item">Site vitrine</span><span className="ticker-dot"></span>
          <span className="ticker-item">Tableau de bord</span><span className="ticker-dot"></span>
          <span className="ticker-item">Espace client</span><span className="ticker-dot"></span>
          <span className="ticker-item">App web &amp; mobile</span><span className="ticker-dot"></span>
          <span className="ticker-item">Intégration API</span><span className="ticker-dot"></span>
          <span className="ticker-item">Gain de temps</span><span className="ticker-dot"></span>
          {/* Duplicate for seamless loop */}
          <span className="ticker-item">Automatisation IA</span><span className="ticker-dot"></span>
          <span className="ticker-item">Agents &amp; assistants</span><span className="ticker-dot"></span>
          <span className="ticker-item">Outil de gestion</span><span className="ticker-dot"></span>
          <span className="ticker-item">CRM sur-mesure</span><span className="ticker-dot"></span>
          <span className="ticker-item">Site vitrine</span><span className="ticker-dot"></span>
          <span className="ticker-item">Tableau de bord</span><span className="ticker-dot"></span>
          <span className="ticker-item">Espace client</span><span className="ticker-dot"></span>
          <span className="ticker-item">App web &amp; mobile</span><span className="ticker-dot"></span>
          <span className="ticker-item">Intégration API</span><span className="ticker-dot"></span>
          <span className="ticker-item">Gain de temps</span><span className="ticker-dot"></span>
        </div>
      </div>

      {/* ============================================================
           BLOC PHARE IA
           ============================================================ */}
      <section className="phare">
        <div className="phare-mark" aria-hidden="true"></div>
        <div className="container">
          <div className="phare-inner">
            <div className="eyebrow reveal">Automatisation · IA</div>
            <h2 className="phare-title reveal r-1">
              Économise du temps.<br />
              <span className="phare-grad">Gagne en productivité.</span>
            </h2>
            <p className="phare-typed-line reveal r-2">
              Pendant que tu fais ton métier,<br />
              <span className="phare-nowrap">tes outils s&apos;occupent de <PhareTypewriter /></span>
            </p>
            <div className="phare-actions reveal r-3">
              <Link href="/automatisation-ia" className="btn btn-primary">
                Découvrir l&apos;offre
                <svg className="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </Link>
              <Link href="/automatisation-ia#wf-anchor" className="btn btn-ghost">Voir un exemple concret</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
           CTA INTERMÉDIAIRE
           ============================================================ */}
      <section className="cta-mid">
        <div className="container">
          <div className="cta-mid-copy reveal">
            <h2>On regarde ensemble ce que tu peux <em>automatiser</em> ?</h2>
            <p>30 minutes, gratuit, sans engagement. On parle de ton activité, je te dis franchement ce qui vaut le coup.</p>
          </div>
          <CalButton href="https://cal.com/nicolas-2j0lvm/30min" className="btn btn-primary reveal r-1">
            Réserver un échange
            <svg className="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
          </CalButton>
        </div>
      </section>

      {/* ============================================================
           SERVICES
           ============================================================ */}
      <section id="services">
        <div className="container">
          <div className="section-head reveal">
            <div className="eyebrow">Aussi au catalogue</div>
            <h2 className="h-section">Pas que de l&apos;IA. <em>Des outils qui durent.</em></h2>
            <p className="lede">L&apos;automatisation, c&apos;est la partie visible. En dessous, il y a le socle : les outils de gestion et les sites que je construis depuis le début, sur mesure.</p>
          </div>

          <div className="svc-grid">
            <article className="svc-card reveal">
              <div className="svc-num">Gestion</div>
              <h3 className="h-card">Outils de gestion<em>sur mesure</em></h3>
              <p>CRM, tableaux de bord, back-offices, formulaires intelligents. L&apos;outil qui remplace tes fichiers Excel partagés et fait tourner ton activité au quotidien.</p>
              <ul className="svc-list">
                <li>CRM &amp; suivi client</li>
                <li>Dashboards sur mesure</li>
                <li>Apps internes métier</li>
              </ul>
              <p className="svc-proof">En production · <strong>CRM Nitrello</strong> · <strong>CRM Esprit Auto</strong></p>
            </article>

            <article className="svc-card reveal r-1">
              <div className="svc-num">Vitrine</div>
              <h3 className="h-card">Site vitrine<em>qui te ressemble</em></h3>
              <p>Un site pensé pour toi, pas un template parmi d&apos;autres. Rapide, soigné, pensé pour convertir. Souvent le premier pas d&apos;une collaboration.</p>
              <ul className="svc-list">
                <li>Design personnalisé</li>
                <li>Rapide &amp; optimisé SEO</li>
                <li>Livré en 1 à 2 semaines</li>
              </ul>
              <p className="svc-proof">En ligne · <strong>Esprit Auto</strong> · <strong>TSG</strong></p>
            </article>
          </div>
        </div>
      </section>

      {/* ============================================================
           MÉTHODE
           ============================================================ */}
      <section id="method">
        <div className="method-mark" aria-hidden="true" />
        <div className="container">
          <div className="method-grid">
            <div className="section-head reveal">
              <div className="eyebrow">Méthode</div>
              <h2 className="h-section">Un projet, <em>quatre temps.</em></h2>
              <p className="lede">Je travaille en cycles courts, avec des livraisons régulières. Tu vois ton projet prendre forme au fur et à mesure , pas à la fin.</p>
            </div>

            <div className="method-steps">
              <div className="method-step reveal">
                <div className="method-num">01 · Contact</div>
                <div className="method-body">
                  <h4>On se parle, <em>sans engagement.</em></h4>
                  <p>Un appel de 30 minutes pour comprendre ton besoin, ton contexte, ton budget. Je te dis honnêtement si je suis le bon interlocuteur.</p>
                </div>
              </div>
              <div className="method-step reveal r-1">
                <div className="method-num">02 · Cadrage</div>
                <div className="method-body">
                  <h4>On dessine <em>ensemble.</em></h4>
                  <p>Je formalise un plan : ce qu&apos;on fait, ce qu&apos;on ne fait pas, les maquettes des écrans clés, le planning et le prix. Tu valides avant qu&apos;on démarre.</p>
                </div>
              </div>
              <div className="method-step reveal r-2">
                <div className="method-num">03 · Build</div>
                <div className="method-body">
                  <h4>Je construis, <em>tu regardes avancer.</em></h4>
                  <p>Livraisons toutes les semaines ou tous les 15 jours. Tu testes en conditions réelles, tu me donnes ton retour, on ajuste.</p>
                </div>
              </div>
              <div className="method-step reveal r-3">
                <div className="method-num">04 · Livraison</div>
                <div className="method-body">
                  <h4>On met en ligne, <em>et après ?</em></h4>
                  <p>Mise en production, formation si besoin, documentation. Et un mois de suivi inclus pour être sûr que tout roule.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
           CHIFFRAGE (remplace Tarifs · id "pricing" conservé pour les
           liens /#pricing de la navbar et du footer)
           ============================================================ */}
      <section id="pricing" className="chiffrage">
        <div className="container">
          <div className="chiffrage-head reveal">
            <div className="eyebrow">Comment ça se passe</div>
            <h2 className="h-section">Je ne te vends pas un prix. <em>Je te montre ce que tu <span className="chiffrage-grad">économises.</span></em></h2>
            <p className="lede">Chaque projet est chiffré au cas par cas, après étude de ton fonctionnement. Pas de grille toute faite : le montant dépend de ce que tu vas récupérer en temps et en argent.</p>
          </div>

          <div className="principes">
            <div className="principe reveal">
              <div className="principe-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              </div>
              <h3>Aucun prix au hasard</h3>
              <p>J&apos;étudie d&apos;abord ton activité, tes tâches, tes outils. Le chiffrage vient après, adapté à ton cas précis.</p>
            </div>
            <div className="principe reveal r-1">
              <div className="principe-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" /><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" /><path d="M7 21h10" /><path d="M12 3v18" /><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" /></svg>
              </div>
              <h3>Le gain avant le coût</h3>
              <p>Avant que tu t&apos;engages, je te montre combien de temps et d&apos;argent l&apos;outil va te faire récupérer. Tu décides en connaissance de cause.</p>
            </div>
            <div className="principe reveal r-2">
              <div className="principe-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
              </div>
              <h3>Tu ne paies que si c&apos;est rentable</h3>
              <p>Si le calcul ne penche pas nettement en ta faveur, je te le dis. Tu n&apos;investis que quand ça vaut clairement le coup pour toi.</p>
            </div>
          </div>

          <div className="roi-line reveal">
            <p>Deux heures par jour récupérées, c&apos;est <em>plus d&apos;une journée par semaine</em> que tu ne paies pas.</p>
          </div>

          <div className="chiffrage-cta reveal">
            <CalButton href="https://cal.com/nicolas-2j0lvm/30min" className="btn btn-primary">
              Réserver un échange de 30 min
              <svg className="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </CalButton>
            <p>Gratuit, sans engagement. <strong>C&apos;est le seul chemin vers un devis.</strong></p>
          </div>

          <div className="chiffrage-foot reveal">
            <div className="chiffrage-foot-row">
              <span className="dot-mono">●</span>
              <span><strong>Un contrat de maintenance</strong> mensuel est à privilégier pour les outils qui vivent · je surveille, j&apos;ajuste et je reste joignable quand ton besoin évolue.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
           RÉALISATIONS
           ============================================================ */}
      <section id="work">
        <div className="work-mark" aria-hidden="true" />
        <div className="container">
          <div className="work-head reveal">
            <div>
              <div className="eyebrow">Réalisations</div>
              <h2 className="h-section">En ligne. En production. Pas dans un portfolio.</h2>
              <p className="lede">Chaque projet répond à un contexte précis. Voici ce qui tourne actuellement chez mes clients.</p>
            </div>
          </div>

          <div className="work-list">
            {/* Projet 1 : Esprit Auto */}
            <article className="work-item reveal">
              <div className="work-meta">
                <div className="work-tags">
                  <span className="work-tag">Site vitrine</span>
                  <span className="work-tag">Local business</span>
                  <span className="work-tag">Next.js</span>
                </div>
                <h3 className="work-title">Esprit Auto <em>, Saint-Marcellin</em></h3>
                <p className="work-desc">Site vitrine complet pour un garage local : carrosserie, vitrage, mécanique. Formulaire de contact intelligent, section avis Google (51 avis ★ 5/5), galerie de réalisations et prise en charge assurance expliquée simplement.</p>
                <a href="https://espritauto38.com/" target="_blank" rel="noopener" className="work-link">
                  Voir le site en ligne
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M9 7h8v8" /></svg>
                </a>
              </div>
              <a href="https://espritauto38.com/" target="_blank" rel="noopener" className="work-visual">
                <Image src="/espritautopreview.webp" alt="Aperçu du site Esprit Auto" width={1280} height={624} sizes="(max-width: 900px) 100vw, 50vw" />
              </a>
            </article>

            {/* Projet 2 : Team Solution Garage */}
            <article className="work-item reveal">
              <div className="work-meta">
                <div className="work-tags">
                  <span className="work-tag">Site asso</span>
                  <span className="work-tag">Club moto</span>
                  <span className="work-tag">Sur-mesure</span>
                </div>
                <h3 className="work-title">Team Solution Garage <em>, Le Pont-de-Claix</em></h3>
                <p className="work-desc">Site vitrine pour une association de roulage moto sur circuit. Présentation du club et de l&apos;esprit paddock, formulaire d&apos;adhésion en ligne avec confirmation automatique par email, espace sponsors et partenaires. Pensé pour accueillir débutants comme pilotes confirmés.</p>
                <a href="https://teamsolutiongarage.fr" target="_blank" rel="noopener" className="work-link">
                  Voir le site en ligne
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M9 7h8v8" /></svg>
                </a>
              </div>
              <a href="https://teamsolutiongarage.fr" target="_blank" rel="noopener" className="work-visual">
                <Image src="/tsgpreview.webp" alt="Aperçu du site Team Solution Garage" width={1280} height={620} sizes="(max-width: 900px) 100vw, 50vw" />
              </a>
            </article>

            <p className="work-cta-line reveal">
              D&apos;autres projets en cours, en discussion privée. Pour en discuter, <a href="#contact">c&apos;est ici &rarr;</a>
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
           ARTICLES RÉCENTS (3 derniers articles du blog)
           ============================================================ */}
      <RecentBlogPostsSection />

      {/* ============================================================
           À PROPOS
           ============================================================ */}
      <section id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-portrait reveal">
              <div className="portrait-orbit" aria-hidden="true">
                <span className="orbit-dot orbit-dot-1"></span>
                <span className="orbit-dot orbit-dot-2"></span>
                <span className="orbit-dot orbit-dot-3"></span>
              </div>
              <div className="portrait-constellation" aria-hidden="true">
                <span className="star star-1"></span>
                <span className="star star-2"></span>
                <span className="star star-3"></span>
                <span className="star star-4"></span>
                <span className="star star-5"></span>
              </div>

              <div className="about-photo" id="hologram-portrait">
                <div className="hologram-frame">
                  <Image src="/nicolas.webp" alt="Nicolas Tinnirello, développeur freelance" width={1122} height={1402} sizes="(max-width: 900px) 80vw, 420px" />
                  <div className="hologram-shine" aria-hidden="true"></div>
                  <div className="hologram-grid" aria-hidden="true"></div>
                </div>
              </div>
            </div>
            <div className="about-body reveal r-1">
              <div className="eyebrow">À propos</div>
              <h2 className="h-section">Nicolas Tinnirello. <em>Freelance en automatisation &amp; IA.</em></h2>
              <p>Je suis développeur freelance. Je construis des outils qui font gagner du temps : automatisations intelligentes, outils de gestion sur mesure, sites qui convertissent. Pour des PME, des indépendants et des porteurs de projet qui veulent avancer vite et bien.</p>
              <p>Un bon outil part toujours d&apos;une vraie discussion. Prendre le temps de comprendre ton activité, ton fonctionnement et tes contraintes, c&apos;est ce qui me permet de construire quelque chose qui colle vraiment à tes besoins, plutôt qu&apos;une solution générique. Plus je cerne ton contexte, plus le résultat est précis, utile et personnalisé.</p>
              <p>Je travaille seul, en proximité. Tu as un interlocuteur, pas une agence. <em>Un projet unique, une relation directe.</em></p>
              <div className="about-sign">Nicolas</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
           FAQ
           ============================================================ */}
      <section id="faq">
        <div className="faq-mark" aria-hidden="true" />
        <div className="container">
          <div className="faq-grid">
            <div className="faq-side reveal">
              <div className="eyebrow">Questions</div>
              <h2 className="h-section">Les questions <em>qui reviennent.</em></h2>
              <p className="lede">Des réponses honnêtes pour cadrer ton projet, l&apos;automatisation comme le reste.</p>
              <div className="faq-direct">
                <div className="label">Pas trouvé ta question ?</div>
                <a href="mailto:contact@nitrello.com">Écris-moi directement →</a>
              </div>
            </div>
            <div className="faq-list reveal r-1">
              <div className="faq-item">
                <button className="faq-q" type="button" aria-expanded="false">
                  <span className="faq-num">Q.01</span>
                  <span className="faq-q-text">Pourquoi pas juste utiliser ChatGPT moi-même ?</span>
                  <span className="faq-toggle" aria-hidden="true"></span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-spacer"></div>
                  <p className="faq-a-text">ChatGPT répond à une question. Une automatisation, elle, <strong>travaille pour toi sans que tu lèves le petit doigt</strong>. C&apos;est un outil sur-mesure branché à tes vrais outils · mails, agenda, CRM, facturation · avec toute une mécanique en coulisses qui déclenche les bonnes actions au bon moment. Toi, tu poserais la question et tu recopierais la réponse. Là, c&apos;est le système qui lit, décide et agit tout seul. C&apos;est un autre métier, que je construis et j&apos;installe pour toi.</p>
                </div>
              </div>
              <div className="faq-item">
                <button className="faq-q" type="button" aria-expanded="false">
                  <span className="faq-num">Q.02</span>
                  <span className="faq-q-text">L&apos;IA va remplacer mes salariés ?</span>
                  <span className="faq-toggle" aria-hidden="true"></span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-spacer"></div>
                  <p className="faq-a-text"><strong>Non.</strong> L&apos;idée n&apos;est pas de virer du monde, c&apos;est de retirer à tes équipes les tâches répétitives et sans valeur pour qu&apos;elles se concentrent sur ce qui compte vraiment. En pratique, ça t&apos;évite souvent d&apos;embaucher un renfort sur tes pics d&apos;activité · l&apos;automatisation encaisse la surcharge. Tes salariés ne sont pas remplacés, <strong>ils sont plus efficaces là où ils font la différence</strong>.</p>
                </div>
              </div>
              <div className="faq-item">
                <button className="faq-q" type="button" aria-expanded="false">
                  <span className="faq-num">Q.03</span>
                  <span className="faq-q-text">Combien de temps avant qu&apos;une automatisation tourne ?</span>
                  <span className="faq-toggle" aria-hidden="true"></span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-spacer"></div>
                  <p className="faq-a-text">Ça dépend de la complexité, mais la plupart sont en place <strong>en quelques semaines</strong>. On avance par étapes : je te livre vite quelque chose d&apos;utilisable, puis on affine. Tu n&apos;attends pas six mois pour voir le premier résultat.</p>
                </div>
              </div>
              <div className="faq-item">
                <button className="faq-q" type="button" aria-expanded="false">
                  <span className="faq-num">Q.04</span>
                  <span className="faq-q-text">Et si mon activité change, l&apos;automatisation suit ?</span>
                  <span className="faq-toggle" aria-hidden="true"></span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-spacer"></div>
                  <p className="faq-a-text">Oui. Un outil qui tourne, ça se fait vivre · ton activité évolue, l&apos;automatisation doit suivre. C&apos;est tout l&apos;intérêt d&apos;un <strong>contrat de maintenance mensuel</strong> : je garde un œil sur l&apos;outil, je l&apos;ajuste quand ton besoin bouge, et tu n&apos;es jamais seul face à une machine qui déraille. Tu restes autonome au quotidien, je reste joignable pour le reste.</p>
                </div>
              </div>
              <div className="faq-item">
                <button className="faq-q" type="button" aria-expanded="false">
                  <span className="faq-num">Q.05</span>
                  <span className="faq-q-text">Mes données partent où ? C&apos;est sécurisé ?</span>
                  <span className="faq-toggle" aria-hidden="true"></span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-spacer"></div>
                  <p className="faq-a-text"><strong>Tes données restent les tiennes.</strong> Je conçois les automatisations pour qu&apos;elles traitent tes informations de la façon la plus sûre possible, sans les exposer inutilement. On regarde ensemble quels outils sont impliqués et où transitent les données · la sécurité fait partie de la conception, pas d&apos;une case cochée après coup.</p>
                </div>
              </div>
              <div className="faq-item">
                <button className="faq-q" type="button" aria-expanded="false">
                  <span className="faq-num">Q.06</span>
                  <span className="faq-q-text">Combien ça coûte ?</span>
                  <span className="faq-toggle" aria-hidden="true"></span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-spacer"></div>
                  <p className="faq-a-text">Ça dépend entièrement de ton projet · c&apos;est pour ça que je ne mets pas de prix ici. Je chiffre <strong>au cas par cas</strong>, après avoir étudié ton fonctionnement, en fonction de ce que tu vas récupérer en temps et en argent. Le principe est simple : <strong>tu ne t&apos;engages que si le calcul penche clairement en ta faveur</strong>. On en parle lors de l&apos;échange, et c&apos;est là que part le devis.</p>
                </div>
              </div>
              <div className="faq-item">
                <button className="faq-q" type="button" aria-expanded="false">
                  <span className="faq-num">Q.07</span>
                  <span className="faq-q-text">Et après la livraison ?</span>
                  <span className="faq-toggle" aria-hidden="true"></span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-spacer"></div>
                  <p className="faq-a-text"><strong>Je ne disparais pas une fois l&apos;outil livré.</strong> Formation, documentation, support : tu sais t&apos;en servir et tu n&apos;es jamais seul. Pour les outils qui évoluent · comme les automatisations · un contrat de maintenance mensuel prend le relais. Sinon, toute la doc t&apos;est livrée et tu reprends la main.</p>
                </div>
              </div>
              <div className="faq-item">
                <button className="faq-q" type="button" aria-expanded="false">
                  <span className="faq-num">Q.08</span>
                  <span className="faq-q-text">Tu prends tous les projets ?</span>
                  <span className="faq-toggle" aria-hidden="true"></span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-spacer"></div>
                  <p className="faq-a-text"><strong>Non.</strong> Je préfère dire honnêtement que je ne suis pas le bon interlocuteur plutôt que de mal faire. Lors du premier échange, si ton projet ne me correspond pas, je te le dis et je t&apos;oriente vers quelqu&apos;un de mieux placé.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
           CONTACT / CTA
           ============================================================ */}
      <section id="contact">
        {/* Soft motif backdrop */}
        <svg className="contact-bg" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="cbg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#00BFFF" stopOpacity="0.18" />
              <stop offset="1" stopColor="#7B2FFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle cx="200" cy="500" r="400" fill="url(#cbg)" />
          <circle cx="1000" cy="100" r="300" fill="url(#cbg)" opacity="0.7" />
        </svg>

        <div className="container">
          <div className="contact-inner">
            <div className="reveal contact-intro">
              <div className="eyebrow">On en parle ?</div>
              <h2 className="h-display">Ton projet, <em>notre première conversation.</em></h2>
              <p className="lede">30 minutes au téléphone, sans engagement. Je t&apos;écoute, je pose des questions, je te dis honnêtement si je peux t&apos;aider, et comment.</p>
              <div className="contact-meta">
                <div className="contact-meta-item">
                  <span className="label">Réponse</span>
                  <span className="value">Sous 24h</span>
                </div>
                <div className="contact-meta-item">
                  <span className="label">Premier appel</span>
                  <span className="value">Gratuit</span>
                </div>
                <div className="contact-meta-item">
                  <span className="label">Engagement</span>
                  <span className="value">Aucun</span>
                </div>
              </div>
              <div className="contact-direct">
                <div className="contact-direct-label">Tu préfères en direct ?</div>
                <a href="tel:+33688649584" className="contact-direct-row">
                  <span>06 88 64 95 84</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </a>
                <a href="mailto:contact@nitrello.com" className="contact-direct-row">
                  <span>contact@nitrello.com</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </a>
                <CalButton href="https://cal.com/nicolas-2j0lvm/30min" className="contact-direct-row">
                  <span>Réserver un appel · 30 min</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </CalButton>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Floating CTA : reste visible pendant le scroll */}
      <CalButton
        href="https://cal.com/nicolas-2j0lvm/30min"
        className="float-cta"
        id="float-cta"
        ariaLabel="Réserver un appel de 30 minutes"
      >
        <span className="float-cta-dot" aria-hidden="true"></span>
        <span>Réserver un appel<span className="float-cta-label-long"> · 30 min</span></span>
        <svg className="float-cta-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
      </CalButton>
    </div>
  );
}
