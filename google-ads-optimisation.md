# Optimisation de la campagne Google Ads — 17 août 2026

Point de départ : la campagne tourne, et **zéro demande** est arrivée. Ni par le
formulaire, ni par Cal.com, ni par téléphone.

Ce document sépare ce qui a été corrigé dans le code (déjà fait, à déployer) de
ce qui doit être fait à la main dans l'interface Google Ads (à faire par Nico).

---

## 1. Le vrai problème : la campagne pilotait à l'aveugle

La recommandation « ajouter six liens annexes » de la capture est bonne à
prendre, mais elle ne pouvait pas être la cause de zéro demande. La cause est
ailleurs, et elle est structurelle.

Depuis le 12/08, la balise Google n'était injectée **qu'après un clic sur
« Accepter »** dans la bannière de cookies. Or la grande majorité des visiteurs
ne cliquent jamais sur une bannière : ils lisent, ou ils partent. Conséquence
en chaîne :

1. Google Ads ne recevait presque aucune vue de page.
2. La seule conversion branchée — le formulaire — ne pouvait remonter que pour
   un visiteur ayant accepté la bannière **puis** rempli le formulaire.
3. Une campagne Performance Max fonctionne aux enchères intelligentes : sans
   conversions, l'algorithme n'a rien pour apprendre. Il dépense sans converger
   et arrose des audiences non qualifiées.

Autrement dit, le budget partait dans une campagne qui n'avait aucun moyen de
savoir ce qui marchait. **C'est le premier levier, très loin devant les liens
annexes.**

Deuxième problème du même ordre : sur les trois chemins de contact du site
(formulaire, Cal.com, contact direct), **un seul était mesuré**. Un visiteur
venu d'une annonce qui appelle depuis son mobile — le comportement le plus
fréquent pour une prestation locale — n'existait tout simplement pas dans
Google Ads.

---

## 2. Ce qui a été corrigé dans le code

### a. Consent Mode v2 en mode « avancé »

La balise est désormais chargée pour tout le monde, mais **démarre avec tous
les consentements refusés**.

Ce qui ne change pas — et c'était tout l'enjeu de la bannière :

- **Aucun cookie n'est écrit ni lu avant acceptation.** Vérifié en navigateur :
  zéro cookie `_gcl_*` tant que la bannière n'a pas été acceptée.
- `ads_data_redaction: true` : tant que le refus est actif, les identifiants de
  clic publicitaire sont expurgés des requêtes envoyées à Google.
- `url_passthrough: true` : le `gclid` circule dans l'URL entre les pages
  plutôt que d'être stocké dans un cookie.

Ce qui change : Google reçoit des mesures agrégées sans cookie, qui lui
permettent de **modéliser** les conversions non observées et de nourrir les
enchères. C'est précisément ce qui manquait.

L'article 82 de la loi Informatique et Libertés vise l'inscription et la
lecture d'informations **sur le terminal** — pas la requête réseau elle-même.
La garantie juridique qui a motivé la bannière tient donc toujours. La
politique de confidentialité a été mise à jour pour décrire exactement ce
comportement.

> Si tu préfères revenir au mode strict d'avant, c'est un seul endroit :
> `src/components/GoogleAdsTag.tsx`, le commentaire d'en-tête explique comment.
> Sache juste que ça remet la campagne à l'aveugle.

### b. Trois nouvelles conversions branchées

Le code est en place et attend seulement les libellés à créer dans Google Ads
(voir §3). Tant qu'un libellé est vide, l'envoi est silencieux : rien ne casse.

| Conversion | Déclencheur | Fichier |
|---|---|---|
| Formulaire de lead | réponse API confirmée `success:true` | `ContactForm.tsx` (existant) |
| **Rendez-vous pris** | événement `bookingSuccessful` de Cal.com | `CalEmbedScript.tsx` |
| **Clic téléphone** | clic sur un lien `tel:`, une fois par page | `ContactClickTracking.tsx` |
| **Clic email** | clic sur un lien `mailto:`, une fois par page | `ContactClickTracking.tsx` |

### c. Attribution des demandes reçues

L'email de notification de chaque nouvelle demande affiche désormais une ligne
**Origine** : `gclid`, paramètres UTM, ou domaine référent. Un lead venu d'une
annonce est signalé en clair par la mention **Google Ads**.

La capture se fait uniquement en mémoire, sans cookie ni stockage
navigateur — donc sans consentement requis.

Concrètement : à la première demande qui arrive, tu sauras immédiatement si
elle vient de la campagne ou du référencement naturel. Sans ça, impossible de
juger l'euro dépensé.

---

## 3. À faire dans Google Ads (interface, ~30 min)

### Étape 1 — Créer les trois actions de conversion manquantes

Objectifs → Conversions → Nouvelle action → **Site Web** → « Ajouter
manuellement » → *Créer manuellement avec du code* (même chemin que pour le
formulaire le 12/08).

| Action à créer | Catégorie | Valeur | Comptage |
|---|---|---|---|
| Prise de rendez-vous Cal.com | Prise de rendez-vous | laisser vide | Unique |
| Appel téléphonique (clic) | Appel téléphonique | laisser vide | Unique |
| Clic email | Contact | laisser vide | Unique |

Chacune renvoie un snippet contenant
`send_to: 'AW-18381393904/XXXXXXXXXXXXXXXXXXX'`.
**Envoie-moi les trois libellés** (la partie après le `/`), je les branche dans
`src/lib/google-ads.ts` — les emplacements sont déjà prêts et commentés.

> **Important — actions principales vs secondaires.** Passe *Prise de
> rendez-vous* et *Formulaire de lead* en **principales** (elles pilotent les
> enchères), et *Clic téléphone* / *Clic email* en **secondaires** (observées,
> mais elles ne doivent pas piloter les enchères : un clic sur un numéro n'est
> pas un appel décroché, et si l'algorithme optimise là-dessus il ira chercher
> des cliqueurs, pas des clients).

### Étape 2 — Les six liens annexes de la capture

Prêts à coller. Les libellés respectent la limite de 25 caractères, les
descriptions celle de 35 caractères par ligne.

Formulation volontairement **factuelle et vérifiable** : le compte a déjà des
composants limités pour « Allégations exagérées ou inexactes ». Aucune promesse
chiffrée ici, rien qui puisse être requalifié.

| # | Texte du lien | Description 1 | Description 2 | URL |
|---|---|---|---|---|
| 1 | `Automatisation IA` | `Ce que vos outils font sans vous` | `Exemple de workflow détaillé` | `https://nitrello.com/automatisation-ia` |
| 2 | `Réserver un échange` | `45 min au téléphone, gratuit` | `Sans engagement` | `https://nitrello.com/#contact` |
| 3 | `Comment je chiffre` | `Devis après étude de votre cas` | `Pas de grille tarifaire toute faite` | `https://nitrello.com/#pricing` |
| 4 | `Réalisations` | `Sites et outils en production` | `Chez des TPE et PME en Isère` | `https://nitrello.com/#work` |
| 5 | `Outils de gestion` | `CRM, tableaux de bord, back-office` | `Développés sur mesure` | `https://nitrello.com/#services` |
| 6 | `Questions fréquentes` | `Délais, budget, données` | `Les réponses avant l'appel` | `https://nitrello.com/#faq` |

Un septième, si tu veux couvrir le blog :

| 7 | `Articles & guides` | `Automatisation expliquée simplement` | `Cas concrets pour TPE et PME` | `https://nitrello.com/blog` |

Les ancres (`#contact`, `#pricing`, `#work`, `#services`, `#faq`) existent
toutes sur la page d'accueil — vérifié dans le code, les liens ne tomberont pas
dans le vide.

### Étape 3 — Les autres extensions, plus rentables que les liens annexes

Les liens annexes annoncent +2,9 %. Pour une prestation locale, ces trois-là
pèsent davantage :

- **Extension d'appel** : ton numéro directement dans l'annonce, avec appel en
  un tap sur mobile. Google mesure l'appel nativement, sans code. C'est le
  chemin de contact le plus court qui existe — et aujourd'hui il n'est même pas
  proposé dans l'annonce.
- **Accroches (callouts)**, 25 caractères max, factuelles :
  `Réponse sous 24h` · `Premier échange gratuit` · `Développeur en Isère` ·
  `Un seul interlocuteur` · `Sans engagement`
- **Extraits de site structurés**, en-tête *Services* :
  `Automatisation` · `CRM sur mesure` · `Sites vitrine` · `Tableaux de bord` ·
  `Applications web`

### Étape 4 — Revoir le type de campagne

Performance Max sur un compte neuf, sans historique de conversions et avec un
budget de freelance, c'est le pire des cas : PMax a besoin de volume pour
apprendre, et il dépense sur YouTube, Discover et Display avant de trouver quoi
que ce soit.

Recommandation : **une campagne Search classique** en parallèle (ou en
remplacement), sur des mots-clés d'intention explicite, en *expression exacte*
plutôt qu'en requête large :

```
"automatisation tâches entreprise"   [développeur freelance Grenoble]
"automatisation IA PME"              [créer CRM sur mesure]
"automatiser devis facture"          [développeur Next.js freelance]
"logiciel gestion sur mesure TPE"    [site vitrine Isère]
```

Et une liste d'exclusions dès le départ, sinon le budget part en fumée :
`gratuit`, `formation`, `emploi`, `salaire`, `stage`, `tutoriel`, `c'est quoi`,
`définition`, `openclassroom`, `alternance`.

Stratégie d'enchères : commencer en **Maximiser les clics avec CPC plafonné**
tant qu'il n'y a pas ~15 conversions sur 30 jours, puis basculer en
*Maximiser les conversions*. Passer en enchères automatiques trop tôt sur un
compte sans données, c'est exactement ce qui ne converge jamais.

### Étape 5 — Les recommandations à refuser

L'onglet Recommandations pousse aussi des choses à décliner :

- **Passer en requête large** : non, pas avant d'avoir des conversions.
- **Augmenter le budget** : non, tant que la mesure n'est pas fiable. Augmenter
  un budget aveugle multiplie la dépense, pas les demandes.
- **Créer des annonces générées automatiquement** : non, au vu des composants
  déjà marqués « Limité » pour allégations.
- **Étendre le ciblage géographique** : non, garder Isère + agglomération
  grenobloise tant que le coût par lead n'est pas connu.

L'« optimisation » affichée par Google en pourcentage est une note interne
d'utilisation des fonctionnalités, pas une prédiction de résultats. Rester à
70-80 % en refusant ce qui n'a pas de sens est parfaitement sain.

---

## 4. À vérifier après déploiement (10 min, à faire par Nico)

Les domaines Google sont bloqués depuis l'environnement de développement : la
séquence complète a été validée en navigateur (ordre des appels, absence de
cookie, envoi de la conversion sur succès du formulaire), **mais les requêtes
réseau vers Google ne peuvent être observées qu'en production**. À faire une
fois en ligne :

1. Ouvrir nitrello.com en navigation privée, **sans toucher à la bannière**.
   Onglet Application → Cookies : **aucun cookie `_gcl_*`**. C'est la garantie
   juridique, c'est le premier point à vérifier.
2. Onglet Réseau, filtre `googletagmanager` : `gtag/js` doit se charger en 200
   (avant, il n'apparaissait pas du tout).
3. Accepter la bannière, filtre `google` : un ping doit repartir avec
   `gcs=G110`. Sans acceptation, `gcs=G100` — les deux sont normaux, le second
   est celui qui alimente la modélisation.
4. « Gérer mes cookies » → Refuser : la page ne se recharge plus (changement
   volontaire), et les cookies `_gcl_*` disparaissent.
5. Dans Google Ads sous 24-48 h : l'action *Envoi de formulaire de lead* doit
   quitter l'état « Inactive ».

Le vérificateur automatique de Google Ads peut continuer à dire « balise non
détectée » : son robot ne consent pas. Ce n'est plus bloquant maintenant que la
balise se charge pour tout le monde, mais ne pas s'y fier — utiliser Tag
Assistant.

---

## 5. Et si ça ne suffit toujours pas

Si dans deux semaines le compteur est toujours à zéro **avec** une mesure
fiable, alors le problème n'est plus la campagne mais le trafic ou la page
d'arrivée. Dans l'ordre de ce qu'il faudra regarder :

1. **La page d'arrivée.** Les annonces pointent vers l'accueil. Le premier bouton
   (« En discuter ») renvoie vers un formulaire situé après sept sections de
   scroll. Pour du trafic payant, il faut un chemin d'action immédiat : soit le
   bouton du hero ouvre directement la popup Cal.com, soit le numéro de
   téléphone devient visible dès le premier écran sur mobile.
2. **Les termes de recherche réels.** Google Ads → Mots clés → Termes de
   recherche : c'est là qu'on voit si le budget part sur « formation
   automatisation gratuite ». À regarder chaque semaine les premiers temps.
3. **Le tutoiement.** Tout le site tutoie. C'est un parti pris assumé et
   cohérent, mais sur du trafic froid venu d'une annonce — un gérant de TPE qui
   ne te connaît pas — c'est un pari. À tester un jour, pas à trancher
   maintenant.

Ces trois points touchent au design et au positionnement : ce sont tes
décisions, pas des correctifs techniques. Je ne les ai pas appliqués.
