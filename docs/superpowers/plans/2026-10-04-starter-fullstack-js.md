# Plan d'implementation : starter Full Stack JS

> **Pour les agents :** appliquer les taches dans l'ordre, avec tests avant code.

**Objectif :** livrer un starter React/Vite et Express minimal, pret pour les projets etudiants.

**Architecture :** deux applications npm independantes. Le backend expose le seul contrat HTTP ; le frontend l'atteint via un proxy Vite. Les scripts racine coordonnent sans ajouter de logique metier.

**Pile :** Node.js 20+, pnpm 10+, React 19, Vite 7, Express 5, dotenv 16, supertest 7.

**Specification :** `docs/superpowers/specs/2026-10-04-starter-fullstack-js-design.md`

## Contraintes globales

- JavaScript, CSS simple et documentation en francais.
- Aucune fonctionnalite metier, base MongoDB, authentification, routeur, UI library, Docker ou CI/CD.
- Backend sur `PORT` ou 3000 ; frontend Vite sur 5173.
- Seule route backend : `GET /api/health`, code 200 et `{ status: 'ok' }`.

## Points de revue

- L'import de `app.js` ne doit pas ouvrir de port.
- La valeur `PORT` de l'environnement doit remplacer le port par defaut.
- Le proxy doit transmettre `/api/health` au backend sans URL backend cote React.
- Les scripts doivent fonctionner depuis la racine apres une seule installation.
- Aucun fichier d'environnement reel ni secret ne doit etre suivi.

---

### Tache 1 : socle npm et hygiene du depot

**Fichiers :**
- Creer : `package.json`, `pnpm-workspace.yaml`, `.gitignore`, `apps/backend/.env.example`, `apps/frontend/package.json`, `apps/backend/package.json`.

**Produit :** scripts racine `install`, `dev`, `build`, `start`; scripts locaux `dev`, `build` et `start` appropries.

- [ ] Declarer le workspace pnpm `apps/*` et le script racine utilisant `pnpm --parallel`.
- [ ] Declarer Vite/React cote frontend et Express/dotenv cote backend.
- [ ] Ajouter les exclusions Node.js, Vite et environnement ; ajouter uniquement `PORT=3000` dans l'exemple.
- [ ] Verifier `pnpm install` depuis la racine.

### Tache 2 : contrat de sante Express (TDD)

**Fichiers :**
- Creer : `apps/backend/test/app.test.js`, `apps/backend/src/app.js`, `apps/backend/src/server.js`.
- Modifier : `apps/backend/package.json`.

**Produit :** `app` Express importable et serveur executable separement.

- [ ] Ecrire `GET /api/health retourne 200 et status ok` avec supertest, sur l'application importee.
- [ ] Lancer `pnpm --filter backend test` et constater l'echec attendu car l'application manque.
- [ ] Implementer `app.js` avec `express.json()` et la route unique ; implementer `server.js` qui charge dotenv et appelle `app.listen(process.env.PORT || 3000)`.
- [ ] Relancer le test cible et verifier son succes.

### Tache 3 : interface React minimale

**Fichiers :**
- Creer : `apps/frontend/index.html`, `apps/frontend/src/main.jsx`, `apps/frontend/src/App.jsx`, `apps/frontend/src/index.css`, `apps/frontend/src/components/Layout.jsx`, `apps/frontend/src/components/Header.jsx`, `apps/frontend/src/components/Footer.jsx`, `apps/frontend/src/pages/Home.jsx`, `apps/frontend/vite.config.js`.

**Produit :** page responsive, sans navigation ni donnees metier.

- [ ] Creer les composants affichant l'en-tete, le contenu et le pied de page ; Home affiche exactement le titre demande et un court message de bienvenue.
- [ ] Ajouter un style CSS responsive, simple et modifiable.
- [ ] Configurer le proxy Vite `/api` vers `http://localhost:3000`.
- [ ] Lancer `pnpm --filter frontend build` et verifier que la compilation reussit.

### Tache 4 : guide et recette complete

**Fichiers :**
- Creer : `README.md`.

**Produit :** guide francais exact et concis pour les etudiants.

- [ ] Documenter prerequis, installation, scripts, ports, URLs, arborescence et proxy.
- [ ] Lister explicitement les elements volontairement absents et a developper par les etudiants.
- [ ] Executer le test backend cible puis la suite disponible.
- [ ] Demarrer backend et frontend ; verifier `http://localhost:3000/api/health` puis `http://localhost:5173/api/health`.
- [ ] Verifier une derniere fois le build frontend et l'absence de secret dans les fichiers crees.
