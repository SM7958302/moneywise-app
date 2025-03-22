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
          savings: -800,
          debt: 200,
          income: 0,
          health: -15,
          happiness: 15,
          risk: 25,
          xp: 15
        },
        feedback: "While it's tempting to spend on wants, saving less now means less financial security later. Consider setting aside some money for emergencies."
      },
      {
        text: "Follow the 50/30/20 rule strictly",
        impact: {
          savings: 1000,
          debt: 0,
          income: 0,
          health: 15,
          happiness: 10,
          risk: -15,
          xp: 60
        },
        feedback: "Excellent choice! Following the 50/30/20 rule helps you balance needs, wants, and savings. This is a sustainable approach to money management."
      },
      {
        text: "Save everything and spend nothing",
        impact: {
          savings: 1500,
          debt: 0,
          income: 0,
          health: -10,
          happiness: -15,
          risk: -10,
          xp: 35
        },
        feedback: "While saving is important, completely avoiding spending can impact your well-being. Remember to find a balance between saving and enjoying life."
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
          savings: -1200,
          debt: 600,
          income: 0,
          health: -10,
          happiness: 15,
          risk: 20,
          xp: 15
        },
        feedback: "New textbooks and frequent dining out can quickly drain your budget. Consider alternatives like used books, meal planning, and student discounts."
      },
      {
        text: "Use library books and cook meals",
        impact: {
          savings: 800,
          debt: 0,
          income: 0,
          health: 15,
          happiness: -10,
          risk: -15,
          xp: 60
        },
        feedback: "Smart choices! Using library resources and cooking meals helps you save money while maintaining good health. This is a great way to build financial discipline."
      },
      {
        text: "Mix of new and used resources",
        impact: {
          savings: 400,
          debt: 0,
          income: 0,
          health: 10,
          happiness: 10,
          risk: -5,
          xp: 45
        },
        feedback: "A balanced approach! Mixing new and used resources helps you save while maintaining comfort. This shows good decision-making skills."
      }
    ]
  },
  {
    id: "credit_card",
    title: "Credit Card Management",
    description: "You have a credit card with a $5,000 limit. How will you use it?",
    options: [
      {
        text: "Max out the card",
        impact: {
          savings: 0,
          debt: 5000,
          income: 0,
          discipline: -30,
          risk: 40,
          xp: 10
        },
        feedback: "Maxing out your credit card can lead to high interest charges and damage your credit score. Always keep your credit utilization low.",
        miniGame: {
          type: "budget_planner" as const,
          bonus: 5
        }
      },
      {
        text: "Use for emergencies only",
        impact: {
          savings: 0,
          debt: 0,
          income: 0,
          discipline: 20,
          risk: -10,
          xp: 40
        },
        feedback: "Smart approach! Using credit cards only for emergencies helps you maintain good financial health.",
        miniGame: {
          type: "budget_planner" as const,
          bonus: 20
        }
      },
      {
        text: "Use for daily expenses",
        impact: {
          savings: 0,
          debt: 2000,
          income: 0,
          discipline: -10,
          risk: 20,
          xp: 20
        },
        feedback: "While using credit cards for daily expenses can be convenient, make sure to pay off the balance in full each month.",
        miniGame: {
          type: "budget_planner" as const,
          bonus: 10
        }
      }
    ]
  },
  {
    id: "investment_opportunity",
    title: "Investment Opportunity",
    description: "You've saved some money and have an opportunity to invest. How will you approach this decision?",
    options: [
      {
        text: "Invest everything in a high-risk stock",
        impact: {
          savings: -2000,
          debt: 0,
          income: 500,
          health: -10,
          happiness: 10,
          risk: 30,
          xp: 25
        },
        feedback: "High-risk investments can lead to high returns, but they're also very volatile. It's important to diversify your investments and not put all your eggs in one basket."
      },
      {
        text: "Create a diversified portfolio",
        impact: {
          savings: -1500,
          debt: 0,
          income: 300,
          health: 10,
          happiness: 5,
          risk: -10,
          xp: 60
        },
        feedback: "Excellent choice! A diversified portfolio helps spread risk and is a more sustainable approach to investing. This is a key principle of smart investing."
      },
      {
        text: "Keep money in savings account only",
        impact: {
          savings: 100,
          debt: 0,
          income: 50,
          health: 5,
          happiness: 5,
          risk: -5,
          xp: 35
        },
        feedback: "While keeping money in savings is safe, you might miss out on potential growth. Consider learning more about different investment options to make informed decisions."
      }
    ]
  },
  {
    id: "emergency_fund",
    title: "Emergency Fund Challenge",
    description: "You've been saving for an emergency fund, but an unexpected expense has come up. How will you handle it?",
    options: [
      {
        text: "Use emergency fund and stop saving",
        impact: {
          savings: -1000,
          debt: 0,
          income: 0,
          health: 10,
          happiness: 5,
          risk: 20,
          xp: 25
        },
        feedback: "While using your emergency fund is appropriate for emergencies, stopping your savings habit could leave you vulnerable to future unexpected expenses."
      },
      {
        text: "Use emergency fund and increase savings",
        impact: {
          savings: -500,
          debt: 0,
          income: 0,
          health: 15,
          happiness: 10,
          risk: -10,
          xp: 60
        },
        feedback: "Smart decision! Using your emergency fund for its intended purpose and then rebuilding it shows good financial planning and discipline."
      },
      {
        text: "Take on debt instead of using emergency fund",
        impact: {
          savings: 0,
          debt: 1000,
          income: 0,
          health: -10,
          happiness: -10,
          risk: 25,
          xp: 15
        },
        feedback: "Taking on debt when you have an emergency fund defeats its purpose. The emergency fund is there to help you avoid debt in unexpected situations."
      }
    ]
  }
]

export const marketScenarios = [
  {
    id: "stock_basics",
    title: "Stock Market Basics",
    description: "You're new to investing and want to start with stocks. What's your first move?",
    options: [
      {
        text: "Research index funds",
        impact: {
          portfolio: 1000,
          cash: -1000,
          knowledge: 20,
          risk: 20,
          xp: 50
        },
        feedback: "Great choice! Index funds are a low-risk way to start investing in the stock market.",
        miniGame: {
          type: "stock_picker" as const,
          bonus: 20
        }
      },
      {
        text: "Buy individual stocks",
        impact: {
          portfolio: 2000,
          cash: -2000,
          knowledge: 10,
          risk: 60,
          xp: 30
        },
        feedback: "Individual stocks can be risky for beginners. Consider starting with index funds first.",
        miniGame: {
          type: "stock_picker" as const,
          bonus: 30
        }
      },
      {
        text: "Consult a financial advisor",
        impact: {
          portfolio: 0,
          cash: -500,
          knowledge: 30,
          risk: 10,
          xp: 40
        },
        feedback: "Professional advice is valuable, but make sure to understand the basics yourself too.",
        miniGame: {
          type: "budget_planner" as const,
          bonus: 15
        }
      }
    ]
  },
  {
    id: "market_volatility",
    title: "Market Volatility",
    description: "The market is experiencing high volatility. How do you react?",
    options: [
      {
        text: "Stay invested",
        impact: {
          portfolio: 1500,
          cash: 0,
          knowledge: 15,
          risk: 30,
          xp: 80
        },
        feedback: "Smart move! Staying invested during volatility often leads to better long-term returns."
      },
      {
        text: "Sell everything",
        impact: {
          portfolio: -1000,
          cash: 1000,
          knowledge: 5,
          risk: 0,
          xp: 20
        },
        feedback: "Selling during market dips can lock in losses. Consider your long-term goals."
      },
      {
        text: "Buy more",
        impact: {
          portfolio: 2000,
          cash: -2000,
          knowledge: 10,
          risk: 50,
          xp: 60
        },
        feedback: "Buying during dips can be good, but make sure you have a diversified portfolio."
      }
    ]
  },
  {
    id: "dividend_investing",
    title: "Dividend Investing",
    description: "You're considering dividend stocks for passive income. What's your approach?",
    options: [
      {
        text: "Research dividend aristocrats",
        impact: {
          portfolio: 1000,
          cash: 500,
          knowledge: 20,
          risk: 30,
          xp: 70
        },
        feedback: "Dividend aristocrats are reliable companies with a history of increasing dividends."
      },
      {
        text: "Focus on high yield",
        impact: {
          portfolio: 2000,
          cash: 1000,
          knowledge: 10,
          risk: 60,
          xp: 40
        },
        feedback: "High yield can be tempting, but watch out for unsustainable dividend rates."
      },
      {
        text: "Diversify across sectors",
        impact: {
          portfolio: 1500,
          cash: 800,
          knowledge: 15,
          risk: 40,
          xp: 60
        },
        feedback: "Diversification helps reduce risk while maintaining good income potential."
      }
    ]
  }
]

export const savingScenarios = [
  {
    id: "emergency_fund",
    title: "Emergency Fund Challenge",
    description: "You've been saving for an emergency fund, but an unexpected expense has come up. How will you handle it?",
    options: [
      {
        text: "Use emergency fund and stop saving",
        impact: {
          savings: -1000,
          debt: 0,
          income: 0,
          discipline: -10,
          risk: 20,
          xp: 25
        },
        feedback: "While using your emergency fund is appropriate for emergencies, stopping your savings habit could leave you vulnerable to future unexpected expenses.",
        miniGame: {
          type: "savings_challenge" as const,
          bonus: 10
        }
      },
      {
        text: "Use emergency fund and increase savings",
        impact: {
          savings: -500,
          debt: 0,
          income: 0,
          discipline: 15,
          risk: -10,
          xp: 60
        },
        feedback: "Smart decision! Using your emergency fund for its intended purpose and then rebuilding it shows good financial planning and discipline.",
        miniGame: {
          type: "budget_planner" as const,
          bonus: 25
        }
      },
      {
        text: "Take on debt instead of using emergency fund",
        impact: {
          savings: 0,
          debt: 1000,
          income: 0,
          discipline: -10,
          risk: 25,
          xp: 15
        },
        feedback: "Taking on debt when you have an emergency fund defeats its purpose. The emergency fund is there to help you avoid debt in unexpected situations.",
        miniGame: {
          type: "savings_challenge" as const,
          bonus: 5
        }
      }
    ]
  },
  {
    id: "savings_goal",
    title: "Savings Goal Challenge",
    description: "You've set a goal to save for a major purchase. How will you approach it?",
    options: [
      {
        text: "Cut all non-essential spending",
        impact: {
          savings: 800,
          debt: 0,
          income: 0,
          discipline: 20,
          risk: -5,
          xp: 50
        },
        feedback: "Cutting non-essential spending is effective, but make sure your cuts are sustainable long-term."
      },
      {
        text: "Find ways to increase income",
        impact: {
          savings: 500,
          debt: 0,
          income: 300,
          discipline: 15,
          risk: -5,
          xp: 60
        },
        feedback: "Increasing income while maintaining good spending habits is a great way to reach your savings goals faster."
      },
      {
        text: "Take on a side job",
        impact: {
          savings: 1000,
          debt: 0,
          income: 800,
          discipline: 10,
          risk: 10,
          xp: 40
        },
        feedback: "A side job can boost your savings, but be careful not to burn out. Balance is important."
      }
    ]
  },
  {
    id: "debt_management",
    title: "Debt Management Challenge",
    description: "You have multiple debts to manage. What's your strategy?",
    options: [
      {
        text: "Pay highest interest first",
        impact: {
          savings: -500,
          debt: -1000,
          income: 0,
          discipline: 15,
          risk: -10,
          xp: 60
        },
        feedback: "Paying off high-interest debt first is mathematically optimal and saves you money in the long run."
      },
      {
        text: "Pay smallest balance first",
        impact: {
          savings: -300,
          debt: -500,
          income: 0,
          discipline: 10,
          risk: -5,
          xp: 40
        },
        feedback: "The snowball method can provide psychological wins, but may cost more in interest."
      },
      {
        text: "Make minimum payments only",
        impact: {
          savings: 0,
          debt: -200,
          income: 0,
          discipline: -10,
          risk: 20,
          xp: 15
        },
        feedback: "Minimum payments keep you in debt longer and cost more in interest. Consider paying more when possible."
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