// @ts-nocheck
import { Building2, MapPin } from "lucide-react"
import { useState, useEffect } from "react"
import { 
  getProvinces, 
  getRegencies, 
  getDistricts, 
  getVillages,
  validatePostalCode,
  type Province,
  type Regency,
  type District,
  type Village
} from "@/lib/indonesia-regions"

interface Step1Props {
  formData: any
  setFormData: (data: any) => void
}

export default function Step1DataMasjid({ formData, setFormData }: Step1Props) {
  const [provinces, setProvinces] = useState<Province[]>([])
  const [regencies, setRegencies] = useState<Regency[]>([])
  const [districts, setDistricts] = useState<District[]>([])
  const [villages, setVillages] = useState<Village[]>([])
  const [loading, setLoading] = useState({
    provinces: false,
    regencies: false,
    districts: false,
    villages: false
  })
  const [postalCodeError, setPostalCodeError] = useState("")

  // Load provinces on mount
  useEffect(() => {
    loadProvinces()
  }, [])

  const loadProvinces = async () => {
    setLoading(prev => ({ ...prev, provinces: true }))
    const data = await getProvinces()
    setProvinces(data)
    setLoading(prev => ({ ...prev, provinces: false }))
  }

  const handleProvinceChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value
    const selectedProvince = provinces.find(p => p.id === selectedId)
    
    setFormData({ 
      ...formData, 
      provinceId: selectedId,
      province: selectedProvince?.name || '',
      regencyId: '',
      regency: '',
      districtId: '',
      district: '',
      villageId: '',
      village: ''
    })
    
    // Reset dependent dropdowns
    setRegencies([])
    setDistricts([])
    setVillages([])
    
    if (selectedId) {
      setLoading(prev => ({ ...prev, regencies: true }))
      const data = await getRegencies(selectedId)
      setRegencies(data)
      setLoading(prev => ({ ...prev, regencies: false }))
    }
  }

  const handleRegencyChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value
    const selectedRegency = regencies.find(r => r.id === selectedId)
    
    setFormData({ 
      ...formData, 
      regencyId: selectedId,
      regency: selectedRegency?.name || '',
      districtId: '',
      district: '',
      villageId: '',
      village: ''
    })
    
    // Reset dependent dropdowns
    setDistricts([])
    setVillages([])
    
    if (selectedId) {
      setLoading(prev => ({ ...prev, districts: true }))
      const data = await getDistricts(selectedId)
      setDistricts(data)
      setLoading(prev => ({ ...prev, districts: false }))
    }
  }

  const handleDistrictChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value
    const selectedDistrict = districts.find(d => d.id === selectedId)
    
    setFormData({ 
      ...formData, 
      districtId: selectedId,
      district: selectedDistrict?.name || '',
      villageId: '',
      village: ''
    })
    
    // Reset dependent dropdown
    setVillages([])
    
    if (selectedId) {
      setLoading(prev => ({ ...prev, villages: true }))
      const data = await getVillages(selectedId)
      setVillages(data)
      setLoading(prev => ({ ...prev, villages: false }))
    }
  }

  const handleVillageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value
    const selectedVillage = villages.find(v => v.id === selectedId)
    
    setFormData({ 
      ...formData, 
      villageId: selectedId,
      village: selectedVillage?.name || ''
    })
  }

  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5)
    setFormData({ ...formData, postalCode: value })
    
    if (value && !validatePostalCode(value)) {
      setPostalCodeError('Kode pos harus 5 digit')
    } else {
      setPostalCodeError('')
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <Building2 className="w-7 h-7 text-blue-600" />
          Data Masjid
        </h2>
        <p className="text-sm text-gray-600">Informasi dasar dan alamat lengkap masjid Anda</p>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-100">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
          <Building2 className="w-5 h-5 text-blue-600" />
          Informasi Dasar
        </h3>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nama Masjid <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.mosqueName}
            onChange={(e) => setFormData({ ...formData, mosqueName: e.target.value })}
            className="w-full px-4 py-3 bg-white border-2 border-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            placeholder="Contoh: Masjid Al-Ikhlas"
            required
          />
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 border-2 border-gray-200">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-blue-600" />
          Alamat Lengkap
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Alamat Lengkap <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.mosqueAddress}
              onChange={(e) => setFormData({ ...formData, mosqueAddress: e.target.value })}
              className="w-full px-4 py-3 bg-white border-2 border-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              rows={3}
              placeholder="Jalan, RT/RW, Nomor"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Minimal 10 karakter</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Provinsi <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.provinceId || ''}
                onChange={handleProvinceChange}
                className="w-full px-4 py-3 bg-white border-2 border-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                required
                disabled={loading.provinces}
              >
                <option value="">
                  {loading.provinces ? 'Memuat...' : 'Pilih Provinsi'}
                </option>
                {provinces.map((prov) => (
                  <option key={prov.id} value={prov.id}>
                    {prov.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kota/Kabupaten <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.regencyId || ''}
                onChange={handleRegencyChange}
                className="w-full px-4 py-3 bg-white border-2 border-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                required
                disabled={!formData.provinceId || loading.regencies}
              >
                <option value="">
                  {loading.regencies ? 'Memuat...' : 'Pilih Kota/Kabupaten'}
                </option>
                {regencies.map((reg) => (
                  <option key={reg.id} value={reg.id}>
                    {reg.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kecamatan <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.districtId || ''}
                onChange={handleDistrictChange}
                className="w-full px-4 py-3 bg-white border-2 border-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                required
                disabled={!formData.regencyId || loading.districts}
              >
                <option value="">
                  {loading.districts ? 'Memuat...' : 'Pilih Kecamatan'}
                </option>
                {districts.map((dist) => (
                  <option key={dist.id} value={dist.id}>
                    {dist.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kelurahan/Desa <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.villageId || ''}
                onChange={handleVillageChange}
                className="w-full px-4 py-3 bg-white border-2 border-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                required
                disabled={!formData.districtId || loading.villages}
              >
                <option value="">
                  {loading.villages ? 'Memuat...' : 'Pilih Kelurahan/Desa'}
                </option>
                {villages.map((vill) => (
                  <option key={vill.id} value={vill.id}>
                    {vill.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Kode Pos <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.postalCode || ''}
              onChange={handlePostalCodeChange}
              className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
                postalCodeError ? 'border-red-500' : 'border-gray-900 focus:border-blue-500'
              }`}
              placeholder="5 digit"
              maxLength={5}
              required
            />
            {postalCodeError && (
              <p className="text-xs text-red-600 mt-1">{postalCodeError}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">Harus 5 digit angka</p>
          </div>
        </div>
      </div>
    </div>
  )
}
