export interface Game {
  id: string
  title: string
  description: string
  type: GameType
  difficulty: 'easy' | 'medium' | 'hard'
  requiredModules: string[] // IDs of modules that should be completed before playing
}

export type GameType = 'quiz' | 'simulation' | 'puzzle' | 'adventure'

export const games: Game[] = [
  {
    id: 'budget-hero',
    title: 'Budget Hero',
    description: 'Make smart budgeting decisions to achieve your financial goals',
    type: 'simulation',
    difficulty: 'easy',
    requiredModules: ['basics']
  },
  {
    id: 'market-master',
    title: 'Market Master',
    description: 'Learn investment basics through a simulated stock market',
    type: 'simulation',
    difficulty: 'medium',
    requiredModules: ['basics', 'investing']
  },
  {
    id: 'money-maze',
    title: 'Money Maze',
    description: 'Navigate through financial decisions in this adventure game',
    type: 'adventure',
    difficulty: 'easy',
    requiredModules: ['basics']
  },
  {
    id: 'savings-quest',
    title: 'Savings Quest',
    description: 'Complete challenges to learn saving strategies',
    type: 'puzzle',
    difficulty: 'easy',
    requiredModules: ['basics']
  }
]

export interface GameState {
  userId: string
  gameId: string
  progress: number // 0-100
  score: number
  lastPlayed: Date
  completed: boolean
} 