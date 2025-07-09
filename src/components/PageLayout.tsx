'use client'

import { ReactNode } from 'react'
import Navigation from './Navigation'

interface PageLayoutProps {
  children: ReactNode
  showNavigation?: boolean
  title?: string
  subtitle?: string
  actions?: ReactNode
}

export default function PageLayout({ 
  children, 
  showNavigation = true, 
  title,
  subtitle,
  actions 
}: PageLayoutProps) {
  return (
    <div className="page-container">
      {showNavigation && <Navigation />}
      
      <div className="content-wrapper">
        {(title || actions) && (
          <div className="flex items-center justify-between mb-8">
            {(title || subtitle) && (
              <div>
                {title && <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>}
                {subtitle && <p className="text-gray-600">{subtitle}</p>}
              </div>
            )}
            {actions && <div className="flex items-center space-x-4">{actions}</div>}
          </div>
        )}
        
        {children}
      </div>
    </div>
  )
} 