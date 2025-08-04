"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer({ days, hours, minutes, seconds }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days,
    hours,
    minutes,
    seconds,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let newSeconds = prev.seconds - 1
        let newMinutes = prev.minutes
        let newHours = prev.hours
        let newDays = prev.days

        if (newSeconds < 0) {
          newSeconds = 59
          newMinutes -= 1
        }

        if (newMinutes < 0) {
          newMinutes = 59
          newHours -= 1
        }

        if (newHours < 0) {
          newHours = 23
          newDays -= 1
        }

        if (newDays < 0) {
          return { days: 0, hours: 0, minutes: 0, seconds: 0 }
        }

        return {
          days: newDays,
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds,
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatNumber = (num: number) => num.toString().padStart(2, "0")

  return (
    <div className="flex justify-center space-x-4 text-center">
      <div className="bg-gray-800 rounded-lg p-3 min-w-[60px]">
        <div className="text-2xl font-bold text-white">{formatNumber(timeLeft.days)}</div>
        <div className="text-xs text-gray-400">DAYS</div>
      </div>
      <div className="bg-gray-800 rounded-lg p-3 min-w-[60px]">
        <div className="text-2xl font-bold text-white">{formatNumber(timeLeft.hours)}</div>
        <div className="text-xs text-gray-400">HOURS</div>
      </div>
      <div className="bg-gray-800 rounded-lg p-3 min-w-[60px]">
        <div className="text-2xl font-bold text-white">{formatNumber(timeLeft.minutes)}</div>
        <div className="text-xs text-gray-400">MINS</div>
      </div>
      <div className="bg-gray-800 rounded-lg p-3 min-w-[60px]">
        <div className="text-2xl font-bold text-white">{formatNumber(timeLeft.seconds)}</div>
        <div className="text-xs text-gray-400">SECS</div>
      </div>
    </div>
  )
}
