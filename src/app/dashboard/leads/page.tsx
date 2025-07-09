'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MessageCircle, 
  Phone, 
  Mail, 
  Calendar,
  Star,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  UserPlus,
  BarChart3
} from 'lucide-react'

export default function LeadManagementPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const leads = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '(555) 123-4567',
      status: 'hot',
      score: 95,
      source: 'Website',
      lastContact: '2 hours ago',
      nextFollowUp: 'Tomorrow 10:00 AM',
      budget: '$450,000 - $600,000',
      criteria: '3+ beds, 2+ baths, Downtown area',
      notes: 'Very responsive, shows strong buying signals. Interested in new construction.',
      tags: ['High Value', 'Ready to Buy', 'Downtown']
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      phone: '(555) 234-5678',
      status: 'warm',
      score: 78,
      source: 'Referral',
      lastContact: '1 day ago',
      nextFollowUp: 'Friday 2:00 PM',
      budget: '$300,000 - $450,000',
      criteria: '2+ beds, 1+ bath, Suburban area',
      notes: 'First-time buyer. Needs guidance on the process. Very motivated.',
      tags: ['First-time Buyer', 'Suburban', 'Motivated']
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      phone: '(555) 345-6789',
      status: 'cold',
      score: 45,
      source: 'Social Media',
      lastContact: '1 week ago',
      nextFollowUp: 'Next Monday 11:00 AM',
      budget: '$200,000 - $350,000',
      criteria: '1+ bed, 1+ bath, Any area',
      notes: 'Budget conscious. Looking for starter home. Needs more education.',
      tags: ['Budget Conscious', 'Starter Home', 'Needs Education']
    },
    {
      id: '4',
      name: 'David Thompson',
      email: 'david.thompson@email.com',
      phone: '(555) 456-7890',
      status: 'hot',
      score: 92,
      source: 'Open House',
      lastContact: '3 hours ago',
      nextFollowUp: 'Today 4:00 PM',
      budget: '$800,000 - $1,200,000',
      criteria: '4+ beds, 3+ baths, Luxury area',
      notes: 'High-net-worth individual. Looking for luxury properties. Cash buyer.',
      tags: ['High Net Worth', 'Luxury', 'Cash Buyer']
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot': return 'text-red-600 bg-red-100'
      case 'warm': return 'text-yellow-600 bg-yellow-100'
      case 'cold': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const filteredLeads = leads.filter(lead => {
    const matchesFilter = activeFilter === 'all' || lead.status === activeFilter
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const stats = {
    total: leads.length,
    hot: leads.filter(l => l.status === 'hot').length,
    warm: leads.filter(l => l.status === 'warm').length,
    cold: leads.filter(l => l.status === 'cold').length,
    avgScore: Math.round(leads.reduce((sum, l) => sum + l.score, 0) / leads.length)
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
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Hot Leads</p>
                <p className="text-2xl font-bold text-gray-900">{stats.hot}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Score</p>
                <p className="text-2xl font-bold text-gray-900">{stats.avgScore}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Follow-ups Today</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="card mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search leads by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === 'all' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({stats.total})
              </button>
              <button
                onClick={() => setActiveFilter('hot')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === 'hot' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Hot ({stats.hot})
              </button>
              <button
                onClick={() => setActiveFilter('warm')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === 'warm' 
                    ? 'bg-yellow-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Warm ({stats.warm})
              </button>
              <button
                onClick={() => setActiveFilter('cold')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === 'cold' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Cold ({stats.cold})
              </button>
            </div>
          </div>
        </div>

        {/* Leads List */}
        <div className="space-y-4">
          {filteredLeads.map((lead) => (
            <div key={lead.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-medium">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{lead.name}</h3>
                        <p className="text-sm text-gray-600">{lead.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                        {lead.status.toUpperCase()}
                      </span>
                      <div className="flex items-center">
                        <Star className={`w-4 h-4 ${getScoreColor(lead.score)}`} />
                        <span className={`ml-1 text-sm font-medium ${getScoreColor(lead.score)}`}>
                          {lead.score}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Budget</p>
                      <p className="text-sm font-medium text-gray-900">{lead.budget}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Criteria</p>
                      <p className="text-sm font-medium text-gray-900">{lead.criteria}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Source</p>
                      <p className="text-sm font-medium text-gray-900">{lead.source}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Last: {lead.lastContact}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Next: {lead.nextFollowUp}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="btn-secondary text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                  
                  {lead.notes && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{lead.notes}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2 mt-3">
                    {lead.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No leads found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first lead.'}
            </p>
            <button className="btn-primary">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Lead
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 