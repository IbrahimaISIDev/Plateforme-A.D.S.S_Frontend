# Plateforme A.D.S.S - Frontend

**Plateforme de Gestion des Affiliations et Licences Sportives** pour l'Association Disciples Shaolin Si Sénégal (A.D.S.S)

## 🚀 Technologies Modernes

- **React 19.2.4** avec TypeScript
- **Vite 8.0.1** pour un développement ultra-rapide
- **TailwindCSS 4.2.2** avec design system sophistiqué
- **shadcn/ui** pour des composants UI de qualité
- **Framer Motion** pour des animations fluides
- **Wouter** pour un routing léger
- **React Query** pour la gestion d'état serveur
- **React Hook Form + Zod** pour les formulaires

## 🎨 Design System "The Modern Disciplinarian"

Une approche éditoriale asymétrique avec une hiérarchie par surface plutôt que par bordures :

- **Palette Material 3-inspired** avec tons bleus sophistiqués
- **Typographie Inter + Geist Variable** pour une lisibilité optimale
- **Micro-interactions** et animations fluides
- **Design responsive** mobile-first

## 📁 Structure du Projet

```
client/src/
├── components/
│   ├── ui/              # Composants réutilisables (shadcn/ui + custom)
│   ├── DashboardLayout.tsx
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   └── Footer.tsx
├── pages/               # Pages principales
│   ├── AdminDashboard.tsx
│   ├── Contact.tsx
│   ├── DemandDetails.tsx
│   └── Home.tsx
├── views/               # Vues et formulaires
│   ├── LandingPage.tsx
│   ├── AffiliationForm.tsx
│   └── Landing/
├── contexts/            # Contextes React
│   └── AuthContext.tsx
├── hooks/               # Hooks personnalisés
│   ├── useAsyncState.ts
│   ├── useResponsive.ts
│   └── useCrudOperation.ts
├── lib/                 # Utilitaires
│   ├── trpc.ts
│   └── utils.ts
└── styles/              # Styles globaux
    └── index.css
```

## 🛠️ Nouveaux Composants & Fonctionnalités

### 🔄 Gestion d'État Avancée
- **useAsyncState** - Hook pour les opérations asynchrones avec retry automatique
- **useCrudOperation** - Hook pour les opérations CRUD avec état de chargement
- **useLoadingStates** - Gestion multi-états de chargement

### 📱 Responsive Design
- **useResponsiveLayout** - Hook pour le layout responsive
- **Sidebar mobile** avec overlay et animations
- **Grid responsives** adaptatives selon la taille d'écran

### ✨ Animations & Micro-interactions
- **FadeIn, ScaleIn, SlideIn** - Composants de transition réutilisables
- **StaggerChildren** - Animations séquentielles pour les listes
- **Hover animations** sur tous les éléments interactifs

### 🎯 Composants UI Améliorés
- **DataTable** - Tableau de données avec recherche, tri, pagination
- **SearchInput** - Champ de recherche avec clear button
- **AdvancedSearch** - Recherche avec filtres multiples
- **Notifications** - Système de notifications toast
- **Skeleton** - Loaders squelettes pour les états de chargement
- **Spinner** - Indicateurs de chargement variés
- **ErrorBoundary** - Gestion d'erreurs robuste avec fallback

### 🛡️ Gestion d'Erreurs
- **ErrorBoundary** au niveau de l'application
- **ApiError** component pour les erreurs réseau
- **useErrorHandler** hook pour la gestion d'erreurs
- **Retry automatique** avec backoff exponentiel

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+
- pnpm (recommandé)

### Installation
```bash
cd client
pnpm install
```

### Développement
```bash
pnpm dev
```

### Build
```bash
pnpm build
```

### Linter
```bash
pnpm lint
```

## 📊 Dashboard Admin

Le tableau de bord inclut :

- **Alertes intelligentes** avec états de chargement
- **Statistiques animées** avec trends
- **Graphiques mockés** (croissance, répartition revenus)
- **Paiements récents** avec status indicators
- **Actions rapides** (export, refresh)
- **Responsive complet** mobile/tablet/desktop

## 🎯 Utilisation des Hooks

### useAsyncState
```typescript
const { data, loading, error, retry } = useAsyncState(fetchData, {
  retryCount: 3,
  onSuccess: (data) => console.log('Success:', data),
  onError: (error) => console.error('Error:', error)
});
```

### useResponsiveLayout
```typescript
const { 
  isMobile, 
  isTablet, 
  isDesktop, 
  statsGridCols,
  sidebarCollapsed 
} = useResponsiveLayout();
```

### useToast
```typescript
const { success, error, warning, info } = useToast();

success('Opération réussie', 'Les données ont été sauvegardées');
error('Erreur réseau', 'Impossible de se connecter au serveur');
```

## 🎨 Thème & Personnalisation

Le thème utilise des variables CSS personnalisées :

```css
--color-surface: #f8f9ff
--color-primary-gradient-start: #0a1422
--color-secondary-blue: #0058be
--text-display-lg: 3.5rem
--shadow-ambient: 0 12px 32px -4px rgba(10, 20, 34, 0.08)
```

## 🔧 Configuration

### TailwindCSS
- Configuration personnalisée dans `vite.config.ts`
- Design system intégré
- Variables CSS pour la cohérence

### TypeScript
- Configuration stricte avec path aliases
- Types fortement typés
- Support complet des composants

### ESLint
- Configuration optimisée pour React + TypeScript
- Règles de qualité et de performance

## 📱 Responsive Breakpoints

- **sm**: 640px (mobile)
- **md**: 768px (tablet)
- **lg**: 1024px (desktop)
- **xl**: 1280px (large desktop)
- **2xl**: 1536px (extra large)

## 🔄 État Actuel & Prochaines Étapes

### ✅ Terminé
- Architecture frontend moderne
- Design system complet
- Dashboard admin avec animations
- Responsive design
- Gestion d'erreurs et états de chargement
- Composants réutilisables

### 🚧 En cours
- Connexion backend tRPC
- Authentification réelle
- Tests automatisés

### 📋 À venir
- Tests E2E (Playwright)
- PWA features
- Monitoring et analytics
- Internationalisation

## 📝 Documentation Complète

- [Cahier des charges](../ADSS_CAHIER_DES_CHARGES_COMPLET.md)
- [Guide architecture frontend](../ADSS_GUIDE_FRONTEND_ARCHITECTURE.md)
- [Design system](../DESIGN.md)
- [Audit complet du projet](../AUDIT_COMPLET_DU_PROJET.md)

---

**Développé avec ❤️ pour l'Association Disciples Shaolin Si Sénégal**
