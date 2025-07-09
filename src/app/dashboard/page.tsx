'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { 
  Users, 
  Home, 
  Calendar, 
  FileText, 
  TrendingUp, 
  MessageCircle, 
  Search, 
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart3,
  Settings,
  Plus
} from 'lucide-react'

export default function RealtorDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const workflowStages = [
    {
      id: 'leads',
      title: 'Lead Management',
      icon: Users,
      count: 12,
      status: 'active',
      description: 'Capture and qualify new leads'
    },
    {
      id: 'communication',
      title: 'Client Communication',
      icon: MessageCircle,
      count: 8,
      status: 'active',
      description: 'AI-powered messaging and follow-ups'
    },
    {
      id: 'properties',
      title: 'Property Analysis',
      icon: Home,
      count: 24,
      status: 'active',
      description: 'Market analysis and property matching'
    },
    {
      id: 'showings',
      title: 'Showing Management',
      icon: Calendar,
      count: 5,
      status: 'pending',
      description: 'Schedule and manage property viewings'
    },
    {
      id: 'offers',
      title: 'Offers & Negotiation',
      icon: FileText,
      count: 3,
      status: 'active',
      description: 'Offer management and negotiation tools'
    },
    {
      id: 'closing',
      title: 'Closing & Follow-up',
      icon: CheckCircle,
      count: 2,
      status: 'completed',
      description: 'Deal closure and client retention'
    }
  ]

  const aiInsights = [
    {
      type: 'opportunity',
      title: 'High-Value Lead Detected',
      description: 'Sarah Johnson shows strong buying signals. Recommend immediate follow-up.',
      action: 'Contact Now',
      priority: 'high'
    },
    {
      type: 'market',
      title: 'Market Opportunity Alert',
      description: '3 new listings in Downtown area match your client criteria.',
      action: 'View Properties',
      priority: 'medium'
    },
    {
      type: 'followup',
      title: 'Follow-up Due',
      description: '5 clients haven\'t been contacted in 7+ days.',
      action: 'Send Follow-ups',
      priority: 'high'
    }
  ]

  const recentActivities = [
    {
      type: 'lead',
      title: 'New Lead: Mike Chen',
      description: 'Interested in 3-bedroom homes in Westside',
      time: '2 hours ago',
      status: 'new'
    },
    {
      type: 'showing',
      title: 'Showing Scheduled',
      description: '123 Oak Street - Tomorrow 2:00 PM',
      time: '4 hours ago',
      status: 'scheduled'
    },
    {
      type: 'offer',
      title: 'Offer Submitted',
      description: '456 Pine Avenue - $450,000',
      time: '1 day ago',
      status: 'pending'
    },
    {
      type: 'closing',
      title: 'Deal Closed',
      description: '789 Maple Drive - $520,000',
      time: '3 days ago',
      status: 'completed'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'completed': return 'text-blue-600 bg-blue-100'
      case 'new': return 'text-purple-600 bg-purple-100'
      case 'scheduled': return 'text-orange-600 bg-orange-100'
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Realtor Dashboard</h1>
          <p className="text-gray-600 mt-2">AI-powered workflow management for modern realtors</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Leads</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-accent-100 rounded-lg">
                <Home className="h-6 w-6 text-accent-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Properties</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Showings</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">$127K</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Workflow Stages */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Workflow Stages</h2>
                <button className="btn-secondary text-sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Stage
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workflowStages.map((stage) => (
                  <Link 
                    key={stage.id}
                    href={`/dashboard/${stage.id}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <stage.icon className="h-5 w-5 text-primary-600 mr-2" />
                        <h3 className="font-medium text-gray-900">{stage.title}</h3>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(stage.status)}`}>
                        {stage.count}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{stage.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">AI Insights</h2>
                <BarChart3 className="h-5 w-5 text-primary-600" />
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
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              <Link href="/dashboard/activity" className="text-sm text-primary-600 hover:text-primary-700">
                View All
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-3 ${getStatusColor(activity.status).split(' ')[0]}`}></div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">{activity.title}</h3>
                      <p className="text-xs text-gray-600">{activity.description}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 