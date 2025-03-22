export interface Module {
  id: string
  title: string
  description: string
  lessons: Lesson[]
  order: number
}

export interface Lesson {
  id: string
  title: string
  content: string
  quiz: Quiz[]
  order: number
}

export interface Quiz {
  question: string
  options: string[]
  correctAnswer: number
}

export const modules: Module[] = [
  {
    id: "basics",
    title: "Financial Basics",
    description: "Learn the fundamentals of money and personal finance",
    order: 1,
    lessons: [
      {
        id: "what-is-money",
        title: "Understanding Money",
        order: 1,
        content: `
# Understanding Money

Money is a medium of exchange that we use to buy goods and services. It's important to understand:

## Key Concepts
- Money as a store of value
- Different forms of money (cash, digital money)
- How money moves in the economy

## Why Money Matters
- Enables trade and commerce
- Stores wealth
- Measures value

## Modern Money
- Digital payments
- Mobile banking
- Cryptocurrencies
        `,
        quiz: [
          {
            question: "What are the three main functions of money?",
            options: [
              "Medium of exchange, store of value, unit of account",
              "Saving, spending, investing",
              "Cash, credit, debit",
              "Banks, ATMs, mobile payments"
            ],
            correctAnswer: 0
          },
          {
            question: "Which of these is NOT a form of digital money?",
            options: [
              "Credit card balance",
              "Bank account balance",
              "Physical gold coins",
              "Mobile wallet balance"
            ],
            correctAnswer: 2
          }
        ]
      },
      {
        id: "banking-101",
        title: "Banking Basics",
        order: 2,
        content: `
# Banking Basics

Understanding how banks work is essential for managing your money effectively.

## Types of Bank Accounts
- Savings accounts
- Checking accounts
- Money market accounts
- Certificates of deposit (CDs)

## Banking Services
- Direct deposit
- Online banking
- Mobile banking
- ATM services

## Banking Safety
- FDIC insurance
- Fraud protection
- Account security
        `,
        quiz: [
          {
            question: "Which type of account typically offers the highest interest rate?",
            options: [
              "Checking account",
              "Certificate of deposit (CD)",
              "Basic savings account",
              "Mobile wallet"
            ],
            correctAnswer: 1
          },
          {
            question: "What does FDIC insurance protect?",
            options: [
              "Your credit score",
              "Your bank deposits",
              "Your stock investments",
              "Your crypto assets"
            ],
            correctAnswer: 1
          }
        ]
      },
      {
        id: "saving-basics",
        title: "Saving Money",
        order: 3,
        content: `
# Saving Money

Learning to save money is one of the most important financial skills.

## Why Save Money?
- Emergency fund
- Future goals
- Financial security
- Peace of mind

## Saving Strategies
- Pay yourself first
- Automate your savings
- Set specific goals
- Track your progress

## Where to Save
- High-yield savings accounts
- Money market accounts
- Retirement accounts
- Investment accounts
        `,
        quiz: [
          {
            question: "How much should you aim to have in an emergency fund?",
            options: [
              "1 week of expenses",
              "2 weeks of expenses",
              "3-6 months of expenses",
              "1 year of expenses"
            ],
            correctAnswer: 2
          },
          {
            question: "What is the 'pay yourself first' strategy?",
            options: [
              "Spending money on yourself before bills",
              "Saving money before spending on expenses",
              "Paying bills on the first of the month",
              "Getting paid before doing work"
            ],
            correctAnswer: 1
          }
        ]
      }
    ]
  }
] 