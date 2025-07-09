'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Phone, 
  Mail, 
  MessageCircle,
  CheckCircle,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Star,
  Bot,
  Zap,
  Target,
  BarChart3,
  Home,
  DollarSign
} from 'lucide-react'

export default function ShowingManagementPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const showings = [
    {
      id: '1',
      property: {
        address: '123 Oak Street, Downtown',
        price: 450000,
        beds: 3,
        baths: 2,
        sqft: 1800,
        image: '/api/placeholder/400/300'
      },
      client: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '(555) 123-4567',
        avatar: 'SJ'
      },
      date: '2024-01-15',
      time: '14:00',
      duration: 45,
      status: 'confirmed',
      type: 'buyer',
      notes: 'Very interested in downtown properties. Budget $450k-$600k.',
      aiScore: 95,
      followUp: 'Send property details and schedule second viewing',
      lastContact: '2 hours ago'
    },
    {
      id: '2',
      property: {
        address: '456 Pine Avenue, Westside',
        price: 320000,
        beds: 2,
        baths: 1,
        sqft: 1200,
        image: '/api/placeholder/400/300'
      },
      client: {
        name: 'Mike Chen',
        email: 'mike.chen@email.com',
        phone: '(555) 234-5678',
        avatar: 'MC'
      },
      date: '2024-01-16',
      time: '10:30',
      duration: 30,
      status: 'pending',
      type: 'buyer',
      notes: 'First-time buyer. Needs guidance on the process.',
      aiScore: 78,
      followUp: 'Send first-time buyer guide and financing options',
      lastContact: '1 day ago'
    },
    {
      id: '3',
      property: {
        address: '789 Maple Drive, Luxury Area',
        price: 1200000,
        beds: 4,
        baths: 3,
        sqft: 3200,
        image: '/api/placeholder/400/300'
      },
      client: {
        name: 'David Thompson',
        email: 'david.thompson@email.com',
        phone: '(555) 456-7890',
        avatar: 'DT'
      },
      date: '2024-01-14',
      time: '16:00',
      duration: 60,
      status: 'completed',
      type: 'buyer',
      notes: 'High-net-worth individual. Cash buyer. Very impressed with property.',
      aiScore: 92,
      followUp: 'Prepare offer package and schedule follow-up call',
      lastContact: '3 hours ago'
    }
  ]

  const aiInsights = [
    {
      type: 'scheduling',
      title: 'Optimal Showing Time',
      description: 'Sarah Johnson typically responds best to afternoon showings. Consider 2-4 PM slots.',
      action: 'Reschedule',
      priority: 'medium'
    },
    {
      type: 'followup',
      title: 'High-Value Follow-up Due',
      description: 'David Thompson showed strong interest. AI recommends immediate offer preparation.',
      action: 'Prepare Offer',
      priority: 'high'
    },
    {
      type: 'coordination',
      title: 'Client Conflict Detected',
      description: 'Mike Chen and Sarah Johnson both interested in similar properties. Consider joint showing.',
      action: 'Coordinate',
      priority: 'medium'
    }
  ]

  const upcomingShowings = showings.filter(s => s.status === 'confirmed' || s.status === 'pending')
  const completedShowings = showings.filter(s => s.status === 'completed')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'completed': return 'text-blue-600 bg-blue-100'
      case 'cancelled': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500'
      case 'medium': return 'border-l-yellow-500'
      case 'low': return 'border-l-green-500'
      default: return 'border-l-gray-500'
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Calendar className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today's Showings</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Bot className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">AI Assisted</p>
                <p className="text-2xl font-bold text-gray-900">4</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Showings List */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeFilter === 'all' 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Showings
                  </button>
                  <button
                    onClick={() => setActiveFilter('upcoming')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeFilter === 'upcoming' 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Upcoming
                  </button>
                  <button
                    onClick={() => setActiveFilter('completed')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeFilter === 'completed' 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Completed
                  </button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search showings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                {showings.map((showing) => (
                  <div key={showing.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                              <span className="text-primary-600 font-medium">
                                {showing.client.avatar}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{showing.client.name}</h3>
                              <p className="text-sm text-gray-600">{showing.property.address}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(showing.status)}`}>
                              {showing.status}
                            </span>
                            <div className="flex items-center">
                              <Star className={`w-4 h-4 ${showing.aiScore >= 90 ? 'text-green-600' : showing.aiScore >= 70 ? 'text-yellow-600' : 'text-red-600'}`} />
                              <span className="ml-1 text-sm font-medium">{showing.aiScore}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{formatDate(showing.date)}</p>
                              <p className="text-xs text-gray-500">{showing.time}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-900">{showing.duration} min</span>
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-900">{formatPrice(showing.property.price)}</span>
                          </div>
                          <div className="flex items-center">
                            <Home className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-900">{showing.property.beds}bd/{showing.property.baths}ba</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">{showing.notes}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Last contact: {showing.lastContact}</span>
                            <span>Type: {showing.type}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                              <Phone className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                              <MessageCircle className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                              <Mail className="w-4 h-4" />
                            </button>
                            <button className="btn-secondary text-sm">
                              Details
                            </button>
                          </div>
                        </div>
                        
                        {showing.followUp && (
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-800">
                              <strong>AI Follow-up:</strong> {showing.followUp}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">AI Insights</h2>
                <Bot className="h-5 w-5 text-primary-600" />
              </div>
              
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div key={index} className={`p-4 border-l-4 bg-gray-50 rounded-r-lg ${getPriorityColor(insight.priority)}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900 text-sm">{insight.title}</h3>
                        <p className="text-xs text-gray-600 mt-1">{insight.description}</p>
                      </div>
                      <button className="text-xs text-primary-600 hover:text-primary-700 font-medium">
                        {insight.action}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                  <div className="flex items-center">
                    <Zap className="w-4 h-4 text-primary-600 mr-2" />
                    <span className="text-sm font-medium">Auto-Schedule</span>
                  </div>
                  <span className="text-xs text-gray-500">3 ready</span>
                </button>
                
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                  <div className="flex items-center">
                    <Target className="w-4 h-4 text-primary-600 mr-2" />
                    <span className="text-sm font-medium">Send Reminders</span>
                  </div>
                  <span className="text-xs text-gray-500">5 due</span>
                </button>
                
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-primary-600 mr-2" />
                    <span className="text-sm font-medium">Group Showings</span>
                  </div>
                  <span className="text-xs text-gray-500">2 possible</span>
                </button>
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="card mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
              <div className="space-y-3">
                {upcomingShowings.slice(0, 3).map((showing) => (
                  <div key={showing.id} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">{showing.client.name}</h4>
                      <span className="text-xs text-gray-500">{showing.time}</span>
                    </div>
                    <p className="text-xs text-gray-600">{showing.property.address}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button className="text-xs text-primary-600 hover:text-primary-700 font-medium">
                        Call
                      </button>
                      <button className="text-xs text-primary-600 hover:text-primary-700 font-medium">
                        Message
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 