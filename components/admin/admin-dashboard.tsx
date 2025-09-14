"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Gamepad2, Users, TrendingUp, Plus, Eye, Edit } from "lucide-react"
import Link from "next/link"
import { mockAuth } from "@/lib/auth"
import { mockData } from "@/lib/data"
import { motion } from "framer-motion"

export function AdminDashboard() {
  const user = mockAuth.getCurrentUser()
  const modules = mockData.getModules()
  const labs = mockData.getLabs()

  const stats = [
    {
      title: "Total Modules",
      value: modules.length,
      icon: Play,
      color: "text-primary",
      glow: "glow-purple",
      href: "/admin/modules",
    },
    {
      title: "Total Labs",
      value: labs.length,
      icon: Gamepad2,
      color: "text-secondary",
      glow: "glow-pink",
      href: "/admin/labs",
    },
    {
      title: "Active Users",
      value: "1,247", // Mock data
      icon: Users,
      color: "text-accent",
      glow: "glow-blue",
      href: "/admin/users",
    },
  ]

  const recentModules = modules.slice(0, 3)
  const recentLabs = labs.slice(0, 3)

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Admin <span className="text-primary text-glow">Dashboard</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Welcome back, <span className="text-foreground font-medium">{user?.name}</span>. Manage your cybersecurity
          platform.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card
              className={`bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 ${stat.glow} group cursor-pointer`}
            >
              <Link href={stat.href}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <stat.icon
                    className={`h-4 w-4 ${stat.color} group-hover:scale-110 transition-transform duration-300`}
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                </CardContent>
              </Link>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Modules */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 glow-purple">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Play className="w-5 h-5 text-primary" />
                    <span>Recent Modules</span>
                  </CardTitle>
                  <CardDescription>Latest learning content</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href="/admin/modules">
                      <Eye className="w-3 h-3 mr-1" />
                      View All
                    </Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/admin/modules/new">
                      <Plus className="w-3 h-3 mr-1" />
                      Add Module
                    </Link>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentModules.map((module) => (
                <div
                  key={module.id}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/30 hover:border-primary/30 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-1">{module.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{module.duration}</span>
                      <Badge variant="outline" className="text-xs">
                        {module.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {module.category}
                      </Badge>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Edit className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Labs */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 glow-pink">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Gamepad2 className="w-5 h-5 text-secondary" />
                    <span>Recent Labs</span>
                  </CardTitle>
                  <CardDescription>Interactive learning experiences</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href="/admin/labs">
                      <Eye className="w-3 h-3 mr-1" />
                      View All
                    </Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/admin/labs/new">
                      <Plus className="w-3 h-3 mr-1" />
                      Add Lab
                    </Link>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentLabs.map((lab) => (
                <div
                  key={lab.id}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/30 hover:border-secondary/30 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-1">{lab.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{lab.estimatedTime}</span>
                      <Badge variant="outline" className="text-xs">
                        {lab.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {lab.category}
                      </Badge>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Edit className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-8"
      >
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 glow-blue">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              <span>Quick Actions</span>
            </CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80"
              >
                <Link href="/admin/modules/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Module
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/admin/labs/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Lab
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/admin/users">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
