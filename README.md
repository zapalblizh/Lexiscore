# Lexiscore

A companion for your scrabble games that helps you keep track of your scores and game board. Built with React, Vite, and TailwindCSS.

## Features
- **Interactive Scrabble Board**: 15x15 grid with multiplier squares (Double/Triple Letter & Double/Triple Word)
- **Players**: Minimum of two players, maximum of four players
- **Score Tracking**: Automatic score calculation based on word and placement of word on the board
- **Leaderboard**: Player ranking based on scores
- **Word Validation**: Built-in dictionary verification using a TWL (Tournament Word List)

## Tech Stack
- **Frontend**: React 19.1
- **Build Tool**: Vite 7.1
- **Styling**: TailwindCSS 4.1
- **Deployment**: Netlify

## Getting Started

### Installation
```bash
# Clone the repository
git clone git@github.com:zapalblizh/Lexiscore.git

# Navigate to project directory
cd Lexiscore

# Install dependencies
npm install
```

### Development
```bash
# Start development server
npm run dev

# Test build
npm run build
npm run preview

# Build for production (Netlify)
netlify build
```

## Project Structure
- **src**: Has all the source code for the application.
  - **assets**: Contains CSS, JS, and JSX files.
    - **js/components**: Contains all react components. GameContext, which contains all state management of the SPA.
    - **js/functions**: Contains all game logic utilities, such as functions for calculating word score or updating grid on rerendering after state update.
    - **js/GameContext.jsx**: Holds all state management and initialization logic for the application.
    - **js/App.jsx**: App component that renders all other components.
    - **js/index.jsx**: App entry point.
- **public**: Contains static assets such as images and TWL dictionary.
- **index.html**: HTML entry point.

## License

MIT License. See [LICENSE](https://github.com/zapalblizh/Lexiscore?tab=MIT-1-ov-file) for details.

## Author

**Aleksandr Zapparov**
- Email: alexander@zapparov.dev
- Website: [zapparov.dev](https://zapparov.dev)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.