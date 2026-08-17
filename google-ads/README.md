# Campagne Search « Nitrello · Search · Isère »

Campagne complète, prête à importer, à faire tourner **en parallèle** de la
Performance Max existante — pas à sa place, au moins au début (voir §5).

Pourquoi une Search plutôt que PMax : PMax a besoin de volume de conversions
pour apprendre, et sur un compte neuf il dépense sur YouTube, Discover et
Display avant de trouver quoi que ce soit. Une campagne Search en expression
exacte ne se déclenche que sur des gens qui **tapent déjà** ce que tu vends.
C'est le canal qui produit des demandes le plus vite quand le budget est
serré.

---

## 1. Ce que contient ce dossier

| Fichier | Rôle |
|---|---|
| `campagne-search.json` | **La source unique.** Tout se modifie ici. |
| `build.mjs` | Génère les CSV et **valide toutes les limites de caractères**. |
| `01-mots-cles.csv` … `06-*.csv` | Générés. Ne pas éditer à la main. |

```bash
node google-ads/build.mjs
```

Le script refuse d'écrire quoi que ce soit si un titre dépasse 30 caractères,
une description 90, un lien annexe 25, etc. Il a déjà attrapé une description
à 91 caractères pendant l'écriture — à l'import, Google l'aurait rejetée sans
dire laquelle.

État actuel : **4 groupes d'annonces, 28 mots clés, 37 exclusions, 6 liens
annexes, 6 accroches**, toutes limites respectées.

---

## 2. Les quatre groupes d'annonces

Un groupe = un thème = une annonce dédiée. C'est ce qui fait monter le niveau
de qualité (et baisser le coût par clic) : la personne retrouve dans l'annonce
les mots exacts qu'elle a tapés.

| Groupe | Intention visée | Page d'arrivée |
|---|---|---|
| Automatisation des tâches | veut automatiser son quotidien | `/automatisation-ia` |
| CRM et outils de gestion | cherche un outil métier sur mesure | `/#services` |
| Développeur freelance local | cherche un prestataire en Isère | `/` |
| Site vitrine | veut un site | `/#services` |

**Le tutoiement du site n'a pas été repris dans les annonces.** Les titres et
descriptions sont écrits à l'infinitif ou au vouvoiement neutre
(« Automatiser vos tâches », « Devis après étude »). Sur du trafic froid, le
tutoiement dans une annonce est un pari ; à l'infinitif, la question ne se pose
pas et le passage vers le site ne choque pas. C'est un choix, tu peux le
renverser dans le JSON.

Toutes les formulations sont **factuelles et vérifiables** : pas de gain
chiffré, pas de promesse de résultat. Le compte a déjà des composants limités
pour « Allégations exagérées ou inexactes », il ne faut pas rouvrir ce dossier.

---

## 3. Import dans Google Ads Editor

1. Télécharger Google Ads Editor et récupérer le compte.
2. **Compte → Importer → À partir d'un fichier**, un CSV à la fois, dans
   l'ordre : `01` → `02` → `03` → `04` → `05` → `06`.
3. Vérifier l'aperçu des modifications proposées, puis **Publier**.

> Si Editor bute sur une colonne d'un fichier d'extension (`04` à `06`, les
> formats d'extensions varient d'une version à l'autre), ce n'est pas bloquant :
> ces trois-là se saisissent en deux minutes directement dans l'interface web,
> les valeurs sont dans les CSV et déjà validées. Les deux fichiers qui font
> gagner du temps sont `01` et `02`.

---

## 4. Ce qui ne s'importe pas et doit être réglé à la main

| Réglage | Valeur | Pourquoi |
|---|---|---|
| Budget quotidien | **15 €** | de quoi sortir ~10-20 clics/jour sur ces mots clés |
| Enchères | **Maximiser les clics**, CPC plafonné à **1,80 €** | l'automatique a besoin de données qui n'existent pas encore |
| Réseaux | Recherche **seule** | décocher partenaires du Réseau de Recherche **et** Display |
| Zones | Grenoble +30 km, Voiron, Saint-Marcellin, Isère | |
| Option de zone | **Présence** dans la zone | ⚠️ pas « ou manifestant de l'intérêt », sinon le budget sort du département |
| Langue | Français | |
| Suffixe d'URL finale | voir ci-dessous | attribution des leads |

### Le suffixe d'URL finale — à ne pas confondre avec un modèle de suivi

Dans **Paramètres de campagne → Paramètres d'URL de campagne → Suffixe d'URL
finale**, coller :

```
utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_content={creative}&utm_term={keyword}
```

Avec ça, chaque demande reçue arrive dans ta boîte mail avec **le mot clé exact
qui l'a générée**, grâce à la ligne « Origine » ajoutée au formulaire.

⚠️ **Ne pas utiliser un modèle de suivi en `{lpurl}?...`.** Plusieurs URL
finales pointent vers une ancre (`/#services`, `/#contact`), et un modèle de
suivi colle les paramètres *après* le `#`, où la page ne les voit plus :
l'attribution serait silencieusement perdue. Le suffixe d'URL finale, lui, est
inséré au bon endroit par Google. `build.mjs` refuse d'ailleurs de générer les
fichiers si un `{lpurl}` se glisse dans ce champ.

Par sécurité, `src/lib/attribution.ts` sait désormais lire les paramètres des
deux côtés du `#` — vérifié en navigateur sur les deux compositions d'URL. Même
si la plateforme compose mal, l'attribution tient.

### Conversions

Avant de lancer : rattacher à cette campagne les actions de conversion, avec
**Formulaire de lead** et **Prise de rendez-vous** en *principales*, les clics
téléphone et email en *secondaires*. Détail dans `../google-ads-optimisation.md`.

---

## 5. Faut-il couper la Performance Max ?

**Pas tout de suite.** Ordre recommandé :

1. Lancer la Search. Laisser les deux tourner **deux semaines**.
2. Comparer sur le seul indicateur qui compte : **le coût par demande reçue**
   (pas le coût par clic, pas le taux de clic).
3. Si la Search produit des demandes et pas la PMax, basculer le budget PMax
   sur la Search. Si la PMax repart maintenant qu'elle reçoit enfin des
   conversions — c'est possible, elle était aveugle jusqu'ici — garder les deux.

Ne pas couper la PMax le jour du lancement : elle vient tout juste d'obtenir
une mesure qui fonctionne, elle n'a jamais été jugée dans des conditions
correctes.

---

## 6. Les deux semaines qui suivent le lancement

- **Tous les 2-3 jours, les termes de recherche.** Mots clés → Termes de
  recherche. Tout ce qui n'a rien à voir part en exclusion. C'est le geste qui
  rentabilise le plus une jeune campagne : la liste de 37 exclusions est un
  point de départ, pas une liste complète.
- **Ne pas toucher aux enchères pendant 7 jours.** Chaque modification relance
  la phase d'apprentissage.
- **Basculer en « Maximiser les conversions »** seulement à partir d'une
  quinzaine de conversions sur 30 jours glissants.
- **Ne pas ajouter de requête large** tant qu'il n'y a pas de conversions.
