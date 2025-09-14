import { users } from "../mock-data/users.json"

export interface User {
  id: string
  email: string
  role: "student" | "admin"
  name: string
  avatar: string
  joinDate: string
  progress?: {
    modulesCompleted: number
    totalModules: number
    labsCompleted: number
    totalLabs: number
    certificates: string[]
  }
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

// Mock authentication functions
export const mockAuth = {
  login: async (email: string, password: string): Promise<User | null> => {
    const user = users.find((u) => u.email === email && u.password === password)
    if (user) {
      const { password: _, ...userWithoutPassword } = user
      return userWithoutPassword as User
    }
    return null
  },

  getCurrentUser: (): User | null => {
    if (typeof window === "undefined") return null
    const userData = localStorage.getItem("cyberzone_user")
    return userData ? JSON.parse(userData) : null
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cyberzone_user")
    }
  },

  setUser: (user: User) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cyberzone_user", JSON.stringify(user))
    }
  },
}
