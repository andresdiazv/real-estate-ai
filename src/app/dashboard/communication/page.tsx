'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { 
  MessageCircle, 
  Send, 
  Phone, 
  Mail, 
  Calendar,
  Users,
  TrendingUp,
  BarChart3,
  Plus,
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Zap,
  Bot
} from 'lucide-react'

export default function CommunicationPage() {
  const [activeTab, setActiveTab] = useState('conversations')
  const [selectedLead, setSelectedLead] = useState<any>(null)

  const conversations = [
    {
      id: '1',
      lead: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        avatar: 'SJ'
      },
      lastMessage: 'Thanks for the property details! When can we schedule a viewing?',
      lastMessageTime: '2 hours ago',
      unreadCount: 1,
      status: 'active',
      aiScore: 95,
      nextFollowUp: 'Tomorrow 10:00 AM',
      channel: 'email'
    },
    {
      id: '2',
      lead: {
        name: 'Mike Chen',
        email: 'mike.chen@email.com',
        avatar: 'MC'
      },
      lastMessage: 'I\'m interested in the downtown properties you mentioned.',
      lastMessageTime: '4 hours ago',
      unreadCount: 0,
      status: 'active',
      aiScore: 78,
      nextFollowUp: 'Friday 2:00 PM',
      channel: 'sms'
    },
    {
      id: '3',
      lead: {
        name: 'Emily Rodriguez',
        email: 'emily.rodriguez@email.com',
        avatar: 'ER'
      },
      lastMessage: 'Can you send me more information about financing options?',
      lastMessageTime: '1 day ago',
      unreadCount: 2,
      status: 'pending',
      aiScore: 45,
      nextFollowUp: 'Next Monday 11:00 AM',
      channel: 'whatsapp'
    }
  ]

  const aiInsights = [
    {
      type: 'opportunity',
      title: 'High-Value Lead Response',
      description: 'Sarah Johnson shows strong buying signals. AI suggests immediate follow-up with property viewing.',
      action: 'Schedule Viewing',
      priority: 'high'
    },
    {
      type: 'followup',
      title: 'Follow-up Sequence Due',
      description: '5 leads haven\'t been contacted in 7+ days. AI recommends personalized follow-up messages.',
      action: 'Send Follow-ups',
      priority: 'high'
    },
    {
      type: 'engagement',
      title: 'Engagement Opportunity',
      description: 'Mike Chen opened your last email 3 times. Perfect time for a phone call.',
      action: 'Call Now',
      priority: 'medium'
    }
  ]

  const templates = [
    {
      id: '1',
      name: 'Property Viewing Follow-up',
      category: 'follow-up',
      content: 'Hi {{name}}, I hope you enjoyed viewing {{property}}. I\'d love to hear your thoughts and answer any questions you might have.',
      usage: 12
    },
    {
      id: '2',
      name: 'Market Update Newsletter',
      category: 'newsletter',
      content: 'Hi {{name}}, here\'s your monthly market update for {{area}}. New listings and price trends included.',
      usage: 8
    },
    {
      id: '3',
      name: 'Open House Invitation',
      category: 'invitation',
      content: 'Hi {{name}}, I\'m hosting an open house this weekend at {{address}}. Would love to see you there!',
      usage: 5
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'completed': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return Mail
      case 'sms': return MessageCircle
      case 'whatsapp': return MessageCircle
      case 'phone': return Phone
      default: return MessageCircle
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
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-primary-100 rounded-lg">
                <MessageCircle className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Conversations</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Response Rate</p>
                <p className="text-2xl font-bold text-gray-900">87%</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                <p className="text-2xl font-bold text-gray-900">2.3h</p>
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
                <p className="text-2xl font-bold text-gray-900">18</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conversations */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setActiveTab('conversations')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'conversations' 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Conversations
                  </button>
                  <button
                    onClick={() => setActiveTab('templates')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'templates' 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Templates
                  </button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              {activeTab === 'conversations' && (
                <div className="space-y-4">
                  {conversations.map((conversation) => (
                    <div 
                      key={conversation.id} 
                      className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all cursor-pointer"
                      onClick={() => setSelectedLead(conversation)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="text-primary-600 font-medium">
                              {conversation.lead.avatar}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-medium text-gray-900">{conversation.lead.name}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(conversation.status)}`}>
                                {conversation.status}
                              </span>
                              {conversation.unreadCount > 0 && (
                                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                                  {conversation.unreadCount}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{conversation.lastMessage}</p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                              <span>{conversation.lastMessageTime}</span>
                              <div className="flex items-center">
                                {(() => {
                                  const ChannelIcon = getChannelIcon(conversation.channel)
                                  return <ChannelIcon className="w-3 h-3 mr-1" />
                                })()}
                                {conversation.channel}
                              </div>
                              <div className="flex items-center">
                                <Star className={`w-3 h-3 mr-1 ${conversation.aiScore >= 90 ? 'text-green-600' : conversation.aiScore >= 70 ? 'text-yellow-600' : 'text-red-600'}`} />
                                {conversation.aiScore}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Next: {conversation.nextFollowUp}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <button className="p-1 text-gray-400 hover:text-primary-600 transition-colors">
                              <MessageCircle className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-primary-600 transition-colors">
                              <Phone className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-primary-600 transition-colors">
                              <Mail className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {activeTab === 'templates' && (
                <div className="space-y-4">
                  {templates.map((template) => (
                    <div key={template.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-medium text-gray-900">{template.name}</h3>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              {template.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{template.content}</p>
                          <div className="flex items-center space-x-4">
                            <span className="text-xs text-gray-500">Used {template.usage} times</span>
                            <button className="text-xs text-primary-600 hover:text-primary-700 font-medium">
                              Edit
                            </button>
                            <button className="text-xs text-primary-600 hover:text-primary-700 font-medium">
                              Use Template
                            </button>
                          </div>
                        </div>
                        <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                          <Zap className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
                    <Send className="w-4 h-4 text-primary-600 mr-2" />
                    <span className="text-sm font-medium">Send Follow-ups</span>
                  </div>
                  <span className="text-xs text-gray-500">5 due</span>
                </button>
                
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-primary-600 mr-2" />
                    <span className="text-sm font-medium">Schedule Calls</span>
                  </div>
                  <span className="text-xs text-gray-500">3 pending</span>
                </button>
                
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-primary-600 mr-2" />
                    <span className="text-sm font-medium">Newsletter</span>
                  </div>
                  <span className="text-xs text-gray-500">Ready</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 