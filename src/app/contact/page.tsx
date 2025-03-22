"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this to your backend
    console.log("Form submitted:", formData)
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground">
            Have questions about financial literacy? We're here to help!
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
          </CardHeader>
          <CardContent>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded h-32"
                    placeholder="Your message..."
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            ) : (
              <div className="text-center py-8">
                <h3 className="text-xl font-medium text-green-600 mb-2">
                  Thanks for reaching out!
                </h3>
                <p className="text-muted-foreground">
                  We'll get back to you as soon as possible.
                </p>
                <Button
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({ name: "", email: "", message: "" })
                  }}
                  className="mt-4"
                >
                  Send Another Message
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
              <div>
                <h3 className="font-medium mb-2">Email Us</h3>
                <p className="text-muted-foreground">support@moneywise.com</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Follow Us</h3>
                <p className="text-muted-foreground">@moneywiseapp</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
} 