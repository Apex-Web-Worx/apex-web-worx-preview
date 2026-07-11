"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}

function isSameDate(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function formatDateString(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${month}/${day}/${date.getFullYear()}`
}

interface DatePickerProps {
  value?: string | null
  onChange: (date: string | null) => void
  disabled?: (date: Date) => boolean
  className?: string
  placeholder?: string
}

export function DatePicker({
  value,
  onChange,
  disabled,
  className,
  placeholder = "Pick a date",
}: DatePickerProps) {
  const [open, setOpen] = useState(false)
  const [viewDate, setViewDate] = useState(() => {
    if (value) {
      const d = new Date(value + "T00:00:00")
      return new Date(d.getFullYear(), d.getMonth(), 1)
    }
    return new Date()
  })
  const popoverRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const selectedDate = value ? new Date(value + "T00:00:00") : null
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfWeek = getFirstDayOfMonth(year, month)
  const daysInPrevMonth = getDaysInMonth(year, month - 1)

  const prevMonth = useCallback(() => {
    setViewDate(new Date(year, month - 1, 1))
  }, [year, month])

  const nextMonth = useCallback(() => {
    setViewDate(new Date(year, month + 1, 1))
  }, [year, month])

  const handleSelect = (date: Date) => {
    if (disabled && disabled(date)) return
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, "0")
    const d = String(date.getDate()).padStart(2, "0")
    onChange(`${y}-${m}-${d}`)
    setOpen(false)
  }

  // Close on click outside
  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      const target = e.target as Node
      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [open])

  // Build calendar grid
  const days: { date: Date; type: "prev" | "current" | "next" }[] = []

  // Previous month padding
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i
    days.push({ date: new Date(year, month - 1, d), type: "prev" })
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({ date: new Date(year, month, d), type: "current" })
  }

  // Next month padding to fill 6 rows
  const totalCells = 42
  const remaining = totalCells - days.length
  for (let d = 1; d <= remaining; d++) {
    days.push({ date: new Date(year, month + 1, d), type: "next" })
  }

  const displayValue = selectedDate ? formatDateString(selectedDate) : placeholder

  return (
    <div className="relative">
      <Button
        ref={triggerRef}
        variant="outline"
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "w-full justify-start text-left font-normal h-12 bg-[#1a1a1a]/50 border-white/10 rounded-none hover:bg-[#1a1a1a]/70 hover:text-white",
          !selectedDate && "text-white/50",
          selectedDate && "text-white",
          className
        )}
      >
        <CalendarIcon className="mr-2 h-4 w-4 text-[#C8A45D] shrink-0" />
        <span className="truncate">{displayValue}</span>
      </Button>

      {open && (
        <div
          ref={popoverRef}
          className="absolute z-50 mt-2 bg-[#1a1a1a] border border-white/10 shadow-2xl rounded-none w-[320px] max-w-[calc(100vw-2rem)]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <button
              type="button"
              onClick={prevMonth}
              className="h-8 w-8 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 rounded-none transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm font-medium text-white tracking-wide">
              {MONTHS[month]} {year}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="h-8 w-8 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 rounded-none transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Weekday labels */}
          <div className="grid grid-cols-7 px-3 pt-3 pb-1">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="text-center text-[11px] font-medium uppercase tracking-wider text-white/40 py-1"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 px-3 pb-3 gap-0.5">
            {days.map(({ date, type }, idx) => {
              const isDisabled = disabled ? disabled(date) : false
              const isSelected = selectedDate ? isSameDate(date, selectedDate) : false
              const isToday = isSameDate(date, today)
              const isCurrent = type === "current"

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelect(date)}
                  disabled={isDisabled}
                  className={cn(
                    "h-9 w-9 flex items-center justify-center text-sm font-normal rounded-none transition-all",
                    !isCurrent && "text-white/25",
                    isCurrent && !isDisabled && !isSelected && "text-white hover:bg-white/10",
                    isDisabled && "text-white/20 cursor-not-allowed",
                    isSelected && "bg-[#C8A45D] text-[#0F0F0D] font-medium",
                    isToday && !isSelected && "border border-[#C8A45D]/60 text-white",
                    isToday && isSelected && "bg-[#C8A45D] text-[#0F0F0D] border border-[#C8A45D]",
                  )}
                >
                  {date.getDate()}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
