# Quick Start Guide

Get the Pokemon Explorer app running in 2 minutes!

## Prerequisites
- Node.js 18+ installed
- Yarn installed

## Steps

1. Install dependencies:
```bash
yarn install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

3. Start the development server:
```bash
yarn dev
```

4. Open your browser to http://localhost:3000

That's it! You should see a grid of random Pokemon. Click any Pokemon to view its details.

## Features

- Pokemon grid loads with 6 random Pokemon
- Click "New Pokemon" button to load a new set
- Click a Pokemon card to navigate to its detail page
- View Pokemon details (description, gender, abilities, types)
- Click "Back to Home" to return to the grid
- Refresh the page to see new random Pokemon

## Architecture Highlights

- **Custom Hooks**: `usePokemonList` and `usePokemonDetail` for clean separation of concerns
- **Component Organization**: Components grouped by type (layout, pokemon)
- **API Client Layer**: Centralized configuration in `lib/api/client.ts`
- **TypeScript**: Full type safety with strict mode
- **Material-UI**: Custom Pokemon theme with brand colors, AppBar with logo
- **Testing**: Unit tests with 100% coverage on utility functions
- **Responsive**: Mobile-first design with MUI Grid system

## Available Commands

```bash
yarn dev              # Start development server
yarn build            # Build for production
yarn start            # Start production server
yarn test             # Run tests
yarn test:coverage    # Run tests with coverage report
yarn lint             # Check linting
yarn format           # Format code
```

## Key Files

- `src/hooks/usePokemonList.ts` - Custom hook for Pokemon grid
- `src/hooks/usePokemonDetail.ts` - Custom hook for Pokemon details
- `src/app/page.tsx` - Home page using custom hook
- `src/app/pokemon/[id]/page.tsx` - Dynamic Pokemon detail page
- `src/lib/api/client.ts` - Centralized API configuration
- `src/lib/api/pokemon.ts` - Pokemon API functions
- `src/components/layout/AppBar.tsx` - Navigation with Pokemon logo
- `src/components/pokemon/PokemonCard.tsx` - Reusable card component
- `src/theme/theme.ts` - Custom MUI theme
