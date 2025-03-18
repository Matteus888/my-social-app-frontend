# My Social App - Frontend

Bienvenue dans le repository frontend de **My Social App**, une application sociale moderne offrant des fonctionnalités similaires à Facebook : gestion des amis, follow/unfollow, messagerie et personnalisation de sa page personnelle.

## Aperçu des pages

Voici un aperçu de la page Home :
![Home](/public/Home.png)

Voici un aperçu de la page Products :
![Products](/public/Profile.png)

## Prérequis

Avant de commencer, assurez-vous d'avoir les outils suivants installés :

- [Node.js](https://nodejs.org/) (version recommandée : 18.x)
- [yarn](https://yarnpkg.com/)

## Installation

1. Clonez ce repository :
   ```bash
   git clone https://github.com/votre-utilisateur/my-social-app-frontend.git
   ```
2. Accédez au dossier du projet :
   ```bash
   cd my-social-app-frontend
   ```
3. Installez les dépendances :
   ```bash
   yarn install
   ```

## Configuration

Créez un fichier `.env` à la racine du projet et ajoutez-y les variables d'environnement nécessaires. Exemple :

```
NEXT_PUBLIC_API_URL=https://votre-api.com
NEXT_PUBLIC_SOCKET_URL=https://votre-socket.com
```

## Scripts disponibles

- **Démarrage du serveur de développement** :
  ```bash
  yarn dev
  ```
- **Build de l'application pour la production** :
  ```bash
  yarn build
  ```
- **Démarrage du serveur en mode production** :
  ```bash
  yarn start
  ```
- **Lint du projet** :
  ```bash
  yarn lint
  ```

## Structure du projet

```
/src
  /app
    page.jsx
    layout.jsx
    /login
    /register
    /profile
      /[id]
  /components
  /contexts
  /store
  /style
```

## Fonctionnalités principales

- Gestion des utilisateurs : ajout/suppression d'amis, follow/unfollow
- Système de messagerie instantanée
- Personnalisation du profil utilisateur
- Infinite scroll pour une expérience fluide
- Interface moderne avec des icônes Font Awesome

## Améliorations futures

- Mise en place de tests unitaires et d'intégration
- Optimisation des performances via le caching
- Rendre le site responsive

## Contribution

Les contributions sont les bienvenues ! Pour proposer une amélioration ou corriger un bug :

1. Forkez le projet.
2. Créez une nouvelle branche :
   ```bash
   git checkout -b feature/nouvelle-fonctionnalite
   ```
3. Commitez vos changements :
   ```bash
   git commit -m "Ajout de la nouvelle fonctionnalité"
   ```
4. Poussez vos changements :
   ```bash
   git push origin feature/nouvelle-fonctionnalite
   ```
5. Ouvrez une pull request.
