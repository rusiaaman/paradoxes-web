# Paradoxes Web - Context

## Project Overview
This is an interactive web application demonstrating probability paradoxes, starting with the famous Monty Hall Problem. The project uses React with Vite and features modern animations, 3D effects, and interactive elements.

## Current Implementation

### Monty Hall Problem Demo
- Interactive game with 3D animated doors
- Uses React Spring for smooth animations
- Features confetti celebration on winning
- Includes detailed probability explanation
- Full responsive design with Tailwind CSS

### Technical Stack
- React 18+ with Vite
- Tailwind CSS for styling
- React Spring for animations
- React Confetti for win celebration
- Structured with modern React practices (hooks, components)

### Key Components
1. `IntroScreen`: Welcome screen with fade-in animation
2. `Door3`: Main door component with 3D transforms
3. `GameScene`: Game logic and layout manager
4. `Explanation`: Post-game explanation with confetti

### Game Flow
1. User sees welcome screen
2. Three doors are presented
3. User selects a door
4. Monty opens a door with a goat
5. User decides to switch or stay
6. Final reveal with all doors opening
7. Explanation of probability shown

### Current Features
- 3D door animations
- Interactive door selection
- Proper game logic implementation
- Confetti on winning
- Responsive design
- Sound effects support (not implemented)

### Directory Structure
```
monty-hall/
├── src/
│   ├── components/
│   │   ├── Door3.jsx (main door component)
│   │   ├── IntroScreen.jsx
│   │   ├── GameScene.jsx
│   │   └── Explanation.jsx
│   ├── hooks/
│   │   └── useSound.js
│   └── utils/
│       └── game-logic.js
```

## Planned Features
1. Sound effects implementation
2. Additional probability paradoxes
3. Statistics tracking
4. More detailed animations
5. Narration support

## Development Notes
- All components use Tailwind CSS for styling
- 3D transforms are handled via React Spring
- Game logic is separated into utility functions
- Components are designed to be reusable

## Recent Changes
- Fixed 3D door positioning
- Added confetti on winning
- Implemented proper door reveal sequence
- Enhanced visual feedback

## Issues & Solutions
1. Door content positioning: Fixed with proper 3D transforms
2. Animation timing: Adjusted for better user experience
3. Content reveal: Implemented proper layering

## Future Development
The project is designed to be extended with more paradoxes and interactive demonstrations of probability concepts.

### Next Steps
1. Implement sound effects
2. Add more paradoxes
3. Enhance visual feedback
4. Add user statistics
5. Implement tutorial mode

## Getting Started
To run the project:
```bash
cd monty-hall
npm install
npm run dev
```

Visit http://localhost:5173 to view the application.