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
    options: [
      {
        text: "Spend most of your paycheck on wants and save little",
        impact: {
          savings: -500,
          debt: 0,
          income: 0,
          health: -10,
          happiness: 10,
          risk: 20,
          xp: 20
        },
        feedback: "While it's tempting to spend on wants, saving less now means less financial security later."
      },
      {
        text: "Follow the 50/30/20 rule strictly",
        impact: {
          savings: 600,
          debt: 0,
          income: 0,
          health: 10,
          happiness: 5,
          risk: -10,
          xp: 50
        },
        feedback: "Excellent choice! Following the 50/30/20 rule helps you balance needs, wants, and savings."
      },
      {
        text: "Save everything and spend nothing",
        impact: {
          savings: 900,
          debt: 0,
          income: 0,
          health: -5,
          happiness: -10,
          risk: -5,
          xp: 30
        },
        feedback: "While saving is important, completely avoiding spending can impact your well-being. Balance is key!"
      }
    ]
  },
  {
    id: "college_budget",
    title: "College Budget Challenge",
    description: "Manage your money during college semester",
    options: [
      {
        text: "Buy all new textbooks and eat out frequently",
        impact: {
          savings: -800,
          debt: 400,
          income: 0,
          health: -5,
          happiness: 10,
          risk: 15,
          xp: 20
        },
        feedback: "New textbooks and frequent dining out can quickly drain your budget. Consider alternatives like used books and meal planning."
      },
      {
        text: "Use library books and cook meals",
        impact: {
          savings: 400,
          debt: 0,
          income: 0,
          health: 10,
          happiness: -5,
          risk: -10,
          xp: 50
        },
        feedback: "Smart choices! Using library resources and cooking meals helps you save money while maintaining good health."
      },
      {
        text: "Mix of new and used resources",
        impact: {
          savings: 200,
          debt: 0,
          income: 0,
          health: 5,
          happiness: 5,
          risk: -5,
          xp: 40
        },
        feedback: "A balanced approach! Mixing new and used resources helps you save while maintaining comfort."
      }
    ]
  },
  {
    id: "credit-card-management",
    title: "Credit Card Management",
    description: "You've received your first credit card with a $1,000 limit. You need to make some essential purchases and want to manage your credit responsibly.",
    options: [
      {
        text: "Use the card for all purchases and pay minimum balance",
        impact: {
          savings: -200,
          debt: 800,
          income: 0,
          health: -10,
          happiness: -10,
          risk: 20,
          xp: 20
        },
        feedback: "Using only minimum payments leads to high interest charges and growing debt. This is not a sustainable approach."
      },
      {
        text: "Use card for emergencies only and pay full balance",
        impact: {
          savings: 100,
          debt: 0,
          income: 0,
          health: 10,
          happiness: 10,
          risk: -10,
          xp: 50
        },
        feedback: "Smart choice! Using credit cards only for emergencies and paying in full helps build good credit without accumulating debt."
      },
      {
        text: "Use 30% of limit and pay full balance monthly",
        impact: {
          savings: 50,
          debt: 0,
          income: 0,
          health: 5,
          happiness: 5,
          risk: -5,
          xp: 40
        },
        feedback: "Good approach! Using less than 30% of your credit limit and paying in full shows responsible credit management."
      }
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