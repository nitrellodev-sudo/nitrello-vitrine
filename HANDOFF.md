# HANDOFF — État du repo nitrello-vitrine

## Session du 2026-08-06 (audit complet + correctifs sécurité/UX)

### Réalisé
- **Audit complet code/UI/UX** de nitrello.com (rapport dans la conversation, audit SEO dans `audit-seo-2026-08-06.md`). Verdict global : site sain, code propre, aucun constat critique réel.
- **Fausse alerte élucidée** : la "navigation par ancres morte" diagnostiquée en cours d'audit était un artefact d'environnement (fenêtre Chrome pilotée occultée → `requestAnimationFrame` gelé → tout scroll smooth mort). Fenêtre visible, tout fonctionne. Leçon mémorisée côté Claude.
- **Commit `4c22cc4` poussé et vérifié en prod** (11 correctifs) :
  - deps : Next 16.2.6→16.3.0, postcss, sharp (0 vulnérabilité npm), framer-motion (morte) supprimée
  - ESLint réparé : `eslint.config.mjs` réécrit sur les exports flat natifs (FlatCompat incompatible ESLint 9)
  - `/api/contact` : rate limiting en mémoire par IP (5 req/10 min, avant tout appel externe) · honeypot non bloquant conservé (choix produit)
  - blog `[slug]` : barrière XSS (HTML brut échappé via renderer marked + protocoles javascript:/data:/vbscript: bloqués dans les liens)
  - `next.config.ts` : garde explicite `NEXT_PUBLIC_SUPABASE_URL`
  - home : 3 `<img>` → `next/image` avec dimensions (fin du risque CLS)
  - header : `<a>` → `<Link>` partout · `ThemeToggle` sans état React redondant
  - skip-link "Aller au contenu" (layout + `.skip-link` dans globals.css, wrapper `#contenu`)
  - `/automatisation-ia` : FloatingCTA + CalEmbedScript montés (même chemin de conversion que la home)

### Reste à faire (priorisé)
1. **Test mobile réel** du déploiement (`npm run build && npm start -- --hostname 0.0.0.0`) — Nico, depuis le téléphone
2. **Manuel Nico (SEO)** : certificat www sur Vercel (Settings→Domains, ajouter www.nitrello.com), Search Console (sitemap + couverture), fiche Google Business Profile
3. **Meta description `/automatisation-ia`** : 215 caractères, à raccourcir vers 150-160
4. **Canonical home** : uniformiser avec/sans slash final (layout.tsx alternates)
5. **Découpage `globals.css`** (3 920 lignes) : chantier à part, plan de découpage à produire avant exécution, re-test visuel complet obligatoire
6. **Décision business** : adresse postale complète dans le JSON-LD de toutes les pages (garder pour le SEO local ou restreindre aux mentions légales)
7. Rangement maquettes HTML de la racine vers `design/` (fait localement le 06/08, à commiter)

### Pièges notés
- Audit navigateur automatisé : toujours vérifier `document.visibilityState` avant de conclure sur du scroll/animation.
- Tester le 429 du rate limiting uniquement en local (en prod ça bloque l'IP du testeur 10 min).

## Session du 2026-05-16 (suite, Chantier E2)

### Réalisé
- **Pages `/mentions-legales` et `/politique-confidentialite` créées** (Server Components, 760px réutilisant les classes `.blog-page` + `.blog-article__content` existantes, zéro nouvelle classe CSS).
- **Mentions légales** (LCEN art. 6) : identité éditeur, hébergeurs Vercel Inc. (USA) + Supabase Pte. Ltd. (Singapour, données AWS Dublin UE), propriété intellectuelle avec mention marque NITRELLO™ déposée INPI n° 5244582 le 03/04/2026, droit applicable français, juridiction Tribunal judiciaire de Grenoble.
- **Politique de confidentialité** (RGPD art. 13-14) : 4 traitements documentés (Vercel Analytics cookieless, localStorage thème, formulaire contact, Cal.com), 6 sous-traitants listés (Vercel, Supabase, Cal.com, Railway, Brevo, Notion) avec mécanismes de transfert (DPF + CCT), conservation prospects 3 ans, droits RGPD complets.
- **JSON-LD LocalBusiness mis à jour** : ajout de `streetAddress` `"36 Impasse du Domaine du Mûrier"` → résorbe le warning "streetAddress manquant" du Google Rich Results Test.

### Dette technique résorbée
- ✅ Pages `/mentions-legales` et `/politique-confidentialite` : ne renvoient plus 404, le footer pointe désormais vers du contenu réel.
- ✅ `streetAddress` manquant dans JSON-LD : ajouté.

### Vérifications attendues avant push
- [ ] `npm run build` passe green
- [ ] Visite des 2 nouvelles pages en dev local (`/mentions-legales` et `/politique-confidentialite`)
- [ ] Vérification que le footer continue d'afficher les liens (logique standard)
- [ ] Re-test Google Rich Results après push pour vérifier disparition du warning `streetAddress`
- [ ] Pas de régression sur les pages existantes

### Prochaine étape probable
**Chantier B Phase 2** — Module Blog dans le CRM Nitrello (active enfin la colonne `cover_image_alt` créée le 15 mai, libère Nico du SQL Editor Supabase pour éditer ses articles).

---

## Session du 2026-05-16

### Réalisé
- **Correction adresse Saint-Marcellin → Saint-Sauveur** sur l'ensemble du repo (5 occurrences corrigées dans `src/app/layout.tsx` × 2, `src/app/page.tsx` × 2, `public/card/nicolas-tinnirello.vcf`). L'occurrence dans `src/app/page.tsx:393` (client Esprit Auto) a été volontairement laissée intacte — c'est l'adresse d'un client, pas la nôtre.
- **Footer refondu en composant `src/components/SiteFooter.tsx`** monté dans `src/app/layout.tsx` → s'affiche désormais sur **toutes** les pages, y compris `/blog` et `/blog/[slug]` qui n'avaient aucun footer auparavant.
- **NAP exposé** : Nicolas Tinnirello · Saint-Sauveur 38160 · Isère + email `contact@nitrello.com` + téléphone `06 88 64 95 84` cliquable (`href="tel:+33688649584"` en E.164, affichage humain au format FR).
- **Phrase géo SEO local** : « Freelance dev web, mobile et IA en Isère. Pour les PME et indépendants à Grenoble et partout en France. »
- **JSON-LD refondu** : remplacement `ProfessionalService + Person` → `LocalBusiness + Person` (LocalBusiness = meilleur signal SEO local pour Google). `@id` Person conservé à `#nicolas` pour préserver l'entité déjà indexée. Sans `streetAddress` (volontaire, à compléter quand les mentions légales seront en place) ni `geo` (sur-précision inutile pour freelance distribué).
- **Keywords élargis** : ajout `Voiron`, `Pays Voironnais` à la liste existante (Grenoble + Isère gardés, Saint-Marcellin remplacé par Saint-Sauveur).
- **vCard mise à jour** : `public/card/nicolas-tinnirello.vcf` reflète la correction d'adresse.
- **FAQ enrichie** : la réponse "Où es-tu basé ?" précise maintenant "Saint-Sauveur (38), à côté de Grenoble" pour ancrer le repère géographique côté lecteur (Saint-Sauveur seul n'évoque rien à 99 % des visiteurs).
- **CSS** : ancienne convention `#footer / .footer-grid / .footer-col` remplacée par BEM `.site-footer__*`. Utility `.sr-only` ajoutée pour les headings de section accessibles.

### Dette technique consciente notée
- **Pages `/mentions-legales` et `/politique-confidentialite`** : liens présents dans le footer mais pages **inexistantes** → 404 attendue jusqu'à création. À traiter en session ultérieure (probable Chantier E2 — pages légales).
- **`streetAddress` du JSON-LD** : volontairement omis. À ajouter lors de la création des mentions légales (adresse exacte : `36 Impasse du Domaine du Mûrier`, à confirmer).
- **SIRET** : non mentionné dans le copyright du footer (absent du repo). À intégrer aussi quand on fera les mentions légales.

### Pièges identifiés / Notes techniques
- **Footer désormais global** : monter `<SiteFooter />` dans `layout.tsx` impacte toutes les routes. Validé volontairement comme correction de regression (les pages blog n'avaient aucun footer). À surveiller si on ajoute des routes "tunnel" (checkout, onboarding) où le footer pourrait gêner — auquel cas il faudra un layout dédié pour ces routes.
- **Stabilité `@id` JSON-LD** : on a conservé `https://nitrello.com/#nicolas` pour la Person malgré le passage de ProfessionalService → LocalBusiness, pour ne pas signaler à Google un changement d'entité côté Person. Le LocalBusiness, lui, change d'`@id` (`#nitrello` → `#business`) ET de `@type` simultanément — c'est cohérent puisque c'est sémantiquement une nouvelle entité.

### Prochaine étape probable
*(Décision prise en session 2026-05-16 (suite) : Chantier E2 livré — pages légales + streetAddress JSON-LD. Voir section "Chantier E2" en haut du document.)*

---

## Session du 2026-05-15

### Réalisé
- **Cover image article 1 intégrée** sur les 2 surfaces :
  - `/blog` (liste) : variante `list` du composant `BlogCard`, image 38 % à gauche + texte à droite sur desktop, stack vertical sur mobile, fallback propre si `cover_image_url` null.
  - `/blog/[slug]` (article seul) : bandeau 16:9 dans `.blog-article__main`, `priority` pour le LCP, crédit photo en `<figcaption>`.
- **Composant `BlogCard` extrait** (`src/components/blog/BlogCard.tsx`) avec variantes `list | card`. Déduplique le rendu /blog et home "Articles récents".
- **Colonne `cover_image_alt`** ajoutée en BDD (TEXT nullable). Type `BlogPost` patché. Alt SSR-rendu vérifié via curl.
- **Layout article corrigé** : header + cover déplacés dans `.blog-article__main` pour cohérence de largeur sur ≥1280px (avant : cover 1052px déborde du contenu à 748px ; après : tout aligné à 748px).
- **`next.config.ts`** : `images.remotePatterns` autorise le bucket `blog-images` du projet Supabase, hostname parsé depuis `NEXT_PUBLIC_SUPABASE_URL`.

### Pièges identifiés (à retenir pour les futures sessions)

1. **`images.remotePatterns` et build vert** : un `next build` qui passe ne valide PAS la config `remotePatterns`. Cette config n'est vérifiée qu'au **runtime** sur fetch d'image distante. Pour toute modif de `remotePatterns`, le seul test fiable est de charger une page qui utilise une image distante en dev (ou en prod).

2. **Conditions de test avant chasse au bug** : un faux positif visuel peut venir des conditions de test (DevTools ouvert qui mange 40 % de l'écran → viewport effectif sous le breakpoint → responsive joue normalement). Toujours vérifier les conditions avant de partir en investigation CSS.

3. **`recent-posts__grid` avec 1 carte unique** : problème UX ouvert, hors scope de cette session. Quand on a 1 seul article publié, la grille à 3 colonnes affiche une carte qui prend toute la largeur de la première cellule, les 2/3 droits sont vides. À traiter quand on aura un 2e/3e article. Trois options envisageables :
   - **A.** Masquer la section "Articles récents" tant qu'il y a moins de N articles (seuil à définir, probablement 3).
   - **B.** Adapter la grille au nombre d'articles (`grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` ou similaire).
   - **C.** Centrer la carte unique dans la grille (rapide mais sous-optimal — déséquilibre visuel persiste).
   Décision à prendre quand le problème sera concret (3 articles disponibles → on testera A vs B en vrai).

### État production / déploiement
- Le push de ce commit sur main déclenche un déploiement Vercel automatique du projet vitrine.
- Dépendances prod déjà en place avant le push :
  - Bucket Supabase `blog-images` créé en prod (même URL dev et prod, pas de séparation)
  - Policy SELECT `Public read access on blog-images` active pour roles `anon, authenticated`
  - Colonne `cover_image_alt` ajoutée en prod (`ALTER TABLE blog_posts ADD COLUMN`)
  - 2 fichiers WebP uploadés dans le bucket
  - Variable `NEXT_PUBLIC_SUPABASE_URL` confirmée en Production + Preview dans Vercel
- **Aucune action manuelle nécessaire après le push.** Le déploiement devrait être propre.
- À surveiller en prod : vérifier que `cover_image_url` charge bien depuis l'URL Supabase (notamment que `next/image` optimization Vercel respecte le `remotePatterns`).

### Prochaine étape probable
*(Décision prise en session 2026-05-16 : Chantier E livré — footer SEO local + correction adresse Saint-Sauveur. Voir section du 2026-05-16 ci-dessus.)*
