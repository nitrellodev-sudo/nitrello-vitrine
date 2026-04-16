---
name: seo
description: SEO optimization for static HTML sites hosted on Netlify. Use when auditing, optimizing, or creating SEO-friendly web pages. Covers on-page SEO, Schema.org, Open Graph, Core Web Vitals, and technical SEO.
---

# SEO — Skill Nitrello

## Contexte
Site vitrine statique HTML fichier unique (index.html) heberge sur Netlify.
Domaine : nitrello.com. Cible : freelance no-code Bubble, marche FR.

## Checklist On-Page SEO

### Balises essentielles
- title : 50-60 caracteres, mot-cle principal en tete
- meta name description : 150-160 caracteres, appel a l action naturel
- h1 : unique par page, contient le mot-cle principal
- h2 / h3 : hierarchie logique, mots-cles secondaires
- Images : alt descriptif sur toutes les img

### Structure technique
- link rel canonical present et correct
- lang fr sur html
- robots meta : index, follow
- Schema.org JSON-LD : Person + ProfessionalService
- Open Graph + Twitter Card complets

### Mots-cles cibles (nitrello.com)
Primaires : freelance no-code, developpeur Bubble, creation application web sans code
Secondaires : MVP startup, application Bubble France, SaaS no-code, marketplace Bubble
Longue traine : freelance Bubble France, creer application sans code rapidement

### Performance (Core Web Vitals)
- Images avec loading lazy sauf hero
- SVG inline prefere aux images externes
- Fonts Google avec display swap
- Pas de JS bloquant en head

### Contenu
- Densite mot-cle : 1-2% (pas de keyword stuffing)
- Paragraphes courts, listes, hierarchie claire
- Texte ancre des liens internes descriptif (pas cliquez ici)
- Mentions naturelles du mot-cle dans les 100 premiers mots

## Workflow audit SEO

Quand l utilisateur demande un audit SEO :
1. Lire le head complet puis verifier title, description, canonical, OG
2. Scanner les h1-h3 puis verifier hierarchie et mots-cles
3. Verifier le JSON-LD Schema.org puis validite et completude
4. Controler les alt sur les img
5. Lister les problemes par priorite : CRITIQUE / IMPORTANT / MINEUR
6. Proposer les corrections directement dans index.html

## Notes specifiques Netlify
- _headers ou netlify.toml pour les headers HTTP (cache, securite)
- Netlify gere automatiquement les redirections HTTPS
- Pas de sitemap necessaire pour site 1 page, mais utile si pages ajoutees
