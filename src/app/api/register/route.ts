import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Create user with initial progress records for first module
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        progress: {
          create: [
            {
              moduleId: "basics",
              lessonId: "what-is-money",
              completed: false
            },
            {
              moduleId: "basics",
              lessonId: "banking-101",
              completed: false
            },
            {
              moduleId: "basics",
              lessonId: "saving-basics",
              completed: false
            }
          ]
        }
      },
    })

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    )
  }
} 