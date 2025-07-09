'use client'

import { LucideIcon } from 'lucide-react'

interface InsightItem {
  type: string
  title: string
  description: string
  action: string
  priority: 'high' | 'medium' | 'low'
  icon?: LucideIcon
}

interface AIInsightsProps {
  insights: InsightItem[]
  title?: string
  className?: string
}

export default function AIInsights({ insights, title = 'AI Insights', className = '' }: AIInsightsProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'priority-high'
      case 'medium': return 'priority-medium'
      case 'low': return 'priority-low'
      default: return 'border-l-gray-500'
    }
  }

  return (
    <div className={`card ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
        </div>
      </div>
      
      <div className="item-spacing">
        {insights.map((insight, index) => {
          const Icon = insight.icon
          return (
            <div key={index} className={`p-4 border-l-4 bg-gray-50 rounded-r-lg ${getPriorityColor(insight.priority)}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {Icon && (
                    <div className="flex items-center mb-2">
                      <Icon className="w-4 h-4 text-gray-500 mr-2" />
                      <h3 className="font-medium text-gray-900 text-sm">{insight.title}</h3>
                    </div>
                  )}
                  {!Icon && <h3 className="font-medium text-gray-900 text-sm mb-2">{insight.title}</h3>}
                  <p className="text-xs text-gray-600">{insight.description}</p>
                </div>
                <button className="text-xs text-primary-600 hover:text-primary-700 font-medium">
                  {insight.action}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
} 