export const levels = [
  { id: 1, title: "Money Rookie", xpNeeded: 0 },
  { id: 2, title: "Budget Beginner", xpNeeded: 100 },
  { id: 3, title: "Savings Star", xpNeeded: 300 },
  { id: 4, title: "Investment Intern", xpNeeded: 600 },
  { id: 5, title: "Finance Pro", xpNeeded: 1000 },
  { id: 6, title: "Money Master", xpNeeded: 1500 }
]

export const achievements = {
  budgeting: [
    {
      id: "first_budget",
      title: "First Steps",
      description: "Create your first budget",
      xp: 50,
      icon: "🎯"
    },
    {
      id: "saving_star",
      title: "Saving Star",
      description: "Save 20% of income for 3 consecutive months",
      xp: 100,
      icon: "⭐"
    },
    {
      id: "expense_master",
      title: "Expense Master",
      description: "Track all expenses for a full month",
      xp: 75,
      icon: "📊"
    }
  ],
  investing: [
    {
      id: "first_investment",
      title: "Baby Investor",
      description: "Make your first investment",
      xp: 50,
      icon: "🌱"
    },
    {
      id: "compound_master",
      title: "Compound Master",
      description: "Understand compound interest through simulation",
      xp: 100,
      icon: "📈"
    }
  ],
  learning: [
    {
      id: "knowledge_seeker",
      title: "Knowledge Seeker",
      description: "Complete 5 financial lessons",
      xp: 150,
      icon: "📚"
    },
    {
      id: "quiz_champion",
      title: "Quiz Champion",
      description: "Score 100% on 3 financial quizzes",
      xp: 200,
      icon: "🏆"
    }
  ]
}

export const financialTips = [
  {
    id: 1,
    title: "50/30/20 Rule",
    description: "Allocate 50% of income to needs, 30% to wants, and 20% to savings",
    icon: "💡"
  },
  {
    id: 2,
    title: "Emergency Fund",
    description: "Save 3-6 months of expenses for emergencies",
    icon: "🚨"
  },
  {
    id: 3,
    title: "Compound Interest",
    description: "Start saving early to benefit from compound interest",
    icon: "🔄"
  }
]

export const learningModules = [
  {
    id: "basics",
    title: "Financial Basics",
    lessons: [
      {
        id: "income",
        title: "Understanding Income",
        content: "Learn about different types of income and how to manage it",
        quiz: [
          {
            question: "What is gross income?",
            options: [
              "Money after taxes",
              "Total money before deductions",
              "Monthly savings",
              "Weekly allowance"
            ],
            correct: 1
          }
        ]
      },
      {
        id: "budgeting",
        title: "Budgeting 101",
        content: "Master the basics of creating and sticking to a budget",
        quiz: [
          {
            question: "What percentage of income should go to needs?",
            options: ["30%", "40%", "50%", "60%"],
            correct: 2
          }
        ]
      }
    ]
  },
  {
    id: "investing",
    title: "Investment Basics",
    lessons: [
      {
        id: "compound",
        title: "Power of Compound Interest",
        content: "Discover how your money can grow over time",
        quiz: [
          {
            question: "What makes compound interest powerful?",
            options: [
              "Quick returns",
              "Interest on interest",
              "Low risk",
              "High initial investment"
            ],
            correct: 1
          }
        ]
      }
    ]
  }
]

export const scenarios = [
  {
    id: "first_job",
    title: "First Job Challenge",
    description: "You just got your first job! Learn to manage your first paycheck",
    initialMoney: 2000,
    monthlyIncome: 3000,
    expenses: [
      { id: "rent", name: "Rent", min: 800, recommended: 1000 },
      { id: "food", name: "Food", min: 200, recommended: 400 },
      { id: "transport", name: "Transportation", min: 100, recommended: 150 }
    ],
    goals: [
      { id: "emergency", description: "Save $1000 for emergency fund", amount: 1000 },
      { id: "student_loan", description: "Pay $300 towards student loans", amount: 300 }
    ]
  },
  {
    id: "college_budget",
    title: "College Budget Challenge",
    description: "Manage your money during college semester",
    initialMoney: 1500,
    monthlyIncome: 800,
    expenses: [
      { id: "books", name: "Textbooks", min: 200, recommended: 300 },
      { id: "food", name: "Meal Plan", min: 300, recommended: 400 },
      { id: "fun", name: "Entertainment", min: 0, recommended: 100 }
    ],
    goals: [
      { id: "savings", description: "Save $500 for next semester", amount: 500 },
      { id: "emergency", description: "Keep $200 for emergencies", amount: 200 }
    ]
  }
]

export type GameProgress = {
  level: number
  xp: number
  achievements: string[]
  completedLessons: string[]
  completedScenarios: string[]
} 