const getPuzzle = async (wordCount) => {
   const response = await fetch(`http://puzzle.mead.io/puzzle?wordCount=${wordCount}`, {})
   if(response.status === 200) {
       const data = await response.json()
       return data.puzzle
   }else {
       throw new Error('Unable to fetch puzzle')
   }
}

const getCountry = async (countryCode) => {
    const response = await fetch(`http://restcountries.eu/rest/v2/all`, {})
    if(response.status === 200) {
        const countries = await response.json()
        return countries.find((country) => country.alpha2Code === countryCode)
    }else {
        throw new Error('Unable to fetch country')
    }
}

const myToken = 'c28fa2e75f215f'
const getIPLocation = async () => {
    const response = await fetch(`http://ipinfo.io/json?token=${myToken}`, {})
    if(response.status === 200) {
        return response.json()
    }else {
        throw new Error('Get IP location failed.')
    }
}

const getCurrentCountry = async () => {
    const curLocation = await getIPLocation()
    return getCountry(curLocation.country)
}
