export declare interface Phone {
  countryCode: number
  area: number
  number: number
  type: 'MOBILE' | 'BUSINESS' | 'HOME'
}

export declare interface Address {
  street: string
  number: string
  complement?: string
  locality: string
  city: string
  region_code: string
  region?: string
  country: string
  postal_code: string
}
