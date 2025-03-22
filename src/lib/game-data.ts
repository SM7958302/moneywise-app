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

export type Difficulty = "easy" | "medium" | "hard"

export type Scenario = {
  id: string
  title: string
  description: string
  options: ScenarioOption[]
  difficulty: Difficulty
}

export type ScenarioOption = {
  text: string
  impact: {
    savings?: number
    debt?: number
    income?: number
    health?: number
    happiness?: number
    discipline?: number
    portfolio?: number
    cash?: number
    knowledge?: number
    risk: number
    xp: number
  }
  feedback: string
  miniGame?: {
    type: "budget_planner" | "stock_picker" | "savings_challenge"
    bonus: number
  }
}

// Easy scenarios (basic financial concepts)
const easyScenarios: Scenario[] = [
  {
    id: "first_job",
    title: "First Job Challenge",
    description: "You just got your first job! Learn to manage your first paycheck",
    difficulty: "easy",
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
        feedback: "While it's tempting to spend on wants, saving less now means less financial security later. Consider setting aside some money for emergencies.",
        miniGame: {
          type: "savings_challenge",
          bonus: 10
        }
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
        feedback: "Excellent choice! Following the 50/30/20 rule helps you balance needs, wants, and savings. This is a sustainable approach to money management.",
        miniGame: {
          type: "budget_planner",
          bonus: 25
        }
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
        feedback: "While saving is important, completely avoiding spending can impact your well-being. Remember to find a balance between saving and enjoying life.",
        miniGame: {
          type: "savings_challenge",
          bonus: 5
        }
      }
    ]
  },
  {
    id: "savings_goal",
    title: "Setting a Savings Goal",
    description: "You want to save for a new laptop. How will you approach this?",
    difficulty: "easy",
    options: [
      {
        text: "Save a fixed amount each month",
        impact: {
          savings: 500,
          debt: 0,
          income: 0,
          discipline: 20,
          happiness: 10,
          risk: -10,
          xp: 50
        },
        feedback: "Great choice! Setting a fixed monthly savings amount helps you build a consistent saving habit.",
        miniGame: {
          type: "savings_challenge",
          bonus: 10
        }
      },
      {
        text: "Save whatever is left at the end of the month",
        impact: {
          savings: 100,
          debt: 0,
          income: 0,
          discipline: -10,
          happiness: 0,
          risk: 10,
          xp: 20
        },
        feedback: "This approach often leads to inconsistent savings. It's better to save first and spend what's left.",
        miniGame: {
          type: "savings_challenge",
          bonus: 5
        }
      },
      {
        text: "Take out a loan to buy it immediately",
        impact: {
          savings: 0,
          debt: 1000,
          income: 0,
          discipline: -20,
          happiness: 15,
          risk: 25,
          xp: 10
        },
        feedback: "Taking on debt for non-essential items can lead to financial stress. Consider saving up instead.",
        miniGame: {
          type: "savings_challenge",
          bonus: 5
        }
      }
    ]
  },
  {
    id: "budget_basics",
    title: "Budget Basics",
    description: "You're creating your first budget. What's the best approach?",
    difficulty: "easy",
    options: [
      {
        text: "Track all expenses for a month first",
        impact: {
          savings: 0,
          debt: 0,
          income: 0,
          discipline: 15,
          happiness: 5,
          risk: -5,
          xp: 40
        },
        feedback: "Smart approach! Understanding your spending patterns helps create a realistic budget.",
        miniGame: {
          type: "budget_planner",
          bonus: 25
        }
      },
      {
        text: "Guess your expenses and create a budget",
        impact: {
          savings: -200,
          debt: 100,
          income: 0,
          discipline: -10,
          happiness: 0,
          risk: 15,
          xp: 15
        },
        feedback: "Guessing expenses often leads to overspending. Track your actual spending for better accuracy.",
        miniGame: {
          type: "budget_planner",
          bonus: 15
        }
      },
      {
        text: "Don't create a budget and spend freely",
        impact: {
          savings: -500,
          debt: 300,
          income: 0,
          discipline: -20,
          happiness: 10,
          risk: 30,
          xp: 10
        },
        feedback: "Without a budget, it's easy to overspend and lose track of your finances.",
        miniGame: {
          type: "savings_challenge",
          bonus: 5
        }
      }
    ]
  },
  {
    id: "first_bank_account",
    title: "First Bank Account",
    description: "You're opening your first bank account. What type should you choose?",
    difficulty: "easy",
    options: [
      {
        text: "Savings account with high interest",
        impact: {
          savings: 500,
          debt: 0,
          income: 50,
          health: 5,
          happiness: 5,
          discipline: 15,
          risk: -10,
          xp: 50
        },
        feedback: "Great choice! A savings account helps you build an emergency fund and earn interest.",
        miniGame: {
          type: "savings_challenge",
          bonus: 10
        }
      },
      {
        text: "Checking account with no fees",
        impact: {
          savings: 200,
          debt: 0,
          income: 0,
          health: 5,
          happiness: 5,
          discipline: 5,
          risk: -5,
          xp: 30
        },
        feedback: "A checking account is good for daily expenses, but consider having both checking and savings accounts.",
        miniGame: {
          type: "savings_challenge",
          bonus: 5
        }
      },
      {
        text: "No bank account, keep cash at home",
        impact: {
          savings: -200,
          debt: 0,
          income: 0,
          health: -5,
          happiness: -5,
          discipline: -10,
          risk: 20,
          xp: 10
        },
        feedback: "Keeping cash at home is risky and you miss out on interest earnings. A bank account is safer and more beneficial.",
        miniGame: {
          type: "savings_challenge",
          bonus: 5
        }
      }
    ]
  },
  {
    id: "grocery_shopping",
    title: "Smart Grocery Shopping",
    description: "You're going grocery shopping. How will you approach it?",
    difficulty: "easy",
    options: [
      {
        text: "Make a list and stick to it",
        impact: {
          savings: 300,
          debt: 0,
          income: 0,
          health: 10,
          happiness: 5,
          discipline: 15,
          risk: -5,
          xp: 45
        },
        feedback: "Smart shopping! Making a list helps you avoid impulse purchases and stick to your budget.",
        miniGame: {
          type: "budget_planner",
          bonus: 25
        }
      },
      {
        text: "Buy whatever looks good",
        impact: {
          savings: -200,
          debt: 0,
          income: 0,
          health: 5,
          happiness: 10,
          discipline: -10,
          risk: 10,
          xp: 15
        },
        feedback: "Impulse buying can lead to overspending and food waste. Planning ahead is more cost-effective.",
        miniGame: {
          type: "savings_challenge",
          bonus: 5
        }
      },
      {
        text: "Buy only the cheapest items",
        impact: {
          savings: 400,
          debt: 0,
          income: 0,
          health: -5,
          happiness: -5,
          discipline: 10,
          risk: 5,
          xp: 25
        },
        feedback: "While saving money is good, consider nutritional value too. Balance quality with cost.",
        miniGame: {
          type: "savings_challenge",
          bonus: 5
        }
      }
    ]
  }
]

// Medium scenarios (intermediate financial concepts)
const mediumScenarios: Scenario[] = [
  {
    id: "college_budget",
    title: "College Budget Challenge",
    description: "Manage your money during college semester",
    difficulty: "medium",
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
        feedback: "New textbooks and frequent dining out can quickly drain your budget. Consider alternatives like used books, meal planning, and student discounts.",
        miniGame: {
          type: "savings_challenge",
          bonus: 10
        }
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
        feedback: "Smart choices! Using library resources and cooking meals helps you save money while maintaining good health. This is a great way to build financial discipline.",
        miniGame: {
          type: "savings_challenge",
          bonus: 25
        }
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
        feedback: "A balanced approach! Mixing new and used resources helps you save while maintaining comfort. This shows good decision-making skills.",
        miniGame: {
          type: "savings_challenge",
          bonus: 15
        }
      }
    ]
  },
  {
    id: "emergency_fund",
    title: "Emergency Fund Challenge",
    description: "You've been saving for an emergency fund, but an unexpected expense has come up. How will you handle it?",
    difficulty: "medium",
    options: [
      {
        text: "Use emergency fund and stop saving",
        impact: {
          savings: -1000,
          debt: 0,
          income: 0,
          health: 10,
          happiness: 5,
          risk: 15,
          xp: 25
        },
        feedback: "While using your emergency fund is appropriate for emergencies, stopping your savings habit could leave you vulnerable to future unexpected expenses.",
        miniGame: {
          type: "savings_challenge",
          bonus: 10
        }
      },
      {
        text: "Use emergency fund and rebuild it",
        impact: {
          savings: -500,
          debt: 0,
          income: 0,
          health: 15,
          happiness: 10,
          risk: -10,
          xp: 60
        },
        feedback: "Smart decision! Using your emergency fund for its intended purpose and then rebuilding it shows good financial planning and discipline.",
        miniGame: {
          type: "savings_challenge",
          bonus: 25
        }
      },
      {
        text: "Take on debt instead",
        impact: {
          savings: 0,
          debt: 1000,
          income: 0,
          health: -10,
          happiness: -5,
          risk: 25,
          xp: 15
        },
        feedback: "Taking on debt when you have an emergency fund defeats its purpose. The emergency fund is there to help you avoid debt in unexpected situations.",
        miniGame: {
          type: "savings_challenge",
          bonus: 5
        }
      }
    ]
  },
  {
    id: "investment_basics",
    title: "Investment Basics",
    description: "You've saved some money and want to start investing. What's your approach?",
    difficulty: "medium",
    options: [
      {
        text: "Invest all in one high-risk stock",
        impact: {
          savings: -5000,
          debt: 0,
          income: 0,
          health: -10,
          happiness: 5,
          risk: 40,
          xp: 25
        },
        feedback: "High-risk investments can lead to high returns, but they're also very volatile. It's important to diversify your investments and not put all your eggs in one basket.",
        miniGame: {
          type: "savings_challenge",
          bonus: 10
        }
      },
      {
        text: "Create a diversified portfolio",
        impact: {
          savings: -5000,
          debt: 0,
          income: 100,
          health: 10,
          happiness: 10,
          risk: -15,
          xp: 60
        },
        feedback: "Excellent choice! A diversified portfolio helps spread risk and is a more sustainable approach to investing. This is a key principle of smart investing.",
        miniGame: {
          type: "savings_challenge",
          bonus: 25
        }
      },
      {
        text: "Keep all money in savings",
        impact: {
          savings: 5000,
          debt: 0,
          income: 0,
          health: 5,
          happiness: 5,
          risk: -10,
          xp: 35
        },
        feedback: "While keeping money in savings is safe, you might miss out on potential growth. Consider learning more about different investment options to make informed decisions.",
        miniGame: {
          type: "savings_challenge",
          bonus: 10
        }
      }
    ]
  },
  {
    id: "car_purchase",
    title: "Car Purchase Decision",
    description: "You need a new car. What's your approach?",
    difficulty: "medium",
    options: [
      {
        text: "Buy a reliable used car with cash",
        impact: {
          savings: -5000,
          debt: 0,
          income: 0,
          health: 10,
          happiness: 10,
          discipline: 15,
          risk: -10,
          xp: 60
        },
        feedback: "Smart choice! Buying a used car with cash avoids interest payments and depreciation costs.",
        miniGame: {
          type: "savings_challenge",
          bonus: 25
        }
      },
      {
        text: "Take out a loan for a new car",
        impact: {
          savings: -2000,
          debt: 15000,
          income: 0,
          health: 5,
          happiness: 15,
          discipline: -5,
          risk: 20,
          xp: 30
        },
        feedback: "New cars depreciate quickly. Consider the total cost including interest and insurance.",
        miniGame: {
          type: "savings_challenge",
          bonus: 10
        }
      },
      {
        text: "Lease a luxury car",
        impact: {
          savings: -1000,
          debt: 5000,
          income: 0,
          health: 5,
          happiness: 20,
          discipline: -10,
          risk: 30,
          xp: 20
        },
        feedback: "Leasing can be expensive in the long run. Consider your long-term financial goals.",
        miniGame: {
          type: "savings_challenge",
          bonus: 5
        }
      }
    ]
  },
  {
    id: "student_loans",
    title: "Student Loan Management",
    description: "You have student loans. How will you handle them?",
    difficulty: "medium",
    options: [
      {
        text: "Create a repayment plan and stick to it",
        impact: {
          savings: -500,
          debt: -1000,
          income: 0,
          health: 10,
          happiness: 5,
          discipline: 20,
          risk: -15,
          xp: 60
        },
        feedback: "Excellent approach! Having a plan helps you stay on track and pay off loans efficiently.",
        miniGame: {
          type: "savings_challenge",
          bonus: 25
        }
      },
      {
        text: "Pay minimum and invest the rest",
        impact: {
          savings: 500,
          debt: -200,
          income: 0,
          health: 5,
          happiness: 5,
          discipline: 5,
          risk: 15,
          xp: 35
        },
        feedback: "While investing is important, high-interest debt should usually be prioritized.",
        miniGame: {
          type: "savings_challenge",
          bonus: 10
        }
      },
      {
        text: "Ignore the loans for now",
        impact: {
          savings: 0,
          debt: 500,
          income: 0,
          health: -10,
          happiness: -5,
          discipline: -15,
          risk: 30,
          xp: 10
        },
        feedback: "Ignoring student loans can lead to increased debt and damaged credit. Take action early.",
        miniGame: {
          type: "savings_challenge",
          bonus: 5
        }
      }
    ]
  }
]

// Hard scenarios (advanced financial concepts)
const hardScenarios: Scenario[] = [
  {
    id: "credit_card",
    title: "Credit Card Management",
    description: "You have a credit card with a $5,000 limit. How will you use it?",
    difficulty: "hard",
    options: [
      {
        text: "Max out the card",
        impact: {
          savings: 0,
          debt: 5000,
          income: 0,
          health: -20,
          happiness: 10,
          risk: 40,
          xp: 10
        },
        feedback: "Maxing out your credit card is risky! High debt can lead to financial stress and damage your credit score. Consider using credit cards responsibly.",
        miniGame: {
          type: "savings_challenge",
          bonus: 10
        }
      },
      {
        text: "Use for emergencies only",
        impact: {
          savings: 0,
          debt: 0,
          income: 0,
          health: 20,
          happiness: 10,
          risk: -10,
          xp: 40
        },
        feedback: "Smart choice! Using credit cards only for emergencies helps you maintain financial health and build good credit habits.",
        miniGame: {
          type: "savings_challenge",
          bonus: 25
        }
      },
      {
        text: "Use for daily expenses",
        impact: {
          savings: 0,
          debt: 2000,
          income: 0,
          health: -10,
          happiness: 5,
          risk: 20,
          xp: 20
        },
        feedback: "Using credit cards for daily expenses can be convenient, but make sure to pay off the balance in full each month to avoid interest charges.",
        miniGame: {
          type: "savings_challenge",
          bonus: 10
        }
      }
    ]
  },
  {
    id: "retirement_planning",
    title: "Retirement Planning",
    description: "You're planning for retirement. What's your strategy?",
    difficulty: "hard",
    options: [
      {
        text: "Start saving 15% of income in retirement accounts",
        impact: {
          savings: 1000,
          debt: 0,
          income: 0,
          health: 15,
          happiness: 10,
          risk: -15,
          xp: 60
        },
        feedback: "Excellent choice! Starting early and saving consistently is key to building a secure retirement fund.",
        miniGame: {
          type: "savings_challenge",
          bonus: 25
        }
      },
      {
        text: "Wait until you're older to start saving",
        impact: {
          savings: 0,
          debt: 0,
          income: 0,
          health: -10,
          happiness: 0,
          risk: 30,
          xp: 15
        },
        feedback: "Waiting to save for retirement means you'll need to save much more later to catch up. Time is your greatest ally in retirement planning.",
        miniGame: {
          type: "savings_challenge",
          bonus: 10
        }
      },
      {
        text: "Rely on social security only",
        impact: {
          savings: 0,
          debt: 0,
          income: 0,
          health: -15,
          happiness: -10,
          risk: 40,
          xp: 10
        },
        feedback: "Social security alone may not be enough for a comfortable retirement. It's important to have additional savings and investments.",
        miniGame: {
          type: "savings_challenge",
          bonus: 5
        }
      }
    ]
  },
  {
    id: "tax_planning",
    title: "Tax Planning",
    description: "You're preparing for tax season. How will you approach it?",
    difficulty: "hard",
    options: [
      {
        text: "Plan deductions throughout the year",
        impact: {
          savings: 1000,
          debt: 0,
          income: 0,
          health: 10,
          happiness: 10,
          risk: -10,
          xp: 60
        },
        feedback: "Smart approach! Planning deductions throughout the year helps you maximize tax savings and avoid last-minute stress.",
        miniGame: {
          type: "savings_challenge",
          bonus: 25
        }
      },
      {
        text: "Wait until tax season to organize",
        impact: {
          savings: -500,
          debt: 0,
          income: 0,
          health: -15,
          happiness: -10,
          risk: 20,
          xp: 20
        },
        feedback: "Waiting until tax season can lead to missed deductions and increased stress. It's better to stay organized throughout the year.",
        miniGame: {
          type: "savings_challenge",
          bonus: 10
        }
      },
      {
        text: "Ignore tax planning completely",
        impact: {
          savings: -1000,
          debt: 0,
          income: 0,
          health: -20,
          happiness: -15,
          risk: 40,
          xp: 10
        },
        feedback: "Ignoring tax planning can lead to missed opportunities and potential penalties. It's important to stay informed and organized.",
        miniGame: {
          type: "savings_challenge",
          bonus: 5
        }
      }
    ]
  },
  {
    id: "mortgage_decision",
    title: "Mortgage Decision",
    description: "You're buying a house. What mortgage terms should you choose?",
    difficulty: "hard",
    options: [
      {
        text: "15-year fixed rate with 20% down",
        impact: {
          savings: -20000,
          debt: 200000,
          income: 0,
          health: 15,
          happiness: 15,
          discipline: 20,
          risk: -15,
          xp: 70
        },
        feedback: "Smart choice! A shorter term and larger down payment save you money in interest.",
        miniGame: {
          type: "savings_challenge",
          bonus: 25
        }
      },
      {
        text: "30-year adjustable rate with 5% down",
        impact: {
          savings: -5000,
          debt: 285000,
          income: 0,
          health: 5,
          happiness: 10,
          discipline: 5,
          risk: 30,
          xp: 25
        },
        feedback: "Adjustable rates can be risky, and a small down payment means higher monthly payments.",
        miniGame: {
          type: "savings_challenge",
          bonus: 10
        }
      },
      {
        text: "Interest-only loan with minimum down",
        impact: {
          savings: -2000,
          debt: 300000,
          income: 0,
          health: -5,
          happiness: 5,
          discipline: -10,
          risk: 40,
          xp: 15
        },
        feedback: "Interest-only loans are very risky and can lead to negative equity. Consider more traditional options.",
        miniGame: {
          type: "savings_challenge",
          bonus: 5
        }
      }
    ]
  },
  {
    id: "investment_portfolio",
    title: "Investment Portfolio Management",
    description: "You're managing a large investment portfolio. What's your strategy?",
    difficulty: "hard",
    options: [
      {
        text: "Diversify across asset classes and rebalance regularly",
        impact: {
          savings: 5000,
          debt: 0,
          income: 1000,
          health: 10,
          happiness: 10,
          discipline: 15,
          risk: -20,
          xp: 70
        },
        feedback: "Excellent strategy! Diversification and regular rebalancing help manage risk and optimize returns.",
        miniGame: {
          type: "savings_challenge",
          bonus: 25
        }
      },
      {
        text: "Focus on high-risk, high-reward stocks",
        impact: {
          savings: 2000,
          debt: 0,
          income: 2000,
          health: -5,
          happiness: 5,
          discipline: -5,
          risk: 40,
          xp: 30
        },
        feedback: "High-risk investments can be volatile. Consider a more balanced approach.",
        miniGame: {
          type: "savings_challenge",
          bonus: 10
        }
      },
      {
        text: "Keep everything in cash",
        impact: {
          savings: 1000,
          debt: 0,
          income: 0,
          health: 5,
          happiness: 5,
          discipline: 5,
          risk: -10,
          xp: 20
        },
        feedback: "While cash is safe, you might miss out on potential growth. Consider a balanced investment strategy.",
        miniGame: {
          type: "savings_challenge",
          bonus: 5
        }
      }
    ]
  }
]

// Market Master scenarios
const marketMasterScenarios: Scenario[] = [
  {
    id: "stock_basics",
    title: "Stock Market Basics",
    description: "You're learning about stocks. What's the best way to start?",
    difficulty: "easy",
    options: [
      {
        text: "Research and invest in index funds",
        impact: {
          savings: 500,
          debt: 0,
          income: 100,
          health: 5,
          happiness: 5,
          discipline: 15,
          risk: -10,
          xp: 50
        },
        feedback: "Great choice! Index funds provide diversification and are a safer way to start investing.",
        miniGame: {
          type: "stock_picker",
          bonus: 20
        }
      },
      {
        text: "Invest all money in a single stock",
        impact: {
          savings: 200,
          debt: 0,
          income: 50,
          health: -5,
          happiness: 5,
          discipline: -10,
          risk: 30,
          xp: 20
        },
        feedback: "Investing in a single stock is risky. Diversification is key to managing risk.",
        miniGame: {
          type: "stock_picker",
          bonus: 30
        }
      },
      {
        text: "Keep money in savings account only",
        impact: {
          savings: 100,
          debt: 0,
          income: 0,
          health: 5,
          happiness: 5,
          discipline: 5,
          risk: -5,
          xp: 10
        },
        feedback: "While safe, you might miss out on potential growth. Consider a balanced investment strategy.",
        miniGame: {
          type: "savings_challenge",
          bonus: 10
        }
      }
    ]
  },
  {
    id: "market_timing",
    title: "Market Timing",
    description: "The market is showing high volatility. What should you do?",
    difficulty: "medium",
    options: [
      {
        text: "Stay invested and maintain your strategy",
        impact: {
          savings: 1000,
          debt: 0,
          income: 200,
          health: 10,
          happiness: 5,
          discipline: 20,
          risk: -15,
          xp: 60
        },
        feedback: "Smart decision! Time in the market is better than timing the market.",
        miniGame: {
          type: "savings_challenge",
          bonus: 25
        }
      },
      {
        text: "Sell everything and wait",
        impact: {
          savings: -500,
          debt: 0,
          income: 0,
          health: -5,
          happiness: -5,
          discipline: -10,
          risk: 20,
          xp: 20
        },
        feedback: "Selling during volatility can lock in losses. Stay focused on your long-term goals.",
        miniGame: {
          type: "savings_challenge",
          bonus: 10
        }
      },
      {
        text: "Double down on investments",
        impact: {
          savings: 500,
          debt: 0,
          income: 100,
          health: -5,
          happiness: 5,
          discipline: -5,
          risk: 40,
          xp: 30
        },
        feedback: "While tempting, increasing risk during volatility can be dangerous.",
        miniGame: {
          type: "savings_challenge",
          bonus: 5
        }
      }
    ]
  },
  {
    id: "portfolio_management",
    title: "Portfolio Management",
    description: "Your portfolio needs rebalancing. What's the best approach?",
    difficulty: "hard",
    options: [
      {
        text: "Rebalance to target allocation",
        impact: {
          savings: 2000,
          debt: 0,
          income: 400,
          health: 15,
          happiness: 10,
          discipline: 25,
          risk: -20,
          xp: 70
        },
        feedback: "Excellent! Regular rebalancing helps maintain your desired risk level.",
        miniGame: {
          type: "savings_challenge",
          bonus: 25
        }
      },
      {
        text: "Let winners run",
        impact: {
          savings: 1000,
          debt: 0,
          income: 200,
          health: 5,
          happiness: 5,
          discipline: -10,
          risk: 30,
          xp: 30
        },
        feedback: "While tempting, letting winners run can lead to an unbalanced portfolio.",
        miniGame: {
          type: "savings_challenge",
          bonus: 10
        }
      },
      {
        text: "Sell everything and start fresh",
        impact: {
          savings: -1000,
          debt: 0,
          income: 0,
          health: -10,
          happiness: -10,
          discipline: -20,
          risk: 40,
          xp: 15
        },
        feedback: "Starting fresh can be costly. Regular rebalancing is more effective.",
        miniGame: {
          type: "savings_challenge",
          bonus: 5
        }
      }
    ]
  }
]

// Savings Quest scenarios
const savingsQuestScenarios: Scenario[] = [
  {
    id: "emergency_fund",
    title: "Emergency Fund",
    description: "You've received a bonus. How should you use it?",
    difficulty: "easy",
    options: [
      {
        text: "Add to emergency fund",
        impact: {
          savings: 1000,
          debt: 0,
          income: 0,
          health: 15,
          happiness: 10,
          discipline: 20,
          risk: -15,
          xp: 50
        },
        feedback: "Smart choice! An emergency fund provides financial security.",
        miniGame: {
          type: "savings_challenge",
          bonus: 10
        }
      },
      {
        text: "Treat yourself to something nice",
        impact: {
          savings: -500,
          debt: 0,
          income: 0,
          health: 5,
          happiness: 15,
          discipline: -10,
          risk: 10,
          xp: 20
        },
        feedback: "While fun, prioritizing savings helps build long-term security.",
        miniGame: {
          type: "savings_challenge",
          bonus: 5
        }
      },
      {
        text: "Invest in stocks",
        impact: {
          savings: 200,
          debt: 0,
          income: 50,
          health: 5,
          happiness: 5,
          discipline: 5,
          risk: 20,
          xp: 30
        },
        feedback: "While investing is good, an emergency fund should come first.",
        miniGame: {
          type: "savings_challenge",
          bonus: 5
        }
      }
    ]
  },
  {
    id: "retirement_planning",
    title: "Retirement Planning",
    description: "You're planning for retirement. What's the best strategy?",
    difficulty: "medium",
    options: [
      {
        text: "Start early and contribute regularly",
        impact: {
          savings: 2000,
          debt: 0,
          income: 300,
          health: 15,
          happiness: 15,
          discipline: 25,
          risk: -15,
          xp: 60
        },
        feedback: "Perfect! Starting early and being consistent is key to retirement success.",
        miniGame: {
          type: "savings_challenge",
          bonus: 25
        }
      },
      {
        text: "Wait until you're older",
        impact: {
          savings: 500,
          debt: 0,
          income: 50,
          health: 5,
          happiness: 5,
          discipline: -10,
          risk: 20,
          xp: 20
        },
        feedback: "The earlier you start, the more time your money has to grow.",
        miniGame: {
          type: "savings_challenge",
          bonus: 10
        }
      },
      {
        text: "Save everything for retirement",
        impact: {
          savings: 1500,
          debt: 0,
          income: 200,
          health: -5,
          happiness: -5,
          discipline: 15,
          risk: -10,
          xp: 30
        },
        feedback: "While saving is important, balance is key to financial well-being.",
        miniGame: {
          type: "savings_challenge",
          bonus: 5
        }
      }
    ]
  },
  {
    id: "tax_optimization",
    title: "Tax Optimization",
    description: "You're optimizing your savings for taxes. What's the best approach?",
    difficulty: "hard",
    options: [
      {
        text: "Maximize tax-advantaged accounts",
        impact: {
          savings: 3000,
          debt: 0,
          income: 500,
          health: 15,
          happiness: 15,
          discipline: 30,
          risk: -20,
          xp: 70
        },
        feedback: "Excellent! Tax-advantaged accounts help your money grow faster.",
        miniGame: {
          type: "savings_challenge",
          bonus: 25
        }
      },
      {
        text: "Keep everything in regular savings",
        impact: {
          savings: 1000,
          debt: 0,
          income: 100,
          health: 5,
          happiness: 5,
          discipline: 5,
          risk: -5,
          xp: 20
        },
        feedback: "You're missing out on tax benefits. Consider tax-advantaged accounts.",
        miniGame: {
          type: "savings_challenge",
          bonus: 10
        }
      },
      {
        text: "Invest only in stocks",
        impact: {
          savings: 1500,
          debt: 0,
          income: 200,
          health: -5,
          happiness: 5,
          discipline: -5,
          risk: 30,
          xp: 30
        },
        feedback: "While stocks can be good, tax-advantaged accounts offer better long-term benefits.",
        miniGame: {
          type: "savings_challenge",
          bonus: 5
        }
      }
    ]
  }
]

// Combine all scenarios
const allScenarios: Scenario[] = [
  ...easyScenarios,
  ...mediumScenarios,
  ...hardScenarios,
  ...marketMasterScenarios,
  ...savingsQuestScenarios
]

export const scenarios = allScenarios

export const marketScenarios: Scenario[] = [
  {
    id: "stock_basics",
    title: "Stock Market Basics",
    description: "You're new to investing and want to start with stocks. What's your first move?",
    difficulty: "easy",
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
          type: "stock_picker",
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
          type: "stock_picker",
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
          type: "budget_planner",
          bonus: 15
        }
      }
    ]
  },
  {
    id: "market_volatility",
    title: "Market Volatility",
    description: "The market is experiencing high volatility. How do you react?",
    difficulty: "medium",
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
    difficulty: "hard",
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

export const savingScenarios: Scenario[] = [
  {
    id: "emergency_fund",
    title: "Emergency Fund Challenge",
    description: "You've been saving for an emergency fund, but an unexpected expense has come up. How will you handle it?",
    difficulty: "easy",
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
          type: "savings_challenge",
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
          type: "budget_planner",
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
          type: "savings_challenge",
          bonus: 5
        }
      }
    ]
  },
  {
    id: "savings_goal",
    title: "Savings Goal Challenge",
    description: "You've set a goal to save for a major purchase. How will you approach it?",
    difficulty: "medium",
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
        feedback: "Cutting non-essential spending is effective, but make sure your cuts are sustainable long-term.",
        miniGame: {
          type: "budget_planner",
          bonus: 25
        }
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
        feedback: "Increasing income while maintaining good spending habits is a great way to reach your savings goals faster.",
        miniGame: {
          type: "savings_challenge",
          bonus: 15
        }
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
        feedback: "A side job can boost your savings, but be careful not to burn out. Balance is important.",
        miniGame: {
          type: "savings_challenge",
          bonus: 10
        }
      }
    ]
  },
  {
    id: "debt_management",
    title: "Debt Management Challenge",
    description: "You have multiple debts to manage. What's your strategy?",
    difficulty: "hard",
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
        feedback: "Paying off high-interest debt first is mathematically optimal and saves you money in the long run.",
        miniGame: {
          type: "budget_planner",
          bonus: 25
        }
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
        feedback: "The snowball method can provide psychological wins, but may cost more in interest.",
        miniGame: {
          type: "savings_challenge",
          bonus: 15
        }
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
        feedback: "Minimum payments keep you in debt longer and cost more in interest. Consider paying more when possible.",
        miniGame: {
          type: "savings_challenge",
          bonus: 5
        }
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