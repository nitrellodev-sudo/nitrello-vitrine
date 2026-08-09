/**
 * Démonstration d'un flux d'automatisation : un mail de demande arrive, tout
 * s'enchaîne jusqu'à la relance sans intervention.
 *
 * Partagé par la home (aperçu de l'offre phare, section #automatisation) et par
 * /automatisation-ia (section « un exemple concret »). Le composant ne porte que
 * l'étage animé : chaque page fournit son propre titre et sa propre chute, pour
 * que le même visuel serve deux cadrages différents sans redite de texte.
 *
 * Autonome : il embarque le sprite des icônes qu'il utilise, préfixé `wf-i-`
 * pour ne jamais entrer en collision avec le sprite `i-` de /automatisation-ia.
 * L'animation elle-même est posée par <WorkflowAnimation />, qui cible #wf-track :
 * un seul WorkflowDemo par page.
 */
export default function WorkflowDemo() {
  return (
    <div className="wf-stage reveal">
      {/* Sprite local : les 5 icônes des noeuds du flux */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <symbol id="wf-i-mail" viewBox="0 0 24 24">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </symbol>
        <symbol id="wf-i-sparkles" viewBox="0 0 24 24">
          <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z" />
        </symbol>
        <symbol id="wf-i-database" viewBox="0 0 24 24">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14a9 3 0 0 0 18 0V5" />
          <path d="M3 12a9 3 0 0 0 18 0" />
        </symbol>
        <symbol id="wf-i-file" viewBox="0 0 24 24">
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
          <path d="M10 9H8" />
        </symbol>
        <symbol id="wf-i-bell" viewBox="0 0 24 24">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </symbol>
      </svg>

      <div className="wf-grid-bg" aria-hidden="true"></div>
      <div className="wf-inner">
        <div className="wf-track" id="wf-track">
          <div className="wf-node">
            <div className="wf-node-box">
              <div className="wf-node-tag">Déclencheur</div>
              <div className="wf-ico">
                <svg className="ia-icon" aria-hidden="true">
                  <use href="#wf-i-mail" />
                </svg>
              </div>
              <div className="wf-label">Mail reçu</div>
              <div className="wf-sublabel">une demande arrive</div>
            </div>
          </div>
          <div className="wf-connector">
            <span className="spark"></span>
          </div>
          <div className="wf-node">
            <div className="wf-node-box">
              <div className="wf-node-tag">IA</div>
              <div className="wf-ico">
                <svg className="ia-icon" aria-hidden="true">
                  <use href="#wf-i-sparkles" />
                </svg>
              </div>
              <div className="wf-label">L&apos;IA lit le mail</div>
              <div className="wf-sublabel">nom, besoin, contact</div>
            </div>
          </div>
          <div className="wf-connector">
            <span className="spark"></span>
          </div>
          <div className="wf-node">
            <div className="wf-node-box">
              <div className="wf-node-tag">Données</div>
              <div className="wf-ico">
                <svg className="ia-icon" aria-hidden="true">
                  <use href="#wf-i-database" />
                </svg>
              </div>
              <div className="wf-label">CRM rempli</div>
              <div className="wf-sublabel">fiche créée seule</div>
            </div>
          </div>
          <div className="wf-connector">
            <span className="spark"></span>
          </div>
          <div className="wf-node">
            <div className="wf-node-box">
              <div className="wf-node-tag">Document</div>
              <div className="wf-ico">
                <svg className="ia-icon" aria-hidden="true">
                  <use href="#wf-i-file" />
                </svg>
              </div>
              <div className="wf-label">Devis généré</div>
              <div className="wf-sublabel">prêt à envoyer</div>
            </div>
          </div>
          <div className="wf-connector">
            <span className="spark"></span>
          </div>
          <div className="wf-node">
            <div className="wf-node-box">
              <div className="wf-node-tag">Auto</div>
              <div className="wf-ico">
                <svg className="ia-icon" aria-hidden="true">
                  <use href="#wf-i-bell" />
                </svg>
              </div>
              <div className="wf-label">Relance programmée</div>
              <div className="wf-sublabel">si pas de réponse</div>
            </div>
          </div>
        </div>
        <div className="wf-legend">
          <span className="pill">
            <span className="led"></span> Workflow actif · tourne 24h/24
          </span>
        </div>
      </div>
    </div>
  );
}
