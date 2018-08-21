const API_KEY = '5D94B775-8CED-4BD2-BAA9-64B793602ADC'

export const getAirQuality = async zip => {
  const res = await fetch(
    `http://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=${zip}&API_KEY=${API_KEY}`
  )
  const [o3, pm2] = await res.json()
  return { o3: o3.AQI, pm2: pm2.AQI }
}
