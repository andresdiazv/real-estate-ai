'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Users, 
  MessageCircle, 
  Calendar, 
  FileText, 
  CheckCircle,
  ChevronRight,
  Settings
} from 'lucide-react'

interface NavigationProps {
  showBackButton?: boolean
}

export default function Navigation({ showBackButton = true }: NavigationProps) {
  const pathname = usePathname()

  const getPageTitle = () => {
    switch (pathname) {
      case '/dashboard':
        return 'Dashboard'
      case '/dashboard/leads':
        return 'Lead Management'
      case '/dashboard/communication':
        return 'AI Communication Hub'
      case '/dashboard/properties':
        return 'Property Analysis'
      case '/dashboard/showings':
        return 'Showing Management'
      default:
        return 'RealtorAI'
    }
  }

  const getBreadcrumbs = () => {
    const breadcrumbs = []
    
    if (pathname.startsWith('/dashboard')) {
      breadcrumbs.push({ name: 'Dashboard', href: '/dashboard' })
      
      if (pathname !== '/dashboard') {
        const pageName = getPageTitle()
        breadcrumbs.push({ name: pageName, href: pathname })
      }
    }
    
    return breadcrumbs
  }

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Leads', href: '/dashboard/leads', icon: Users },
    { name: 'Communication', href: '/dashboard/communication', icon: MessageCircle },
    { name: 'Properties', href: '/dashboard/properties', icon: FileText },
    { name: 'Showings', href: '/dashboard/showings', icon: Calendar },
  ]

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Breadcrumbs */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center text-gray-900 hover:text-primary-600 transition-colors">
              <Home className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-semibold">RealtorAI</span>
            </Link>
            
            {showBackButton && pathname !== '/dashboard' && (
              <>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <nav className="flex items-center space-x-2 text-sm">
                  {getBreadcrumbs().map((breadcrumb, index) => (
                    <div key={breadcrumb.href} className="flex items-center">
                      <Link 
                        href={breadcrumb.href}
                        className={`hover:text-primary-600 transition-colors ${
                          index === getBreadcrumbs().length - 1 
                            ? 'text-gray-900 font-medium' 
                            : 'text-gray-500'
                        }`}
                      >
                        {breadcrumb.name}
                      </Link>
                      {index < getBreadcrumbs().length - 1 && (
                        <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
                      )}
                    </div>
                  ))}
                </nav>
              </>
            )}
          </div>

          {/* Right side - Navigation and User */}
          <div className="flex items-center space-x-4">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-gray-400 hover:text-gray-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* User menu */}
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="h-5 w-5" />
              </button>
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200 py-2">
          <nav className="flex items-center space-x-1 overflow-x-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
} 