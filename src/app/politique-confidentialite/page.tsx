import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité du site nitrello.com — Traitement de vos données personnelles, sous-traitants, cookies et droits RGPD.",
  alternates: {
    canonical: "https://nitrello.com/politique-confidentialite",
  },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="blog-page">
      <header className="blog-page__header">
        <p className="blog-page__kicker">— PROTECTION DES DONNÉES</p>
        <h1 className="blog-page__title">Politique de confidentialité</h1>
        <p className="blog-page__intro">
          Comment vos données personnelles sont traitées sur le site
          nitrello.com&nbsp;: finalités, durées de conservation, sous-traitants
          impliqués et droits que vous pouvez exercer.
        </p>
      </header>

      <div className="blog-article__content">
        <p>
          <em>Dernière mise à jour&nbsp;: 17&nbsp;août&nbsp;2026.</em>
        </p>

        <h2>Préambule</h2>
        <p>
          Nitrello s&apos;engage à protéger la vie privée des visiteurs de son
          site nitrello.com. La présente politique décrit les traitements de
          données personnelles effectués via ce site, conformément au
          Règlement général sur la protection des données (RGPD —
          UE&nbsp;2016/679) et à la loi française n°&nbsp;78-17 du
          6&nbsp;janvier 1978 modifiée, relative à l&apos;informatique, aux
          fichiers et aux libertés.
        </p>
        <p>
          Elle s&apos;applique à l&apos;ensemble des traitements réalisés via
          le site nitrello.com&nbsp;: consultation des pages, soumission du
          formulaire de contact, prise de rendez-vous, mesure d&apos;audience,
          mesure de l&apos;efficacité publicitaire (uniquement avec votre
          consentement).
        </p>

        <h2>Responsable du traitement</h2>
        <p>
          Le responsable du traitement des données personnelles collectées via
          le site nitrello.com est&nbsp;:
        </p>
        <ul>
          <li>
            <strong>Nicolas Tinnirello</strong>, exerçant en nom propre sous le
            nom commercial <strong>Nitrello</strong>
          </li>
          <li>
            Adresse&nbsp;: 36 Impasse du Domaine du Mûrier, 38160
            Saint-Sauveur, France
          </li>
          <li>SIRET&nbsp;: 51511765300045</li>
          <li>
            Email&nbsp;:{" "}
            <a href="mailto:contact@nitrello.com">contact@nitrello.com</a>
          </li>
          <li>
            Téléphone&nbsp;:{" "}
            <a href="tel:+33688649584">06&nbsp;88&nbsp;64&nbsp;95&nbsp;84</a>
          </li>
        </ul>
        <p>
          Aucun Délégué à la Protection des Données (DPO) n&apos;est désigné,
          les conditions de désignation obligatoire prévues à
          l&apos;article&nbsp;37 du RGPD n&apos;étant pas remplies (absence
          de traitement à grande échelle, absence de traitement systématique
          de catégories particulières de données).
        </p>

        <h2>Données collectées et finalités</h2>

        <h3>Mesure d&apos;audience anonymisée (Vercel Analytics)</h3>
        <ul>
          <li>
            <strong>Données collectées</strong>&nbsp;: URL de la page visitée,
            pays approximatif (déduit de l&apos;adresse IP, qui n&apos;est pas
            stockée), type d&apos;appareil, navigateur, système
            d&apos;exploitation, indicateurs de performance (Web Vitals).
          </li>
          <li>
            <strong>Finalité</strong>&nbsp;: analyse statistique du trafic
            pour améliorer le site.
          </li>
          <li>
            <strong>Base légale</strong>&nbsp;: mesure d&apos;audience
            exemptée du recueil de consentement (lignes directrices CNIL),
            les conditions étant remplies&nbsp;: solution cookieless, adresse
            IP non stockée, finalité statistique strictement limitée,
            absence de croisement avec d&apos;autres traitements.
          </li>
          <li>
            <strong>Durée de conservation</strong>&nbsp;: 1 mois (politique
            Vercel).
          </li>
          <li>
            <strong>Cookies</strong>&nbsp;: aucun.
          </li>
          <li>
            <strong>Sous-traitant</strong>&nbsp;: Vercel Inc.
          </li>
        </ul>

        <h3>Préférence d&apos;affichage (mode sombre / mode clair)</h3>
        <ul>
          <li>
            <strong>Donnée collectée</strong>&nbsp;: valeur «&nbsp;light&nbsp;»
            ou «&nbsp;dark&nbsp;» stockée dans le localStorage de votre
            navigateur.
          </li>
          <li>
            <strong>Finalité</strong>&nbsp;: mémoriser le mode d&apos;affichage
            choisi pour les prochaines visites.
          </li>
          <li>
            <strong>Base légale</strong>&nbsp;: préférence utilisateur
            fonctionnelle, donnée non personnelle.
          </li>
          <li>
            <strong>Durée de conservation</strong>&nbsp;: illimitée,
            jusqu&apos;à effacement manuel via les paramètres de votre
            navigateur.
          </li>
          <li>
            <strong>Sous-traitant</strong>&nbsp;: aucun. La donnée reste
            exclusivement dans votre navigateur et n&apos;est jamais transmise
            à un serveur.
          </li>
        </ul>

        <h3>Formulaire de contact</h3>
        <ul>
          <li>
            <strong>Données collectées</strong>&nbsp;: nom, adresse email, type
            de projet, entreprise (optionnel), message libre, date
            d&apos;envoi, ainsi que l&apos;origine de votre visite lorsque
            celle-ci figure dans l&apos;adresse par laquelle vous êtes arrivé
            (identifiant de clic publicitaire, paramètres de campagne, ou nom
            de domaine du site référent). Cette dernière information sert
            uniquement à savoir quel canal a mené à votre demande&nbsp;; elle
            n&apos;est ni lue ni écrite sur votre terminal.
          </li>
          <li>
            <strong>Finalité</strong>&nbsp;: répondre à votre demande de
            contact, assurer le suivi commercial.
          </li>
          <li>
            <strong>Base légale</strong>&nbsp;: article 6.1.b du RGPD —
            exécution de mesures précontractuelles prises à votre demande.
          </li>
          <li>
            <strong>Durée de conservation</strong>&nbsp;: 3 ans à compter du
            dernier contact (recommandation CNIL pour la prospection B2B).
          </li>
          <li>
            <strong>Cookies</strong>&nbsp;: aucun.
          </li>
          <li>
            <strong>Sous-traitants impliqués dans la chaîne</strong>&nbsp;:
            <ul>
              <li>
                Railway Corp. (États-Unis) — hébergement de l&apos;instance
                n8n recevant le formulaire
              </li>
              <li>
                Brevo SAS (France) — notification email transactionnel à
                Nicolas Tinnirello
              </li>
              <li>
                Notion Labs Inc. (États-Unis) — stockage CRM de la fiche
                prospect
              </li>
            </ul>
          </li>
        </ul>

        <h3>Prise de rendez-vous (Cal.com)</h3>
        <ul>
          <li>
            <strong>Données collectées</strong>&nbsp;: nom, adresse email,
            créneau réservé, saisis volontairement dans le widget de
            réservation.
          </li>
          <li>
            <strong>Finalité</strong>&nbsp;: organiser le rendez-vous demandé.
          </li>
          <li>
            <strong>Base légale</strong>&nbsp;: article 6.1.b du RGPD —
            mesures précontractuelles prises à votre demande.
          </li>
          <li>
            <strong>Durée de conservation</strong>&nbsp;: selon la politique
            de Cal.com (
            <a
              href="https://cal.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              cal.com/privacy
            </a>
            ).
          </li>
          <li>
            <strong>Cookies</strong>&nbsp;: Cal.com pose des cookies tiers
            <em> uniquement après</em> que vous avez cliqué volontairement sur
            le bouton «&nbsp;Réserver un appel&nbsp;». Cette action explicite
            vaut consentement au sens des lignes directrices CNIL.
          </li>
          <li>
            <strong>Sous-traitant</strong>&nbsp;: Cal.com Inc.
          </li>
        </ul>

        <h3>Mesure publicitaire Google Ads (avec votre consentement)</h3>
        <ul>
          <li>
            <strong>Données collectées</strong>&nbsp;: identifiant de clic
            publicitaire (GCLID) transmis lorsque vous arrivez sur le site
            depuis une annonce Google, cookies first-party _gcl_aw, _gcl_gs
            et le cas échéant _gcl_au, pages consultées.
          </li>
          <li>
            <strong>Finalité</strong>&nbsp;: mesurer l&apos;efficacité des
            campagnes publicitaires Google Ads de Nitrello, notamment celles
            liées à sa fiche d&apos;établissement Google (savoir si une
            visite ou un contact provient d&apos;une annonce).
          </li>
          <li>
            <strong>Base légale</strong>&nbsp;: article 6.1.a du RGPD —
            votre consentement, recueilli via la bannière de cookies.
            <strong>
              {" "}
              Aucun cookie publicitaire n&apos;est déposé ni lu sur votre
              terminal tant que vous n&apos;avez pas accepté.
            </strong>{" "}
            La balise Google est présente sur le site mais démarre avec tous
            les consentements refusés&nbsp;: dans cet état, elle se limite à
            des mesures agrégées sans cookie et sans identifiant publicitaire
            (les identifiants de clic sont expurgés des requêtes). Elle
            n&apos;active le dépôt de cookies et la personnalisation
            qu&apos;après votre acceptation. Vous pouvez retirer votre
            consentement à tout moment via le lien «&nbsp;Gérer mes
            cookies&nbsp;» en bas de page&nbsp;: la balise repasse
            immédiatement en mode refusé et les cookies déjà posés sont
            supprimés.
          </li>
          <li>
            <strong>Durée de conservation</strong>&nbsp;: cookies _gcl_*
            conservés environ 90&nbsp;jours. Votre choix de consentement est
            conservé dans le localStorage de votre navigateur jusqu&apos;à
            modification ou effacement.
          </li>
          <li>
            <strong>Cookies</strong>&nbsp;: cookies first-party déposés par
            la balise Google, uniquement après votre acceptation.
          </li>
          <li>
            <strong>Sous-traitant</strong>&nbsp;: Google Ireland Limited
            (Irlande) et Google LLC (États-Unis).
          </li>
        </ul>

        <h2>Cookies et traceurs</h2>
        <p>
          Le site nitrello.com ne dépose <strong>aucun traceur soumis à
          consentement sans votre accord préalable</strong>. Le seul traceur
          publicitaire utilisé est la balise Google Ads (gtag.js), décrite
          ci-dessus&nbsp;: elle est chargée sur le site mais reste en mode
          refusé tant que vous n&apos;avez pas accepté, c&apos;est-à-dire
          qu&apos;elle n&apos;écrit ni ne lit aucun cookie et n&apos;exploite
          aucun identifiant publicitaire. Aucun cookie de mesure
          d&apos;audience tiers, aucune heatmap, aucun session replay.
        </p>
        <p>
          Les cookies du service Cal.com ne sont posés qu&apos;après votre
          action explicite (clic sur «&nbsp;Réserver un appel&nbsp;»).
        </p>
        <p>
          Le localStorage de votre navigateur est utilisé pour mémoriser
          votre préférence de thème (mode sombre / clair) et votre choix de
          consentement aux cookies publicitaires. Il s&apos;agit de données
          fonctionnelles exemptées de consentement, stockées exclusivement
          côté navigateur.
        </p>
        <p>
          Une bannière de consentement s&apos;affiche lors de votre première
          visite. Elle vous permet d&apos;accepter ou de refuser le traceur
          publicitaire Google Ads, les deux choix étant présentés avec le
          même niveau de facilité. Refuser n&apos;altère en rien la
          navigation sur le site. Vous pouvez modifier votre choix à tout
          moment via le lien «&nbsp;Gérer mes cookies&nbsp;» présent en pied
          de page. La mesure d&apos;audience (Vercel Analytics), sans cookie,
          reste exemptée de consentement.
        </p>

        <h2>Liste des sous-traitants</h2>
        <p>
          Les sous-traitants suivants interviennent dans le traitement de vos
          données pour le compte de Nitrello&nbsp;:
        </p>
        <ul>
          <li>
            <strong>Vercel Inc.</strong> — États-Unis — hébergement web et
            mesure d&apos;audience cookieless — mécanisme&nbsp;:
            <em> Data Privacy Framework (DPF) UE-US</em>.
          </li>
          <li>
            <strong>Google Ireland Limited / Google LLC</strong> — Irlande /
            États-Unis — mesure publicitaire Google Ads, activée uniquement
            après votre consentement — mécanisme&nbsp;:
            <em> Data Privacy Framework (DPF) UE-US</em> (certification de
            Google LLC).
          </li>
          <li>
            <strong>Supabase Pte. Ltd.</strong> — Singapour — base de données
            du blog — mécanisme&nbsp;: <em>Clauses Contractuelles Types (CCT)</em>
            {" "}conformes au RGPD. Les données sont physiquement hébergées
            dans l&apos;Union européenne (AWS eu-west-1, Dublin, Irlande).
          </li>
          <li>
            <strong>Cal.com Inc.</strong> — États-Unis — réservation de
            rendez-vous (activé uniquement après action explicite du
            visiteur) — mécanisme&nbsp;: <em>Data Privacy Framework (DPF)
            UE-US</em>.
          </li>
          <li>
            <strong>Railway Corp.</strong> — États-Unis — hébergement de
            l&apos;instance n8n qui traite les soumissions du formulaire de
            contact — mécanisme&nbsp;: <em>Data Privacy Framework (DPF)
            UE-US</em>.
          </li>
          <li>
            <strong>Brevo SAS</strong> — France — envoi des notifications
            email transactionnelles après soumission du formulaire — pas de
            transfert hors UE.
          </li>
          <li>
            <strong>Notion Labs Inc.</strong> — États-Unis — stockage CRM
            (fiche prospect créée après soumission du formulaire) —
            mécanisme&nbsp;: <em>Data Privacy Framework (DPF) UE-US</em>.
          </li>
        </ul>

        <h2>Transferts hors Union européenne</h2>
        <p>
          Lorsque vos données sont transférées vers un sous-traitant établi
          hors de l&apos;Union européenne, l&apos;un des mécanismes de
          protection prévus par le RGPD est systématiquement mis en
          place&nbsp;:
        </p>
        <ul>
          <li>
            Les sous-traitants établis aux <strong>États-Unis</strong> (Vercel
            Inc., Cal.com Inc., Railway Corp., Notion Labs Inc., Google LLC)
            sont certifiés au titre du <strong>Data Privacy Framework (DPF)</strong>,
            cadre d&apos;adéquation adopté par la Commission européenne le
            10&nbsp;juillet 2023.
          </li>
          <li>
            <strong>Supabase Pte. Ltd.</strong>, dont le siège est à Singapour,
            est encadré par des <strong>Clauses Contractuelles Types
            (CCT)</strong> conformes au RGPD. Les données physiques sont
            néanmoins hébergées dans l&apos;Union européenne (AWS eu-west-1,
            Dublin, Irlande).
          </li>
        </ul>
        <p>
          Aucun transfert hors UE n&apos;est effectué sans l&apos;un de ces
          mécanismes de protection.
        </p>

        <h2>Vos droits</h2>
        <p>
          Conformément au RGPD et à la loi Informatique et Libertés, vous
          disposez des droits suivants sur vos données personnelles&nbsp;:
        </p>
        <ul>
          <li>Droit d&apos;accès</li>
          <li>Droit de rectification</li>
          <li>Droit à l&apos;effacement («&nbsp;droit à l&apos;oubli&nbsp;»)</li>
          <li>Droit d&apos;opposition</li>
          <li>Droit à la portabilité</li>
          <li>Droit à la limitation du traitement</li>
        </ul>
        <p>
          Pour exercer l&apos;un de ces droits, envoyez un email à{" "}
          <a href="mailto:contact@nitrello.com">contact@nitrello.com</a>{" "}
          accompagné, le cas échéant, d&apos;un justificatif d&apos;identité.
          Une réponse vous sera apportée dans un délai maximal d&apos;un mois
          à compter de la réception de votre demande.
        </p>

        <h2>Réclamation auprès de la CNIL</h2>
        <p>
          Si vous estimez, après nous avoir contactés, que vos droits ne sont
          pas respectés, vous pouvez adresser une réclamation à la
          Commission Nationale de l&apos;Informatique et des Libertés
          (CNIL)&nbsp;:{" "}
          <a
            href="https://www.cnil.fr/fr/plaintes"
            target="_blank"
            rel="noopener noreferrer"
          >
            cnil.fr/fr/plaintes
          </a>
          .
        </p>

        <h2>Modifications de la politique</h2>
        <p>
          La présente politique de confidentialité peut être mise à jour pour
          refléter des évolutions techniques, juridiques ou
          organisationnelles (ajout d&apos;un nouveau sous-traitant,
          modification réglementaire, adaptation de la durée de
          conservation).
        </p>
        <p>
          La date de dernière mise à jour figure en haut du document. Aucune
          notification individuelle n&apos;est adressée aux visiteurs, sauf
          en cas de changement substantiel affectant directement les
          personnes concernées.
        </p>

        <hr />
        <p>
          <em>Dernière mise à jour&nbsp;: 17&nbsp;août&nbsp;2026.</em>
        </p>
      </div>
    </main>
  );
}
