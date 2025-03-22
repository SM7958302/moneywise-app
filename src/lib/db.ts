import { sql } from '@vercel/postgres';
import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

export const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

export async function createTables() {
  try {
    // Create Users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        email_verified TIMESTAMP,
        image VARCHAR(255),
        password VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        points INTEGER DEFAULT 0,
        streak INTEGER DEFAULT 0
      );
    `

    // Create Progress table
    await sql`
      CREATE TABLE IF NOT EXISTS progress (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
        module_id VARCHAR(255),
        lesson_id VARCHAR(255),
        completed BOOLEAN DEFAULT FALSE,
        score INTEGER DEFAULT 0,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, module_id, lesson_id)
      );
    `

    // Create GameProgress table
    await sql`
      CREATE TABLE IF NOT EXISTS game_progress (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
        game_id VARCHAR(255),
        progress INTEGER DEFAULT 0,
        score INTEGER DEFAULT 0,
        completed BOOLEAN DEFAULT FALSE,
        last_played TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, game_id)
      );
    `

    // Create ChatMessage table
    await sql`
      CREATE TABLE IF NOT EXISTS chat_messages (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
        content TEXT,
        role VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_user_created (user_id, created_at)
      );
    `

    console.log('Tables created successfully!')
  } catch (error) {
    console.error('Error creating tables:', error)
    throw error
  }
} 