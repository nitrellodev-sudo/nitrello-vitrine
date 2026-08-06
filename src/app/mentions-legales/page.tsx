import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site nitrello.com — Nicolas Tinnirello, freelance dev web, mobile et IA basé à Saint-Sauveur (Isère).",
  alternates: {
    canonical: "https://nitrello.com/mentions-legales",
  },
};

export default function MentionsLegalesPage() {
  return (
    <main className="blog-page">
      <header className="blog-page__header">
        <p className="blog-page__kicker">— LÉGAL</p>
        <h1 className="blog-page__title">Mentions légales</h1>
        <p className="blog-page__intro">
          Informations légales relatives au site nitrello.com, conformément à
          l&apos;article 6 de la loi pour la confiance dans l&apos;économie
          numérique (LCEN&nbsp;n°&nbsp;2004-575 du 21&nbsp;juin&nbsp;2004).
        </p>
      </header>

      <div className="blog-article__content">
        <h2>Éditeur du site</h2>
        <p>Le site nitrello.com est édité par&nbsp;:</p>
        <ul>
          <li>
            <strong>Nicolas Tinnirello</strong>, exerçant en nom propre sous le
            nom commercial <strong>Nitrello</strong>
          </li>
          <li>Forme juridique&nbsp;: Entrepreneur individuel (EI)</li>
          <li>
            Adresse&nbsp;: 36 Impasse du Domaine du Mûrier, 38160
            Saint-Sauveur, France
          </li>
          <li>SIREN&nbsp;: 515&nbsp;117&nbsp;653</li>
          <li>SIRET (établissement principal)&nbsp;: 51511765300045</li>
          <li>Code APE&nbsp;: 6201Z — Programmation informatique</li>
          <li>
            Activité&nbsp;: développement d&apos;applications web et mobile
          </li>
          <li>
            TVA non applicable, article 293&nbsp;B du Code général des impôts
            (franchise en base)
          </li>
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
          <strong>Directeur de la publication</strong>&nbsp;: Nicolas
          Tinnirello.
        </p>

        <h2>Hébergement</h2>
        <p>
          Le site nitrello.com s&apos;appuie sur deux infrastructures
          distinctes&nbsp;:
        </p>
        <h3>Hébergement web (pages, fonctions serveur, analytics)</h3>
        <ul>
          <li>
            Société&nbsp;: <strong>Vercel Inc.</strong>
          </li>
          <li>
            Adresse&nbsp;: 440&nbsp;N Barranca Ave #4133, Covina, CA&nbsp;91723,
            États-Unis
          </li>
          <li>
            Site&nbsp;:{" "}
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
              vercel.com
            </a>
          </li>
        </ul>
        <h3>Hébergement de la base de données du blog</h3>
        <ul>
          <li>
            Société&nbsp;: <strong>Supabase Pte. Ltd.</strong>
          </li>
          <li>
            Adresse&nbsp;: 65 Chulia Street #38-02/03, OCBC Centre,
            Singapore&nbsp;049513
          </li>
          <li>
            Région d&apos;hébergement des données&nbsp;: AWS eu-west-1 (Dublin,
            Irlande — Union européenne)
          </li>
          <li>
            Site&nbsp;:{" "}
            <a href="https://supabase.com" target="_blank" rel="noopener noreferrer">
              supabase.com
            </a>
          </li>
        </ul>

        <h2>Propriété intellectuelle</h2>
        <p>
          La marque <strong>NITRELLO™</strong> a été déposée auprès de
          l&apos;Institut National de la Propriété Industrielle (INPI) sous le
          numéro <strong>5244582</strong>, le 03/04/2026. Elle est en cours
          d&apos;enregistrement.
        </p>
        <p>
          L&apos;ensemble des éléments du site nitrello.com (logo, identité
          graphique, textes, photographies, code source, structure, mise en
          page, éléments d&apos;interface) est la propriété exclusive de
          Nicolas Tinnirello, sauf mention contraire explicite. Toute
          reproduction, représentation, modification, publication, adaptation
          ou exploitation, totale ou partielle, par quelque procédé que ce
          soit, est strictement interdite sans autorisation écrite préalable
          de l&apos;éditeur.
        </p>
        <p>
          Toute exploitation non autorisée du site ou de l&apos;un quelconque
          des éléments qu&apos;il contient sera considérée comme constitutive
          d&apos;une contrefaçon et poursuivie conformément aux dispositions
          des articles L.335-2 et suivants du Code de la propriété
          intellectuelle.
        </p>

        <h2>Liens hypertextes</h2>
        <p>
          Le site nitrello.com peut contenir des liens vers des sites tiers
          (réseaux sociaux, prestataires, ressources). L&apos;éditeur
          n&apos;exerce aucun contrôle sur ces sites et décline toute
          responsabilité quant à leur contenu, leur politique de
          confidentialité ou leurs pratiques.
        </p>

        <h2>Droit applicable et juridiction</h2>
        <p>
          Les présentes mentions légales sont régies par le droit français.
          En cas de litige relatif à l&apos;utilisation du site nitrello.com
          ou à l&apos;interprétation des présentes, et à défaut de résolution
          amiable, les tribunaux français du ressort du domicile de Nicolas
          Tinnirello (Tribunal judiciaire de Grenoble) seront seuls
          compétents.
        </p>

        <h2>Contact</h2>
        <p>
          Pour toute question relative aux présentes mentions légales ou à
          l&apos;exercice de vos droits&nbsp;:
        </p>
        <ul>
          <li>
            Email&nbsp;:{" "}
            <a href="mailto:contact@nitrello.com">contact@nitrello.com</a>
          </li>
          <li>
            Téléphone&nbsp;:{" "}
            <a href="tel:+33688649584">06&nbsp;88&nbsp;64&nbsp;95&nbsp;84</a>
          </li>
          <li>
            Courrier&nbsp;: Nicolas Tinnirello — Nitrello, 36&nbsp;Impasse du
            Domaine du Mûrier, 38160 Saint-Sauveur, France
          </li>
        </ul>

        <hr />
        <p>
          <em>Dernière mise à jour&nbsp;: 16&nbsp;mai&nbsp;2026.</em>
        </p>
      </div>
    </main>
  );
}
