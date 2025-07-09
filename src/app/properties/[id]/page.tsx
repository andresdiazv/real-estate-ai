'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  Bed, 
  Bath, 
  Square, 
  MapPin, 
  Calendar, 
  Car, 
  Snowflake, 
  Flame,
  Heart,
  Share2,
  Phone,
  Mail,
  MessageCircle
} from 'lucide-react'
import { getPropertyById, Property } from '@/lib/mockData'

// Formats price with proper currency display
const formatPrice = (price: number, status: Property['status']) => {
  if (status === 'for_rent') {
    return `$${price.toLocaleString()}/month`
  }
  return `$${price.toLocaleString()}`
}

// Formats property status for display
const formatStatus = (status: Property['status']) => {
  switch (status) {
    case 'for_sale':
      return 'For Sale'
    case 'for_rent':
      return 'For Rent'
    case 'sold':
      return 'Sold'
    case 'pending':
      return 'Pending'
    default:
      return status
  }
}

export default function PropertyDetailPage() {
  const params = useParams()
  const propertyId = params.id as string
  const property = getPropertyById(propertyId)
  
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  // Handle favorite toggle
  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite)
    // TODO: Implement with user authentication
  }

  // Handle contact form submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement contact form functionality
    console.log('Contact form submitted')
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h1>
          <p className="text-gray-600 mb-4">The property you're looking for doesn't exist.</p>
          <Link href="/properties" className="btn-primary">
            Back to Properties
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary-600">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/properties" className="text-gray-500 hover:text-primary-600">
              Properties
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{property.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Property Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{property.address}, {property.city}, {property.state} {property.zip_code}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleFavoriteToggle}
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  </button>
                  <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                    <Share2 className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Price and Status */}
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-primary-600">
                  {formatPrice(property.price, property.status)}
                </div>
                <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                  {formatStatus(property.status)}
                </span>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="relative h-96 mb-4">
                <Image
                  src={property.images[selectedImage]}
                  alt={property.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              
              {/* Thumbnail Images */}
              {property.images.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? 'border-primary-500' : 'border-gray-200'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${property.title} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Details</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Key Features */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Key Features</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Bed className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-600">{property.bedrooms} Bedrooms</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-600">{property.bathrooms} Bathrooms</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-600">{property.sqft.toLocaleString()} sq ft</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-600">Built in {property.year_built}</span>
                    </div>
                  </div>
                </div>

                {/* Additional Features */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Additional Features</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Car className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-600">{property.parking}</span>
                    </div>
                    <div className="flex items-center">
                      <Flame className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-600">{property.heating}</span>
                    </div>
                    <div className="flex items-center">
                      <Snowflake className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-600">{property.cooling}</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-600">{property.lot_size} acres lot</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </div>

            {/* Features List */}
            {property.features.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Features</h2>
                <div className="grid md:grid-cols-2 gap-2">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Agent */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Agent</h2>
              
              <div className="flex items-center mb-4">
                <Image
                  src={property.agent.avatar}
                  alt={property.agent.name}
                  width={60}
                  height={60}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{property.agent.name}</h3>
                  <p className="text-sm text-gray-600">Real Estate Agent</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="text-sm">{property.agent.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="text-sm">{property.agent.email}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full btn-primary">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Agent
                </button>
                <button className="w-full btn-secondary">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Schedule a Viewing</h2>
              
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    className="input-field"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="input-field"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="input-field"
                    placeholder="(555) 123-4567"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="input-field"
                    placeholder="I'm interested in this property..."
                  ></textarea>
                </div>
                
                <button type="submit" className="w-full btn-primary">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 