# Starter Full Stack JS

Point de départ minimal pour les projets étudiants du module Full Stack JS.

## Prérequis

- Node.js 24 ;
- pnpm 10 ou plus récent.

## Installation

Depuis ce dossier :

```bash
pnpm install
```

## Démarrage

### Docker

Pour démarrer MongoDB et sa webui mongo-express, placez-vous dans le répertoire du repo, et démarrez la stack à l'aide de :

```bash
docker compose up


# Ou avec l'option detach pour libérer le terminal
docker compose up -d
```

Puis pour l'arrêter :

```bash
docker compose down

# Ou alors pour supprimer toutes les données de Mongo
docker compose down -v
```

mongo-express est accessible à l'adresse [http://localhost:3000](http://localhost:3000)

### Applications

```bash
pnpm dev
```

Cette commande démarre le frontend Vite et le backend Express simultanément.

- Frontend : http://localhost:5173
- API santé : http://localhost:3000/api/health
- Documentation Swagger : http://localhost:3000/api/docs
- Spécification OpenAPI : http://localhost:3000/api/openapi.json
- API santé via le proxy Vite : http://localhost:5173/api/health

Autres commandes :

```bash
pnpm build
pnpm start
pnpm test
```

`pnpm build` construit le frontend. `pnpm start` démarre uniquement le backend en mode production locale. `pnpm test` lance les tests backend.

## Documentation de l'API

La documentation interactive Swagger UI est disponible sur
[http://localhost:3000/api/docs](http://localhost:3000/api/docs) lorsque le backend est démarré.
La spécification OpenAPI JSON est exposée sur
[http://localhost:3000/api/openapi.json](http://localhost:3000/api/openapi.json).

Pour essayer les routes protégées dans Swagger UI :

1. appeler `POST /api/auth/register` ou `POST /api/auth/login` ;
2. copier la valeur `token` renvoyée par la connexion ;
3. cliquer sur **Authorize** et saisir le jeton (sans ajouter manuellement `Bearer`) ;
4. appeler les routes `Tasks` ou `Users`.

Le jeton JWT est requis pour les routes de tâches et `GET /api/users/me`. Les données envoyées
aux routes sont validées par les schémas partagés du dossier `schemas/`.

## Structure

```text
apps/
  frontend/   application React avec Vite
  backend/    serveur Express
    src/app.js  création de l'application et route health
    src/server.js démarrage du serveur
```

## Proxy Vite

En développement, une requête frontend vers `/api/...` est transmise automatiquement à Express sur `http://localhost:3000`. Les composants React peuvent donc appeler `/api/health` sans coder l'adresse du backend.

## À développer pendant le cours

Ce starter ne contient volontairement pas :

- API métier et routes CRUD ;
- MongoDB et modèles de données ;
- authentification et autorisation ;
- validation ;
- tests de votre application métier ;
- documentation de votre application.

Vous concevrez ces éléments pour TaskFlow, HabitLab ou BudgetFlow.
