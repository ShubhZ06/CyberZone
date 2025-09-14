"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Play, CheckCircle, Clock, BookOpen, Award } from "lucide-react"
import Link from "next/link"
import { mockData, type Module } from "@/lib/data"
import { mockAuth } from "@/lib/auth"
import { motion } from "framer-motion"

interface ModuleViewerProps {
  moduleId: string
}

export function ModuleViewer({ moduleId }: ModuleViewerProps) {
  const [module, setModule] = useState<Module | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const modules = mockData.getModules()
    const foundModule = modules.find((m) => m.id === moduleId)
    if (foundModule) {
      setModule(foundModule)
      setIsCompleted(foundModule.completed)
    }
  }, [moduleId])

  const handleMarkComplete = () => {
    const user = mockAuth.getCurrentUser()
    if (user && module) {
      mockData.updateModuleProgress(user.id, module.id)
      setIsCompleted(true)
      setProgress(100)
    }
  }

  const handleVideoProgress = (currentTime: number, duration: number) => {
    if (duration > 0) {
      const progressPercent = (currentTime / duration) * 100
      setProgress(progressPercent)
    }
  }

  if (!module) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Module not found.</p>
          <Button asChild className="mt-4">
            <Link href="/student/learning">Back to Learning</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/student/learning">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Learning
          </Link>
        </Button>

        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">{module.title}</h1>
            <p className="text-muted-foreground text-lg mb-4 text-pretty">{module.description}</p>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center text-muted-foreground">
                <Clock className="w-4 h-4 mr-2" />
                {module.duration}
              </div>
              <Badge variant={module.difficulty === "Beginner" ? "secondary" : "outline"}>{module.difficulty}</Badge>
              <Badge variant="outline">{module.category}</Badge>
              {isCompleted && (
                <Badge className="bg-primary text-primary-foreground">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 glow-purple">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Play className="w-5 h-5 text-primary" />
                <span>Video Tutorial</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
                <iframe
                  src={module.videoUrl}
                  title={module.title}
                  className="w-full h-full"
                  allowFullScreen
                  onLoad={() => {
                    // In a real implementation, you'd track video progress
                    console.log("Video loaded")
                  }}
                />
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-foreground">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Module Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Learning Content */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 glow-blue">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-accent" />
                <span>Learning Content</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">{module.content}</p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 glow-pink">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-secondary" />
                <span>Complete Module</span>
              </CardTitle>
              <CardDescription>Mark this module as completed to track your progress</CardDescription>
            </CardHeader>
            <CardContent>
              {!isCompleted ? (
                <Button
                  onClick={handleMarkComplete}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark as Complete
                </Button>
              ) : (
                <div className="text-center py-4">
                  <CheckCircle className="w-12 h-12 text-primary mx-auto mb-2" />
                  <p className="text-foreground font-medium">Module Completed!</p>
                  <p className="text-sm text-muted-foreground">Great job on finishing this module.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Link href="/student/learning">
                  <BookOpen className="w-3 h-3 mr-2" />
                  Browse More Modules
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Link href="/student/labs">
                  <Play className="w-3 h-3 mr-2" />
                  Practice in Labs
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
