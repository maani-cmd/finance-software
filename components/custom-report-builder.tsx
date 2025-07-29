"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

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
}

interface CustomReportBuilderProps {
  transactions: Transaction[]
  onGenerate: (reportData: any) => void
}

export function CustomReportBuilder({ transactions, onGenerate }: CustomReportBuilderProps) {
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
                  {dateRange.from ? format(dateRange.from, "PPP") : "Select date"}
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
                  {dateRange.to ? format(dateRange.to, "PPP") : "Select date"}
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
