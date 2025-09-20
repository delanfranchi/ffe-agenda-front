# Chess Agenda Webcomponent

Webcomponent Lit pour afficher l'agenda des tournois d'échecs de la FFE.

## 🚀 Développement

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Le webcomponent sera disponible sur http://localhost:3013
```

## 🏗️ Build

```bash
# Construire le webcomponent
npm run build

# Le fichier sera généré dans dist/chess-agenda.js
```

## 🎯 Utilisation

### En développement
```html
<script type="module" src="http://localhost:3013/src/chess-agenda.ts"></script>
<chess-agenda 
  departements="[37,41,36]" 
  club="Echiquier Tourangeau"
  limit="5"
  apiBaseUrl="http://localhost:3012">
</chess-agenda>
```

### En production
```html
<script type="module" src="https://votre-domaine.com/chess-agenda.js"></script>
<chess-agenda 
  departements="[37,41,36]" 
  club="Echiquier Tourangeau"
  limit="5"
  apiBaseUrl="https://api.votre-domaine.com">
</chess-agenda>
```

## 📋 Attributs

- `departements` : Array de numéros de départements (requis) - format JSON: [37,41,36]
- `club` : Nom du club à mettre en valeur (optionnel)
- `limit` : Nombre maximum de tournois à afficher (défaut: 10)
- `showOnlyClub` : Afficher seulement les tournois avec des joueurs du club (défaut: false)
- `apiBaseUrl` : URL de base de l'API backend (défaut: http://localhost:3012)

## 🔧 API Backend

Le webcomponent utilise l'API `/api/agenda` avec le format REST standard :
- `department[]=37&department[]=41&department[]=36` pour les départements
- `next=true` pour filtrer les événements à venir (inclut les événements du jour)

## 🔗 Types partagés

Les types sont partagés avec le backend via le lien symbolique `_types -> ../_types`.
