# TaskFlow

App de gestion de tâches, powered by:

- React + Vite;
- Express;
- MongoDB;

## Prérequis

- Node.js 24 ou ultérieur;
- pnpm 12 ou ultérieur;
- Docker + Docker Compose.

## Installation

Depuis la racine du projet :

```bash
pnpm install
cp apps/backend/.env.example apps/backend/.env
```

Modifiez `apps/backend/.env` si nécessaire. Ne partagez jamais la valeur de
`JWT_SECRET`.

## Lancer le projet

1. Démarrer MongoDB :

   ```bash
   docker compose up -d
   ```

2. Démarrer le frontend et le backend :

   ```bash
   pnpm run dev
   ```

   Le frontend est disponible sur <http://localhost:5173>.
   L'API est disponible sur <http://localhost:3000>.

Pour démarrer MongoDB et l'application en une seule commande :

```bash
pnpm dev:full
```

Pour arrêter les conteneurs :

```bash
docker compose down
```

Pour supprimer aussi les données MongoDB :

```bash
docker compose down -v
```

## Liens utiles

- Application : <http://localhost:5173>
- API : <http://localhost:3000>
- Documentation Swagger : <http://localhost:3000/api/docs>
- Spécification OpenAPI : <http://localhost:3000/api/openapi.json>
- Mongo Express : <http://localhost:3001>

## Tester l'API

Dans Swagger :

1. appelez `POST /api/auth/register` ou `POST /api/auth/login` ;
2. copiez la valeur `token` de la réponse ;
3. cliquez sur **Authorize** ;
4. collez le jeton, sans écrire `Bearer` ;
5. testez les routes `Tasks` ou `Users`.

Les routes de tâches et `GET /api/users/me` nécessitent un jeton JWT.

## Commandes

```bash
pnpm dev       # frontend et backend en mode développement
pnpm build     # construit le frontend
pnpm start     # démarre uniquement le backend
pnpm test      # lance les tests du backend
pnpm check     # vérifie le code et le formatage
pnpm check:fix # corrige le code et le formatage
```

## Structure

```text
apps/
  frontend/  application React
  backend/   serveur Express et API
schemas/     schémas de validation partagés
compose.yaml services MongoDB et Mongo Express
```

En développement, Vite redirige automatiquement les requêtes `/api/...` vers
le backend sur `http://localhost:3000`.
