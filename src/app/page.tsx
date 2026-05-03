export default function Home() {
  return (
    <div>
      <div className="scroll-progress" aria-hidden="true"></div>
      {/* ============================================================
           HEADER
           ============================================================ */}
      <header id="header">
        <div className="container">
          <nav className="nav">
            <a href="#" className="nav-logo" aria-label="Nitrello">
              <svg viewBox="0 0 85 80" aria-hidden="true">
                <defs>
                  <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#00BFFF" />
                    <stop offset="1" stopColor="#7B2FFF" />
                  </linearGradient>
                </defs>
                <g transform="scale(0.19277)">
                  <path d="m51.23,344.11C5.58,291.62-12.74,217.37,9.33,146.18,35.46,61.87,110.73,6.07,193.93.45,198.67.13,203.44,0,208.23,0c8.73.19,35.69,2.11,55.78,18.17,37.69,31.8,53.73,83.53,38.47,132.75l-34.56,111.5c-1,3.22-3.41,4.06-5.27,4.22-1.84.15-4.35-.31-5.84-3.33l-63.93-128.84c-8.15-16.38-25.26-25.96-43.51-24.3-18.04,1.65-33.06,14.63-38.43,31.93l-59.56,201.04-.16.95Z" fill="#00BFFF" />
                  <path d="m364.09,71.13c45.7,52.49,64.04,126.78,41.96,198.02-26.13,84.31-101.38,140.11-184.58,145.73-.5.03-1.01.07-1.51.09-39.59,2.4-77.62-17.8-96.88-52.47-.66-1.2-1.31-2.41-1.94-3.63-15.28-29.72-17.55-64.45-7.66-96.37l34.16-110.19c1-3.22,3.41-4.07,5.27-4.23,1.84-.14,4.36.32,5.86,3.33l63.93,128.84c8.06,16.23,24.93,25.78,42.99,24.34,18.08-1.45,33.22-13.58,38.59-30.9l59.8-202.56Z" fill="url(#logo-grad)" />
                </g>
              </svg>
              <span>Nitrello</span>
            </a>
            <ul className="nav-links" id="nav-links">
              <li><a href="#services">Services</a></li>
              <li><a href="#method">Méthode</a></li>
              <li><a href="#pricing">Tarifs</a></li>
              <li><a href="#work">Réalisations</a></li>
              <li><a href="#about">À propos</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
            <div className="nav-cta">
              <button className="theme-toggle" id="theme-toggle" type="button" aria-label="Changer de thème">
                <svg className="theme-icon-sun" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
                <svg className="theme-icon-moon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
                </svg>
              </button>
              <a href="#contact" className="btn btn-ghost">En discuter</a>
              <button className="nav-toggle" aria-label="Menu" id="nav-toggle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* ============================================================
           HERO
           ============================================================ */}
      <section id="hero">
        <div className="hero-flow" aria-hidden="true">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>
        <div className="container">
          <div className="hero-inner">
            <div className="hero-copy">
              <div className="eyebrow reveal">Nicolas Tinnirello, Freelance</div>
              <h1 className="h-display reveal r-1">
                Ton idée devient <br />
                <span className="accent" id="typed"><span id="typed-text"></span><span className="caret"></span></span>
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
            <div className="hero-visual reveal r-2" aria-hidden="true">
              {/* Hero Flow motif , idée qui devient application */}
              <svg viewBox="0 0 520 546" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="hero-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#00BFFF" />
                    <stop offset="1" stopColor="#7B2FFF" />
                  </linearGradient>
                  <linearGradient id="hero-grad-soft" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#00BFFF" stopOpacity="0.08" />
                    <stop offset="1" stopColor="#7B2FFF" stopOpacity="0.08" />
                  </linearGradient>
                </defs>

                {/* grid */}
                <g stroke="#111" strokeOpacity="0.06" strokeWidth="1">
                  <line x1="0" y1="136" x2="520" y2="136" />
                  <line x1="0" y1="273" x2="520" y2="273" />
                  <line x1="0" y1="410" x2="520" y2="410" />
                  <line x1="130" y1="0" x2="130" y2="546" />
                  <line x1="260" y1="0" x2="260" y2="546" />
                  <line x1="390" y1="0" x2="390" y2="546" />
                </g>

                {/* Left : idea node (handwritten-ish) */}
                <g transform="translate(50,60)">
                  <rect x="0" y="0" width="180" height="130" fill="#FFFFFF" stroke="#111" strokeWidth="1.5" rx="2" />
                  <text x="16" y="28" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#888880" letterSpacing="2">01 · IDÉE</text>
                  <text x="16" y="60" fontFamily="Fraunces, serif" fontStyle="italic" fontWeight="300" fontSize="22" fill="#111">« On pourrait</text>
                  <text x="16" y="88" fontFamily="Fraunces, serif" fontStyle="italic" fontWeight="300" fontSize="22" fill="#111">faire un outil</text>
                  <text x="16" y="116" fontFamily="Fraunces, serif" fontStyle="italic" fontWeight="300" fontSize="22" fill="#111">pour... »</text>
                </g>

                {/* Middle: crafting / lines */}
                <g transform="translate(180,240)">
                  <circle cx="0" cy="0" r="68" fill="none" stroke="url(#hero-grad)" strokeWidth="1.5" strokeDasharray="3 6" />
                  <circle cx="0" cy="0" r="44" fill="none" stroke="url(#hero-grad)" strokeWidth="1" />
                  <circle cx="0" cy="0" r="8" fill="url(#hero-grad)" />
                </g>

                {/* Right : application card */}
                <g transform="translate(280,290)">
                  <rect x="0" y="0" width="200" height="220" fill="#111" rx="10" />
                  <rect x="12" y="12" width="176" height="22" fill="#1a1a1a" rx="4" />
                  <circle cx="22" cy="23" r="3" fill="#00BFFF" />
                  <circle cx="32" cy="23" r="3" fill="#7B2FFF" />
                  <circle cx="42" cy="23" r="3" fill="#888880" />
                  <rect x="12" y="46" width="120" height="8" fill="#FAFAF7" opacity="0.9" rx="2" />
                  <rect x="12" y="62" width="80" height="6" fill="#888880" rx="2" />
                  <rect x="12" y="86" width="176" height="42" fill="url(#hero-grad)" opacity="0.85" rx="6" />
                  <text x="22" y="112" fontFamily="Inter, sans-serif" fontSize="13" fill="#fff" fontWeight="500">Nouveau projet</text>
                  <rect x="12" y="140" width="84" height="36" fill="#1a1a1a" stroke="#2a2a2a" rx="4" />
                  <rect x="104" y="140" width="84" height="36" fill="#1a1a1a" stroke="#2a2a2a" rx="4" />
                  <rect x="12" y="184" width="176" height="24" fill="#1a1a1a" rx="4" />
                </g>

                {/* Connecting curve */}
                <path d="M230,125 Q 260,180 180,240" fill="none" stroke="#111" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.3" />
                <path d="M246,240 Q 300,200 280,310" fill="none" stroke="url(#hero-grad)" strokeWidth="1.5" opacity="0.7" />

                {/* Small floating labels */}
                <g transform="translate(380,50)" opacity="0.75">
                  <text fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#888880" letterSpacing="2">CONVERSATION</text>
                </g>
                <g transform="translate(40,460)" opacity="0.75">
                  <text fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#888880" letterSpacing="2">CONCEPTION · BUILD · LIVRAISON</text>
                </g>
              </svg>
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
              <h2 className="h-section" style={{ marginTop: '24px' }}>Trois besoins, <em>trois bases de prix.</em></h2>
            </div>
            <p className="pricing-intro">Des points de départ pour situer un projet. Le prix exact se définit après la préconception, en fonction de tes besoins réels.</p>
          </div>

          <div className="pricing-grid">

            <article className="price-card reveal">
              <div className="price-head">
                <div className="price-num">01</div>
                <h3 className="price-title">Vitrine <em>sur mesure</em></h3>
                <p className="price-desc">Pour les indépendants et PME qui veulent un site qui leur ressemble, pas un template parmi d&apos;autres.</p>
              </div>
              <div className="price-amount">
                <span className="price-from">à partir de</span>
                <span className="price-value">1{' '}200<span className="price-unit"> € HT</span></span>
              </div>
              <ul className="price-list">
                <li>Design personnalisé</li>
                <li>3 à 6 pages</li>
                <li>Formulaire intelligent</li>
                <li>Hébergement &amp; mise en ligne</li>
                <li>Livré en 1 à 2 semaines</li>
              </ul>
              <a href="#contact" className="price-cta">
                En parler
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </a>
            </article>

            <article className="price-card price-featured reveal r-1">
              <div className="price-tag">Le plus demandé</div>
              <div className="price-head">
                <div className="price-num">02</div>
                <h3 className="price-title">Application <em>web ou mobile</em></h3>
                <p className="price-desc">Plateforme métier, SaaS, marketplace, espace client, configurateur, app iOS / Android. Côté utilisateur comme côté admin.</p>
              </div>
              <div className="price-amount">
                <span className="price-from">à partir de</span>
                <span className="price-value">6{' '}000<span className="price-unit"> € HT</span></span>
              </div>
              <ul className="price-list">
                <li>Cadrage UX &amp; maquettes</li>
                <li>Authentification &amp; rôles</li>
                <li>Base de données dédiée</li>
                <li>Back-office sur mesure</li>
                <li>Intégrations API</li>
                <li>1 mois de suivi inclus</li>
              </ul>
              <a href="#contact" className="price-cta price-cta-primary">
                Démarrer le projet
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </a>
            </article>

            <article className="price-card reveal r-2">
              <div className="price-head">
                <div className="price-num">03</div>
                <h3 className="price-title">MVP <em>startup</em></h3>
                <p className="price-desc">Pour valider une idée vite. On livre une V1 utilisable et on ajuste avec les premiers retours.</p>
              </div>
              <div className="price-amount">
                <span className="price-from">à partir de</span>
                <span className="price-value">8{' '}000<span className="price-unit"> € HT</span></span>
              </div>
              <ul className="price-list">
                <li>Cadrage produit &amp; user-flow</li>
                <li>Design produit complet</li>
                <li>Front + back + admin</li>
                <li>Onboarding utilisateurs</li>
                <li>Paiement / abonnement</li>
                <li>Suivi après lancement</li>
              </ul>
              <a href="#contact" className="price-cta">
                En parler
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </a>
            </article>
          </div>

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
           BAND DIVIDER
           ============================================================ */}
      <div className="band-divider" aria-hidden="true">
        <div className="band-track">
          <div className="band-item">Sites sur mesure <em>livrés vite</em></div>
          <div className="band-item">Apps web &amp; mobile <em>qui tiennent</em></div>
          <div className="band-item">Outils internes <em>pour tes équipes</em></div>
          <div className="band-item">Automatisations <em>qui font gagner du temps</em></div>
          <div className="band-item">Sites sur mesure <em>livrés vite</em></div>
          <div className="band-item">Apps web &amp; mobile <em>qui tiennent</em></div>
          <div className="band-item">Outils internes <em>pour tes équipes</em></div>
          <div className="band-item">Automatisations <em>qui font gagner du temps</em></div>
        </div>
      </div>

      {/* ============================================================
           RÉALISATIONS
           ============================================================ */}
      <section id="work">
        <div className="container">
          <div className="work-head reveal">
            <div>
              <div className="eyebrow">Réalisations</div>
              <h2 className="h-section" style={{ marginTop: '24px' }}>Des projets, <em>en ligne, en production.</em></h2>
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

            {/* Placeholder 2 */}
            <article className="work-item reveal r-1">
              <div className="work-meta">
                <div className="work-tags">
                  <span className="work-tag">Projet en cours</span>
                </div>
                <h3 className="work-title">Le prochain <em>sera le tien ?</em></h3>
                <p className="work-desc">Une sélection de projets récents. Pour discuter d&apos;un cas similaire au tien ou voir d&apos;autres réalisations en privé, contacte-moi.</p>
                <a href="#contact" className="work-link">
                  Démarrer un projet
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </a>
              </div>
              <div className="work-visual placeholder">
                <div className="ph-content">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 5v14M5 12h14" /></svg>
                  <div className="ph-label">Espace disponible</div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

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
              <h2 className="h-section">Salut, <em>moi c&apos;est Nicolas.</em></h2>
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
        <div className="container">
          <div className="faq-grid">
            <div className="faq-side reveal">
              <div className="eyebrow">Questions</div>
              <h2 className="h-section" style={{ marginTop: '24px' }}>Ce qu&apos;on <em>me demande<br />souvent.</em></h2>
              <p className="lede" style={{ marginTop: '20px' }}>Six réponses honnêtes pour cadrer ton projet.</p>
              <div className="faq-direct">
                <div className="label">Pas trouvé ta question ?</div>
                <a href="mailto:contact@nicolastinnirello.fr">Écris-moi directement →</a>
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
                  <p className="faq-a-text">Ça dépend du projet. Un site vitrine démarre à <strong>1 200 €</strong>, une app web ou mobile à <strong>6 000 €</strong>, un MVP complet à partir de <strong>8 000 €</strong>. On cadre ensemble, je m&apos;engage sur un budget précis, pas de surprise. Le devis précis arrive après la phase de préconception.</p>
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
                  <p className="faq-a-text">Je choisis l&apos;outil selon le projet, pas l&apos;inverse. <strong>Next.js / React</strong>, <strong>Bubble</strong>, <strong>Supabase</strong>, <strong>n8n</strong> pour les automatisations. L&apos;important : que ton projet soit rapide à livrer, facile à faire évoluer, et que tu puisses reprendre la main si besoin.</p>
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
                  <p className="faq-a-text">Basé à <strong>Saint-Marcellin (38)</strong>. Je travaille en visio et messagerie pour la majorité des échanges — plus rapide et plus efficace. Déplacement possible en Auvergne-Rhône-Alpes pour les rencontres clés.</p>
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
              <h2 className="h-display" style={{ marginTop: '28px' }}>Ton projet, <em>notre première conversation.</em></h2>
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
                <a href="https://cal.com/nicolas-2j0lvm/30min" className="contact-direct-row" data-cal-namespace="30min" data-cal-link="nicolas-2j0lvm/30min" data-cal-config={'{"layout":"month_view"}'}>
                  <span>Réserver un appel · 30 min</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </a>
              </div>
            </div>

            <form className="contact-form reveal r-1" id="contact-form">
              {/* Honeypot anti-spam : caché aux humains, rempli automatiquement par les bots */}
              <input type="text" name="website_url" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0, pointerEvents: 'none' }} />
              <div className="form-head">
                <span className="form-num">/ FORMULAIRE</span>
                <h3>Décris-moi ton projet en quelques mots.</h3>
              </div>

              <div className="form-field">
                <label className="form-label">
                  <span className="form-label-num">01</span>
                  <span className="form-label-text">Type de projet</span>
                </label>
                <div className="form-radios">
                  <label className="form-radio"><input type="radio" name="type" value="vitrine" required /><span>Site vitrine</span></label>
                  <label className="form-radio"><input type="radio" name="type" value="webapp" /><span>App web ou mobile</span></label>
                  <label className="form-radio"><input type="radio" name="type" value="tool" /><span>Outil interne</span></label>
                  <label className="form-radio"><input type="radio" name="type" value="auto" /><span>Automatisation</span></label>
                  <label className="form-radio"><input type="radio" name="type" value="other" /><span>Autre / je ne sais pas</span></label>
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label" htmlFor="cf-name">
                    <span className="form-label-num">02</span>
                    <span className="form-label-text">Ton prénom</span>
                  </label>
                  <input id="cf-name" type="text" name="name" placeholder="Camille" required />
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="cf-email">
                    <span className="form-label-num">03</span>
                    <span className="form-label-text">Ton email</span>
                  </label>
                  <input id="cf-email" type="email" name="email" placeholder="camille@exemple.com" required />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="cf-company">
                  <span className="form-label-num">04</span>
                  <span className="form-label-text">Entreprise <span className="form-opt">(optionnel)</span></span>
                </label>
                <input id="cf-company" type="text" name="company" placeholder="Le nom de ta boîte, si tu en as une" />
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="cf-msg">
                  <span className="form-label-num">05</span>
                  <span className="form-label-text">Ton message</span>
                </label>
                <textarea id="cf-msg" name="message" rows={5} placeholder="Raconte-moi en quelques lignes : le contexte, ce que tu veux faire, où tu en es, le délai si tu en as un." required></textarea>
              </div>

              <div className="form-field form-rgpd-field">
                <label className="form-checkbox-label">
                  <input type="checkbox" name="rgpd" id="cf-rgpd" required />
                  <span className="form-checkbox-text">J&apos;accepte que mes données soient utilisées pour traiter ma demande.</span>
                </label>
              </div>

              <div className="form-footer">
                <button type="submit" className="btn btn-primary form-submit">
                  Envoyer mon message
                  <svg className="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </button>
                <span className="form-foot-note">Je te réponds personnellement, sous 24h ouvrées.</span>
              </div>
            </form>

            {/* Message de succès hors du form pour conserver la hauteur de la card */}
            <div className="form-success" id="form-success" hidden>
              <div className="form-success-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <p className="form-success-title">Message reçu.</p>
              <p className="form-success-sub">Je te réponds sous 24h ouvrées.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
           MODAL DEVIS , conversation guidée
           ============================================================ */}
      <div id="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal">
          <div className="modal-header">
            <div className="modal-header-title" id="modal-title">
              <span className="dot"></span>
              Conversation · Nitrello
            </div>
            <button className="modal-close" aria-label="Fermer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="modal-progress"><div className="modal-progress-bar" id="progress-bar"></div></div>

          <div className="modal-body" id="modal-body">
            {/* Step 1: type of project */}
            <div className="modal-step active" data-step="1">
              <div className="modal-prompt">Question 1/4</div>
              <div className="modal-q">Raconte-moi, <em>c&apos;est quoi ton projet ?</em></div>
              <div className="modal-hint">Choisis ce qui s&apos;en rapproche le plus , on précisera ensuite.</div>
              <div className="modal-options">
                <button className="modal-option" data-field="type" data-value="site">
                  <span className="opt-icon">01</span>
                  <span className="opt-main">
                    <span className="opt-title">Un site vitrine</span>
                    <span className="opt-desc">Présenter mon activité, attirer des clients</span>
                  </span>
                </button>
                <button className="modal-option" data-field="type" data-value="app">
                  <span className="opt-icon">02</span>
                  <span className="opt-main">
                    <span className="opt-title">Une app web ou mobile</span>
                    <span className="opt-desc">Un produit avec comptes, données, interactions</span>
                  </span>
                </button>
                <button className="modal-option" data-field="type" data-value="tool">
                  <span className="opt-icon">03</span>
                  <span className="opt-main">
                    <span className="opt-title">Un outil interne</span>
                    <span className="opt-desc">Pour mon équipe, remplacer un Excel, un process</span>
                  </span>
                </button>
                <button className="modal-option" data-field="type" data-value="auto">
                  <span className="opt-icon">04</span>
                  <span className="opt-main">
                    <span className="opt-title">Une automatisation</span>
                    <span className="opt-desc">Connecter mes outils, gagner du temps</span>
                  </span>
                </button>
                <button className="modal-option" data-field="type" data-value="other">
                  <span className="opt-icon">05</span>
                  <span className="opt-main">
                    <span className="opt-title">Je ne sais pas encore</span>
                    <span className="opt-desc">J&apos;ai une idée mais j&apos;ai besoin d&apos;en parler</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Step 2: timing */}
            <div className="modal-step" data-step="2">
              <div className="modal-prompt">Question 2/4</div>
              <div className="modal-q">Pour <em>quand ?</em></div>
              <div className="modal-hint">Le délai m&apos;aide à savoir si je peux m&apos;engager sérieusement.</div>
              <div className="modal-options">
                <button className="modal-option" data-field="timing" data-value="asap">
                  <span className="opt-icon">!</span>
                  <span className="opt-main">
                    <span className="opt-title">Le plus vite possible</span>
                    <span className="opt-desc">Dans les 2-4 semaines</span>
                  </span>
                </button>
                <button className="modal-option" data-field="timing" data-value="1-3m">
                  <span className="opt-icon">1-3</span>
                  <span className="opt-main">
                    <span className="opt-title">Dans 1 à 3 mois</span>
                    <span className="opt-desc">J&apos;ai un peu de temps devant moi</span>
                  </span>
                </button>
                <button className="modal-option" data-field="timing" data-value="3m+">
                  <span className="opt-icon">3+</span>
                  <span className="opt-main">
                    <span className="opt-title">Plus tard dans l&apos;année</span>
                    <span className="opt-desc">Je veux cadrer maintenant, démarrer plus tard</span>
                  </span>
                </button>
                <button className="modal-option" data-field="timing" data-value="unknown">
                  <span className="opt-icon">?</span>
                  <span className="opt-main">
                    <span className="opt-title">Je ne sais pas encore</span>
                    <span className="opt-desc">On en discute</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Step 3: budget */}
            <div className="modal-step" data-step="3">
              <div className="modal-prompt">Question 3/4</div>
              <div className="modal-q">Ton <em>budget approximatif ?</em></div>
              <div className="modal-hint">Pas besoin d&apos;un chiffre précis. Une fourchette m&apos;aide à calibrer la réponse.</div>
              <div className="modal-options">
                <button className="modal-option" data-field="budget" data-value="<3k">
                  <span className="opt-icon">€</span>
                  <span className="opt-main">
                    <span className="opt-title">Moins de 3 000 €</span>
                    <span className="opt-desc">Un site vitrine ou un petit outil</span>
                  </span>
                </button>
                <button className="modal-option" data-field="budget" data-value="3-8k">
                  <span className="opt-icon">€€</span>
                  <span className="opt-main">
                    <span className="opt-title">3 000 à 8 000 €</span>
                    <span className="opt-desc">Une application simple, un MVP</span>
                  </span>
                </button>
                <button className="modal-option" data-field="budget" data-value="8-20k">
                  <span className="opt-icon">€€€</span>
                  <span className="opt-main">
                    <span className="opt-title">8 000 à 20 000 €</span>
                    <span className="opt-desc">Un produit plus ambitieux</span>
                  </span>
                </button>
                <button className="modal-option" data-field="budget" data-value="20k+">
                  <span className="opt-icon">€+</span>
                  <span className="opt-main">
                    <span className="opt-title">Plus de 20 000 €</span>
                    <span className="opt-desc">Un projet sérieux, je sais où je vais</span>
                  </span>
                </button>
                <button className="modal-option" data-field="budget" data-value="unknown">
                  <span className="opt-icon">?</span>
                  <span className="opt-main">
                    <span className="opt-title">Je n&apos;en ai aucune idée</span>
                    <span className="opt-desc">Tu m&apos;aideras à estimer</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Step 4: contact */}
            <div className="modal-step" data-step="4">
              <div className="modal-prompt">Dernière étape</div>
              <div className="modal-q">Comment <em>je te recontacte ?</em></div>
              <div className="modal-hint">Je te réponds personnellement sous 24h.</div>
              <div className="modal-field">
                <input className="modal-input" type="text" id="f-name" placeholder="Ton prénom" autoComplete="given-name" />
              </div>
              <div className="modal-field">
                <input className="modal-input" type="email" id="f-email" placeholder="Ton email" autoComplete="email" />
              </div>
              <div className="modal-field">
                <textarea className="modal-textarea" id="f-message" placeholder="Dis-moi en 2-3 phrases ce que tu veux faire (optionnel)"></textarea>
              </div>
            </div>

            {/* Step 5: success */}
            <div className="modal-step" data-step="5">
              <div className="modal-summary">
                <div className="success-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                </div>
                <h3>C&apos;est noté, <em>merci.</em></h3>
                <p>Je reviens vers toi par mail sous 24h avec mes premières pistes et quelques questions pour préciser. En attendant, voici le récap de ce que tu m&apos;as dit :</p>
                <div className="recap" id="recap"></div>
                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Parfait, à bientôt</button>
              </div>
            </div>
          </div>

          <div className="modal-footer" id="modal-footer">
            <button className="modal-back" id="modal-back" disabled>← Retour</button>
            <span className="modal-step-count" id="step-count">1 / 4</span>
            <button className="btn btn-primary" id="modal-next" style={{ fontSize: '13px', padding: '10px 18px' }}>
              Continuer
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================
           FOOTER
           ============================================================ */}
      <footer id="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#" className="nav-logo" style={{ color: 'var(--fg-inverse)' }}>
                <svg viewBox="0 0 85 80" aria-hidden="true" style={{ width: '26px', height: '26px' }}>
                  <defs>
                    <linearGradient id="logo-grad-f" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0" stopColor="#00BFFF" />
                      <stop offset="1" stopColor="#7B2FFF" />
                    </linearGradient>
                  </defs>
                  <g transform="scale(0.19277)">
                    <path d="m51.23,344.11C5.58,291.62-12.74,217.37,9.33,146.18,35.46,61.87,110.73,6.07,193.93.45,198.67.13,203.44,0,208.23,0c8.73.19,35.69,2.11,55.78,18.17,37.69,31.8,53.73,83.53,38.47,132.75l-34.56,111.5c-1,3.22-3.41,4.06-5.27,4.22-1.84.15-4.35-.31-5.84-3.33l-63.93-128.84c-8.15-16.38-25.26-25.96-43.51-24.3-18.04,1.65-33.06,14.63-38.43,31.93l-59.56,201.04-.16.95Z" fill="#00BFFF" />
                    <path d="m364.09,71.13c45.7,52.49,64.04,126.78,41.96,198.02-26.13,84.31-101.38,140.11-184.58,145.73-.5.03-1.01.07-1.51.09-39.59,2.4-77.62-17.8-96.88-52.47-.66-1.2-1.31-2.41-1.94-3.63-15.28-29.72-17.55-64.45-7.66-96.37l34.16-110.19c1-3.22,3.41-4.07,5.27-4.23,1.84-.14,4.36.32,5.86,3.33l63.93,128.84c8.06,16.23,24.93,25.78,42.99,24.34,18.08-1.45,33.22-13.58,38.59-30.9l59.8-202.56Z" fill="url(#logo-grad-f)" />
                  </g>
                </svg>
                <span>Nitrello</span>
              </a>
              <p>Nicolas Tinnirello · Freelance développeur. Applications web et mobile, outils internes, automatisations.</p>
            </div>
            <div className="footer-col">
              <h5>Site</h5>
              <a href="#services">Services</a>
              <a href="#method">Méthode</a>
              <a href="#pricing">Tarifs</a>
              <a href="#work">Réalisations</a>
              <a href="#about">À propos</a>
            </div>
            <div className="footer-col">
              <h5>Contact</h5>
              <a href="mailto:contact@nitrello.com">contact@nitrello.com</a>
              <a href="#contact">Formulaire</a>
            </div>
            <div className="footer-col">
              <h5>Ailleurs</h5>
              <a href="https://www.linkedin.com/in/nitrello" target="_blank" rel="noopener">LinkedIn</a>
              <a href="https://www.malt.fr/profile/nicolastinnirello" target="_blank" rel="noopener">Malt</a>
              <a href="https://www.instagram.com/nitrello" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.facebook.com/share/1DhpLQ9SKR/" target="_blank" rel="noopener noreferrer">Facebook</a>
            </div>
          </div>
          <div className="footer-bottom">
            <div>© 2025 Nitrello · Nicolas Tinnirello</div>
            <div>Saint-Marcellin, 38160</div>
          </div>
        </div>
      </footer>

      {/* Floating CTA : reste visible pendant le scroll */}
      <a
        href="https://cal.com/nicolas-2j0lvm/30min"
        className="float-cta"
        id="float-cta"
        data-cal-namespace="30min"
        data-cal-link="nicolas-2j0lvm/30min"
        data-cal-config={'{"layout":"month_view"}'}
        aria-label="Réserver un appel de 30 minutes"
      >
        <span className="float-cta-dot" aria-hidden="true"></span>
        <span>Réserver un appel<span className="float-cta-label-long"> · 30 min</span></span>
        <svg className="float-cta-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
      </a>
    </div>
  );
}
