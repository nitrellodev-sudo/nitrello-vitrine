import CalButton from "@/components/CalButton";
import CalEmbedScript from "@/components/CalEmbedScript";
import ContactForm from "@/components/ContactForm";
import FaqAccordion from "@/components/FaqAccordion";
import FloatingCTA from "@/components/FloatingCTA";
import HeroTypewriter from "@/components/HeroTypewriter";
import PricingInteractive from "@/components/PricingInteractive";
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
                Ton idée devient <br />
                <HeroTypewriter />
              </h1>
              <p className="lede reveal r-2">
                Je conçois des applications web et mobile, des outils internes et des automatisations pour des PME, indépendants et porteurs de projet. Chaque projet commence par une conversation.
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
          <span className="ticker-item">Site vitrine</span><span className="ticker-dot"></span>
          <span className="ticker-item">App web &amp; mobile</span><span className="ticker-dot"></span>
          <span className="ticker-item">Outil interne</span><span className="ticker-dot"></span>
          <span className="ticker-item">Automatisation n8n</span><span className="ticker-dot"></span>
          <span className="ticker-item">Tableau de bord</span><span className="ticker-dot"></span>
          <span className="ticker-item">MVP startup</span><span className="ticker-dot"></span>
          <span className="ticker-item">Espace client</span><span className="ticker-dot"></span>
          <span className="ticker-item">Refonte produit</span><span className="ticker-dot"></span>
          <span className="ticker-item">Intégration API</span><span className="ticker-dot"></span>
          <span className="ticker-item">SEO &amp; performance</span><span className="ticker-dot"></span>
          {/* Duplicate for seamless loop */}
          <span className="ticker-item">Site vitrine</span><span className="ticker-dot"></span>
          <span className="ticker-item">App web &amp; mobile</span><span className="ticker-dot"></span>
          <span className="ticker-item">Outil interne</span><span className="ticker-dot"></span>
          <span className="ticker-item">Automatisation n8n</span><span className="ticker-dot"></span>
          <span className="ticker-item">Tableau de bord</span><span className="ticker-dot"></span>
          <span className="ticker-item">MVP startup</span><span className="ticker-dot"></span>
          <span className="ticker-item">Espace client</span><span className="ticker-dot"></span>
          <span className="ticker-item">Refonte produit</span><span className="ticker-dot"></span>
          <span className="ticker-item">Intégration API</span><span className="ticker-dot"></span>
          <span className="ticker-item">SEO &amp; performance</span><span className="ticker-dot"></span>
        </div>
      </div>

      {/* ============================================================
           SERVICES
           ============================================================ */}
      <section id="services">
        <div className="container">
          <div className="section-head reveal">
            <div className="eyebrow">Services</div>
            <h2 className="h-section">Ce que je fais, <em>concrètement.</em></h2>
            <p className="lede">Trois formats de mission reviennent le plus souvent. Chaque projet reste sur mesure — les détails ci-dessous donnent un cadre, pas une grille fermée.</p>
          </div>

          <div className="services-grid">
            <article className="service-card reveal">
              <div className="service-num">01</div>
              <h3 className="h-card">Applications <em>web &amp; mobile</em></h3>
              <p>Des interfaces soignées pour des besoins précis : SaaS, marketplace, espace client, configurateur, app iOS / Android. Côté utilisateur comme côté admin.</p>
              <ul className="service-list">
                <li>MVP pour startup</li>
                <li>Outils métier</li>
                <li>Sites vitrines premium</li>
              </ul>
            </article>

            <article className="service-card reveal r-1">
              <div className="service-num">02</div>
              <h3 className="h-card">Outils internes<em>pour équipes</em></h3>
              <p>Des dashboards, des formulaires intelligents, des back-offices qui remplacent vos fichiers Excel partagés. L&apos;outil que votre équipe attendait depuis 3 ans.</p>
              <ul className="service-list">
                <li>Dashboards sur mesure</li>
                <li>Gestion commerciale</li>
                <li>Suivi de production</li>
              </ul>
            </article>

            <article className="service-card reveal r-2">
              <div className="service-num">03</div>
              <h3 className="h-card">Automatisations<em>&amp; intégrations</em></h3>
              <p>Connecter vos outils entre eux, automatiser les tâches répétitives, brancher un agent conversationnel. Moins de copier-coller, plus de temps utile.</p>
              <ul className="service-list">
                <li>Workflows n8n / Make</li>
                <li>Intégrations API</li>
                <li>Agents &amp; assistants</li>
              </ul>
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
           TARIFS
           ============================================================ */}
      <section id="pricing">
        <div className="pricing-bg" aria-hidden="true">
          <div className="p-blob p-blob-1"></div>
          <div className="p-blob p-blob-2"></div>
        </div>
        <div className="container">
          <div className="pricing-head reveal">
            <div>
              <div className="eyebrow">Tarifs</div>
              <h2 className="h-section">Trois projets-types. Trois budgets.</h2>
            </div>
            <p className="pricing-intro">Des points de départ pour situer un projet. Le prix exact se définit après la préconception, en fonction de tes besoins réels.</p>
          </div>

          <PricingInteractive />

          <div className="pricing-foot reveal">
            <div className="pricing-foot-row">
              <span className="dot-mono">●</span>
              <span><strong>Tarifs indicatifs.</strong> Devis précis établi après la phase de préconception.</span>
            </div>
            <div className="pricing-foot-row">
              <span className="dot-mono">●</span>
              <span>Pour les <strong>automatisations &amp; intégrations</strong> seules : tarif sur mesure, à partir de <strong>500{' '}€{' '}HT</strong>.</span>
            </div>
            <div className="pricing-foot-row">
              <span className="dot-mono">●</span>
              <span><strong>Maintenance &amp; évolutions</strong> : forfait mensuel ou tickets à la demande, selon ce qui te va.</span>
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
                <img src="espritautopreview.webp" alt="Aperçu du site Esprit Auto" loading="lazy" />
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
                <img src="tsgpreview.webp" alt="Aperçu du site Team Solution Garage" loading="lazy" />
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
                  <img src="nicolas.png" alt="Nicolas Tinnirello, développeur freelance" loading="lazy" />
                  <div className="hologram-shine" aria-hidden="true"></div>
                  <div className="hologram-grid" aria-hidden="true"></div>
                </div>
              </div>
            </div>
            <div className="about-body reveal r-1">
              <div className="eyebrow">À propos</div>
              <h2 className="h-section">Nicolas Tinnirello. <em>Freelance, côté Grenoble.</em></h2>
              <p>Je suis développeur freelance. Je construis des applications web et mobile, des outils sur mesure pour des PME, des indépendants et des porteurs de projet qui veulent avancer vite et bien.</p>
              <p>J&apos;avance mieux quand un projet part d&apos;une vraie discussion : ton contexte, ton problème, tes utilisateurs. C&apos;est là qu&apos;on trouve le bon outil.</p>
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
              <p className="lede">Six réponses honnêtes pour cadrer ton projet.</p>
              <div className="faq-direct">
                <div className="label">Pas trouvé ta question ?</div>
                <a href="mailto:contact@nitrello.com">Écris-moi directement →</a>
              </div>
            </div>
            <div className="faq-list reveal r-1">
              <div className="faq-item">
                <button className="faq-q" type="button" aria-expanded="false">
                  <span className="faq-num">Q.01</span>
                  <span className="faq-q-text">Combien de temps pour un projet ?</span>
                  <span className="faq-toggle" aria-hidden="true"></span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-spacer"></div>
                  <p className="faq-a-text"><strong>Site vitrine</strong> : 1 à 2 semaines. <strong>App web ou mobile</strong> : 2 à 6 semaines selon la complexité. <strong>MVP startup</strong> : 2 à 4 semaines. Je donne un planning précis au moment du cadrage, et je m&apos;y tiens.</p>
                </div>
              </div>
              <div className="faq-item">
                <button className="faq-q" type="button" aria-expanded="false">
                  <span className="faq-num">Q.02</span>
                  <span className="faq-q-text">Combien ça coûte ?</span>
                  <span className="faq-toggle" aria-hidden="true"></span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-spacer"></div>
                  <p className="faq-a-text">Ça dépend du projet. Un site vitrine démarre à <strong>1 200 €</strong>, un MVP complet à partir de <strong>4 000 €</strong>, une app web ou mobile à <strong>6 000 €</strong>. On cadre ensemble, je m&apos;engage sur un budget précis, pas de surprise. Le devis précis arrive après la phase de préconception.</p>
                </div>
              </div>
              <div className="faq-item">
                <button className="faq-q" type="button" aria-expanded="false">
                  <span className="faq-num">Q.03</span>
                  <span className="faq-q-text">Tu utilises quelles technos ?</span>
                  <span className="faq-toggle" aria-hidden="true"></span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-spacer"></div>
                  <p className="faq-a-text">Je choisis l&apos;outil selon le projet, pas l&apos;inverse. <strong>Next.js / React</strong>, <strong>Expo / React Native</strong>, <strong>Supabase</strong>, <strong>n8n</strong> pour les automatisations. L&apos;important : que ton projet soit rapide à livrer, facile à faire évoluer, et que tu puisses reprendre la main si besoin.</p>
                </div>
              </div>
              <div className="faq-item">
                <button className="faq-q" type="button" aria-expanded="false">
                  <span className="faq-num">Q.04</span>
                  <span className="faq-q-text">Et après la livraison ?</span>
                  <span className="faq-toggle" aria-hidden="true"></span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-spacer"></div>
                  <p className="faq-a-text"><strong>Un mois de suivi inclus</strong> : je corrige, j&apos;ajuste, je réponds à tes questions. Ensuite, on peut partir sur un forfait maintenance, ou tu reprends la main toi-même. Toute la doc t&apos;est livrée.</p>
                </div>
              </div>
              <div className="faq-item">
                <button className="faq-q" type="button" aria-expanded="false">
                  <span className="faq-num">Q.05</span>
                  <span className="faq-q-text">Tu travailles en présentiel ?</span>
                  <span className="faq-toggle" aria-hidden="true"></span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-spacer"></div>
                  <p className="faq-a-text">Basé à <strong>Saint-Sauveur (38)</strong>, à côté de Grenoble. Je travaille en visio et messagerie pour la majorité des échanges — plus rapide et plus efficace. Déplacement possible en Auvergne-Rhône-Alpes pour les rencontres clés.</p>
                </div>
              </div>
              <div className="faq-item">
                <button className="faq-q" type="button" aria-expanded="false">
                  <span className="faq-num">Q.06</span>
                  <span className="faq-q-text">Tu prends tous les projets ?</span>
                  <span className="faq-toggle" aria-hidden="true"></span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-spacer"></div>
                  <p className="faq-a-text"><strong>Non.</strong> Je préfère dire honnêtement que je ne suis pas le bon interlocuteur plutôt que de mal faire. Lors du premier appel, si le projet ne me correspond pas, je te le dis et je t&apos;oriente vers quelqu&apos;un de mieux placé.</p>
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
