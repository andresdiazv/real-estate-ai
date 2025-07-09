'use client'

import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

interface StatItem {
  label: string
  value: string | number
  icon: LucideIcon
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  change?: {
    value: number
    isPositive: boolean
  }
}

interface StatsGridProps {
  stats: StatItem[]
  className?: string
}

export default function StatsGrid({ stats, className = '' }: StatsGridProps) {
  const getIconColor = (color?: string) => {
    switch (color) {
      case 'success': return 'icon-success'
      case 'warning': return 'icon-warning'
      case 'danger': return 'icon-danger'
      case 'info': return 'icon-info'
      default: return 'icon-primary'
    }
  }

  return (
    <div className={`grid-stats ${className}`}>
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div key={index} className="card">
            <div className="flex items-center">
              <div className={`${getIconColor(stat.color)}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                {stat.change && (
                  <p className={`text-xs ${stat.change.isPositive ? 'text-success' : 'text-danger'}`}>
                    {stat.change.isPositive ? '+' : ''}{stat.change.value}%
                  </p>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
} 