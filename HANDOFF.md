# HANDOFF — État du repo nitrello-vitrine

## Session du 2026-08-09 (restructuration de la home autour de l'offre phare · EN ATTENTE DE COMMIT)

### Le diagnostic de départ (constat Nico, confirmé au code)
Nico signale trois choses : l'onglet « Services » mène à ses anciens services, la méthode de la home affiche 4 étapes contre 5 sur /automatisation-ia, et il doute que les visiteurs aillent d'eux-mêmes dans l'onglet Automatisation IA.

Cause unique derrière les trois symptômes : **la home ne présentait jamais l'offre phare**. Elle la teasait (bande de coût du hero, typewriter, ticker, 1re carte Réalisations) sans jamais la montrer. Conséquence en cascade : la section `#services` ouvrait sur « Aussi au catalogue · Pas que de l'IA » alors qu'aucune IA n'avait été montrée au-dessus, soit une objection levée avant l'argument. Et l'offre qui porte la prospection et le positionnement 2026 vivait derrière un clic facultatif, dans une nav de 9 entrées où elle pesait autant que la FAQ.

Décision retenue : la home reçoit une **version courte** de l'automatisation, /automatisation-ia reste l'approfondissement (landing de prospection + page SEO). Pas un déplacement, un dédoublement maîtrisé.

### Arbitrages Nico (posés en début de session)
- Section home = **le workflow animé** plus une chute courte, pas les 6 cartes de capacités.
- **Une seule méthode en cinq temps** sur tout le site, pas deux méthodes concurrentes.
- Navbar **réduite**, mais libellé **« Automatisation & IA »** (son choix explicite, pas « Automatisation » seul).

### Réalisé (build vert 16 routes, ESLint 0 erreur, AUCUN COMMIT)
1. **Lot 0** · `automatisation-ia/page.tsx` : CTA du bloc prix encore à « 30 min », résidu de la bascule du 07/08, passé à 45 min. Seul « 30 min » restant sur le site = la stat « 30 min par jour », volontaire.
2. **Lot 1** · nouvelle section `#automatisation` sur la home, **entre le ticker et le CTA intermédiaire** (et non entre le CTA et Services comme prévu au plan : le constat doit précéder la démonstration, qui doit précéder l'invitation). Titre et chute volontairement différents de ceux de /automatisation-ia : même démo, deux cadrages.
3. **Lot 1 bis** · `src/components/WorkflowDemo.tsx` créé, **partagé par la home et /automatisation-ia** pour ne pas maintenir 60 lignes de markup en double. La page IA a basculé dessus et son sprite a perdu `i-mail`, `i-sparkles`, `i-database` (devenus inutilisés).
4. **Lot 2** · section Services : « Pas que de l'IA. ~~Des outils qui durent.~~ » → « **Les outils qu'elle fait tourner.** ». Enchaînée juste après la démo, l'ancienne formule disait en creux que l'automatisation, elle, ne dure pas.
5. **Lot 3** · navbar réduite à 6 entrées (Automatisation & IA · Outils & sites · Méthode · Réalisations · Blog · FAQ). Chiffrage, À propos et Contact basculent dans le burger : `.nav-link-contact` **renommée `.nav-link-burger`** et généralisée aux 3 entrées. Le footer garde les 9 liens, libellés alignés sur la nav.
6. **Lot 4** · **méthode unique en cinq temps** des deux côtés : Contact · Étude · Build · Livraison · Suivi. Le cadrage de l'ancienne étape 02 n'est pas perdu, il vit dans Étude (plan, maquettes, planning, chiffrage). Home : « Un projet, cinq temps. » Page IA : « Une automatisation, cinq temps. » plus un lede qui rend la parenté explicite. Nouvelle classe `.ia-method-tag` (la pastille ronde de 56 px ne peut pas porter le nom de l'étape).
7. **Lot 5** · dédoublonnage : bloc prix de la page IA passé de 3 à 2 paragraphes (le « Honnêtement, je ne peux pas te donner un prix maintenant » sautait) plus un renvoi `.price-more` vers `/#pricing`, où la logique de chiffrage vit une seule fois. Carte « Pourquoi moi » 02 « Je chiffre avant de vendre » (3e redite du chiffrage sur la même page après l'étape 02 et le bloc prix) remplacée par **« Rien ne part sans ta validation »**, argument de la promesse canonique jamais porté par le site. Section Maintenance conservée entière : l'étape 05 y renvoie plutôt que de la répéter.
8. **`export const revalidate = 3600` sur la home** (voir le piège ci-dessous). La home passe de statique pure à ISR 1 h : `/ 1h 1y` dans la sortie du build. Le sitemap était déjà en ISR 1 min, il n'y avait que la home à traiter.

### Piège majeur élucidé : « mon 2e article a disparu »
Symptôme : la home locale n'affichait qu'un article, `/blog` les deux, la prod les deux. **La prod n'a jamais rien perdu.**

Cause : la home était prérendue au build, et Next avait mis en cache la réponse Supabase dans `.next/cache/fetch-cache` **avant** la publication de l'article 2. Chaque rebuild reservait cette réponse périmée. `/blog` y échappait grâce à son ISR 60 s, et les pages d'articles aussi car `getAllPublishedSlugs()` est une requête distincte, donc une entrée de cache distincte et plus fraîche.

Correctif ponctuel : `rm -rf .next/cache/fetch-cache` puis rebuild. Correctif durable : le `revalidate = 3600` du point 8. **À retenir : Vercel réutilise lui aussi le cache de build entre déploiements**, le piège pouvait donc frapper la prod au prochain article publié.

### Autres pièges appris
- **`npm start` échoue en silence si le port 3000 est occupé** : `EADDRINUSE` part dans le log, mais l'ancien serveur continue de répondre et sert **l'ancien build**. On croit alors que la modification n'est pas prise en compte. `pkill -f "next start"` ne suffit pas : utiliser `kill -9 $(lsof -ti:3000)` avant de relancer.
- **Espaces insécables dans le JSX** : `30{" "}min` contenait un NBSP, l'outil d'édition littérale échouait. Vérifier avec `od -c` et passer par un `sed` ciblé sur la ligne.
- **Sprites SVG partagés** : `WorkflowDemo` embarque ses 5 icônes préfixées `wf-i-` pour ne jamais entrer en collision avec le sprite `i-` de /automatisation-ia, dont `i-file` et `i-bell` restent nécessaires aux cap-cards.
- Les `<section>` de la home n'ont pas de règle de padding générique : chaque section porte la sienne via son id (`#automatisation` a donc son propre fichier).

### Fichiers touchés (10, dont 2 créés)
`src/app/page.tsx` · `src/app/automatisation-ia/page.tsx` · `src/app/globals.css` · `src/app/styles/header.css` · `src/app/styles/ia-page.css` · `src/components/SiteHeader.tsx` · `src/components/SiteFooter.tsx` · `HANDOFF.md` · **créés** : `src/components/WorkflowDemo.tsx`, `src/app/styles/automatisation-home.css` (importé dans le manifeste juste avant `services.css`, dans l'ordre du DOM).

### Prochaines étapes
1. Validation visuelle de Nico (desktop et mobile, clair et sombre), puis commit en 4 temps : nav · home · page IA · HANDOFF. La page IA doit être commitée **après** la home, qui crée `WorkflowDemo`.
2. Après déploiement : vérifier la prod au DOM dans Chrome (pas de curl répétés, Security Checkpoint Vercel).
3. Reste ouvert d'avant : décision adresse postale dans le JSON-LD. ~~Bug `--ash` FAQ~~, ~~script `npm run lint` cassé~~ et ~~phase 3 CSS~~ réglés le 09/08, voir ci-dessous.

### Phase 3 CSS faite le 09/08 (validée par Nico) · le manifeste passe de 28 à 26 fichiers
Les 4 regroupements de confort du plan, exécutés un par un avec rebuild et vérification entre chaque :
1. `@keyframes blink` : hero.css → **base.css**. Les keyframes ne participent pas à la cascade, seule l'unicité du nom compte. `.phare-caret` (phare.css) le consommait depuis le fichier du hero, dépendance supprimée.
2. `.section-head` : services-legacy.css → **utilities.css**. Elle sert services, method, work, chiffrage, automatisation et la page IA. Ses deux seuls concurrents, `.method-grid > .section-head` et `#automatisation .section-head`, gagnent par spécificité et non par ordre.
3. **pricing-base.css fusionné dans chiffrage.css** (en tête de fichier) et supprimé du manifeste. `#pricing.chiffrage` et `.chiffrage-foot-row .dot-mono` l'emportent par spécificité.
4. **overrides.css dissous et supprimé** : delta FAQ 700px en fin de faq.css, bloc hero refonte en fin de hero.css.

**⚠️ La contrainte C du plan (« overrides.css doit rester le dernier import ») n'a plus d'objet** : le fichier n'existe plus. La priorité du delta FAQ repose désormais sur sa **position en fin de faq.css**, après la règle 600px : ne jamais trier ni remonter ce bloc. Idem pour la MQ 600 du bloc hero, qui doit rester après sa règle desktop. Les deux sont documentés en commentaire sur place.

**Piège que le plan avait manqué** : il annonçait ces déplacements « vérifiés sans conflit », mais ses numéros de ligne dataient d'avant les lots 3 et 4. Réaudit complet fait sur le code actuel. Point non listé par le plan : **`phare.css` mentionne `#hero` et est importé après hero.css**, ce qui aurait pu inverser le bloc hero en le remontant. Vérifié, ce n'est qu'un commentaire, pas un sélecteur.

**Méthode de preuve, à réutiliser pour tout refactor CSS** : un diff textuel ne prouve rien ici, déplacer des règles change l'ordre du fichier compilé par construction. Le script **`scripts/cmp-css-cascade.py`** compare deux CSS compilés sur deux critères : conservation de l'ensemble des règles, et pour chaque duel (même contexte, même sélecteur, même propriété), identité de la règle gagnante. Usage : `python3 scripts/cmp-css-cascade.py avant.css apres.css`, la référence se prend avant tout changement via `cp "$(find .next -name '*.css' -path '*static*' | head -1)" /tmp/avant.css`. **Il est dans `scripts/` et non dans `design/`, qui est ignoré par git** (maquettes locales) : un outil de vérification doit survivre au poste de travail. **Le valider dans les deux sens avant de s'y fier** : sur deux fichiers identiques il doit dire EQUIVALENT, sur un fichier saboté à la main il doit dire DIVERGENCE.

**Seule divergence constatée, bénigne** : la règle `.faq-item.is-open .faq-a { max-height: 600px }` disparaît du CSS compilé. Réunie dans le même fichier que la 700px, le minifieur la déduplique puisqu'elle perdait déjà. Zéro inversion de cascade, valeur appliquée inchangée, CSS 44 octets plus léger. C'est le miroir exact du delta noté en phase 1 : le monolithe la dédupliquait, le découpage l'avait fait réapparaître, la fusion la redéduplique.

### Bug `--ash` de la FAQ, réglé le 09/08 (validé par Nico)
`faq.css` déclarait `.faq-a-text { color: var(--ash) }` avec une variable qui n'a jamais existé : déclaration invalide, la couleur héritait donc de `--ink`. Conséquence invisible mais réelle, **le texte des réponses et ses passages en gras avaient exactement la même couleur**, seule la graisse les distinguait, et la règle `.faq-a-text strong { color: var(--ink) }` juste en dessous ne servait à rien. C'est cette règle qui prouve l'intention d'origine : le paragraphe devait être atténué.

Corrigé en `var(--fg-muted)`, le token du texte secondaire partout ailleurs sur le site. Effet visible : `#111111` → `#4a4a4a` en clair, `#F2F0EA` → `#B8B5AB` en sombre, les gras ressortent enfin. Contraste conforme dans les deux thèmes. Vérifié dans le CSS compilé, pas seulement dans la source.

Audit fait au passage sur les 35 `var()` sans valeur de repli des 28 fichiers de `styles/` : **`--ash` était la seule variable fantôme**. Attention au faux positif `--hologram-angle` (about.css), déclarée via `@property` et non par une affectation classique : tout script d'audit doit tenir compte de `@property`.

### Script `npm run lint` réparé le 09/08 (validé par Nico)
`package.json` appelait encore `next lint`, supprimé par Next 16 : `next` prenait « lint » pour un dossier de projet (« Invalid project directory provided, no such directory: …/lint »). **Une seule ligne à changer, `"lint": "eslint ."`** : la flat config `eslint.config.mjs` était déjà correcte (réécrite sur les exports natifs lors d'une session précédente), il n'y avait rien à migrer. `.next` et `node_modules` sont exclus nativement par ESLint 9, d'où une exécution en 2,5 s.

**Méthode de vérification à réutiliser** : un script de lint qui ne parcourt aucun fichier sort en succès, donc « exit 0 » ne prouve rien. Contrôles faits : `npx eslint . -f json` pour compter la couverture réelle (37 fichiers, `src/app` 10 · `src/components` 21 · `src/lib` 4 · 2 configs racine), puis un fichier témoin jetable (`src/lint-temoin.tsx`, supprimé depuis) portant une variable inutilisée **et** un hook conditionnel, pour confirmer que la règle personnalisée du fichier de config s'applique et que le script sort bien en code 1 sur une vraie erreur.

Non fait volontairement : les warnings ne font pas échouer le lint. Pour une CI ou un hook de pré-commit il faudrait `eslint . --max-warnings 0`, écarté pour un usage manuel car ça bloquerait sur des avertissements bénins.

## Session du 2026-08-07 (propagation du positionnement · revue Nico faite, EN ATTENTE DE COMMIT)

### Arbitrage Nico (07/08, en revue)
**Le site reste généraliste TPE/PME** : la sectorisation bâtiment + nettoyage vit dans la prospection et les réseaux sociaux, PAS sur le site. Exception validée : les exemples d'automatisation peuvent être sectoriels. Une première passe avait sectorisé hero + metas : **annulée en session** (eyebrow, title, descriptions, JSON-LD revenus aux versions généralistes). Seuls survivent 3 keywords SEO sectoriels dans `layout.tsx` (invisibles, doctrine « BTP toléré en metas SEO », à retirer si Nico le demande).

### Modifications locales (build vert 16 routes, ESLint 0 erreur, AUCUN COMMIT)
1. `src/lib/blog-format.ts` : tag `automatisation-ia` ajouté à TAG_LABELS (« Automatisation IA ») · le tag de l'article 2 s'affichait en slug brut.
2. `src/app/layout.tsx` : 3 keywords sectoriels ajoutés (« automatisation bâtiment », « automatisation BTP », « automatisation entreprise de nettoyage »), tout le reste identique à la prod.
3. `src/app/page.tsx` : nouvelle FAQ Q.08 « Un freelance seul, c'est fiable ? » (ancienne Q.08 « Tu prends tous les projets ? » renumérotée Q.09, 9 faq-items au total). Eyebrow inchangé (généraliste).
4. `src/app/automatisation-ia/page.tsx` : exemples métier dans 4 des 6 cap-cards **validés par Nico** (suivi de chantiers/interventions, devis de chantier sans réponse, comptes rendus de chantier ou d'intervention, planning) · metas inchangées (généralistes).
5. `src/app/blog/[slug]/page.tsx` : bloc CTA Cal.com en fin d'article (texte d'invite + CalButton « Réserver un échange », URL actuelle `/30min`) + `<CalEmbedScript />` monté pour le modal.
6. `src/app/styles/blog.css` : 2 règles ajoutées (`.blog-article__cta`, `.blog-article__cta-text`), filet `var(--mist)`, via le manifeste globals.css.
7. `src/app/mentions-legales/page.tsx` : activité « développement d'applications web et mobile » (périmée) → « automatisation par l'IA, outils de gestion et sites sur mesure » · meta description alignée. **Validé par Nico.**

### Piège élucidé en revue : « je ne vois pas le CTA en fin d'article »
Le CTA est bien rendu sur le build local (DOM 748×122 px, bouton stylé, opacité 1, vérifié au computed style). Nico regardait selon toute vraisemblance la **prod nitrello.com**, qui n'a pas le code tant que rien n'est commité/déployé. À la revalidation : bien vérifier sur **localhost:3000** (ou l'IP LAN).

### Chantier connexe découvert : article 2 en base (blog_posts, id `98983192-…`)
- Le lien `[rendez-vous de 30 minutes](https://nitrello.com/automatisation-ia)` (section prix) ne mène pas à Cal.com : Nico le veut vers Cal.com.
- Incohérence de durée entre articles : article 1 dit 45 min (réécrit le 07/08), article 2 dit 30 min (2 occurrences RDV : le lien ci-dessus + « prenons 30 minutes » dans la chute). Les « 30 minutes par jour » (stat) et « 20 à 30 minutes de tri » (veille) ne sont PAS des durées de RDV : ne pas y toucher.
- Correctif à faire par PATCH PostgREST service_role (méthode de l'article 1), en attente de décision : idéalement APRÈS création de l'évènement Cal.com 45 min pour tout basculer d'un coup.

### Bascule Cal.com 45 min FAITE le 07/08 (après-midi)
- **Évènement créé par Nico** : `https://cal.com/nicolas-2j0lvm/echange`, titre « Échange », 45 min (vérifié `"length":45`). Premier slug auto-généré `appelle-decouverte` corrigé en `echange` à ma demande AVANT propagation. **L'ancien `/30min` reste actif : Nico ne le désactive qu'après déploiement du site.**
- **Code (local, non commité)** : toutes les URL passées à `/echange` (home ×3 CTA + FloatingCTA, automatisation-ia CAL_URL + FloatingCTA, CTA blog), tous les textes RDV 30→45 min, namespace embed « 30min »→« echange » dans `CalButton.tsx` + `CalEmbedScript.tsx`. Seul « 30 min » restant : la stat « 30 min par jour » (volontaire). Build vert, ESLint 0 erreur, vérifié servi en local.
- **Article 2 PATCHÉ en base** (blog_posts, service_role via CLI, jamais affichée) : `[rendez-vous de 45 minutes](https://cal.com/nicolas-2j0lvm/echange)` + « prenons 45 minutes ». Vérifié en base et via ISR locale. ⚠️ Effet immédiat en prod aussi (même base) : cohérent, le nouvel évènement est actif. Article 1 : rien à faire (aucun lien cal.com, durées déjà 45, son « appel de 30 minutes » est une pique rhétorique à laisser).
- **Voix Nitrello (Notion) à jour** : « Obtenir quarante-cinq minutes », les 2 placeholders {Cal.com} du pitch/email remplacés par le lien réel, avertissement final remplacé par la note ✅ évènement créé.

### COMMITÉ ET DÉPLOYÉ le 07/08 (commit `bf3c714`, validé par Nico)
Push → déploiement Vercel Ready en 22 s → **prod vérifiée au DOM dans Chrome** (méthode anti-checkpoint, pas de curl répétés) : home (eyebrow généraliste, 9 FAQ dont « Un freelance seul, c'est fiable ? », uniquement des liens `/echange`, seul « 30 min » restant = la stat de l'extrait d'article), article 2 (CTA « Réserver un échange » → `/echange`, tag « Automatisation IA », lien contenu « rendez-vous de 45 minutes » → `/echange`, « prenons 45 minutes »), mentions légales (activité à jour). Le CLAUDE.md global a été amendé le même jour (promesse canonique = profils/prospection/pitch, site généraliste).

### Prochaines étapes
1. ~~Ancien évènement Cal.com `/30min`~~ : **SUPPRIMÉ par Nico le 07/08, vérifié 404** (`/echange` toujours 200). ⚠️ Piège Cal.com documenté au passage : « Masquer » ne retire l'évènement que de la page profil, le lien direct reste réservable · seule la suppression rend le lien inerte. Purge des aperçus de la carte faite le 07/08. Bios externes (LinkedIn, Malt, Instagram, Google Business) vérifiées par Nico le 07/08 : aucune ne pointait vers l'ancien lien. **Transition Cal.com 100 % terminée.**
2. Ce fichier HANDOFF (cette section) est modifié localement, à commiter avec le prochain commit validé.
3. Hors repo, backlog restant : profil LinkedIn (contenus prêts dans la page Notion « Profil LinkedIn — audit et corrections », attention aux affirmations invalidées de cette page d'audit), vault Obsidian en retard (4 fichiers).

## Session du 2026-08-07 (fin de journée · SEO manuel + carte de visite)

### Fait par Nico (guidé en session)
- **Search Console** : propriété domaine vérifiée (DNS chez IONOS, un jeton google-site-verification préexistait), sitemap soumis (contient les 2 articles), indexation demandée pour les 4 URLs clés. Données attendues sous ~2 jours, **contrôler la couverture vers le 14/08**.
- **Google Business Profile** : fiche créée en entreprise de services (adresse masquée, zone Grenoble/Voiron/Saint-Marcellin/Isère), validation Google en cours (délai jusqu'à 5 j ouvrés).

### Diagnostic « ancien titre visible » (3 causes distinctes)
1. **SERP Google « Ton idée devient une application »** : index périmé (la prod a servi l'ancien positionnement jusqu'au 07/08). Aucune occurrence dans le repo. Se résorbe seul avec le re-crawl (accéléré par les demandes d'indexation), 2 à 10 jours.
2. **Aperçus de partage du site** : la prod est correcte, c'est le cache des messageries. Purge : LinkedIn Post Inspector, Facebook Sharing Debugger ; WhatsApp sans outil (astuce `?v=2`).
3. **Carte de visite `public/card/`** : vrai problème de code, jamais touchée par la refonte. **Corrigé en local** : title/meta/og alignés sur le jobTitle du JSON-LD, og:image passe de nicolas.png (488 Ko) au visuel OG 1200×630 signature (+ dimensions + twitter:card), tagline recto = signature H1, verso = les 3 offres, texte navigator.share, **vCard TITLE et NOTE** (ce qui entre dans les répertoires), tirets longs retirés. Build vert, zéro occurrence restante du jargon banni (grep SaaS/MVP/Apps Web vide).

### En attente
- ~~Commit + push du correctif carte~~ : **fait, poussé et vérifié en prod le 07/08 (`70cc905`)**. Reste à Nico : purger les aperçus de nitrello.com/card (LinkedIn Post Inspector, Facebook Sharing Debugger, WhatsApp `?v=2`).

## Session du 2026-08-07 (découpage globals.css · phases 1 et 2)

### Réalisé (validé par Nico le 07/08, contrôle visuel light/dark desktop + mobile sur serveur de prod local)
- **Phase 1** : `globals.css` (3 922 lignes) découpé en **28 fichiers** dans `src/app/styles/`, `globals.css` = manifeste d'`@import` dans l'ordre exact des blocs source, `layout.tsx` intouché. Les plages de lignes du plan (`design/plan-decoupage-globals-css.md`, daté du 06/08) étaient périmées après les lots 3 et 4 : redécoupage sur les bannières du fichier réel, mêmes 28 sections. **Preuves** : recomposition concaténée identique octet pour octet (SHA-256 égaux) · CSS compilé par Turbopack identique règle à règle et dans le même ordre (seul delta : la règle FAQ 600px que le minifieur dédupliquait dans le monolithe survit, toujours écrasée par la 700px d'overrides.css — contrainte C intacte).
- **Phase 2** : **356 lignes de CSS mort supprimées** (3 922 → 3 566), chaque candidat du plan re-vérifié par grep sur le code actuel avant retrait (`#typed-text` et `.caret` étaient déjà partis au lot 3). Retirés : ancien grid services, section témoignages entière (`testimonials-legacy.css` supprimé, 27 imports restants), `.work-card`, `.step-dot`, `.theme-instant`, `.grad-text`, `.on-dark`, `.dot`+`@keyframes pulse`, `.r-4`, `.work-counter`, `.about-facts`, `.contact-actions`/`.contact-card`/`.contact-row`/vieux liens meta, `.method-title-wrap`, sélecteurs `.blog-article__nav`/`__back` morts (groupes réduits à `__footer`/`__back-bottom`), MQ 600 hero toujours perdante. **Preuve** : diff du CSS compilé = 85 règles retirées toutes identifiées mortes (dont frames internes de `pulse`/`pulse-dot`), 3 règles « ajoutées » = les groupes blog réduits, ordre des règles vivantes préservé, `blink`/700px/`.section-head`/`.dot-mono`/`.sr-only` tous vivants.
- Exécution en 2 commits séparés (phase 1 puis phase 2) pour la bisectabilité, conformément au plan.

### Règles à respecter désormais (cascade)
- **Aucun composant ne doit importer un fichier de `styles/` directement** : `globals.css` est l'unique point d'entrée, les `@import` ses seules lignes, leur ordre EST la cascade.
- Les contraintes d'ordre du plan (A : dark-neon avant contact · B : responsive-mobile après ses bases · C : overrides.css dernier · G : blog avant recent-posts) sont documentées en section 2 du plan, à relire avant tout réordonnancement.

### ~~Reste à faire (phase 3, optionnelle, non faite exprès)~~ · FAITE le 09/08, détail en tête de ce fichier
- Regroupements de confort du plan (fusion overrides dans faq/hero, `@keyframes blink` vers base.css, `.section-head` vers utilities.css, pricing-base dans chiffrage).
- ~~**Bug `--ash` (FAQ)**~~ : **réglé le 09/08**, passé en `var(--fg-muted)` après validation de Nico. Détail dans la section du 2026-08-09 en tête de ce fichier.

## Session du 2026-08-07 (chantier 2 · 2e article de blog, publié)

### Réalisé
- **Article 2 rédigé, validé par Nico et publié en prod** (insertion PostgREST via clé service_role récupérée par la CLI Supabase authentifiée, jamais affichée · id `98983192-6b24-4dfd-acc3-d52c8364d098`, publié le 07/08 à 06h20 UTC) : slug `automatisation-ia-tpe-pme-taches-repetitives`, titre « Automatisation et IA pour TPE et PME : récupérer les heures que les tâches répétitives te volent », tag `automatisation-ia`, ~1 700 mots, cover NULL pour l'instant.
- Voix de l'article 1 (tutoiement, direct), wording aligné sur la home (30 min/jour · 2h30/semaine · 110h/an, ventes perdues, charge mentale), méthode 5 étapes et 6 familles de /automatisation-ia, 2 preuves internes (veille du matin, pipeline de prospection, **zéro mention LinkedIn**), FAQ 6 questions SEO, chute « On en parle ? » (mailto + carte). Doctrine respectée : aucun prix (formule « je te montre combien tu économises »), IA = moteur jamais promesse, aucun tiret long, meta_title 55 car., meta_description 150 car.
- Vérifié en prod : `/blog` liste l'article, la page répond 200 avec H1 et meta conformes.

### Cover (fait le 07/08 en fin de session)
- **Cover en ligne** : `cover-veille-ia-quotidienne.webp` (1280×720, 35 Ko) dans le bucket `blog-images`, `cover_image_url`/`cover_image_alt` posés sur l'article. Produite depuis la re-capture de Nico (nœuds partiellement renommés FR : « Nouveaux mails », « Envoie du résumé » ; restent Schedule Trigger/Code in JavaScript/Basic LLM Chain/Anthropic Chat Model en anglais, régénérable en 2 min si Nico renomme). Traitement sharp : inpainting du bouton Execute + barres d'outils, fenêtre sans chrome, bande de canvas alignée grille pour compléter le 16:9. Vérifiée sur la page article, /blog et la home.
- **`vercel redeploy` exécuté après la pose de la cover** : la home statique ne montre un nouvel article (ou sa cover) qu'après un rebuild, le redeploy à l'identique suffit.
- `reading_time_min` NULL comme l'article 1 (comportement du site inchangé).

### Pièges notés
- **La home (`/`) est 100 % statique sans revalidation** : la section « Articles récents » et le sitemap ne reflètent un nouvel article **qu'au prochain déploiement Vercel** (`/blog` et `/blog/[slug]` ont eux une ISR de 60 s). Après toute publication d'article : pousser un commit (ou redéployer) pour rafraîchir home + sitemap.
- **Doctrine prix, décision Nico en attente** : l'article 1 (discovery/CDC, publié en mai) affiche des prix (préconception 1 000 € HT, FAQ coûts), en contradiction avec la doctrine 2026 « aucun prix affiché publiquement ». Signalé le 07/08, pas touché.

### Reste à faire (priorisé · remplace la liste du lot 4)
1. **Cover de l'article 2** (dépend de la re-capture FR de Nico, voir plus haut).
2. **Découpage globals.css** : plan dans `design/plan-decoupage-globals-css.md`, session dédiée.
3. **Manuel Nico** : test mobile réel, certificat www Vercel, Search Console (soumettre le sitemap rafraîchi), fiche Google Business.
4. **Décisions en attente** : prix affichés dans l'article 1 · script `npm run lint` cassé (`package.json`, une ligne).

## Session du 2026-08-07 (lot 4 · preuve automatisation dans Réalisations)

### Réalisé (validé par Nico le 07/08, contrôle visuel light/dark sur serveur de prod local)
- **3e carte `.work-item` en tête de #work** (`src/app/page.tsx`) : pipeline de prospection interne Nitrello. Choix Nico : position en tête de liste · tags « Automatisation · Outil interne · n8n ». Liens internes vers `/automatisation-ia` (pas de `target="_blank"`, flèche diagonale conservée, précédent du `.work-link` du hero). Copy cadrée résultat, sans mention LinkedIn ni prix. Lede de section amendé : « …chez mes clients et dans mes propres outils. » Commentaires Projet 1/2/3 renumérotés. **Zéro CSS ajouté** (le chantier de découpage de globals.css reste propre).
- **Visuel `public/pipelinepreview.webp`** (1280×640, ratio 2:1 exact du `.work-visual`, 34 Ko, convention nom+preview respectée).

### Provenance et sécurité du visuel
- Source : capture n8n « Alimenter le pipeline » du 07/08 (angle registre/Pappers). Les **2 post-its (codes NAF, logique métier) et le fragment d'ID « Workflow- YemAj0a… » ont été inpaintés** par patchs de canvas alignés sur la grille de points (script sharp one-shot, pas de grille mesuré 7,40 px, décalages pris entre pics réellement détectés). Vérification pixel : zéro résidu jaune dans les zones élargies, stats des zones conformes au canvas de référence, zooms ×3 sans couture. Piège rencontré : le 1er patch de l'ID tranchait le mot « rapprochement » du label, recalé après mesure des lignes de texte au pixel.
- Les **4 autres captures du Bureau (angle LinkedIn/Unipile) sont définitivement exclues** : zone grise CGU LinkedIn, URL API Unipile en clair, nom d'une personne réelle. La source Desktop n'est plus nécessaire (seul le webp est versionné).

### Vérifié
- Build vert (15 routes), ESLint silencieux (`npx eslint src/app/page.tsx`), HTML pré-rendu : 3 `<article class="work-item reveal">`, les 3 webp servis, non-régression des cartes Esprit Auto et TSG. Diff limité à `page.tsx` + webp + HANDOFF.

### Pièges notés
- ~~**`npm run lint` est cassé**~~ : **réparé le 09/08** (`"lint": "eslint ."`). Détail dans la section du 2026-08-09 en tête de ce fichier.
- Visuel clair (~#F5F5F3) sur fond sombre en dark theme : validé à l'œil par Nico le 07/08, cohérent avec les 2 previews existantes. Si un traitement CSS est envisagé un jour, le faire après le découpage de globals.css.

### Captures n8n supplémentaires du 07/08 (08h01, arbitrage Nico en session)
- 2 nouvelles captures sur le Bureau, **propres toutes les deux** (aucun post-it, aucune URL, aucun nom réel) : « Veille IA quotidienne » (Gmail → Code → LLM Anthropic → Telegram) et « Vapi vers Google Sheets » (Webhook → Code → Sheets).
- **Décision : pas de nouvelles cartes Réalisations** (éviter la galerie de canvas n8n, doctrine résultat pas technologie ; les prochaines cartes seront des cas clients).
- « Veille IA quotidienne » = illustration idéale du 2e article de blog (chantier 2), **après renommage des nœuds en français et re-capture par Nico** (noms anglais par défaut actuellement).
- « Vapi vers Google Sheets » = histoire forte (appels vocaux IA loggés en tableur) mais visuel faible (3 nœuds, noms par défaut) : en réserve jusqu'à étoffement ou vrai cas client.

### Reste à faire (priorisé · remplace la liste du lot 3)
1. **Chantier 2 · 2e article de blog** (automatisation + IA pour dirigeants de TPE/PME), le wording final de la home est maintenant en place. Illustration possible : capture « Veille IA quotidienne » une fois re-capturée en FR.
2. **Découpage globals.css** : plan dans `design/plan-decoupage-globals-css.md`, session dédiée.
3. **Manuel Nico** : test mobile réel du déploiement, certificat www Vercel, Search Console, fiche Google Business.

## Session du 2026-08-07 (lot 3 · fusion hero + bloc phare)

### Réalisé (local, NON COMMITÉ · en attente de validation Nico)
- **Fusion hero + bloc phare** dans `src/app/page.tsx` : la section `.phare` a disparu, le hero porte l'offre phare. **H1 : Nico a tranché en revue, la signature « Je transforme ton temps perdu en argent gagné. » reste** (une variante mots-clés « Je rends aux TPE et PME le temps perdu dans les tâches répétitives. » a été proposée puis retirée à sa demande) · les mots-clés tâches répétitives/TPE vivent dans le H2 du teaser, automatiser/automatisation dans les H2 de cta-mid et À propos. Avantage collatéral : le H1 reste cohérent avec les og:title/twitter:title et les visuels OG. Typewriter (`PhareTypewriter`, classes phare-* conservées) remonté sous le H1. Eyebrow du lot 1 inchangé. Les CTA du phare ("Découvrir l'offre", "Voir un exemple concret") disparaissent, remplacés par le lien du teaser.
- **v2 après 2e retour design de Nico ("hero trop chargé, pas assez aéré", skill frontend-design chargé)** : le typewriter passe de co-vedette (28-48px) à ligne d'appui du H1 (20-30px) et **remplace le lede** (les 3 offres sont déjà déroulées par le ticker juste dessous et détaillées dans Services) · le teaser du constat n'est plus les 3 cost-cards recopiées mais une **bande de stats légère** `.hero-cost-strip` (filet `border-top`, gros mot serif « 110 h par an » / « Des ventes perdues » / « Une charge mentale », description 15px muted), kicker = h2 stylé `.eyebrow` qui garde les mots-clés (« Ce que les tâches répétitives coûtent à une TPE »), lien `.work-link` « Voir comment je récupère ces heures » vers /automatisation-ia · vraie respiration copy→bande (~104px, marges adjacentes 56/104 qui fusionnent). Mesuré à 1280px : copy 520px, hero total 1094px (1254px en v1), zéro débordement.
- **Ticker réparé après retour design de Nico** (la fusion l'avait mis en voisin direct du cta-mid, deux bandeaux inversés collés avec voiles sombres aux extrémités) : 1. le fade des côtés est porté par un nouveau wrapper `.ticker-viewport` et plus par `.ticker` entier (le mask faisait fondre le fond inversé du bandeau vers le fond de page, d'où les voiles · il ne peut pas non plus vivre sur `.ticker-track` qui défile) · 2. `.cta-mid` prend `margin-top: clamp(72px, 10vw, 120px)`, symétrique du padding bas du hero, pour que la frise flotte entre deux zones aérées comme avant la fusion.
- **CSS** (`globals.css`) : #hero sans min-height 80vh ni flex (la section s'allonge), wash de grille et zone percée remontés avec le titre (ellipses à 28 %/24 % au lieu de 40 %/42 %), styles `.hero-cost`/`.hero-cost-title`/`.hero-cost-link` ajoutés. Coquille `.phare` morte supprimée (section, mark, title, grad, actions) · les classes typewriter phare-* restent. Règles mortes `#typed-text`/`.caret` de l'ancien H1 animé supprimées, `@keyframes blink` conservé (utilisé par `.phare-caret`).
- **Conversion 880-1080px traitée** (piège noté au lot 1) : entrée « Contact » ajoutée au menu burger (`SiteHeader.tsx`, `li.nav-link-contact`, visible uniquement ≤1080px) · le bouton "En discuter" du header n'est plus masqué qu'en dessous de 480px (mesuré ~400px requis en mode burger) au lieu de 1080px.
- Vérifié : build vert, ESLint silencieux, HTML pré-rendu conforme (H1, 3 cartes, phare absent, Contact présent), aucun débordement horizontal à 920px (mesures DOM, fenêtre Chrome occultée donc rendu visuel non fiable, cf. piège).

### Décisions laissées à Nico
- **Second contrôle visuel réel** (desktop + mobile) après les correctifs H1/ticker : premier retour donné (H1 et ticker), wash de grille du hero réglé au jugé toujours à confirmer, fenêtre Chrome occultée oblige.
- Puis commit du lot 3 (git status avant add, add ciblé : page.tsx, globals.css, SiteHeader.tsx, HANDOFF.md).

## Session du 2026-08-07 (chantier refonte stratégique · lots 1 et 2)

### Contexte
Chantier validé par Nico : réaligner le site sur sa hiérarchie commerciale · offre phare = automatisation et IA pour TPE/PME, offres secondaires = outils de gestion et sites vitrine. Plan en 4 lots validé après analyse des incohérences (nav sans lien vers /automatisation-ia, hero générique, preuve sociale 100 % vitrine, wording blog sur l'ancien positionnement, JSON-LD inversé, Hn sans mots-clés). Ordre des chantiers arrêté : refonte d'abord, puis 2e article de blog, puis découpage globals.css.

### Réalisé
- **Lot 1 (commit `352866d`)** : lien "Automatisation IA" en tête du header et du footer · hero : eyebrow "Automatisation et outils sur mesure pour TPE et PME" et CTA secondaire redirigé de #work vers /automatisation-ia · CSS nav : compactage sous 1240px (police 13px, paddings réduits) et burger remonté de 880 à 1080px. La nav à 8 entrées exige ~1190px en taille normale, mesuré au pixel : défaut préexistant (7 entrées demandaient déjà ~1050px), retirer FAQ n'aurait pas suffi. Marge après correction : 46px au point le plus étroit (1034px requis, burger à 1080).
- **Lot 2 (commit `116c9cb`)** : `blog/page.tsx` repositionné cible TPE/PME (meta description 147 car., OG, intro, kicker sans tiret long) · `layout.tsx` : description LocalBusiness réordonnée automatisation d'abord, jobTitle et knowsAbout alignés.
- `audit-seo-2026-08-06.md` versionné (commit `0d258a8`).

### Reste à faire (priorisé · remplace la liste du 06/08)
1. **Lot 3 · restructuration home** (session dédiée) : fusion hero + bloc Phare musclé (teaser des 3 cost-cards de /automatisation-ia sur la home), Hn retravaillés avec automatisation/tâches répétitives/TPE PME. Ordre des sections inchangé.
2. **Lot 4 · preuve automatisation dans Réalisations** : 5 captures n8n de Nico sur le Bureau (07/08 vers 00h18, workflows de prospection). NE JAMAIS publier telles quelles : URL du webhook Unipile en clair dans un post-it, angle "automatisation LinkedIn" en zone grise des CGU. Recadrer le canvas "Alimenter le pipeline" (angle registre/Pappers) sans les post-its, et cadrer par le résultat, pas la technologie.
3. **Chantier 2 · 2e article de blog** (automatisation + IA pour dirigeants de TPE/PME), après le lot 3 pour capitaliser sur le wording final.
4. **Découpage globals.css** : plan dans `design/plan-decoupage-globals-css.md`, à faire APRÈS le lot 3 (la refonte modifie le CSS de la home).
5. **Manuel Nico** : test mobile réel, certificat www Vercel, Search Console, fiche Google Business.

### Pièges notés
- Entre 880 et 1080px le bouton "En discuter" du header est masqué (comportement burger, étendu par le lot 1) et le menu burger n'a aucune entrée Contact (préexistant). Le FloatingCTA couvre la conversion · à reconsidérer au lot 3.
- `resize_window` Chrome inopérant sur fenêtre occultée (outerWidth 0, viewport figé) : mesurer les largeurs au DOM et calculer le point de rupture, plutôt que de croire un resize.

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
5. **Découpage `globals.css`** (3 939 lignes) : **plan complet prêt dans `design/plan-decoupage-globals-css.md`** (28 fichiers cibles, ~375 lignes de CSS mort identifiées, 3 risques de cascade documentés, exécution en 3 commits avec preuve par concaténation-diff). Session dédiée recommandée.
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
