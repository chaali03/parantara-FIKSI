// Indonesia Regions API Integration
// Proxied through local API routes for caching and performance

const BASE_URL = '/api/wilayah'

export interface Province {
  id: string
  name: string
}

export interface Regency {
  id: string
  id_provinsi: string
  name: string
}

export interface District {
  id: string
  id_kabupaten: string
  name: string
}

export interface Village {
  id: string
  id_kecamatan: string
  name: string
}

export async function getProvinces(): Promise<Province[]> {
  try {
    const response = await fetch(`${BASE_URL}/provinces`)
    if (!response.ok) throw new Error('Failed to fetch provinces')
    return await response.json()
  } catch (error) {
    console.error('Error fetching provinces:', error)
    return []
  }
}

export async function getRegencies(provinceId: string): Promise<Regency[]> {
  try {
    const response = await fetch(`${BASE_URL}/regencies/${provinceId}`)
    if (!response.ok) throw new Error('Failed to fetch regencies')
    return await response.json()
  } catch (error) {
    console.error('Error fetching regencies:', error)
    return []
  }
}

export async function getDistricts(regencyId: string): Promise<District[]> {
  try {
    const response = await fetch(`${BASE_URL}/districts/${regencyId}`)
    if (!response.ok) throw new Error('Failed to fetch districts')
    return await response.json()
  } catch (error) {
    console.error('Error fetching districts:', error)
    return []
  }
}

export async function getVillages(districtId: string): Promise<Village[]> {
  try {
    const response = await fetch(`${BASE_URL}/villages/${districtId}`)
    if (!response.ok) throw new Error('Failed to fetch villages')
    return await response.json()
  } catch (error) {
    console.error('Error fetching villages:', error)
    return []
  }
}

// Validate postal code format (5 digits)
export function validatePostalCode(postalCode: string): boolean {
  return /^\d{5}$/.test(postalCode)
}

// Validate complete address
export function validateAddress(address: {
  street: string
  province: string
  regency: string
  district: string
  village: string
  postalCode: string
}): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!address.street || address.street.trim().length < 10) {
    errors.push('Alamat lengkap minimal 10 karakter')
  }

  if (!address.province) {
    errors.push('Provinsi harus dipilih')
  }

  if (!address.regency) {
    errors.push('Kota/Kabupaten harus dipilih')
  }

  if (!address.district) {
    errors.push('Kecamatan harus dipilih')
  }

  if (!address.village) {
    errors.push('Kelurahan/Desa harus dipilih')
  }

  if (!validatePostalCode(address.postalCode)) {
    errors.push('Kode pos harus 5 digit angka')
  }

  return {
    valid: errors.length === 0,
    errors
  }
}
