# Pokemon Explorer

A modern, responsive Pokemon exploration app built with Next.js, TypeScript, and Material-UI. Browse random Pokemon and view detailed information about each one.

## Features

- Random Pokemon grid display with images and names
- Detailed Pokemon information pages
- Responsive design for mobile and desktop
- Custom Pokemon-themed Material-UI design
- Server-side API integration with PokeAPI
- Unit tested utility functions
- Type-safe with TypeScript

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI) v6
- **API**: PokeAPI (https://pokeapi.co/)
- **Testing**: Jest + React Testing Library
- **Code Quality**: ESLint, Prettier

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pokemon
```

2. Install dependencies:
```bash
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

The app will work with default values. Modify `.env.local` if you need custom API endpoints.

### Running the Application

#### Development Mode

Start the development server:
```bash
yarn dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

#### Production Build

Build and start the production server:
```bash
yarn build
yarn start
```

### Testing

Run the test suite:
```bash
yarn test
```

Run tests in watch mode:
```bash
yarn test:watch
```

Run tests with coverage:
```bash
yarn test:coverage
```

### Code Quality

Format code with Prettier:
```bash
yarn format
```

Run ESLint:
```bash
yarn lint
```

## Project Structure

```
pokemon/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── pokemon/
│   │   │       └── route.ts          # API endpoint for random Pokemon
│   │   ├── pokemon/
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Pokemon detail page
│   │   ├── layout.tsx                # Root layout with AppBar
│   │   └── page.tsx                  # Home page with Pokemon grid
│   ├── components/
│   │   ├── layout/                   # Layout components
│   │   │   ├── AppBar.tsx            # Navigation bar with logo
│   │   │   └── ThemeProvider.tsx     # MUI theme provider wrapper
│   │   └── pokemon/                  # Pokemon feature components
│   │       └── PokemonCard.tsx       # Pokemon card component
│   ├── hooks/                        # Custom React hooks
│   │   ├── usePokemonDetail.ts       # Hook for fetching Pokemon details
│   │   └── usePokemonList.ts         # Hook for fetching Pokemon list
│   ├── lib/
│   │   ├── api/                      # API integration layer
│   │   │   ├── client.ts             # API configuration
│   │   │   └── pokemon.ts            # Pokemon API functions
│   │   ├── pokemonApi.ts             # Re-exports for compatibility
│   │   └── pokemonApi.test.ts        # API utility tests
│   ├── theme/
│   │   └── theme.ts                  # Custom MUI Pokemon theme
│   └── types/
│       └── pokemon.ts                # TypeScript type definitions
├── public/
│   └── assets/
│       └── images/
│           └── pokemon-logo.svg      # Pokemon logo
├── .env.example                      # Environment variables template
├── jest.config.js                    # Jest configuration
├── jest.setup.ts                     # Jest setup file
├── next.config.ts                    # Next.js configuration
├── tsconfig.json                     # TypeScript configuration
└── package.json                      # Project dependencies
```

## How It Works

### Home Page
- Displays a grid of 6 random Pokemon on each page load
- Click the "New Pokemon" button to fetch a new random set
- Each Pokemon card shows its image, name, and National Dex number
- Click any Pokemon card to view its details
- Uses `usePokemonList` custom hook for data fetching

### Pokemon Detail Page
- Shows the Pokemon's official artwork
- Displays detailed information:
  - Description/flavor text
  - Gender distribution
  - Types (with color-coded chips)
  - Abilities
  - Height and weight
- Navigate back to the home page with the back button
- Uses `usePokemonDetail` custom hook for data fetching

### Architecture Highlights
- **Custom Hooks Pattern**: Data fetching logic separated into reusable hooks
  - `usePokemonList` - Manages Pokemon grid state and fetching
  - `usePokemonDetail` - Manages individual Pokemon details
- **API Client Layer**: Centralized API configuration in `lib/api/client.ts`
- **Component Organization**: Components grouped by type (layout, pokemon)
- **Environment Configuration**: API endpoints configurable via environment variables
- **Type Safety**: Full TypeScript coverage with strict mode

### API Design
- Uses Next.js API routes to proxy requests to PokeAPI for the home page
- Detail page fetches directly from PokeAPI for optimal performance
- Generates random Pokemon IDs on each request
- Returns simplified Pokemon data optimized for the UI
- Error handling for failed API requests
- Configurable via environment variables

## Design Decisions

### Why Material-UI?
- Provides a comprehensive component library
- Easy theming and customization
- Built-in responsive design patterns
- Excellent TypeScript support

### Custom Theme
- Primary color: Pokemon Yellow (#FFCB05)
- Secondary color: Pokemon Blue (#2A75BB)
- Rounded corners and hover effects for a modern feel
- Typography emphasizes readability

### Testing Strategy
- Focus on complex business logic and utility functions
- Test edge cases in data transformations
- Mock external API calls for predictable tests
- Follow AAA (Arrange, Act, Assert) pattern

## Browser Support

This application supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for educational and interview purposes.

## API Attribution

This application uses the [PokeAPI](https://pokeapi.co/), a free and open Pokemon API.
