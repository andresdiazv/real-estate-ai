// Mock property data for development and testing
// This can be easily replaced with real API data later

export interface Property {
  id: string
  title: string
  description: string
  price: number
  bedrooms: number
  bathrooms: number
  sqft: number
  address: string
  city: string
  state: string
  zip_code: string
  images: string[]
  features: string[]
  property_type: 'house' | 'apartment' | 'condo' | 'townhouse'
  status: 'for_sale' | 'for_rent' | 'sold' | 'pending'
  year_built: number
  lot_size: number
  parking: string
  heating: string
  cooling: string
  created_at: string
  updated_at: string
  agent: {
    name: string
    email: string
    phone: string
    avatar: string
  }
  location: {
    latitude: number
    longitude: number
  }
}

// Sample property data
export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Family Home in Downtown',
    description: 'Beautiful 4-bedroom family home with modern amenities, spacious kitchen, and large backyard. Perfect for families looking for comfort and style.',
    price: 750000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    address: '123 Main Street',
    city: 'Austin',
    state: 'TX',
    zip_code: '78701',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800'
    ],
    features: ['Hardwood Floors', 'Granite Countertops', 'Walk-in Closet', 'Fireplace', 'Garden'],
    property_type: 'house',
    status: 'for_sale',
    year_built: 2018,
    lot_size: 0.25,
    parking: '2-car garage',
    heating: 'Central',
    cooling: 'Central',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    agent: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@realestate.com',
      phone: '(512) 555-0123',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
    },
    location: {
      latitude: 30.2672,
      longitude: -97.7431
    }
  },
  {
    id: '2',
    title: 'Luxury Condo with City Views',
    description: 'Stunning 2-bedroom condo with panoramic city views, high-end finishes, and resort-style amenities. Ideal for professionals or investors.',
    price: 450000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    address: '456 Oak Avenue',
    city: 'Austin',
    state: 'TX',
    zip_code: '78702',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
    ],
    features: ['City Views', 'Balcony', 'Fitness Center', 'Pool', 'Concierge'],
    property_type: 'condo',
    status: 'for_sale',
    year_built: 2020,
    lot_size: 0.05,
    parking: 'Assigned parking',
    heating: 'Central',
    cooling: 'Central',
    created_at: '2024-01-14T14:30:00Z',
    updated_at: '2024-01-14T14:30:00Z',
    agent: {
      name: 'Michael Chen',
      email: 'michael.chen@realestate.com',
      phone: '(512) 555-0456',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
    },
    location: {
      latitude: 30.2747,
      longitude: -97.7464
    }
  },
  {
    id: '3',
    title: 'Charming Townhouse in Historic District',
    description: 'Beautifully renovated townhouse in the heart of the historic district. Features original character with modern updates and a private courtyard.',
    price: 625000,
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 1800,
    address: '789 Pine Street',
    city: 'Austin',
    state: 'TX',
    zip_code: '78703',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
    ],
    features: ['Historic Charm', 'Private Courtyard', 'Updated Kitchen', 'Hardwood Floors', 'Walkable Location'],
    property_type: 'townhouse',
    status: 'for_sale',
    year_built: 1925,
    lot_size: 0.15,
    parking: 'Street parking',
    heating: 'Central',
    cooling: 'Central',
    created_at: '2024-01-13T09:15:00Z',
    updated_at: '2024-01-13T09:15:00Z',
    agent: {
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@realestate.com',
      phone: '(512) 555-0789',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
    },
    location: {
      latitude: 30.2719,
      longitude: -97.7444
    }
  },
  {
    id: '4',
    title: 'Spacious Apartment for Rent',
    description: 'Large 2-bedroom apartment with modern amenities, in-unit laundry, and access to community pool and fitness center.',
    price: 2200,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1100,
    address: '321 Cedar Lane',
    city: 'Austin',
    state: 'TX',
    zip_code: '78704',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
    ],
    features: ['In-Unit Laundry', 'Community Pool', 'Fitness Center', 'Pet Friendly', 'Balcony'],
    property_type: 'apartment',
    status: 'for_rent',
    year_built: 2019,
    lot_size: 0.02,
    parking: 'Assigned parking',
    heating: 'Central',
    cooling: 'Central',
    created_at: '2024-01-12T16:45:00Z',
    updated_at: '2024-01-12T16:45:00Z',
    agent: {
      name: 'David Thompson',
      email: 'david.thompson@realestate.com',
      phone: '(512) 555-0321',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    location: {
      latitude: 30.2500,
      longitude: -97.7500
    }
  },
  {
    id: '5',
    title: 'Investment Property - Multi-Family',
    description: 'Excellent investment opportunity! 4-unit building with strong rental history and potential for value appreciation.',
    price: 1200000,
    bedrooms: 8,
    bathrooms: 4,
    sqft: 3200,
    address: '654 Maple Drive',
    city: 'Austin',
    state: 'TX',
    zip_code: '78705',
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'
    ],
    features: ['Investment Property', '4 Units', 'Strong Cash Flow', 'Tenant Occupied', 'Value Add Potential'],
    property_type: 'house',
    status: 'for_sale',
    year_built: 1985,
    lot_size: 0.35,
    parking: '4 spaces',
    heating: 'Central',
    cooling: 'Central',
    created_at: '2024-01-11T11:20:00Z',
    updated_at: '2024-01-11T11:20:00Z',
    agent: {
      name: 'Lisa Wang',
      email: 'lisa.wang@realestate.com',
      phone: '(512) 555-0654',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
    },
    location: {
      latitude: 30.2984,
      longitude: -97.7392
    }
  }
]

// Helper functions for data manipulation
export const getPropertyById = (id: string): Property | undefined => {
  return mockProperties.find(property => property.id === id)
}

export const getPropertiesByStatus = (status: Property['status']): Property[] => {
  return mockProperties.filter(property => property.status === status)
}

export const getPropertiesByType = (type: Property['property_type']): Property[] => {
  return mockProperties.filter(property => property.property_type === type)
}

export const searchProperties = (query: string): Property[] => {
  const lowercaseQuery = query.toLowerCase()
  return mockProperties.filter(property => 
    property.title.toLowerCase().includes(lowercaseQuery) ||
    property.description.toLowerCase().includes(lowercaseQuery) ||
    property.city.toLowerCase().includes(lowercaseQuery) ||
    property.address.toLowerCase().includes(lowercaseQuery)
  )
}

export const filterProperties = (filters: {
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  bathrooms?: number
  propertyType?: Property['property_type']
  status?: Property['status']
}): Property[] => {
  return mockProperties.filter(property => {
    if (filters.minPrice && property.price < filters.minPrice) return false
    if (filters.maxPrice && property.price > filters.maxPrice) return false
    if (filters.bedrooms && property.bedrooms < filters.bedrooms) return false
    if (filters.bathrooms && property.bathrooms < filters.bathrooms) return false
    if (filters.propertyType && property.property_type !== filters.propertyType) return false
    if (filters.status && property.status !== filters.status) return false
    return true
  })
} 