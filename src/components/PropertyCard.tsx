import Image from 'next/image'
import Link from 'next/link'
import { Bed, Bath, Square, MapPin, Heart } from 'lucide-react'
import { Property } from '@/lib/mockData'

interface PropertyCardProps {
  property: Property
  showFavorite?: boolean
  onFavoriteToggle?: (propertyId: string) => void
  isFavorite?: boolean
}

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

export default function PropertyCard({ 
  property, 
  showFavorite = true, 
  onFavoriteToggle, 
  isFavorite = false 
}: PropertyCardProps) {
  return (
    <div className="property-card group">
      {/* Property Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-primary-600 text-white px-2 py-1 rounded-md text-sm font-medium">
            {formatStatus(property.status)}
          </span>
        </div>
        
        {/* Favorite Button */}
        {showFavorite && (
          <button
            onClick={() => onFavoriteToggle?.(property.id)}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          >
            <Heart 
              className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
            />
          </button>
        )}
        
        {/* Price Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-white text-primary-600 px-3 py-1 rounded-md text-lg font-bold shadow-md">
            {formatPrice(property.price, property.status)}
          </span>
        </div>
      </div>
      
      {/* Property Details */}
      <div className="p-4">
        {/* Title and Location */}
        <Link href={`/properties/${property.id}`} className="block">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-primary-600 transition-colors">
            {property.title}
          </h3>
        </Link>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">
            {property.address}, {property.city}, {property.state}
          </span>
        </div>
        
        {/* Property Stats */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4 text-gray-600">
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              <span className="text-sm">{property.bedrooms} beds</span>
            </div>
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              <span className="text-sm">{property.bathrooms} baths</span>
            </div>
            <div className="flex items-center">
              <Square className="w-4 h-4 mr-1" />
              <span className="text-sm">{property.sqft.toLocaleString()} sqft</span>
            </div>
          </div>
        </div>
        
        {/* Property Type */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 capitalize">
            {property.property_type}
          </span>
          <span className="text-sm text-gray-500">
            Built {property.year_built}
          </span>
        </div>
        
        {/* Features Preview */}
        {property.features.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex flex-wrap gap-1">
              {property.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                >
                  {feature}
                </span>
              ))}
              {property.features.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{property.features.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 