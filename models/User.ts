// MongoDB User model (for future implementation)
export interface UserModel {
  _id: string
  email: string
  password: string // hashed
  role: "student" | "admin"
  name: string
  avatar?: string
  joinDate: Date
  progress: {
    modulesCompleted: string[]
    labsCompleted: string[]
    certificates: string[]
    totalTimeSpent: number
    lastActivity: Date
  }
  createdAt: Date
  updatedAt: Date
}

// Mongoose schema would be defined here
/*
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  name: { type: String, required: true },
  avatar: String,
  joinDate: { type: Date, default: Date.now },
  progress: {
    modulesCompleted: [String],
    labsCompleted: [String],
    certificates: [String],
    totalTimeSpent: { type: Number, default: 0 },
    lastActivity: { type: Date, default: Date.now }
  }
}, { timestamps: true })
*/
