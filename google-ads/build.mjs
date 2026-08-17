#!/usr/bin/env node
// ============================================================================
// Génère les CSV d'import Google Ads Editor depuis campagne-search.json,
// en validant TOUTES les limites de caractères imposées par Google.
//
//   node google-ads/build.mjs
//
// Pourquoi un générateur plutôt que des CSV écrits à la main : un titre
// d'annonce à 31 caractères est refusé à l'import sans que rien n'indique
// lequel. Ici, le script échoue en nommant le champ fautif et son dépassement.
// Modifier campagne-search.json, relancer, réimporter.
// ============================================================================

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = dirname(fileURLToPath(import.meta.url));
const config = JSON.parse(readFileSync(join(DIR, "campagne-search.json"), "utf8"));

// Limites Google Ads (annonces responsives sur le Réseau de Recherche).
const LIMITS = {
  titre: 30,
  description: 90,
  chemin: 15,
  lienAnnexeTexte: 25,
  lienAnnexeDesc: 35,
  accroche: 25,
  extraitStructure: 25,
};

const errors = [];

function check(value, limit, label) {
  if (value.length > limit) {
    errors.push(`${label} : ${value.length}/${limit} caractères — « ${value} »`);
  }
  return value;
}

// Un champ CSV n'est échappé que s'il en a besoin, pour rester lisible à l'œil.
function csvField(value) {
  const s = String(value ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function toCsv(rows) {
  return rows.map((row) => row.map(csvField).join(",")).join("\n") + "\n";
}

const campagne = config.campagne.nom;

// ── Mots clés ───────────────────────────────────────────────────────────────
const keywordRows = [["Campaign", "Ad Group", "Keyword", "Criterion Type", "Final URL"]];
for (const groupe of config.groupes) {
  for (const mot of groupe.motsCles) {
    keywordRows.push([campagne, groupe.nom, mot.texte, mot.type, groupe.urlFinale]);
  }
}

// ── Exclusions (niveau campagne : colonne Ad Group laissée vide) ────────────
const negativeRows = [["Campaign", "Ad Group", "Keyword", "Criterion Type"]];
for (const excl of config.exclusions) {
  negativeRows.push([campagne, "", excl.texte, excl.type]);
}

// ── Annonces responsives ────────────────────────────────────────────────────
const MAX_TITRES = 15;
const MAX_DESCRIPTIONS = 4;

const adHeader = ["Campaign", "Ad Group", "Ad type"];
for (let i = 1; i <= MAX_TITRES; i++) adHeader.push(`Headline ${i}`);
for (let i = 1; i <= MAX_DESCRIPTIONS; i++) adHeader.push(`Description ${i}`);
adHeader.push("Path 1", "Path 2", "Final URL");

const adRows = [adHeader];
for (const groupe of config.groupes) {
  if (groupe.titres.length < 8) {
    errors.push(`Groupe « ${groupe.nom} » : ${groupe.titres.length} titres, Google en demande au moins 8 pour une annonce solide.`);
  }
  if (groupe.descriptions.length < 2) {
    errors.push(`Groupe « ${groupe.nom} » : ${groupe.descriptions.length} description(s), minimum 2.`);
  }

  const row = [campagne, groupe.nom, "Responsive search ad"];
  for (let i = 0; i < MAX_TITRES; i++) {
    const titre = groupe.titres[i] ?? "";
    if (titre) check(titre, LIMITS.titre, `Titre — ${groupe.nom}`);
    row.push(titre);
  }
  for (let i = 0; i < MAX_DESCRIPTIONS; i++) {
    const desc = groupe.descriptions[i] ?? "";
    if (desc) check(desc, LIMITS.description, `Description — ${groupe.nom}`);
    row.push(desc);
  }
  row.push(
    check(groupe.chemin1, LIMITS.chemin, `Chemin 1 — ${groupe.nom}`),
    check(groupe.chemin2, LIMITS.chemin, `Chemin 2 — ${groupe.nom}`),
    groupe.urlFinale,
  );
  adRows.push(row);
}

// ── Liens annexes ───────────────────────────────────────────────────────────
const sitelinkRows = [["Campaign", "Sitelink text", "Description line 1", "Description line 2", "Final URL"]];
for (const lien of config.liensAnnexes) {
  check(lien.texte, LIMITS.lienAnnexeTexte, "Lien annexe (texte)");
  check(lien.desc1, LIMITS.lienAnnexeDesc, `Lien annexe desc 1 — ${lien.texte}`);
  check(lien.desc2, LIMITS.lienAnnexeDesc, `Lien annexe desc 2 — ${lien.texte}`);
  sitelinkRows.push([campagne, lien.texte, lien.desc1, lien.desc2, lien.url]);
}
if (config.liensAnnexes.length < 6) {
  errors.push(`Seulement ${config.liensAnnexes.length} liens annexes : la recommandation Google en demande au moins 6.`);
}

// ── Accroches ───────────────────────────────────────────────────────────────
const calloutRows = [["Campaign", "Callout text"]];
for (const accroche of config.accroches) {
  check(accroche, LIMITS.accroche, "Accroche");
  calloutRows.push([campagne, accroche]);
}

// ── Extraits structurés ─────────────────────────────────────────────────────
const snippetRows = [["Campaign", "Header", "Snippet values"]];
for (const valeur of config.extraitsStructures.valeurs) {
  check(valeur, LIMITS.extraitStructure, "Extrait structuré");
}
snippetRows.push([
  campagne,
  config.extraitsStructures.enTete,
  config.extraitsStructures.valeurs.join(";"),
]);

// ── Le suffixe d'URL ne doit jamais être un modèle de suivi ─────────────────
// Plusieurs URL finales pointent vers une ancre (#services, #contact). Un
// modèle de suivi en {lpurl}?... colle la query APRÈS le #, où elle devient
// invisible pour la page. Le suffixe d'URL finale, lui, est inséré au bon
// endroit par Google. Le confondre casserait silencieusement l'attribution.
if (/\{lpurl\}/.test(config.campagne.suffixeUrlFinale)) {
  errors.push(
    "campagne.suffixeUrlFinale contient {lpurl} : c'est la syntaxe d'un MODÈLE DE SUIVI, pas d'un suffixe d'URL finale. " +
    "Avec des URL à ancre, le modèle place les paramètres après le # et l'attribution est perdue.",
  );
}

// ── Résultat ────────────────────────────────────────────────────────────────
if (errors.length > 0) {
  console.error(`\n✗ ${errors.length} problème(s), aucun fichier écrit :\n`);
  for (const err of errors) console.error(`   · ${err}`);
  console.error("");
  process.exit(1);
}

const files = {
  "01-mots-cles.csv": toCsv(keywordRows),
  "02-exclusions.csv": toCsv(negativeRows),
  "03-annonces.csv": toCsv(adRows),
  "04-liens-annexes.csv": toCsv(sitelinkRows),
  "05-accroches.csv": toCsv(calloutRows),
  "06-extraits-structures.csv": toCsv(snippetRows),
};

for (const [name, content] of Object.entries(files)) {
  writeFileSync(join(DIR, name), content, "utf8");
}

const totalMots = config.groupes.reduce((n, g) => n + g.motsCles.length, 0);
console.log("\n✓ Campagne générée, toutes les limites de caractères respectées.\n");
console.log(`   Campagne        ${campagne}`);
console.log(`   Groupes         ${config.groupes.length}`);
console.log(`   Mots clés       ${totalMots}`);
console.log(`   Exclusions      ${config.exclusions.length}`);
console.log(`   Liens annexes   ${config.liensAnnexes.length}`);
console.log(`   Accroches       ${config.accroches.length}\n`);
for (const name of Object.keys(files)) console.log(`   → google-ads/${name}`);
console.log("");
