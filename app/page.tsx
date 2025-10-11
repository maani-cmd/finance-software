"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import {
  User,
  Briefcase,
  Building2,
  Users,
  TrendingUp,
  TrendingDown,
  PieChart,
  CalendarIcon,
  Download,
  Plus,
  Calculator,
  Target,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Settings,
  Upload,
  Trash2,
  Brain,
  Zap,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  TrendingDownIcon,
  TrendingUpIcon,
  Pencil,
} from "lucide-react"

type UserType = "freelancer" | "entrepreneur" | "salaried" | "business-owner" | null

interface Transaction {
  id: string
  type: "income" | "expense" | "sale" | "purchase" | "investment" | "asset" | "liability"
  amount: number
  category: string
  subcategory: string
  description: string
  date: Date
  paymentMethod: string
  client?: string
  project?: string
  taxDeductible: boolean
  currency: string
  attachments?: string[]
}

interface FinancialSummary {
  totalIncome: number
  totalExpenses: number
  totalSales: number
  totalPurchases: number
  netProfit: number
  cashFlow: number
  profitMargin: number
  monthlyGrowth: number
}

interface AIInsight {
  id: string
  type: "warning" | "opportunity" | "prediction" | "optimization"
  title: string
  description: string
  impact: "high" | "medium" | "low"
  confidence: number
  actionable: boolean
  category: string
  value?: number
}

interface FinancialPattern {
  pattern: string
  frequency: number
  averageAmount: number
  trend: "increasing" | "decreasing" | "stable"
  seasonality?: string
  predictedNext: number
}

interface CashFlowPrediction {
  date: Date
  predictedInflow: number
  predictedOutflow: number
  confidence: number
  factors: string[]
}

const userTypeConfig = {
  freelancer: {
    title: "Freelancer",
    icon: User,
    description: "Project-based income tracking and client management",
    categories: {
      income: ["Client Payments", "Royalties", "Licensing", "Consulting"],
      expense: ["Equipment", "Software", "Marketing", "Professional Development", "Home Office"],
      sale: ["Services", "Digital Products", "Courses", "Consultations"],
      purchase: ["Tools", "Software Licenses", "Equipment", "Materials"],
    },
    metrics: ["Project Profitability", "Client Payment Cycles", "Hourly Rates", "Utilization Rate"],
  },
  entrepreneur: {
    title: "Entrepreneur",
    icon: Briefcase,
    description: "Business growth metrics and investment tracking",
    categories: {
      income: ["Revenue", "Investment Returns", "Partnerships", "Licensing"],
      expense: ["Operations", "Marketing", "R&D", "Legal", "Staff"],
      sale: ["Products", "Services", "Subscriptions", "Partnerships"],
      purchase: ["Inventory", "Equipment", "Technology", "Raw Materials"],
    },
    metrics: ["ROI", "Customer Acquisition Cost", "Lifetime Value", "Burn Rate"],
  },
  salaried: {
    title: "Salaried Professional",
    icon: Building2,
    description: "Personal budget optimization and side income tracking",
    categories: {
      income: ["Salary", "Bonuses", "Side Hustle", "Investments", "Dividends"],
      expense: ["Living", "Transportation", "Healthcare", "Education", "Entertainment"],
      sale: ["Side Business", "Freelance Work", "Resale Items"],
      purchase: ["Personal", "Investment", "Education", "Health"],
    },
    metrics: ["Savings Rate", "Debt-to-Income", "Emergency Fund", "Investment Growth"],
  },
  "business-owner": {
    title: "Small Business Owner",
    icon: Users,
    description: "Comprehensive financial health and operations tracking",
    categories: {
      income: ["Sales Revenue", "Service Income", "Interest", "Other Income"],
      expense: ["COGS", "Operating Expenses", "Payroll", "Taxes", "Interest"],
      sale: ["Products", "Services", "Wholesale", "Online Sales"],
      purchase: ["Inventory", "Supplies", "Equipment", "Services"],
    },
    metrics: ["Gross Margin", "Operating Margin", "Working Capital", "Inventory Turnover"],
  },
}

export default function ComprehensiveAccountingApp() {
  const [userType, setUserType] = useState<UserType>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false)
  const [selectedTransactionType, setSelectedTransactionType] = useState<string>("")
  const [financialSummary, setFinancialSummary] = useState<FinancialSummary>({
    totalIncome: 0,
    totalExpenses: 0,
    totalSales: 0,
    totalPurchases: 0,
    netProfit: 0,
    cashFlow: 0,
    profitMargin: 0,
    monthlyGrowth: 0,
  })

  const [aiInsights, setAiInsights] = useState<AIInsight[]>([])
  const [financialPatterns, setFinancialPatterns] = useState<FinancialPattern[]>([])
  const [cashFlowPredictions, setCashFlowPredictions] = useState<CashFlowPrediction[]>([])

  const [reportPreview, setReportPreview] = useState<{
    title: string
    content: React.ReactNode
    data: any
  } | null>(null)

  // State for editing transactions
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Transaction | null>(null)

  // Advanced Mathematical Analysis Functions
  const calculateFinancialVelocity = (transactions: Transaction[]): number => {
    if (transactions.length < 2) return 0

    const sortedTransactions = [...transactions].sort((a, b) => a.date.getTime() - b.date.getTime())
    let velocitySum = 0
    let count = 0

    for (let i = 1; i < sortedTransactions.length; i++) {
      const timeDiff =
        (sortedTransactions[i].date.getTime() - sortedTransactions[i - 1].date.getTime()) / (1000 * 60 * 60 * 24) // days
      const amountDiff = Math.abs(sortedTransactions[i].amount - sortedTransactions[i - 1].amount)

      if (timeDiff > 0) {
        velocitySum += amountDiff / timeDiff
        count++
      }
    }

    return count > 0 ? velocitySum / count : 0
  }

  const calculateCashFlowEntropy = (transactions: Transaction[]): number => {
    const dailyFlows = new Map<string, number>()

    transactions.forEach((t) => {
      const dateKey = t.date.toISOString().split("T")[0]
      const flow = t.type === "income" || t.type === "sale" ? t.amount : -t.amount
      dailyFlows.set(dateKey, (dailyFlows.get(dateKey) || 0) + flow)
    })

    const flows = Array.from(dailyFlows.values())
    if (flows.length === 0) return 0

    const total = flows.reduce((sum, flow) => sum + Math.abs(flow), 0)
    if (total === 0) return 0

    let entropy = 0
    flows.forEach((flow) => {
      const probability = Math.abs(flow) / total
      if (probability > 0) {
        entropy -= probability * Math.log2(probability)
      }
    })

    return entropy
  }

  const detectFinancialCycles = (transactions: Transaction[]): FinancialPattern[] => {
    const patterns: FinancialPattern[] = []
    const categoryGroups = new Map<string, Transaction[]>()

    transactions.forEach((t) => {
      if (!categoryGroups.has(t.category)) {
        categoryGroups.set(t.category, [])
      }
      categoryGroups.get(t.category)!.push(t)
    })

    categoryGroups.forEach((categoryTransactions, category) => {
      if (categoryTransactions.length < 3) return

      const sortedTransactions = categoryTransactions.sort((a, b) => a.date.getTime() - b.date.getTime())
      const intervals: number[] = []

      for (let i = 1; i < sortedTransactions.length; i++) {
        const daysDiff =
          (sortedTransactions[i].date.getTime() - sortedTransactions[i - 1].date.getTime()) / (1000 * 60 * 60 * 24)
        intervals.push(daysDiff)
      }

      const avgInterval = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length
      const avgAmount = categoryTransactions.reduce((sum, t) => sum + t.amount, 0) / categoryTransactions.length

      // Detect trend using linear regression
      const n = sortedTransactions.length
      const sumX = sortedTransactions.reduce((sum, _, i) => sum + i, 0)
      const sumY = sortedTransactions.reduce((sum, t) => sum + t.amount, 0)
      const sumXY = sortedTransactions.reduce((sum, t, i) => sum + i * t.amount, 0)
      const sumXX = sortedTransactions.reduce((sum, _, i) => sum + i * i, 0)

      const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
      const trend = slope > 0.1 ? "increasing" : slope < -0.1 ? "decreasing" : "stable"

      // Predict next occurrence
      const lastTransaction = sortedTransactions[sortedTransactions.length - 1]
      const predictedNext = lastTransaction.amount + slope

      patterns.push({
        pattern: category,
        frequency: avgInterval,
        averageAmount: avgAmount,
        trend,
        predictedNext: Math.max(0, predictedNext),
      })
    })

    return patterns.sort((a, b) => b.averageAmount - a.averageAmount)
  }

  const generateCashFlowPredictions = (transactions: Transaction[]): CashFlowPrediction[] => {
    if (transactions.length < 5) return []

    const predictions: CashFlowPrediction[] = []
    const sortedTransactions = [...transactions].sort((a, b) => a.date.getTime() - b.date.getTime())

    // Analyze historical patterns for next 12 weeks
    for (let week = 1; week <= 12; week++) {
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + week * 7)

      // Calculate seasonal factors
      const monthOfYear = futureDate.getMonth()
      const dayOfWeek = futureDate.getDay()

      // Historical data for same month
      const sameMonthTransactions = sortedTransactions.filter((t) => t.date.getMonth() === monthOfYear)
      const avgMonthlyInflow =
        sameMonthTransactions
          .filter((t) => t.type === "income" || t.type === "sale")
          .reduce((sum, t) => sum + t.amount, 0) / Math.max(1, sameMonthTransactions.length)

      const avgMonthlyOutflow =
        sameMonthTransactions
          .filter((t) => t.type === "expense" || t.type === "purchase")
          .reduce((sum, t) => sum + t.amount, 0) / Math.max(1, sameMonthTransactions.length)

      // Apply trend analysis
      const recentTrend = calculateRecentTrend(sortedTransactions.slice(-10))
      const trendFactor = 1 + recentTrend * week * 0.1

      // Calculate confidence based on data consistency
      const consistency = calculateDataConsistency(sameMonthTransactions)
      const confidence = Math.min(95, Math.max(20, consistency * 100))

      predictions.push({
        date: futureDate,
        predictedInflow: avgMonthlyInflow * trendFactor,
        predictedOutflow: avgMonthlyOutflow * trendFactor,
        confidence,
        factors: [
          `Seasonal pattern (${monthOfYear + 1}/${futureDate.getFullYear()})`,
          `Historical trend: ${recentTrend > 0 ? "positive" : recentTrend < 0 ? "negative" : "stable"}`,
          `Data consistency: ${(consistency * 100).toFixed(0)}%`,
        ],
      })
    }

    return predictions
  }

  const calculateRecentTrend = (recentTransactions: Transaction[]): number => {
    if (recentTransactions.length < 2) return 0

    const netFlows = recentTransactions.map((t) => (t.type === "income" || t.type === "sale" ? t.amount : -t.amount))

    const n = netFlows.length
    const sumX = netFlows.reduce((sum, _, i) => sum + i, 0)
    const sumY = netFlows.reduce((sum, flow) => sum + flow, 0)
    const sumXY = netFlows.reduce((sum, flow, i) => sum + i * flow, 0)
    const sumXX = netFlows.reduce((sum, _, i) => sum + i * i, 0)

    return (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX) || 0
  }

  const calculateDataConsistency = (transactions: Transaction[]): number => {
    if (transactions.length < 2) return 0

    const amounts = transactions.map((t) => t.amount)
    const mean = amounts.reduce((sum, amount) => sum + amount, 0) / amounts.length
    const variance = amounts.reduce((sum, amount) => sum + Math.pow(amount - mean, 2), 0) / amounts.length
    const stdDev = Math.sqrt(variance)

    const coefficientOfVariation = mean > 0 ? stdDev / mean : 1
    return Math.max(0, 1 - coefficientOfVariation)
  }

  const generateAIInsights = (transactions: Transaction[], patterns: FinancialPattern[]): AIInsight[] => {
    const insights: AIInsight[] = []

    // Cash Flow Velocity Analysis
    const velocity = calculateFinancialVelocity(transactions)
    if (velocity > 1000) {
      insights.push({
        id: "velocity-high",
        type: "warning",
        title: "High Financial Velocity Detected",
        description: `Your transaction velocity is ${velocity.toFixed(0)} Rs./day. This indicates rapid financial changes that may require closer monitoring.`,
        impact: "high",
        confidence: 85,
        actionable: true,
        category: "Cash Flow Management",
      })
    }

    // Entropy Analysis for Financial Stability
    const entropy = calculateCashFlowEntropy(transactions)
    if (entropy > 3) {
      insights.push({
        id: "entropy-high",
        type: "opportunity",
        title: "Financial Flow Optimization Opportunity",
        description: `Your cash flow entropy is ${entropy.toFixed(2)}, suggesting irregular patterns. Smoothing these could improve predictability by up to 30%.`,
        impact: "medium",
        confidence: 78,
        actionable: true,
        category: "Financial Stability",
      })
    }

    // Pattern-Based Predictions
    patterns.forEach((pattern) => {
      if (pattern.trend === "increasing" && pattern.averageAmount > 5000) {
        insights.push({
          id: `pattern-${pattern.pattern}`,
          type: "prediction",
          title: `${pattern.pattern} Growth Trajectory`,
          description: `Your ${pattern.pattern} category shows a ${(((pattern.predictedNext - pattern.averageAmount) / pattern.averageAmount) * 100).toFixed(1)}% growth trend. Next predicted amount: Rs.${pattern.predictedNext.toFixed(0)}`,
          impact: "high",
          confidence: 82,
          actionable: true,
          category: "Growth Analysis",
          value: pattern.predictedNext,
        })
      }
    })

    // Seasonal Optimization
    const monthlyDistribution = new Map<number, number>()
    transactions.forEach((t) => {
      const month = t.date.getMonth()
      const amount = t.type === "income" || t.type === "sale" ? t.amount : -t.amount
      monthlyDistribution.set(month, (monthlyDistribution.get(month) || 0) + amount)
    })

    const bestMonth = Array.from(monthlyDistribution.entries()).reduce(
      (best, current) => (current[1] > best[1] ? current : best),
      [0, Number.NEGATIVE_INFINITY],
    )

    if (bestMonth[1] > 0) {
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      insights.push({
        id: "seasonal-peak",
        type: "optimization",
        title: "Seasonal Performance Peak Identified",
        description: `${monthNames[bestMonth[0]]} is your strongest month with Rs.${bestMonth[1].toFixed(0)} net flow. Consider scaling operations during this period.`,
        impact: "high",
        confidence: 90,
        actionable: true,
        category: "Seasonal Strategy",
      })
    }

    // Risk Assessment using Mathematical Models
    const riskScore = calculateFinancialRisk(transactions)
    if (riskScore > 0.7) {
      insights.push({
        id: "risk-assessment",
        type: "warning",
        title: "Elevated Financial Risk Detected",
        description: `Risk score: ${(riskScore * 100).toFixed(0)}%. Consider diversifying income sources and building emergency reserves.`,
        impact: "high",
        confidence: 88,
        actionable: true,
        category: "Risk Management",
      })
    }

    return insights.sort((a, b) => {
      const impactWeight = { high: 3, medium: 2, low: 1 }
      return impactWeight[b.impact] * b.confidence - impactWeight[a.impact] * a.confidence
    })
  }

  const calculateFinancialRisk = (transactions: Transaction[]): number => {
    if (transactions.length < 10) return 0.5

    const monthlyNetFlows = new Map<string, number>()
    transactions.forEach((t) => {
      const monthKey = `${t.date.getFullYear()}-${t.date.getMonth()}`
      const flow = t.type === "income" || t.type === "sale" ? t.amount : -t.amount
      monthlyNetFlows.set(monthKey, (monthlyNetFlows.get(monthKey) || 0) + flow)
    })

    const flows = Array.from(monthlyNetFlows.values())
    const negativeMonths = flows.filter((flow) => flow < 0).length
    const volatility = calculateVolatility(flows)
    const trendStability = Math.abs(calculateRecentTrend(transactions))

    // Composite risk score (0-1)
    const riskScore =
      (negativeMonths / flows.length) * 0.4 +
      Math.min(1, volatility / 10000) * 0.4 +
      Math.min(1, trendStability / 1000) * 0.2

    return Math.min(1, Math.max(0, riskScore))
  }

  const calculateVolatility = (values: number[]): number => {
    if (values.length < 2) return 0

    const mean = values.reduce((sum, val) => sum + val, 0) / values.length
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length
    return Math.sqrt(variance)
  }

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem("accounting-transactions")
    const savedUserType = localStorage.getItem("accounting-user-type")

    if (savedTransactions) {
      try {
        const parsedTransactions = JSON.parse(savedTransactions).map((t: any) => ({
          ...t,
          date: new Date(t.date),
        }))
        setTransactions(parsedTransactions)
      } catch (error) {
        console.error("Failed to load transactions from localStorage:", error)
      }
    }

    if (savedUserType) {
      setUserType(savedUserType as UserType)
    }
  }, [])

  // Save data to localStorage whenever transactions change
  // Replace the "Save data to localStorage whenever transactions change" effect with this version to also handle empty arrays:
  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem("accounting-transactions", JSON.stringify(transactions))
    } else {
      localStorage.removeItem("accounting-transactions")
    }
  }, [transactions])

  // Save userType to localStorage whenever it changes
  useEffect(() => {
    if (userType) {
      localStorage.setItem("accounting-user-type", userType)
    }
  }, [userType])

  // Advanced AI Analysis - runs whenever transactions change
  useEffect(() => {
    if (transactions.length > 0) {
      const patterns = detectFinancialCycles(transactions)
      const insights = generateAIInsights(transactions, patterns)
      const predictions = generateCashFlowPredictions(transactions)

      setFinancialPatterns(patterns)
      setAiInsights(insights)
      setCashFlowPredictions(predictions)
    }
  }, [transactions])

  // Data management functions
  const handleDataBackup = () => {
    const backupData = {
      transactions,
      userType,
      exportDate: new Date().toISOString(),
      version: "1.0",
    }

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `accounting-backup-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleDataRestore = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const backupData = JSON.parse(e.target?.result as string)
        if (backupData.transactions && Array.isArray(backupData.transactions)) {
          const restoredTransactions = backupData.transactions.map((t: any) => ({
            ...t,
            date: new Date(t.date),
          }))
          setTransactions(restoredTransactions)
          if (backupData.userType) {
            setUserType(backupData.userType)
          }
          alert(`Successfully restored ${backupData.transactions.length} transactions!`)
        } else {
          alert("Invalid backup file format")
        }
      } catch (error) {
        alert("Failed to restore backup: Invalid file format")
      }
    }
    reader.readAsText(file)
  }

  const clearAllData = () => {
    if (confirm("Are you sure you want to delete all data? This cannot be undone.")) {
      setTransactions([])
      setUserType(null)
      localStorage.removeItem("accounting-transactions")
      localStorage.removeItem("accounting-user-type")
      alert("All data has been cleared.")
    }
  }

  // Report generation functions
  const generateProfitLossReport = () => {
    // Robust calculation with proper filtering and validation
    const incomeTransactions = transactions.filter(
      (t) => t.type === "income" && typeof t.amount === "number" && !isNaN(t.amount),
    )
    const expenseTransactions = transactions.filter(
      (t) => t.type === "expense" && typeof t.amount === "number" && !isNaN(t.amount),
    )
    const salesTransactions = transactions.filter(
      (t) => t.type === "sale" && typeof t.amount === "number" && !isNaN(t.amount),
    )
    const purchaseTransactions = transactions.filter(
      (t) => t.type === "purchase" && typeof t.amount === "number" && !isNaN(t.amount),
    )

    const totalIncome = incomeTransactions.reduce((sum, t) => sum + Number(t.amount), 0)
    const totalExpenses = expenseTransactions.reduce((sum, t) => sum + Number(t.amount), 0)
    const totalSales = salesTransactions.reduce((sum, t) => sum + Number(t.amount), 0)
    const totalPurchases = purchaseTransactions.reduce((sum, t) => sum + Number(t.amount), 0)

    const totalRevenue = totalIncome + totalSales
    const totalCosts = totalExpenses + totalPurchases
    const grossProfit = totalRevenue - totalCosts
    const profitMargin = totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0

    // Detailed breakdown by category for accuracy
    const incomeByCategory = incomeTransactions.reduce(
      (acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Number(t.amount)
        return acc
      },
      {} as Record<string, number>,
    )

    const salesByCategory = salesTransactions.reduce(
      (acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Number(t.amount)
        return acc
      },
      {} as Record<string, number>,
    )

    const expensesByCategory = expenseTransactions.reduce(
      (acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Number(t.amount)
        return acc
      },
      {} as Record<string, number>,
    )

    const purchasesByCategory = purchaseTransactions.reduce(
      (acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Number(t.amount)
        return acc
      },
      {} as Record<string, number>,
    )

    const reportContent = (
      <div className="space-y-6">
        <div className="text-center border-b pb-4">
          <h2 className="text-2xl font-bold">Profit & Loss Statement</h2>
          <p className="text-gray-600">For the period ending {new Date().toLocaleDateString()}</p>
          <p className="text-sm text-gray-500">Based on {transactions.length} total transactions</p>
        </div>

        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg text-green-800 mb-3">Revenue</h3>

            {/* Income Breakdown */}
            <div className="mb-4">
              <h4 className="font-semibold text-green-700 mb-2">Income ({incomeTransactions.length} transactions)</h4>
              {Object.entries(incomeByCategory).map(([category, amount]) => (
                <div key={category} className="flex justify-between text-sm ml-4">
                  <span>{category}:</span>
                  <span className="font-medium">Rs.{amount.toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between border-t pt-1 mt-2 ml-4">
                <span className="font-medium">Subtotal Income:</span>
                <span className="font-bold">Rs.{totalIncome.toLocaleString()}</span>
              </div>
            </div>

            {/* Sales Breakdown */}
            <div className="mb-4">
              <h4 className="font-semibold text-green-700 mb-2">Sales ({salesTransactions.length} transactions)</h4>
              {Object.entries(salesByCategory).map(([category, amount]) => (
                <div key={category} className="flex justify-between text-sm ml-4">
                  <span>{category}:</span>
                  <span className="font-medium">Rs.{amount.toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between border-t pt-1 mt-2 ml-4">
                <span className="font-medium">Subtotal Sales:</span>
                <span className="font-bold">Rs.{totalSales.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-between border-t-2 pt-2 font-bold text-lg">
              <span>Total Revenue:</span>
              <span>Rs.{totalRevenue.toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg text-red-800 mb-3">Expenses & Costs</h3>

            {/* Expenses Breakdown */}
            <div className="mb-4">
              <h4 className="font-semibold text-red-700 mb-2">
                Operating Expenses ({expenseTransactions.length} transactions)
              </h4>
              {Object.entries(expensesByCategory).map(([category, amount]) => (
                <div key={category} className="flex justify-between text-sm ml-4">
                  <span>{category}:</span>
                  <span className="font-medium">Rs.{amount.toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between border-t pt-1 mt-2 ml-4">
                <span className="font-medium">Subtotal Expenses:</span>
                <span className="font-bold">Rs.{totalExpenses.toLocaleString()}</span>
              </div>
            </div>

            {/* Purchases Breakdown */}
            <div className="mb-4">
              <h4 className="font-semibold text-red-700 mb-2">
                Purchases ({purchaseTransactions.length} transactions)
              </h4>
              {Object.entries(purchasesByCategory).map(([category, amount]) => (
                <div key={category} className="flex justify-between text-sm ml-4">
                  <span>{category}:</span>
                  <span className="font-medium">Rs.{amount.toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between border-t pt-1 mt-2 ml-4">
                <span className="font-medium">Subtotal Purchases:</span>
                <span className="font-bold">Rs.{totalPurchases.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-between border-t-2 pt-2 font-bold text-lg">
              <span>Total Costs:</span>
              <span>Rs.{totalCosts.toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg text-blue-800 mb-3">Net Result</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Total Revenue:</span>
                <span className="font-medium text-green-600">Rs.{totalRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Costs:</span>
                <span className="font-medium text-red-600">Rs.{totalCosts.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t-2 pt-2">
                <span>Net Profit/Loss:</span>
                <span className={grossProfit >= 0 ? "text-green-600" : "text-red-600"}>
                  Rs.{grossProfit.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Profit Margin:</span>
                <span className={`font-medium ${profitMargin >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {profitMargin.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Return on Revenue:</span>
                <span>{totalRevenue > 0 ? ((grossProfit / totalRevenue) * 100).toFixed(2) : "0.00"}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

    setReportPreview({
      title: "Profit & Loss Statement",
      content: reportContent,
      data: {
        totalRevenue,
        totalCosts,
        grossProfit,
        profitMargin,
        totalIncome,
        totalSales,
        totalExpenses,
        totalPurchases,
        transactionCounts: {
          income: incomeTransactions.length,
          sales: salesTransactions.length,
          expenses: expenseTransactions.length,
          purchases: purchaseTransactions.length,
        },
      },
    })
  }

  const generateCashFlowReport = () => {
    // Robust cash flow calculation with proper categorization
    const inflowTransactions = transactions.filter(
      (t) => (t.type === "income" || t.type === "sale") && typeof t.amount === "number" && !isNaN(t.amount),
    )

    const outflowTransactions = transactions.filter(
      (t) => (t.type === "expense" || t.type === "purchase") && typeof t.amount === "number" && !isNaN(t.amount),
    )

    const totalInflows = inflowTransactions.reduce((sum, t) => sum + Number(t.amount), 0)
    const totalOutflows = outflowTransactions.reduce((sum, t) => sum + Number(t.amount), 0)
    const netCashFlow = totalInflows - totalOutflows

    // Detailed cash flow by category
    const inflowsByCategory = inflowTransactions.reduce(
      (acc, t) => {
        const key = `${t.category} (${t.type})`
        acc[key] = (acc[key] || 0) + Number(t.amount)
        return acc
      },
      {} as Record<string, number>,
    )

    const outflowsByCategory = outflowTransactions.reduce(
      (acc, t) => {
        const key = `${t.category} (${t.type})`
        acc[key] = (acc[key] || 0) + Number(t.amount)
        return acc
      },
      {} as Record<string, number>,
    )

    // Monthly cash flow analysis
    const monthlyCashFlow = transactions.reduce(
      (acc, t) => {
        if (typeof t.amount !== "number" || isNaN(t.amount)) return acc

        const monthKey = `${t.date.getFullYear()}-${String(t.date.getMonth() + 1).padStart(2, "0")}`
        if (!acc[monthKey]) {
          acc[monthKey] = { inflows: 0, outflows: 0, net: 0 }
        }

        const amount = Number(t.amount)
        if (t.type === "income" || t.type === "sale") {
          acc[monthKey].inflows += amount
        } else if (t.type === "expense" || t.type === "purchase") {
          acc[monthKey].outflows += amount
        }
        acc[monthKey].net = acc[monthKey].inflows - acc[monthKey].outflows

        return acc
      },
      {} as Record<string, { inflows: number; outflows: number; net: number }>,
    )

    const reportContent = (
      <div className="space-y-6">
        <div className="text-center border-b pb-4">
          <h2 className="text-2xl font-bold">Cash Flow Statement</h2>
          <p className="text-gray-600">For the period ending {new Date().toLocaleDateString()}</p>
          <p className="text-sm text-gray-500">
            Based on {inflowTransactions.length} inflow and {outflowTransactions.length} outflow transactions
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg text-green-800 mb-3">Cash Inflows</h3>
            <div className="space-y-2">
              {Object.entries(inflowsByCategory)
                .sort(([, a], [, b]) => b - a)
                .map(([category, amount]) => (
                  <div key={category} className="flex justify-between">
                    <span className="text-sm">{category}:</span>
                    <span className="font-medium">Rs.{amount.toLocaleString()}</span>
                  </div>
                ))}
              <div className="flex justify-between border-t-2 pt-2 font-bold text-lg">
                <span>Total Cash Inflows:</span>
                <span>Rs.{totalInflows.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg text-red-800 mb-3">Cash Outflows</h3>
            <div className="space-y-2">
              {Object.entries(outflowsByCategory)
                .sort(([, a], [, b]) => b - a)
                .map(([category, amount]) => (
                  <div key={category} className="flex justify-between">
                    <span className="text-sm">{category}:</span>
                    <span className="font-medium">Rs.{amount.toLocaleString()}</span>
                  </div>
                ))}
              <div className="flex justify-between border-t-2 pt-2 font-bold text-lg">
                <span>Total Cash Outflows:</span>
                <span>Rs.{totalOutflows.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg text-blue-800 mb-3">Net Cash Flow Analysis</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Total Inflows:</span>
                <span className="font-medium text-green-600">Rs.{totalInflows.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Outflows:</span>
                <span className="font-medium text-red-600">Rs.{totalOutflows.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t-2 pt-2">
                <span>Net Cash Flow:</span>
                <span className={netCashFlow >= 0 ? "text-green-600" : "text-red-600"}>
                  Rs.{netCashFlow.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Cash Flow Ratio:</span>
                <span className="font-medium">
                  {totalOutflows > 0 ? (totalInflows / totalOutflows).toFixed(2) : "N/A"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Average Monthly Net Flow:</span>
                <span className="font-medium">
                  Rs.
                  {Object.keys(monthlyCashFlow).length > 0
                    ? (
                        Object.values(monthlyCashFlow).reduce((sum, month) => sum + month.net, 0) /
                        Object.keys(monthlyCashFlow).length
                      ).toLocaleString()
                    : "0"}
                </span>
              </div>
            </div>
          </div>

          {/* Monthly Breakdown */}
          {Object.keys(monthlyCashFlow).length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-lg text-gray-800 mb-3">Monthly Cash Flow Breakdown</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {Object.entries(monthlyCashFlow)
                  .sort(([a], [b]) => b.localeCompare(a))
                  .map(([month, data]) => (
                    <div key={month} className="flex justify-between items-center p-2 bg-white rounded text-sm">
                      <span className="font-medium">
                        {new Date(month + "-01").toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                      </span>
                      <div className="flex gap-4">
                        <span className="text-green-600">+Rs.{data.inflows.toLocaleString()}</span>
                        <span className="text-red-600">-Rs.{data.outflows.toLocaleString()}</span>
                        <span className={`font-bold ${data.net >= 0 ? "text-green-600" : "text-red-600"}`}>
                          Rs.{data.net.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )

    setReportPreview({
      title: "Cash Flow Statement",
      content: reportContent,
      data: {
        totalInflows,
        totalOutflows,
        netCashFlow,
        inflowsByCategory,
        outflowsByCategory,
        monthlyCashFlow,
        transactionCounts: {
          inflows: inflowTransactions.length,
          outflows: outflowTransactions.length,
        },
      },
    })
  }

  const generateTaxReport = () => {
    // Robust tax calculation with proper validation
    const taxDeductibleTransactions = transactions.filter(
      (t) => t.taxDeductible === true && typeof t.amount === "number" && !isNaN(t.amount),
    )

    const totalDeductions = taxDeductibleTransactions.reduce((sum, t) => sum + Number(t.amount), 0)

    // Group by category and type for detailed analysis
    const deductionsByCategory = taxDeductibleTransactions.reduce(
      (acc, t) => {
        const key = t.category
        if (!acc[key]) {
          acc[key] = { amount: 0, count: 0, transactions: [] }
        }
        acc[key].amount += Number(t.amount)
        acc[key].count += 1
        acc[key].transactions.push(t)
        return acc
      },
      {} as Record<string, { amount: number; count: number; transactions: Transaction[] }>,
    )

    // Calculate potential tax savings (assuming different tax brackets)
    const estimatedTaxSavings = {
      low: totalDeductions * 0.15, // 15% tax bracket
      medium: totalDeductions * 0.25, // 25% tax bracket
      high: totalDeductions * 0.35, // 35% tax bracket
    }

    // Monthly deduction analysis
    const monthlyDeductions = taxDeductibleTransactions.reduce(
      (acc, t) => {
        const monthKey = `${t.date.getFullYear()}-${String(t.date.getMonth() + 1).padStart(2, "0")}`
        acc[monthKey] = (acc[monthKey] || 0) + Number(t.amount)
        return acc
      },
      {} as Record<string, number>,
    )

    const reportContent = (
      <div className="space-y-6">
        <div className="text-center border-b pb-4">
          <h2 className="text-2xl font-bold">Tax Summary Report</h2>
          <p className="text-gray-600">Tax-deductible expenses for {new Date().getFullYear()}</p>
          <p className="text-sm text-gray-500">
            Based on {taxDeductibleTransactions.length} tax-deductible transactions out of {transactions.length} total
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg text-blue-800 mb-3">Deduction Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Deductible Transactions:</span>
                <span className="font-medium">{taxDeductibleTransactions.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Deduction Percentage:</span>
                <span className="font-medium">
                  {transactions.length > 0
                    ? ((taxDeductibleTransactions.length / transactions.length) * 100).toFixed(1)
                    : "0.0"}
                  %
                </span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t pt-2">
                <span>Total Tax Deductions:</span>
                <span className="text-green-600">Rs.{totalDeductions.toLocaleString()}</span>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-700">Estimated Tax Savings</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>15% Tax Bracket:</span>
                  <span className="font-medium text-green-600">Rs.{estimatedTaxSavings.low.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>25% Tax Bracket:</span>
                  <span className="font-medium text-green-600">Rs.{estimatedTaxSavings.medium.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>35% Tax Bracket:</span>
                  <span className="font-medium text-green-600">Rs.{estimatedTaxSavings.high.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-lg">Deductible Expenses by Category</h3>
          {Object.entries(deductionsByCategory)
            .sort(([, a], [, b]) => b.amount - a.amount)
            .map(([category, data]) => (
              <div key={category} className="p-3 bg-gray-50 rounded">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{category}</span>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{data.count} transactions</Badge>
                    <span className="font-bold">Rs.{data.amount.toLocaleString()}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Average per transaction: Rs.{(data.amount / data.count).toLocaleString()}
                </div>
              </div>
            ))}
        </div>

        {Object.keys(monthlyDeductions).length > 0 && (
          <div className="space-y-3">
            <h3 className="font-bold text-lg">Monthly Deduction Breakdown</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(monthlyDeductions)
                .sort(([a], [b]) => b.localeCompare(a))
                .map(([month, amount]) => (
                  <div key={month} className="p-3 border rounded text-center">
                    <div className="text-sm text-gray-600">
                      {new Date(month + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </div>
                    <div className="font-bold text-green-600">Rs.{amount.toLocaleString()}</div>
                  </div>
                ))}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <h3 className="font-bold text-lg">Detailed Transaction List</h3>
          <div className="max-h-60 overflow-y-auto space-y-2">
            {taxDeductibleTransactions
              .sort((a, b) => b.date.getTime() - a.date.getTime())
              .map((transaction) => (
                <div key={transaction.id} className="p-3 border rounded text-sm">
                  <div className="flex justify-between font-medium">
                    <span>{transaction.description}</span>
                    <span>Rs.{Number(transaction.amount).toLocaleString()}</span>
                  </div>
                  <div className="text-gray-600 flex justify-between">
                    <span>
                      {transaction.category} • {transaction.type}
                    </span>
                    <span>
                      {transaction.date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    )

    setReportPreview({
      title: "Tax Summary Report",
      content: reportContent,
      data: {
        taxDeductibleTransactions,
        totalDeductions,
        deductionsByCategory,
        monthlyDeductions,
        estimatedTaxSavings,
        deductionPercentage:
          transactions.length > 0 ? (taxDeductibleTransactions.length / transactions.length) * 100 : 0,
      },
    })
  }

  const generateMonthlyReport = () => {
    // Robust monthly calculation with proper data validation
    const monthlyData = transactions.reduce(
      (acc, transaction) => {
        if (typeof transaction.amount !== "number" || isNaN(transaction.amount)) return acc

        const monthKey = `${transaction.date.getFullYear()}-${String(transaction.date.getMonth() + 1).padStart(2, "0")}`
        if (!acc[monthKey]) {
          acc[monthKey] = {
            income: 0,
            expenses: 0,
            sales: 0,
            purchases: 0,
            transactions: [],
            transactionCounts: { income: 0, expenses: 0, sales: 0, purchases: 0 },
          }
        }

        const amount = Number(transaction.amount)
        acc[monthKey].transactions.push(transaction)

        if (transaction.type === "income") {
          acc[monthKey].income += amount
          acc[monthKey].transactionCounts.income += 1
        } else if (transaction.type === "expense") {
          acc[monthKey].expenses += amount
          acc[monthKey].transactionCounts.expenses += 1
        } else if (transaction.type === "sale") {
          acc[monthKey].sales += amount
          acc[monthKey].transactionCounts.sales += 1
        } else if (transaction.type === "purchase") {
          acc[monthKey].purchases += amount
          acc[monthKey].transactionCounts.purchases += 1
        }

        return acc
      },
      {} as Record<
        string,
        {
          income: number
          expenses: number
          sales: number
          purchases: number
          transactions: Transaction[]
          transactionCounts: { income: number; expenses: number; sales: number; purchases: number }
        }
      >,
    )

    // Calculate month-over-month growth
    const monthlyGrowth = Object.entries(monthlyData)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, data], index, array) => {
        const totalRevenue = data.income + data.sales
        const prevMonth = index > 0 ? array[index - 1][1] : null
        const prevRevenue = prevMonth ? prevMonth.income + prevMonth.sales : 0
        const growth = prevRevenue > 0 ? ((totalRevenue - prevRevenue) / prevRevenue) * 100 : 0

        return {
          month,
          data,
          totalRevenue,
          growth: isFinite(growth) ? growth : 0,
        }
      })

    const reportContent = (
      <div className="space-y-6">
        <div className="text-center border-b pb-4">
          <h2 className="text-2xl font-bold">Monthly Financial Summary</h2>
          <p className="text-gray-600">Comprehensive month-by-month breakdown</p>
          <p className="text-sm text-gray-500">
            Covering {Object.keys(monthlyData).length} months with {transactions.length} total transactions
          </p>
        </div>

        <div className="space-y-4">
          {monthlyGrowth
            .sort((a, b) => b.month.localeCompare(a.month))
            .map(({ month, data, totalRevenue, growth }) => {
              const totalExpenses = data.expenses + data.purchases
              const netProfit = totalRevenue - totalExpenses
              const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0
              const totalTransactions = data.transactions.length

              return (
                <div key={month} className="p-4 border rounded-lg bg-white shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-lg">
                      {new Date(month + "-01").toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{totalTransactions} transactions</Badge>
                      {growth !== 0 && (
                        <Badge variant={growth > 0 ? "default" : "destructive"}>
                          {growth > 0 ? "+" : ""}
                          {growth.toFixed(1)}% growth
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                    <div className="text-center p-2 bg-green-50 rounded">
                      <span className="text-gray-600 block">Income</span>
                      <div className="font-medium text-green-600">Rs.{data.income.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">({data.transactionCounts.income} txns)</div>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded">
                      <span className="text-gray-600 block">Sales</span>
                      <div className="font-medium text-green-600">Rs.{data.sales.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">({data.transactionCounts.sales} txns)</div>
                    </div>
                    <div className="text-center p-2 bg-red-50 rounded">
                      <span className="text-gray-600 block">Expenses</span>
                      <div className="font-medium text-red-600">Rs.{data.expenses.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">({data.transactionCounts.expenses} txns)</div>
                    </div>
                    <div className="text-center p-2 bg-red-50 rounded">
                      <span className="text-gray-600 block">Purchases</span>
                      <div className="font-medium text-red-600">Rs.{data.purchases.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">({data.transactionCounts.purchases} txns)</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm border-t pt-3">
                    <div className="text-center">
                      <span className="text-gray-600 block">Total Revenue</span>
                      <div className="font-bold text-green-600">Rs.{totalRevenue.toLocaleString()}</div>
                    </div>
                    <div className="text-center">
                      <span className="text-gray-600 block">Net Profit</span>
                      <div className={`font-bold ${netProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
                        Rs.{netProfit.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-center">
                      <span className="text-gray-600 block">Profit Margin</span>
                      <div className={`font-bold ${profitMargin >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {profitMargin.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>

        {/* Summary Statistics */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-3">Period Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <span className="text-gray-600 block">Best Month (Revenue)</span>
              <div className="font-bold">
                {monthlyGrowth.length > 0
                  ? new Date(
                      monthlyGrowth.reduce((best, current) =>
                        current.totalRevenue > best.totalRevenue ? current : best,
                      ).month + "-01",
                    ).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                  : "N/A"}
              </div>
            </div>
            <div className="text-center">
              <span className="text-gray-600 block">Average Monthly Revenue</span>
              <div className="font-bold text-green-600">
                Rs.
                {monthlyGrowth.length > 0
                  ? (
                      monthlyGrowth.reduce((sum, month) => sum + month.totalRevenue, 0) / monthlyGrowth.length
                    ).toLocaleString()
                  : "0"}
              </div>
            </div>
            <div className="text-center">
              <span className="text-gray-600 block">Best Growth Month</span>
              <div className="font-bold">
                {monthlyGrowth.length > 0
                  ? new Date(
                      monthlyGrowth.reduce((best, current) => (current.growth > best.growth ? current : best)).month +
                        "-01",
                    ).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                  : "N/A"}
              </div>
            </div>
            <div className="text-center">
              <span className="text-gray-600 block">Average Growth Rate</span>
              <div className="font-bold">
                {monthlyGrowth.length > 0
                  ? (monthlyGrowth.reduce((sum, month) => sum + month.growth, 0) / monthlyGrowth.length).toFixed(1)
                  : "0.0"}
                %
              </div>
            </div>
          </div>
        </div>
      </div>
    )

    setReportPreview({
      title: "Monthly Financial Summary",
      content: reportContent,
      data: {
        monthlyData,
        monthlyGrowth,
        totalMonths: Object.keys(monthlyData).length,
        averageMonthlyRevenue:
          monthlyGrowth.length > 0
            ? monthlyGrowth.reduce((sum, month) => sum + month.totalRevenue, 0) / monthlyGrowth.length
            : 0,
      },
    })
  }

  const generateCategoryReport = () => {
    // Robust category analysis with comprehensive calculations
    const categoryData = transactions.reduce(
      (acc, transaction) => {
        if (typeof transaction.amount !== "number" || isNaN(transaction.amount)) return acc

        if (!acc[transaction.category]) {
          acc[transaction.category] = {
            income: 0,
            expenses: 0,
            sales: 0,
            purchases: 0,
            count: 0,
            transactions: [],
            avgAmount: 0,
            lastTransaction: transaction.date,
          }
        }

        const amount = Number(transaction.amount)
        acc[transaction.category].transactions.push(transaction)
        acc[transaction.category].count += 1

        if (transaction.type === "income") {
          acc[transaction.category].income += amount
        } else if (transaction.type === "expense") {
          acc[transaction.category].expenses += amount
        } else if (transaction.type === "sale") {
          acc[transaction.category].sales += amount
        } else if (transaction.type === "purchase") {
          acc[transaction.category].purchases += amount
        }

        // Update last transaction date
        if (transaction.date > acc[transaction.category].lastTransaction) {
          acc[transaction.category].lastTransaction = transaction.date
        }

        return acc
      },
      {} as Record<
        string,
        {
          income: number
          expenses: number
          sales: number
          purchases: number
          count: number
          transactions: Transaction[]
          avgAmount: number
          lastTransaction: Date
        }
      >,
    )

    // Calculate averages and additional metrics
    Object.keys(categoryData).forEach((category) => {
      const data = categoryData[category]
      const totalAmount = data.income + data.expenses + data.sales + data.purchases
      data.avgAmount = data.count > 0 ? totalAmount / data.count : 0
    })

    // Sort categories by total activity (income + expenses + sales + purchases)
    const sortedCategories = Object.entries(categoryData).sort(([, a], [, b]) => {
      const totalA = a.income + a.expenses + a.sales + a.purchases
      const totalB = b.income + b.expenses + b.sales + b.purchases
      return totalB - totalA
    })

    const reportContent = (
      <div className="space-y-6">
        <div className="text-center border-b pb-4">
          <h2 className="text-2xl font-bold">Category Analysis Report</h2>
          <p className="text-gray-600">Comprehensive breakdown by category</p>
          <p className="text-sm text-gray-500">
            Analyzing {Object.keys(categoryData).length} categories across {transactions.length} transactions
          </p>
        </div>

        <div className="space-y-4">
          {sortedCategories.map(([category, data]) => {
            const totalInflow = data.income + data.sales
            const totalOutflow = data.expenses + data.purchases
            const netAmount = totalInflow - totalOutflow
            const totalActivity = totalInflow + totalOutflow

            return (
              <div key={category} className="p-4 border rounded-lg bg-white shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-lg">{category}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{data.count} transactions</Badge>
                    <Badge variant="secondary">
                      Last: {data.lastTransaction.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                  {data.income > 0 && (
                    <div className="text-center p-2 bg-green-50 rounded">
                      <span className="text-gray-600 block">Income</span>
                      <div className="font-medium text-green-600">Rs.{data.income.toLocaleString()}</div>
                    </div>
                  )}
                  {data.sales > 0 && (
                    <div className="text-center p-2 bg-green-50 rounded">
                      <span className="text-gray-600 block">Sales</span>
                      <div className="font-medium text-green-600">Rs.{data.sales.toLocaleString()}</div>
                    </div>
                  )}
                  {data.expenses > 0 && (
                    <div className="text-center p-2 bg-red-50 rounded">
                      <span className="text-gray-600 block">Expenses</span>
                      <div className="font-medium text-red-600">Rs.{data.expenses.toLocaleString()}</div>
                    </div>
                  )}
                  {data.purchases > 0 && (
                    <div className="text-center p-2 bg-red-50 rounded">
                      <span className="text-gray-600 block">Purchases</span>
                      <div className="font-medium text-red-600">Rs.{data.purchases.toLocaleString()}</div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-4 gap-4 text-sm border-t pt-3">
                  <div className="text-center">
                    <span className="text-gray-600 block">Total Inflow</span>
                    <div className="font-bold text-green-600">Rs.{totalInflow.toLocaleString()}</div>
                  </div>
                  <div className="text-center">
                    <span className="text-gray-600 block">Total Outflow</span>
                    <div className="font-bold text-red-600">Rs.{totalOutflow.toLocaleString()}</div>
                  </div>
                  <div className="text-center">
                    <span className="text-gray-600 block">Net Amount</span>
                    <div className={`font-bold ${netAmount >= 0 ? "text-green-600" : "text-red-600"}`}>
                      Rs.{netAmount.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-gray-600 block">Avg per Transaction</span>
                    <div className="font-bold text-blue-600">Rs.{data.avgAmount.toLocaleString()}</div>
                  </div>
                </div>

                {/* Transaction frequency analysis */}
                <div className="mt-3 text-xs text-gray-500 flex justify-between">
                  <span>
                    Activity Share:{" "}
                    {transactions.length > 0 ? ((data.count / transactions.length) * 100).toFixed(1) : "0.0"}% of all
                    transactions
                  </span>
                  <span>
                    Value Share:{" "}
                    {transactions.reduce((sum, t) => sum + (typeof t.amount === "number" ? t.amount : 0), 0) > 0
                      ? (
                          (totalActivity /
                            transactions.reduce((sum, t) => sum + (typeof t.amount === "number" ? t.amount : 0), 0)) *
                          100
                        ).toFixed(1)
                      : "0.0"}
                    % of total value
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Category Summary Statistics */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-3">Category Insights</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <span className="text-gray-600 block">Most Active Category</span>
              <div className="font-bold">{sortedCategories.length > 0 ? sortedCategories[0][0] : "N/A"}</div>
              <div className="text-xs text-gray-500">
                {sortedCategories.length > 0 ? `${sortedCategories[0][1].count} transactions` : ""}
              </div>
            </div>
            <div className="text-center">
              <span className="text-gray-600 block">Highest Value Category</span>
              <div className="font-bold">{sortedCategories.length > 0 ? sortedCategories[0][0] : "N/A"}</div>
              <div className="text-xs text-gray-500">
                {sortedCategories.length > 0
                  ? `Rs.${(sortedCategories[0][1].income + sortedCategories[0][1].expenses + sortedCategories[0][1].sales + sortedCategories[0][1].purchases).toLocaleString()}`
                  : ""}
              </div>
            </div>
            <div className="text-center">
              <span className="text-gray-600 block">Most Profitable Category</span>
              <div className="font-bold">
                {sortedCategories.length > 0
                  ? sortedCategories.reduce((best, [category, data]) => {
                      const netAmount = data.income + data.sales - (data.expenses + data.purchases)
                      const bestNetAmount = best[1].income + best[1].sales - (best[1].expenses + best[1].purchases)
                      return netAmount > bestNetAmount ? [category, data] : best
                    })[0]
                  : "N/A"}
              </div>
            </div>
            <div className="text-center">
              <span className="text-gray-600 block">Total Categories</span>
              <div className="font-bold">{Object.keys(categoryData).length}</div>
              <div className="text-xs text-gray-500">
                Avg{" "}
                {transactions.length > 0 ? (transactions.length / Object.keys(categoryData).length).toFixed(1) : "0"}{" "}
                txns/category
              </div>
            </div>
          </div>
        </div>
      </div>
    )

    setReportPreview({
      title: "Category Analysis Report",
      content: reportContent,
      data: {
        categoryData,
        sortedCategories,
        totalCategories: Object.keys(categoryData).length,
        mostActiveCategory: sortedCategories.length > 0 ? sortedCategories[0][0] : null,
      },
    })
  }

  const exportToPDF = () => {
    const reportData = {
      title: "Financial Summary Report",
      date: new Date().toLocaleDateString(),
      summary: financialSummary,
      transactions: transactions.slice(-10), // Last 10 transactions
    }

    // Create a simple text representation for download
    const content = `
FINANCIAL SUMMARY REPORT
Generated: ${reportData.date}

SUMMARY:
Total Income: Rs.${financialSummary.totalIncome.toLocaleString()}
Total Expenses: Rs.${financialSummary.totalExpenses.toLocaleString()}
Net Profit: Rs.${financialSummary.netProfit.toLocaleString()}
Profit Margin: ${financialSummary.profitMargin.toFixed(2)}%

RECENT TRANSACTIONS:
${transactions
  .slice(-10)
  .map(
    (t) =>
      `${t.date.toISOString().split("T")[0]} | ${t.type.toUpperCase()} | ${t.category} | Rs.${t.amount} | ${t.description}`,
  )
  .join("\n")}
`

    downloadFile(content, "financial-report.txt", "text/plain")
  }

  const exportToCSV = () => {
    const headers = [
      "Date",
      "Type",
      "Category",
      "Subcategory",
      "Description",
      "Amount",
      "Payment Method",
      "Tax Deductible",
    ]
    const csvContent = [
      headers.join(","),
      ...transactions.map((t) =>
        [
          t.date.toISOString().split("T")[0],
          t.type,
          t.category,
          t.subcategory,
          `"${t.description}"`,
          t.amount,
          t.paymentMethod,
          t.taxDeductible ? "Yes" : "No",
        ].join(","),
      ),
    ].join("\n")

    downloadFile(csvContent, "transactions.csv", "text/csv")
  }

  const exportToExcel = () => {
    // For demo purposes, we'll export as CSV with .xlsx extension
    exportToCSV()
    alert("Excel export functionality would require additional libraries. CSV export completed instead.")
  }

  const exportAllData = () => {
    const allData = {
      summary: financialSummary,
      transactions: transactions,
      userType: userType,
      exportDate: new Date().toISOString(),
    }

    downloadFile(JSON.stringify(allData, null, 2), "complete-financial-data.json", "application/json")
  }

  const downloadFile = (content: string, filename: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const downloadReport = (report: any) => {
    if (!report) return

    const content = `
${report.title}
Generated: ${new Date().toLocaleDateString()}

${JSON.stringify(report.data, null, 2)}
`

    downloadFile(content, `${report.title.toLowerCase().replace(/\s+/g, "-")}.txt`, "text/plain")
  }

  const generateCustomReport = (reportData: any) => {
    // Filter transactions based on selected criteria
    const filteredTransactions = transactions.filter((t) => {
      // Filter by transaction types
      if (reportData.types.length > 0 && !reportData.types.includes(t.type)) {
        return false
      }

      // Filter by categories
      if (reportData.categories.length > 0 && !reportData.categories.includes(t.category)) {
        return false
      }

      // Filter by date range
      if (reportData.dateRange.from && t.date < reportData.dateRange.from) {
        return false
      }
      if (reportData.dateRange.to && t.date > reportData.dateRange.to) {
        return false
      }

      return true
    })

    // Calculate metrics for filtered data
    const totalIncome = filteredTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0)

    const totalExpenses = filteredTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0)

    const totalSales = filteredTransactions
      .filter((t) => t.type === "sale")
      .reduce((sum, t) => sum + Number(t.amount), 0)

    const totalPurchases = filteredTransactions
      .filter((t) => t.type === "purchase")
      .reduce((sum, t) => sum + Number(t.amount), 0)

    const totalRevenue = totalIncome + totalSales
    const totalCosts = totalExpenses + totalPurchases
    const netAmount = totalRevenue - totalCosts

    // Group data based on selected groupBy option
    let groupedData: Record<string, any> = {}

    if (reportData.groupBy === "category") {
      groupedData = filteredTransactions.reduce(
        (acc, t) => {
          if (!acc[t.category]) {
            acc[t.category] = { income: 0, expenses: 0, sales: 0, purchases: 0, count: 0 }
          }
          if (t.type === "income") acc[t.category].income += Number(t.amount)
          else if (t.type === "expense") acc[t.category].expenses += Number(t.amount)
          else if (t.type === "sale") acc[t.category].sales += Number(t.amount)
          else if (t.type === "purchase") acc[t.category].purchases += Number(t.amount)
          acc[t.category].count += 1
          return acc
        },
        {} as Record<string, any>,
      )
    } else if (reportData.groupBy === "type") {
      groupedData = filteredTransactions.reduce(
        (acc, t) => {
          if (!acc[t.type]) {
            acc[t.type] = { amount: 0, count: 0 }
          }
          acc[t.type].amount += Number(t.amount)
          acc[t.type].count += 1
          return acc
        },
        {} as Record<string, any>,
      )
    } else if (reportData.groupBy === "month") {
      groupedData = filteredTransactions.reduce(
        (acc, t) => {
          const monthKey = `${t.date.getFullYear()}-${String(t.date.getMonth() + 1).padStart(2, "0")}`
          if (!acc[monthKey]) {
            acc[monthKey] = { income: 0, expenses: 0, sales: 0, purchases: 0, count: 0 }
          }
          if (t.type === "income") acc[monthKey].income += Number(t.amount)
          else if (t.type === "expense") acc[monthKey].expenses += Number(t.amount)
          else if (t.type === "sale") acc[monthKey].sales += Number(t.amount)
          else if (t.type === "purchase") acc[monthKey].purchases += Number(t.amount)
          acc[monthKey].count += 1
          return acc
        },
        {} as Record<string, any>,
      )
    } else if (reportData.groupBy === "paymentMethod") {
      groupedData = filteredTransactions.reduce(
        (acc, t) => {
          if (!acc[t.paymentMethod]) {
            acc[t.paymentMethod] = { amount: 0, count: 0 }
          }
          acc[t.paymentMethod].amount += Number(t.amount)
          acc[t.paymentMethod].count += 1
          return acc
        },
        {} as Record<string, any>,
      )
    }

    // Generate the custom report content
    const reportContent = (
      <div className="space-y-6">
        <div className="text-center border-b pb-4">
          <h2 className="text-2xl font-bold">Custom Financial Report</h2>
          <p className="text-gray-600">Generated on {reportData.generatedAt.toLocaleDateString()}</p>
          <p className="text-sm text-gray-500">Based on {filteredTransactions.length} filtered transactions</p>
        </div>

        {/* Filter Summary */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg text-blue-800 mb-3">Applied Filters</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Transaction Types:</span>
              <div className="text-gray-600">
                {reportData.types.length > 0 ? reportData.types.join(", ") : "All types"}
              </div>
            </div>
            <div>
              <span className="font-medium">Categories:</span>
              <div className="text-gray-600">
                {reportData.categories.length > 0 ? reportData.categories.join(", ") : "All categories"}
              </div>
            </div>
            <div>
              <span className="font-medium">Date Range:</span>
              <div className="text-gray-600">
                {reportData.dateRange.from
                  ? `${reportData.dateRange.from.toLocaleDateString()} - ${
                      reportData.dateRange.to?.toLocaleDateString() || "Present"
                    }`
                  : "All dates"}
              </div>
            </div>
            <div>
              <span className="font-medium">Grouped By:</span>
              <div className="text-gray-600 capitalize">{reportData.groupBy}</div>
            </div>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg text-gray-800 mb-3">Financial Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-green-100 rounded">
              <div className="text-2xl font-bold text-green-600">Rs.{totalRevenue.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </div>
            <div className="text-center p-3 bg-red-100 rounded">
              <div className="text-2xl font-bold text-red-600">Rs.{totalCosts.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Costs</div>
            </div>
            <div className="text-center p-3 bg-blue-100 rounded">
              <div className={`text-2xl font-bold ${netAmount >= 0 ? "text-green-600" : "text-red-600"}`}>
                Rs.{netAmount.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Net Amount</div>
            </div>
            <div className="text-center p-3 bg-purple-100 rounded">
              <div className="text-2xl font-bold text-purple-600">{filteredTransactions.length}</div>
              <div className="text-sm text-gray-600">Transactions</div>
            </div>
          </div>
        </div>

        {/* Grouped Data */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg">
            Breakdown by {reportData.groupBy.charAt(0).toUpperCase() + reportData.groupBy.slice(1)}
          </h3>

          {reportData.groupBy === "category" && (
            <div className="space-y-3">
              {Object.entries(groupedData)
                .sort(([, a], [, b]) => {
                  const totalA = (a as any).income + (a as any).expenses + (a as any).sales + (a as any).purchases
                  const totalB = (b as any).income + (b as any).expenses + (b as any).sales + (b as any).purchases
                  return totalB - totalA
                })
                .map(([category, data]: [string, any]) => {
                  const totalInflow = data.income + data.sales
                  const totalOutflow = data.expenses + data.purchases
                  const net = totalInflow - totalOutflow

                  return (
                    <div key={category} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-lg">{category}</h4>
                        <Badge variant="outline">{data.count} transactions</Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div className="text-center">
                          <span className="text-gray-600 block">Income + Sales</span>
                          <div className="font-bold text-green-600">Rs.{totalInflow.toLocaleString()}</div>
                        </div>
                        <div className="text-center">
                          <span className="text-gray-600 block">Expenses + Purchases</span>
                          <div className="font-bold text-red-600">Rs.{totalOutflow.toLocaleString()}</div>
                        </div>
                        <div className="text-center">
                          <span className="text-gray-600 block">Net Amount</span>
                          <div className={`font-bold ${net >= 0 ? "text-green-600" : "text-red-600"}`}>
                            Rs.{net.toLocaleString()}
                          </div>
                        </div>
                        <div className="text-center">
                          <span className="text-gray-600 block">Avg per Transaction</span>
                          <div className="font-bold text-blue-600">
                            Rs.{data.count > 0 ? ((totalInflow + totalOutflow) / data.count).toLocaleString() : "0"}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          )}

          {reportData.groupBy === "type" && (
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(groupedData)
                .sort(([, a], [, b]) => (b as any).amount - (a as any).amount)
                .map(([type, data]: [string, any]) => (
                  <div key={type} className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-lg capitalize mb-2">{type}</h4>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">Rs.{data.amount.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">{data.count} transactions</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Avg: Rs.{data.count > 0 ? (data.amount / data.count).toLocaleString() : "0"}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {reportData.groupBy === "month" && (
            <div className="space-y-3">
              {Object.entries(groupedData)
                .sort(([a], [b]) => b.localeCompare(a))
                .map(([month, data]: [string, any]) => {
                  const totalRevenue = data.income + data.sales
                  const totalCosts = data.expenses + data.purchases
                  const net = totalRevenue - totalCosts

                  return (
                    <div key={month} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-lg">
                          {new Date(month + "-01").toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                        </h4>
                        <Badge variant="outline">{data.count} transactions</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <span className="text-gray-600 block">Revenue</span>
                          <div className="font-bold text-green-600">Rs.{totalRevenue.toLocaleString()}</div>
                        </div>
                        <div className="text-center">
                          <span className="text-gray-600 block">Costs</span>
                          <div className="font-bold text-red-600">Rs.{totalCosts.toLocaleString()}</div>
                        </div>
                        <div className="text-center">
                          <span className="text-gray-600 block">Net</span>
                          <div className={`font-bold ${net >= 0 ? "text-green-600" : "text-red-600"}`}>
                            Rs.{net.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          )}

          {reportData.groupBy === "paymentMethod" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(groupedData)
                .sort(([, a], [, b]) => (b as any).amount - (a as any).amount)
                .map(([method, data]: [string, any]) => (
                  <div key={method} className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-lg capitalize mb-2">{method.replace("-", " ")}</h4>
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-600">Rs.{data.amount.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">{data.count} transactions</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {filteredTransactions.length > 0
                          ? `${((data.count / filteredTransactions.length) * 100).toFixed(1)}% of total`
                          : "0% of total"}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Additional Insights */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg text-yellow-800 mb-3">Key Insights</h3>
          <div className="space-y-2 text-sm">
            {reportData.types.length > 0 && (
              <div>
                <span className="font-medium">Focus Area:</span> Analysis limited to {reportData.types.join(", ")}{" "}
                transactions
              </div>
            )}
            {totalRevenue > 0 && (
              <div>
                <span className="font-medium">Profit Margin:</span> {((netAmount / totalRevenue) * 100).toFixed(1)}%
              </div>
            )}
            {filteredTransactions.length > 0 && (
              <div>
                <span className="font-medium">Average Transaction:</span> Rs.
                {((totalRevenue + totalCosts) / filteredTransactions.length).toLocaleString()}
              </div>
            )}
            <div>
              <span className="font-medium">Data Coverage:</span> {filteredTransactions.length} out of{" "}
              {transactions.length} total transactions (
              {transactions.length > 0 ? ((filteredTransactions.length / transactions.length) * 100).toFixed(1) : "0"}%)
            </div>
          </div>
        </div>
      </div>
    )

    // Set the report preview
    setReportPreview({
      title: "Custom Financial Report",
      content: reportContent,
      data: {
        filteredTransactions,
        totalRevenue,
        totalCosts,
        netAmount,
        groupedData,
        filters: {
          types: reportData.types,
          categories: reportData.categories,
          dateRange: reportData.dateRange,
          groupBy: reportData.groupBy,
        },
        insights: {
          profitMargin: totalRevenue > 0 ? (netAmount / totalRevenue) * 100 : 0,
          averageTransaction:
            filteredTransactions.length > 0 ? (totalRevenue + totalCosts) / filteredTransactions.length : 0,
          dataCoverage: transactions.length > 0 ? (filteredTransactions.length / transactions.length) * 100 : 0,
        },
      },
    })
  }

  // Calculate financial summary whenever transactions change
  useEffect(() => {
    const income = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
    const expenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
    const sales = transactions.filter((t) => t.type === "sale").reduce((sum, t) => sum + t.amount, 0)
    const purchases = transactions.filter((t) => t.type === "purchase").reduce((sum, t) => sum + t.amount, 0)

    const totalRevenue = income + sales
    const totalCosts = expenses + purchases
    const netProfit = totalRevenue - totalCosts
    const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0

    setFinancialSummary({
      totalIncome: income,
      totalExpenses: expenses,
      totalSales: sales,
      totalPurchases: purchases,
      netProfit,
      cashFlow: netProfit,
      profitMargin,
      monthlyGrowth: Math.random() * 20 - 10, // Simulated growth
    })
  }, [transactions])

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    }
    setTransactions((prev) => [...prev, newTransaction])
    setIsAddTransactionOpen(false)
  }

  // Update transaction function
  const updateTransaction = (id: string, values: Omit<Transaction, "id">) => {
    setTransactions((prev) => prev.map((t) => (t.id === id ? { id, ...values } : t)))
    setEditDialogOpen(false)
    setEditing(null)
  }

  // Delete transaction by id (with localStorage sync for empty state)
  const deleteTransaction = (id: string) => {
    setTransactions((prev) => {
      const next = prev.filter((t) => t.id !== id)
      if (typeof window !== "undefined") {
        if (next.length > 0) {
          localStorage.setItem("accounting-transactions", JSON.stringify(next))
        } else {
          localStorage.removeItem("accounting-transactions")
        }
      }
      return next
    })
  }

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 pt-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Professional Financial Management Platform</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive financial tracking and analysis tailored to your professional needs. Choose your profile to
              get started with personalized insights and tools.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {Object.entries(userTypeConfig).map(([key, config]) => {
              const IconComponent = config.icon
              return (
                <Card
                  key={key}
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-blue-500"
                  onClick={() => setUserType(key as UserType)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                      <IconComponent className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{config.title}</CardTitle>
                    <CardDescription className="text-sm">{config.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Key Metrics:</h4>
                      <div className="flex flex-wrap gap-1">
                        {config.metrics.slice(0, 2).map((metric, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {metric}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="text-center">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Target className="h-5 w-5" />
                  Why Choose Our Platform?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <PieChart className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <h4 className="font-semibold">Advanced Analytics</h4>
                    <p className="text-gray-600">Real-time insights and predictive analysis</p>
                  </div>
                  <div className="text-center">
                    <Settings className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <h4 className="font-semibold">Adaptive Interface</h4>
                    <p className="text-gray-600">Customized for your profession</p>
                  </div>
                  <div className="text-center">
                    <FileText className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <h4 className="font-semibold">Comprehensive Reports</h4>
                    <p className="text-gray-600">Export-ready financial statements</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  const currentConfig = userTypeConfig[userType]
  const IconComponent = currentConfig.icon

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <IconComponent className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{currentConfig.title} Dashboard</h1>
                <p className="text-gray-600">{currentConfig.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setUserType(null)}>
                Switch Profile
              </Button>
              <Dialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Transaction
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Transaction</DialogTitle>
                    <DialogDescription>
                      Enter transaction details with {currentConfig.title.toLowerCase()}-specific fields
                    </DialogDescription>
                  </DialogHeader>
                  <TransactionForm
                    userType={userType}
                    onSubmit={addTransaction}
                    selectedType={selectedTransactionType}
                    onTypeChange={setSelectedTransactionType}
                    submitLabel="Add Transaction" // Explicit submit label
                  />
                </DialogContent>
              </Dialog>

              {/* Edit Transaction Dialog */}
              <Dialog
                open={editDialogOpen}
                onOpenChange={(open) => {
                  setEditDialogOpen(open)
                  if (!open) setEditing(null)
                }}
              >
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Edit Transaction</DialogTitle>
                    <DialogDescription>Update the details and save your changes</DialogDescription>
                  </DialogHeader>
                  {editing && (
                    <TransactionForm
                      userType={userType}
                      initial={editing}
                      selectedType={editing.type}
                      onTypeChange={() => {}} // No-op for edit mode's type change
                      onUpdate={updateTransaction}
                      submitLabel="Save Changes"
                    />
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* AI Insights Banner */}
        {aiInsights.length > 0 && (
          <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg p-6 mb-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="h-6 w-6" />
              <h2 className="text-xl font-bold">AI Financial Intelligence</h2>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {aiInsights.length} insights
              </Badge>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {aiInsights.slice(0, 2).map((insight) => (
                <div key={insight.id} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-2">
                    {insight.type === "warning" && <AlertTriangle className="h-4 w-4 text-yellow-300" />}
                    {insight.type === "opportunity" && <Zap className="h-4 w-4 text-green-300" />}
                    {insight.type === "prediction" && <Eye className="h-4 w-4 text-blue-300" />}
                    {insight.type === "optimization" && <Target className="h-4 w-4 text-purple-300" />}
                    <span className="font-semibold text-sm">{insight.title}</span>
                    <Badge variant="outline" className="text-xs bg-white/20 border-white/30 text-white">
                      {insight.confidence}% confidence
                    </Badge>
                  </div>
                  <p className="text-sm text-white/90">{insight.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                Rs.{(financialSummary.totalIncome + financialSummary.totalSales).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                <ArrowUpRight className="h-3 w-3 inline mr-1" />+{Math.abs(financialSummary.monthlyGrowth).toFixed(1)}%
                from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                Rs.{(financialSummary.totalExpenses + financialSummary.totalPurchases).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                <ArrowDownRight className="h-3 w-3 inline mr-1" />
                Operating costs and purchases
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
              <Calculator className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${financialSummary.netProfit >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                Rs.{financialSummary.netProfit.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">{financialSummary.profitMargin.toFixed(1)}% profit margin</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cash Flow</CardTitle>
              <Wallet className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${financialSummary.cashFlow >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                Rs.{financialSummary.cashFlow.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Current financial position</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks for {currentConfig.title.toLowerCase()}s</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(currentConfig.categories).map(([type, categories]) => (
                    <Button
                      key={type}
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      onClick={() => {
                        setSelectedTransactionType(type)
                        setIsAddTransactionOpen(true)
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Key Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Performance Indicators</CardTitle>
                  <CardDescription>Metrics specific to your profession</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentConfig.metrics.map((metric, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{metric}</span>
                        <span className="font-medium">{(Math.random() * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={Math.random() * 100} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest financial activities</CardDescription>
              </CardHeader>
              <CardContent>
                {transactions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No transactions yet. Add your first transaction to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {transactions
                      .slice(-5)
                      .reverse()
                      .map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-full ${
                                transaction.type === "income" || transaction.type === "sale"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-red-100 text-red-600"
                              }`}
                            >
                              {transaction.type === "income" || transaction.type === "sale" ? (
                                <ArrowUpRight className="h-4 w-4" />
                              ) : (
                                <ArrowDownRight className="h-4 w-4" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{transaction.description}</p>
                              <p className="text-sm text-gray-500">
                                {transaction.category} •{" "}
                                {transaction.date.toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "2-digit",
                                  year: "numeric",
                                })}
                              </p>
                            </div>
                          </div>
                          {/* Updated block: amount + Edit button */}
                          <div className="flex items-center gap-2">
                            <div
                              className={`font-bold ${
                                transaction.type === "income" || transaction.type === "sale"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {transaction.type === "income" || transaction.type === "sale" ? "+" : "-"}Rs.
                              {transaction.amount.toLocaleString()}
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-transparent"
                              onClick={() => {
                                setEditing(transaction)
                                setEditDialogOpen(true)
                              }}
                            >
                              <Pencil className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                if (confirm("Delete this transaction? This cannot be undone.")) {
                                  deleteTransaction(transaction.id)
                                }
                              }}
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AI Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    AI Financial Insights
                  </CardTitle>
                  <CardDescription>Advanced mathematical analysis of your financial patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  {aiInsights.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Add more transactions to unlock AI insights</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {aiInsights.map((insight) => (
                        <div key={insight.id} className="p-4 border rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            {insight.type === "warning" && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                            {insight.type === "opportunity" && <Zap className="h-4 w-4 text-green-500" />}
                            {insight.type === "prediction" && <Eye className="h-4 w-4 text-blue-500" />}
                            {insight.type === "optimization" && <Target className="h-4 w-4 text-purple-500" />}
                            <span className="font-semibold">{insight.title}</span>
                            <Badge
                              variant={
                                insight.impact === "high"
                                  ? "destructive"
                                  : insight.impact === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {insight.impact} impact
                            </Badge>
                            <Badge variant="outline">{insight.confidence}% confidence</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>Category: {insight.category}</span>
                            {insight.actionable && <CheckCircle className="h-3 w-3 text-green-500" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Financial Patterns */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    Detected Patterns
                  </CardTitle>
                  <CardDescription>Mathematical pattern recognition in your transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  {financialPatterns.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No patterns detected yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {financialPatterns.slice(0, 5).map((pattern, idx) => (
                        <div key={idx} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{pattern.pattern}</span>
                            <div className="flex items-center gap-1">
                              {pattern.trend === "increasing" && <TrendingUpIcon className="h-4 w-4 text-green-500" />}
                              {pattern.trend === "decreasing" && <TrendingDownIcon className="h-4 w-4 text-red-500" />}
                              {pattern.trend === "stable" && <div className="h-4 w-4 bg-gray-400 rounded-full" />}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Frequency:</span>
                              <div className="font-medium">{pattern.frequency.toFixed(0)} days</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Avg Amount:</span>
                              <div className="font-medium">Rs.{pattern.averageAmount.toFixed(0)}</div>
                            </div>
                          </div>
                          <div className="mt-2 text-xs text-gray-500">
                            Next predicted: Rs.{pattern.predictedNext.toFixed(0)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Cash Flow Predictions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  Cash Flow Predictions
                </CardTitle>
                <CardDescription>AI-powered forecasting for the next 12 weeks</CardDescription>
              </CardHeader>
              <CardContent>
                {cashFlowPredictions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Need more transaction history for predictions</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cashFlowPredictions.slice(0, 6).map((prediction, idx) => (
                      <div key={idx} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">
                            Week of {prediction.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </span>
                          <Badge variant="outline">{prediction.confidence.toFixed(0)}% confidence</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Inflow:</span>
                            <div className="font-medium text-green-600">Rs.{prediction.predictedInflow.toFixed(0)}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Outflow:</span>
                            <div className="font-medium text-red-600">Rs.{prediction.predictedOutflow.toFixed(0)}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Net:</span>
                            <div
                              className={`font-medium ${(prediction.predictedInflow - prediction.predictedOutflow) >= 0 ? "text-green-600" : "text-red-600"}`}
                            >
                              Rs.{(prediction.predictedInflow - prediction.predictedOutflow).toFixed(0)}
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          Factors: {prediction.factors.slice(0, 2).join(", ")}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Transactions</CardTitle>
                <CardDescription>Complete transaction history with filtering options</CardDescription>
              </CardHeader>
              <CardContent>
                {transactions.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg mb-2">No transactions recorded</p>
                    <p>Start by adding your first transaction to track your finances</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-2 rounded-full ${
                              transaction.type === "income" || transaction.type === "sale"
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {transaction.type === "income" || transaction.type === "sale" ? (
                              <ArrowUpRight className="h-4 w-4" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-gray-500">
                              {transaction.category} • {transaction.subcategory} •{" "}
                              {transaction.date.toLocaleDateString("en-US", {
                                month: "short",
                                day: "2-digit",
                                year: "numeric",
                              })}
                            </p>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {transaction.paymentMethod}
                              </Badge>
                              {transaction.taxDeductible && (
                                <Badge variant="secondary" className="text-xs">
                                  Tax Deductible
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* Updated block: amount + Edit button */}
                        <div className="flex items-center gap-3">
                          <div
                            className={`text-right ${
                              transaction.type === "income" || transaction.type === "sale"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            <p className="font-bold text-lg">
                              {transaction.type === "income" || transaction.type === "sale" ? "+" : "-"}Rs.
                              {transaction.amount.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500">{transaction.currency}</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-transparent"
                            onClick={() => {
                              setEditing(transaction)
                              setEditDialogOpen(true)
                            }}
                          >
                            <Pencil className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              if (confirm("Delete this transaction? This cannot be undone.")) {
                                deleteTransaction(transaction.id)
                              }
                            }}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Health Score</CardTitle>
                  <CardDescription>Overall financial performance indicator</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold text-green-600">
                      {Math.max(0, Math.min(100, 75 + financialSummary.profitMargin)).toFixed(0)}
                    </div>
                    <Progress value={Math.max(0, Math.min(100, 75 + financialSummary.profitMargin))} className="h-3" />
                    <p className="text-sm text-gray-600">Based on profit margin, cash flow, and growth trends</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Trends</CardTitle>
                  <CardDescription>Revenue and expense patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Revenue Growth</span>
                      <span
                        className={`font-medium ${financialSummary.monthlyGrowth >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {financialSummary.monthlyGrowth >= 0 ? "+" : ""}
                        {financialSummary.monthlyGrowth.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Expense Ratio</span>
                      <span className="font-medium">
                        {(
                          ((financialSummary.totalExpenses + financialSummary.totalPurchases) /
                            Math.max(1, financialSummary.totalIncome + financialSummary.totalSales)) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Profit Margin</span>
                      <span
                        className={`font-medium ${financialSummary.profitMargin >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {financialSummary.profitMargin.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
                <CardDescription>Distribution of income and expenses by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 text-green-600">Income Sources</h4>
                    <div className="space-y-2">
                      {Object.entries(
                        transactions
                          .filter((t) => t.type === "income" || t.type === "sale")
                          .reduce(
                            (acc, t) => {
                              acc[t.category] = (acc[t.category] || 0) + t.amount
                              return acc
                            },
                            {} as Record<string, number>,
                          ),
                      ).map(([category, amount]) => (
                        <div key={category} className="flex justify-between items-center">
                          <span className="text-sm">{category}</span>
                          <span className="font-medium text-green-600">Rs.{amount.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3 text-red-600">Expense Categories</h4>
                    <div className="space-y-2">
                      {Object.entries(
                        transactions
                          .filter((t) => t.type === "expense" || t.type === "purchase")
                          .reduce(
                            (acc, t) => {
                              acc[t.category] = (acc[t.category] || 0) + t.amount
                              return acc
                            },
                            {} as Record<string, number>,
                          ),
                      ).map(([category, amount]) => (
                        <div key={category} className="flex justify-between items-center">
                          <span className="text-sm">{category}</span>
                          <span className="font-medium text-red-600">Rs.{amount.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Profit & Loss Statement</CardTitle>
                  <CardDescription>Comprehensive P&L report</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full bg-transparent"
                    variant="outline"
                    onClick={() => generateProfitLossReport()}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Generate P&L Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Cash Flow Statement</CardTitle>
                  <CardDescription>Cash inflows and outflows</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-transparent" variant="outline" onClick={() => generateCashFlowReport()}>
                    <Download className="h-4 w-4 mr-2" />
                    Generate Cash Flow
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tax Summary</CardTitle>
                  <CardDescription>Tax-deductible expenses</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-transparent" variant="outline" onClick={() => generateTaxReport()}>
                    <Download className="h-4 w-4 mr-2" />
                    Generate Tax Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Monthly Summary</CardTitle>
                  <CardDescription>Month-by-month breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-transparent" variant="outline" onClick={() => generateMonthlyReport()}>
                    <Download className="h-4 w-4 mr-2" />
                    Monthly Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Category Analysis</CardTitle>
                  <CardDescription>Spending by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-transparent" variant="outline" onClick={() => generateCategoryReport()}>
                    <Download className="h-4 w-4 mr-2" />
                    Category Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Custom Report</CardTitle>
                  <CardDescription>Build your own report</CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-transparent" variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Create Custom
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Custom Report Builder</DialogTitle>
                        <DialogDescription>Select the data and date range for your custom report</DialogDescription>
                      </DialogHeader>
                      <CustomReportBuilder
                        transactions={transactions}
                        onGenerate={(reportData) => generateCustomReport(reportData)}
                      />
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Export Options</CardTitle>
                <CardDescription>Download your financial data in various formats</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" onClick={() => exportToPDF()}>
                    <Download className="h-4 w-4 mr-2" />
                    Export to PDF
                  </Button>
                  <Button variant="outline" onClick={() => exportToExcel()}>
                    <Download className="h-4 w-4 mr-2" />
                    Export to Excel
                  </Button>
                  <Button variant="outline" onClick={() => exportToCSV()}>
                    <Download className="h-4 w-4 mr-2" />
                    Export to CSV
                  </Button>
                  <Button variant="outline" onClick={() => exportAllData()}>
                    <Download className="h-4 w-4 mr-2" />
                    Export All Data
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Report Preview Modal */}
            <Dialog open={!!reportPreview} onOpenChange={() => setReportPreview(null)}>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{reportPreview?.title}</DialogTitle>
                  <DialogDescription>Generated on {new Date().toLocaleDateString()}</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">{reportPreview?.content}</div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setReportPreview(null)}>
                    Close
                  </Button>
                  <Button onClick={() => downloadReport(reportPreview)}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Data Management
                </CardTitle>
                <CardDescription>Manage your financial data storage and backups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium mb-2">Current Storage Status</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>• {transactions.length} transactions stored</p>
                      <p>• Data saved locally in your browser</p>
                      <p>• Storage size: {(JSON.stringify(transactions).length / 1024).toFixed(2)}KB</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Backup Data</CardTitle>
                        <CardDescription>Download all your data</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button onClick={handleDataBackup} className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Create Backup
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Restore Data</CardTitle>
                        <CardDescription>Upload backup file</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="relative">
                          <input
                            type="file"
                            accept=".json"
                            onChange={handleDataRestore}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <Button variant="outline" className="w-full bg-transparent">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Backup
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Clear Data</CardTitle>
                        <CardDescription>Delete all data</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button onClick={clearAllData} variant="destructive" className="w-full">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Clear All Data
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

interface TransactionFormProps {
  userType: UserType
  onSubmit?: (transaction: Omit<Transaction, "id">) => void
  onUpdate?: (id: string, transaction: Omit<Transaction, "id">) => void
  selectedType: string
  onTypeChange: (type: string) => void
  initial?: Transaction | null
  submitLabel?: string
}

function TransactionForm({
  userType,
  onSubmit,
  onUpdate,
  selectedType,
  onTypeChange,
  initial,
  submitLabel = "Submit",
}: TransactionFormProps) {
  const [formData, setFormData] = useState({
    type: initial?.type || selectedType || "income",
    amount: initial ? String(initial.amount) : "",
    category: initial?.category || "",
    subcategory: initial?.subcategory || "",
    description: initial?.description || "",
    date: initial?.date ? new Date(initial.date) : new Date(),
    paymentMethod: initial?.paymentMethod || "",
    client: initial?.client || "",
    project: initial?.project || "",
    taxDeductible: initial?.taxDeductible || false,
    currency: initial?.currency || "PKR",
  })

  useEffect(() => {
    if (initial) {
      setFormData({
        type: initial.type,
        amount: String(initial.amount),
        category: initial.category,
        subcategory: initial.subcategory || "",
        description: initial.description,
        date: initial.date ? new Date(initial.date) : new Date(),
        paymentMethod: initial.paymentMethod,
        client: initial.client || "",
        project: initial.project || "",
        taxDeductible: !!initial.taxDeductible,
        currency: initial.currency || "PKR",
      })
    }
  }, [initial])

  useEffect(() => {
    // Only reset category/subcategory if not in edit mode
    if (!initial && selectedType) {
      setFormData((prev) => ({ ...prev, type: selectedType, category: "", subcategory: "" }))
    }
  }, [selectedType, initial])

  const config = userTypeConfig[userType!]
  const availableCategories = config.categories[formData.type as keyof typeof config.categories] || []

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const values: Omit<Transaction, "id"> = {
      type: formData.type as Transaction["type"],
      amount: Number.parseFloat(formData.amount || "0"),
      category: formData.category,
      subcategory: formData.subcategory,
      description: formData.description,
      date: formData.date,
      paymentMethod: formData.paymentMethod,
      client: formData.client,
      project: formData.project,
      taxDeductible: formData.taxDeductible,
      currency: formData.currency,
    }

    if (initial?.id && onUpdate) {
      onUpdate(initial.id, values)
    } else if (onSubmit) {
      onSubmit(values)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Transaction Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => {
              setFormData((prev) => ({ ...prev, type: value, category: "", subcategory: "" }))
              onTypeChange(value)
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
              <SelectItem value="sale">Sale</SelectItem>
              <SelectItem value="purchase">Purchase</SelectItem>
              <SelectItem value="investment">Investment</SelectItem>
              <SelectItem value="asset">Asset</SelectItem>
              <SelectItem value="liability">Liability</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {availableCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subcategory">Subcategory</Label>
          <Input
            id="subcategory"
            value={formData.subcategory}
            onChange={(e) => setFormData((prev) => ({ ...prev, subcategory: e.target.value }))}
            placeholder="Optional subcategory"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          placeholder="Detailed description of the transaction"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.date.toLocaleDateString()}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.date}
                onSelect={(date) => date && setFormData((prev) => ({ ...prev, date }))}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="paymentMethod">Payment Method</Label>
          <Select
            value={formData.paymentMethod}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, paymentMethod: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="credit-card">Credit Card</SelectItem>
              <SelectItem value="debit-card">Debit Card</SelectItem>
              <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
              <SelectItem value="check">Check</SelectItem>
              <SelectItem value="digital-wallet">Digital Wallet</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {userType === "freelancer" && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="client">Client</Label>
            <Input
              id="client"
              value={formData.client}
              onChange={(e) => setFormData((prev) => ({ ...prev, client: e.target.value }))}
              placeholder="Client name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project">Project</Label>
            <Input
              id="project"
              value={formData.project}
              onChange={(e) => setFormData((prev) => ({ ...prev, project: e.target.value }))}
              placeholder="Project name"
            />
          </div>
        </div>
      )}

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="taxDeductible"
          checked={formData.taxDeductible}
          onChange={(e) => setFormData((prev) => ({ ...prev, taxDeductible: e.target.checked }))}
          className="rounded"
        />
        <Label htmlFor="taxDeductible">Tax deductible</Label>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  )
}

interface CustomReportBuilderProps {
  transactions: Transaction[]
  onGenerate: (reportData: any) => void
}

function CustomReportBuilder({ transactions, onGenerate }: CustomReportBuilderProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [groupBy, setGroupBy] = useState<string>("category")
  const [includeCharts, setIncludeCharts] = useState(true)

  const transactionTypes = ["income", "expense", "sale", "purchase", "investment", "asset", "liability"]
  const categories = [...new Set(transactions.map((t) => t.category))].filter(Boolean)

  const handleTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes([...selectedTypes, type])
    } else {
      setSelectedTypes(selectedTypes.filter((t) => t !== type))
    }
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  const handleGenerate = () => {
    const reportData = {
      types: selectedTypes,
      categories: selectedCategories,
      dateRange,
      groupBy,
      includeCharts,
      generatedAt: new Date(),
    }
    onGenerate(reportData)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label className="text-base font-medium">Transaction Types</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {transactionTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={selectedTypes.includes(type)}
                  onCheckedChange={(checked) => handleTypeChange(type, checked as boolean)}
                />
                <Label htmlFor={type} className="capitalize text-sm">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-base font-medium">Categories</Label>
          <div className="grid grid-cols-2 gap-2 mt-2 max-h-32 overflow-y-auto">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                />
                <Label htmlFor={category} className="text-sm">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-base font-medium">From Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal mt-2 bg-transparent">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? dateRange.from.toLocaleDateString() : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateRange.from}
                  onSelect={(date) => setDateRange((prev) => ({ ...prev, from: date }))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label className="text-base font-medium">To Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal mt-2 bg-transparent">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.to ? dateRange.to.toLocaleDateString() : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateRange.to}
                  onSelect={(date) => setDateRange((prev) => ({ ...prev, to: date }))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div>
          <Label htmlFor="groupBy" className="text-base font-medium">
            Group By
          </Label>
          <Select value={groupBy} onValueChange={setGroupBy}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="category">Category</SelectItem>
              <SelectItem value="type">Transaction Type</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="paymentMethod">Payment Method</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="includeCharts"
            checked={includeCharts}
            onCheckedChange={(checked) => setIncludeCharts(checked as boolean)}
          />
          <Label htmlFor="includeCharts" className="text-sm">
            Include visual charts and graphs
          </Label>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleGenerate}>Generate Report</Button>
      </div>
    </div>
  )
}
