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

// Budget Hero Scenarios
const budgetScenarios: Scenario[] = [
  {
    id: "budget_emergency",
    title: "Unexpected Medical Bill",
    description: "You receive an unexpected medical bill for $500. How do you handle it?",
    difficulty: "easy",
    options: [
      {
        text: "Use your emergency fund",
        impact: {
          savings: -500,
          health: 10,
          happiness: 5,
          discipline: 10,
          risk: -5,
          xp: 75
        },
        feedback: "Great choice! This is exactly what emergency funds are for. You maintained your health without taking on debt."
      },
      {
        text: "Put it on a credit card",
        impact: {
          debt: 500,
          health: 10,
          happiness: -5,
          discipline: -5,
          risk: 15,
          xp: 25
        },
        feedback: "While you addressed the medical need, using credit for emergencies can lead to costly debt. Consider building an emergency fund."
      },
      {
        text: "Negotiate a payment plan",
        impact: {
          debt: 100,
          health: 10,
          happiness: 0,
          discipline: 5,
          risk: 5,
          xp: 50
        },
        feedback: "Good thinking! Payment plans can help manage large expenses, though having an emergency fund would be ideal."
      }
    ]
  },
  {
    id: "budget_salary",
    title: "First Salary Decision",
    description: "You just received your first salary. How do you allocate it?",
    difficulty: "easy",
    options: [
      {
        text: "Save 20%, budget the rest",
        impact: {
          savings: 600,
          income: 2400,
          happiness: 5,
          discipline: 15,
          risk: -5,
          xp: 80
        },
        feedback: "Excellent! The 20% savings rule is a great foundation for financial health."
      },
      {
        text: "Spend it all on entertainment",
        impact: {
          happiness: 15,
          discipline: -20,
          risk: 10,
          xp: 10
        },
        feedback: "While having fun is important, not saving anything from your salary can lead to financial stress later."
      },
      {
        text: "Save 50% for a big purchase",
        impact: {
          savings: 1500,
          income: 1500,
          happiness: -5,
          discipline: 20,
          risk: -10,
          xp: 60
        },
        feedback: "High savings rate is commendable, but ensure it's sustainable and doesn't impact your essential needs."
      }
    ]
  },
  {
    id: "budget_rent",
    title: "Housing Decision",
    description: "You're looking for an apartment. How much of your income should go to rent?",
    difficulty: "medium",
    options: [
      {
        text: "30% of income (recommended)",
        impact: {
          savings: 300,
          income: -900,
          happiness: 10,
          discipline: 15,
          risk: -5,
          xp: 75
        },
        feedback: "Perfect! The 30% rule is a sustainable approach to housing costs."
      },
      {
        text: "50% of income (nicer place)",
        impact: {
          savings: -200,
          income: -1500,
          happiness: 15,
          discipline: -10,
          risk: 20,
          xp: 25
        },
        feedback: "While a nice place is great, spending too much on rent can strain your finances."
      },
      {
        text: "20% of income (with roommates)",
        impact: {
          savings: 500,
          income: -600,
          happiness: 0,
          discipline: 20,
          risk: 0,
          xp: 60
        },
        feedback: "Frugal choice! Living with roommates can help save money, but consider your comfort and privacy needs."
      }
    ]
  },
  {
    id: "budget_investment",
    title: "Investment Opportunity",
    description: "A friend presents an investment opportunity promising 20% returns. What do you do?",
    difficulty: "hard",
    options: [
      {
        text: "Research thoroughly first",
        impact: {
          discipline: 15,
          risk: -10,
          xp: 80
        },
        feedback: "Smart move! Due diligence is crucial before any investment."
      },
      {
        text: "Invest immediately",
        impact: {
          savings: -1000,
          happiness: -10,
          discipline: -15,
          risk: 30,
          xp: 20
        },
        feedback: "Rushing into investments without research is risky. High returns often come with high risks."
      },
      {
        text: "Consult a financial advisor",
        impact: {
          savings: -200,
          discipline: 10,
          risk: -5,
          xp: 60
        },
        feedback: "Good thinking! Professional advice can help evaluate investment opportunities."
      }
    ]
  }
]

// Market Master Scenarios
const marketMasterScenarios: Scenario[] = [
  {
    id: "market_basics",
    title: "Stock Market Basics",
    description: "You have $1000 to start investing. What's your first move?",
    difficulty: "easy",
    options: [
      {
        text: "Buy a diversified index fund",
        impact: {
          portfolio: 1000,
          cash: -1000,
          knowledge: 15,
          risk: 5,
          xp: 80
        },
        feedback: "Excellent choice! Index funds offer broad market exposure and are great for beginners."
      },
      {
        text: "Buy a single popular tech stock",
        impact: {
          portfolio: 1000,
          cash: -1000,
          knowledge: 5,
          risk: 20,
          xp: 30
        },
        feedback: "Single stocks carry more risk. Consider diversifying to reduce potential losses."
      },
      {
        text: "Research more before investing",
        impact: {
          knowledge: 20,
          risk: -5,
          xp: 60
        },
        feedback: "Smart! Understanding the market before investing is crucial for long-term success."
      }
    ]
  },
  {
    id: "market_dip",
    title: "Market Dip",
    description: "The market has dropped 10% this week. What's your move?",
    difficulty: "medium",
    options: [
      {
        text: "Hold and stick to your strategy",
        impact: {
          knowledge: 15,
          risk: 0,
          xp: 75
        },
        feedback: "Great discipline! Long-term investors often benefit from staying the course during market dips."
      },
      {
        text: "Sell everything to prevent losses",
        impact: {
          portfolio: -5000,
          cash: 4500,
          knowledge: 5,
          risk: -10,
          xp: 20
        },
        feedback: "Selling in panic often locks in losses. Market downturns are normal and temporary."
      },
      {
        text: "Buy more while prices are low",
        impact: {
          portfolio: 2000,
          cash: -2000,
          knowledge: 20,
          risk: 10,
          xp: 70
        },
        feedback: "Good thinking! Market dips can be opportunities to buy quality investments at lower prices."
      }
    ]
  },
  {
    id: "market_crypto",
    title: "Cryptocurrency Investment",
    description: "You're considering investing in cryptocurrency. What's your approach?",
    difficulty: "hard",
    options: [
      {
        text: "Invest a small portion (1-5%) of portfolio",
        impact: {
          portfolio: 500,
          cash: -500,
          knowledge: 15,
          risk: 10,
          xp: 70
        },
        feedback: "Balanced approach! Limiting high-risk investments to a small portion of your portfolio is wise."
      },
      {
        text: "Go all in on crypto",
        impact: {
          portfolio: 0,
          cash: -5000,
          knowledge: 5,
          risk: 40,
          xp: 20
        },
        feedback: "Very risky! Cryptocurrency is highly volatile. Never invest more than you can afford to lose."
      },
      {
        text: "Avoid cryptocurrency entirely",
        impact: {
          knowledge: 10,
          risk: -5,
          xp: 50
        },
        feedback: "Conservative choice. While you miss potential gains, you also avoid high volatility and risk."
      }
    ]
  }
]

// Savings Quest Scenarios
const savingsQuestScenarios: Scenario[] = [
  {
    id: "savings_start",
    title: "Starting to Save",
    description: "You want to start saving money. What's your first step?",
    difficulty: "easy",
    options: [
      {
        text: "Create a budget and track expenses",
        impact: {
          savings: 200,
          discipline: 20,
          risk: -5,
          xp: 80
        },
        feedback: "Perfect start! Understanding your spending is crucial for effective saving."
      },
      {
        text: "Save whatever is left after spending",
        impact: {
          savings: 50,
          discipline: 5,
          risk: 10,
          xp: 30
        },
        feedback: "This approach is better than not saving, but planning your savings first is more effective."
      },
      {
        text: "Cut all non-essential spending",
        impact: {
          savings: 300,
          happiness: -10,
          discipline: 15,
          risk: 0,
          xp: 50
        },
        feedback: "While this saves money, extreme measures might not be sustainable. Balance is key."
      }
    ]
  },
  {
    id: "savings_goal",
    title: "Savings Goal",
    description: "You want to save for a vacation in 6 months. How do you approach it?",
    difficulty: "medium",
    options: [
      {
        text: "Set up automatic monthly transfers",
        impact: {
          savings: 600,
          happiness: 10,
          discipline: 20,
          risk: -5,
          xp: 75
        },
        feedback: "Excellent! Automation helps maintain consistent savings habits."
      },
      {
        text: "Use a high-yield savings account",
        impact: {
          savings: 650,
          knowledge: 15,
          discipline: 15,
          risk: 0,
          xp: 70
        },
        feedback: "Smart thinking! Earning interest while saving helps reach goals faster."
      },
      {
        text: "Take on extra work",
        impact: {
          savings: 800,
          income: 200,
          happiness: -5,
          discipline: 10,
          risk: 5,
          xp: 60
        },
        feedback: "Good initiative! Additional income can accelerate savings, but maintain work-life balance."
      }
    ]
  },
  {
    id: "savings_emergency",
    title: "Emergency Fund Planning",
    description: "How much should you keep in your emergency fund?",
    difficulty: "hard",
    options: [
      {
        text: "3-6 months of expenses",
        impact: {
          savings: 1000,
          happiness: 10,
          discipline: 20,
          risk: -15,
          xp: 80
        },
        feedback: "Perfect! This is the recommended amount for most situations."
      },
      {
        text: "1 month of expenses",
        impact: {
          savings: 300,
          discipline: 5,
          risk: 20,
          xp: 30
        },
        feedback: "While better than nothing, this might not be enough for longer emergencies."
      },
      {
        text: "12 months of expenses",
        impact: {
          savings: 2000,
          happiness: -5,
          discipline: 15,
          risk: -10,
          xp: 60
        },
        feedback: "Very conservative. While safe, too much in emergency savings might mean missed growth opportunities."
      }
    ]
  }
]

// Combine all scenarios
export const scenarios: Scenario[] = [
  ...easyScenarios,
  ...mediumScenarios,
  ...hardScenarios,
  ...budgetScenarios,
  ...marketMasterScenarios,
  ...savingsQuestScenarios
]

export type GameProgress = {
  level: number
  xp: number
  achievements: string[]
  completedLessons: string[]
  completedScenarios: string[]
} 