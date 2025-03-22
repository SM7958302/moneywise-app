import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { Card } from './ui/card'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const tutorialSteps = [
  {
    title: "Welcome to MoneyWise!",
    description: "Learn financial literacy through interactive games and challenges. Let's get you started with the basics.",
    content: (
      <Card className="p-4 space-y-4">
        <h3 className="font-semibold">What you'll learn:</h3>
        <ul className="list-disc pl-4 space-y-2">
          <li>Budgeting and saving strategies</li>
          <li>Investment basics and market understanding</li>
          <li>Risk management and financial planning</li>
          <li>Real-world financial decision making</li>
        </ul>
      </Card>
    )
  },
  {
    title: "Games & Challenges",
    description: "We offer three main games to help you learn financial concepts:",
    content: (
      <div className="space-y-4">
        <Card className="p-4">
          <h4 className="font-semibold">Budget Hero</h4>
          <p className="text-sm text-gray-600">Master budgeting through real-life scenarios</p>
        </Card>
        <Card className="p-4">
          <h4 className="font-semibold">Market Master</h4>
          <p className="text-sm text-gray-600">Learn investment strategies and market dynamics</p>
        </Card>
        <Card className="p-4">
          <h4 className="font-semibold">Savings Quest</h4>
          <p className="text-sm text-gray-600">Develop smart saving habits and financial discipline</p>
        </Card>
      </div>
    )
  },
  {
    title: "Track Your Progress",
    description: "Monitor your learning journey and achievements:",
    content: (
      <div className="space-y-4">
        <Card className="p-4">
          <h4 className="font-semibold">Learning Streak</h4>
          <p className="text-sm text-gray-600">Maintain daily learning to build your streak</p>
        </Card>
        <Card className="p-4">
          <h4 className="font-semibold">XP & Levels</h4>
          <p className="text-sm text-gray-600">Earn XP by completing challenges and games</p>
        </Card>
        <Card className="p-4">
          <h4 className="font-semibold">Achievements</h4>
          <p className="text-sm text-gray-600">Unlock badges and track your milestones</p>
        </Card>
      </div>
    )
  },
  {
    title: "Getting Help",
    description: "We're here to support your learning:",
    content: (
      <div className="space-y-4">
        <Card className="p-4">
          <h4 className="font-semibold">Financial Terms</h4>
          <p className="text-sm text-gray-600">Hover over terms with ? icon for explanations</p>
        </Card>
        <Card className="p-4">
          <h4 className="font-semibold">Detailed Feedback</h4>
          <p className="text-sm text-gray-600">Get explanations for each decision you make</p>
        </Card>
        <Card className="p-4">
          <h4 className="font-semibold">Difficulty Levels</h4>
          <p className="text-sm text-gray-600">Choose your comfort level and progress gradually</p>
        </Card>
      </div>
    )
  }
]

export function TutorialGuide() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem('hasSeenTutorial')
    if (!seen) {
      setIsOpen(true)
      setHasSeenTutorial(false)
    } else {
      setHasSeenTutorial(true)
    }
  }, [])

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleComplete = () => {
    localStorage.setItem('hasSeenTutorial', 'true')
    setHasSeenTutorial(true)
    setIsOpen(false)
  }

  const handleSkip = () => {
    localStorage.setItem('hasSeenTutorial', 'true')
    setHasSeenTutorial(true)
    setIsOpen(false)
  }

  if (hasSeenTutorial) return null

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{tutorialSteps[currentStep].title}</DialogTitle>
          <DialogDescription>
            {tutorialSteps[currentStep].description}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {tutorialSteps[currentStep].content}
        </div>

        <Progress 
          value={(currentStep + 1) / tutorialSteps.length * 100} 
          className="my-4"
        />

        <DialogFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentStep === tutorialSteps.length - 1}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <Button variant="ghost" onClick={handleSkip}>
            Skip Tutorial
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 