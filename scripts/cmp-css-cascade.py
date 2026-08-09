"""Compare deux CSS compilés règle à règle.

La phase 3 déplace des règles d'un fichier à l'autre : l'ordre du CSS compilé
change PAR CONSTRUCTION, donc un diff textuel ne prouve rien. Ce qui doit être
conservé, c'est :
  1. l'ensemble des règles (contexte @media + sélecteur + déclarations),
     aucune perte, aucun ajout, aucune valeur modifiée ;
  2. l'ordre relatif des règles en conflit, c'est-à-dire toute paire de règles
     partageant un même contexte, un même sélecteur et une même propriété :
     c'est l'ordre qui désigne la gagnante à spécificité égale.
"""
import re
import sys
from collections import Counter, defaultdict


def parse(path):
    """Retourne la liste ordonnée des (contexte at-rule, sélecteur, déclarations)."""
    css = open(path, encoding="utf-8").read()
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    rules, stack, buf, i = [], [], "", 0
    while i < len(css):
        c = css[i]
        if c == "{":
            head = buf.strip()
            buf = ""
            # une at-rule à blocs (@media, @supports...) ouvre un contexte
            if head.startswith("@") and not head.startswith("@font-face"):
                stack.append(head)
                i += 1
                continue
            # sinon c'est un bloc de déclarations : on le consomme jusqu'à sa fermeture
            depth, j = 1, i + 1
            while j < len(css) and depth:
                if css[j] == "{":
                    depth += 1
                elif css[j] == "}":
                    depth -= 1
                j += 1
            body = css[i + 1 : j - 1]
            decls = tuple(
                sorted(d.strip() for d in body.split(";") if d.strip())
            )
            rules.append((" ".join(stack), head, decls))
            i = j
            continue
        if c == "}":
            if stack:
                stack.pop()
            buf = ""
            i += 1
            continue
        buf += c
        i += 1
    return rules


def props(decls):
    return {d.split(":", 1)[0].strip() for d in decls if ":" in d}


def main(a, b):
    ra, rb = parse(a), parse(b)
    print(f"règles avant : {len(ra)} · après : {len(rb)}")

    ca, cb = Counter(ra), Counter(rb)
    perdues = list((ca - cb).elements())
    ajoutees = list((cb - ca).elements())
    print(f"règles perdues : {len(perdues)} · ajoutées : {len(ajoutees)}")
    for r in perdues[:10]:
        print("  - PERDUE  ", r[0], r[1], str(r[2])[:110])
    for r in ajoutees[:10]:
        print("  + AJOUTEE ", r[0], r[1], str(r[2])[:110])

    # ordre relatif des règles qui se disputent une même propriété
    def conflicts(rules):
        pos = defaultdict(list)
        for idx, (ctx, sel, decls) in enumerate(rules):
            for p in props(decls):
                pos[(ctx, sel, p)].append(idx)
        # on ne garde que les clés vues plusieurs fois, et la gagnante = dernière
        return {k: v[-1] for k, v in pos.items() if len(v) > 1}, pos

    conf_a, pos_a = conflicts(ra)
    conf_b, pos_b = conflicts(rb)
    print(f"clés (contexte, sélecteur, propriété) en conflit : {len(conf_a)} avant, {len(conf_b)} après")

    inversions = []
    for key, win_a in conf_a.items():
        gagnante_a = ra[win_a]
        idx_b = pos_b.get(key)
        if not idx_b:
            inversions.append((key, "clé disparue après"))
            continue
        gagnante_b = rb[idx_b[-1]]
        va = [d for d in gagnante_a[2] if d.split(":", 1)[0].strip() == key[2]]
        vb = [d for d in gagnante_b[2] if d.split(":", 1)[0].strip() == key[2]]
        if va != vb:
            inversions.append((key, f"{va} -> {vb}"))
    print(f"INVERSIONS DE CASCADE : {len(inversions)}")
    for k, d in inversions[:15]:
        print("  !", k, d)

    ok = not perdues and not ajoutees and not inversions
    print("VERDICT :", "EQUIVALENT" if ok else "DIVERGENCE")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1], sys.argv[2]))
