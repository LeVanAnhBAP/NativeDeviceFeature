const GOOGLE_API_KEY = 'AyzaSyCTCDNDtYPCpAD0FaKgHgdzCjMN1QUHnt4'

export default function getMapPreview(lat: string, long: string) {
    const imageMapPreview = `https://www.google.com/maps/@?api=${GOOGLE_API_KEY}&map_action=map&center=${lat}%2C${long}`
    return imageMapPreview
}

export async function getAddress(lat: string, long: string) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GOOGLE_API_KEY}`
    console.log(url)
    const response = await fetch(url)
    if(!response.ok) {
        throw new Error('Fail to fetch address!')
    }
    const data = await response.json()
    const address = data.results[0]
    return address
}
