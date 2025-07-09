'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { 
  Home, 
  Search, 
  Plus, 
  Filter, 
  TrendingUp, 
  DollarSign,
  MapPin,
  Bed,
  Bath,
  Square,
  Calendar,
  Star,
  BarChart3,
  Bot,
  Zap,
  Target,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react'

export default function PropertyAnalysisPage() {
  const [activeTab, setActiveTab] = useState('listings')
  const [searchTerm, setSearchTerm] = useState('')

  const properties = [
    {
      id: '1',
      address: '123 Oak Street, Downtown',
      price: 450000,
      priceChange: 2.5,
      beds: 3,
      baths: 2,
      sqft: 1800,
      status: 'active',
      daysOnMarket: 12,
      aiScore: 92,
      marketValue: 465000,
      roi: 8.5,
      description: 'Beautiful modern home in prime downtown location. Recently renovated with high-end finishes.',
      features: ['New Kitchen', 'Hardwood Floors', 'Garage', 'Garden'],
      images: ['/api/placeholder/400/300'],
      lastUpdated: '2 hours ago'
    },
    {
      id: '2',
      address: '456 Pine Avenue, Westside',
      price: 320000,
      priceChange: -1.2,
      beds: 2,
      baths: 1,
      sqft: 1200,
      status: 'pending',
      daysOnMarket: 45,
      aiScore: 78,
      marketValue: 315000,
      roi: 6.2,
      description: 'Cozy starter home in quiet neighborhood. Perfect for first-time buyers.',
      features: ['Updated Bathroom', 'Fenced Yard', 'Storage Shed'],
      images: ['/api/placeholder/400/300'],
      lastUpdated: '1 day ago'
    },
    {
      id: '3',
      address: '789 Maple Drive, Luxury Area',
      price: 1200000,
      priceChange: 5.8,
      beds: 4,
      baths: 3,
      sqft: 3200,
      status: 'active',
      daysOnMarket: 8,
      aiScore: 95,
      marketValue: 1180000,
      roi: 12.5,
      description: 'Luxury estate with stunning views. Premium location with all amenities.',
      features: ['Pool', 'Wine Cellar', 'Home Theater', 'Smart Home'],
      images: ['/api/placeholder/400/300'],
      lastUpdated: '4 hours ago'
    }
  ]

  const marketInsights = [
    {
      type: 'trend',
      title: 'Downtown Market Heating Up',
      description: 'Properties in Downtown area showing 15% increase in demand. Consider adjusting pricing strategy.',
      action: 'View Analysis',
      priority: 'high'
    },
    {
      type: 'opportunity',
      title: 'New Investment Opportunity',
      description: '3 properties in Westside area undervalued by 8-12%. High ROI potential.',
      action: 'View Properties',
      priority: 'high'
    },
    {
      type: 'alert',
      title: 'Price Adjustment Recommended',
      description: '456 Pine Avenue priced 5% above market. Consider 3-5% reduction for faster sale.',
      action: 'Adjust Price',
      priority: 'medium'
    }
  ]

  const aiRecommendations = [
    {
      type: 'pricing',
      property: '123 Oak Street',
      recommendation: 'Increase price by 3% - market demand is strong',
      confidence: 92,
      impact: 'High'
    },
    {
      type: 'marketing',
      property: '789 Maple Drive',
      recommendation: 'Add virtual tour and drone footage to listing',
      confidence: 88,
      impact: 'Medium'
    },
    {
      type: 'timing',
      property: '456 Pine Avenue',
      recommendation: 'Hold for 2 weeks before next price adjustment',
      confidence: 75,
      impact: 'Low'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'sold': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPriceChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600'
    if (change < 0) return 'text-red-600'
    return 'text-gray-600'
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Home className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Listings</p>
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
                <p className="text-sm font-medium text-gray-600">Avg Days on Market</p>
                <p className="text-2xl font-bold text-gray-900">18</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Price</p>
                <p className="text-2xl font-bold text-gray-900">$485K</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Bot className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">AI Score</p>
                <p className="text-2xl font-bold text-gray-900">87</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Properties List */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setActiveTab('listings')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'listings' 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    My Listings
                  </button>
                  <button
                    onClick={() => setActiveTab('market')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'market' 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Market Analysis
                  </button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search properties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                {properties.map((property) => (
                  <div key={property.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{property.address}</h3>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                              {property.status}
                            </span>
                            <div className="flex items-center">
                              <Star className={`w-4 h-4 ${property.aiScore >= 90 ? 'text-green-600' : property.aiScore >= 70 ? 'text-yellow-600' : 'text-red-600'}`} />
                              <span className="ml-1 text-sm font-medium">{property.aiScore}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 text-gray-400 mr-2" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{formatPrice(property.price)}</p>
                              <p className={`text-xs ${getPriceChangeColor(property.priceChange)}`}>
                                {property.priceChange > 0 ? '+' : ''}{property.priceChange}%
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Bed className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-900">{property.beds} beds</span>
                          </div>
                          <div className="flex items-center">
                            <Bath className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-900">{property.baths} baths</span>
                          </div>
                          <div className="flex items-center">
                            <Square className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-900">{property.sqft.toLocaleString()} sqft</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">{property.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{property.daysOnMarket} days on market</span>
                            <span>Market value: {formatPrice(property.marketValue)}</span>
                            <span>ROI: {property.roi}%</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="btn-secondary text-sm">
                              Edit
                            </button>
                            <button className="btn-primary text-sm">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Insights & Recommendations */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Market Insights</h2>
                <Bot className="h-5 w-5 text-primary-600" />
              </div>
              
              <div className="space-y-4">
                {marketInsights.map((insight, index) => (
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

            {/* AI Recommendations */}
            <div className="card mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h3>
              <div className="space-y-4">
                {aiRecommendations.map((rec, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">{rec.property}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        rec.impact === 'High' ? 'bg-red-100 text-red-700' :
                        rec.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {rec.impact}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{rec.recommendation}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Confidence: {rec.confidence}%</span>
                      <button className="text-xs text-primary-600 hover:text-primary-700 font-medium">
                        Apply
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
                    <span className="text-sm font-medium">Generate Descriptions</span>
                  </div>
                  <span className="text-xs text-gray-500">5 ready</span>
                </button>
                
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                  <div className="flex items-center">
                    <Target className="w-4 h-4 text-primary-600 mr-2" />
                    <span className="text-sm font-medium">Price Analysis</span>
                  </div>
                  <span className="text-xs text-gray-500">3 updates</span>
                </button>
                
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                  <div className="flex items-center">
                    <BarChart3 className="w-4 h-4 text-primary-600 mr-2" />
                    <span className="text-sm font-medium">Market Report</span>
                  </div>
                  <span className="text-xs text-gray-500">New</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 