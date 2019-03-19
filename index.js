module.exports = key => {
    const googleMapsClient = require('@google/maps').createClient({
        key: key,
        Promise
    });
    return async function(searchTerm){
        const [ lat, lng, radius ] = [ "29.752554", "-95.370399", 5 ]
        let thing = await googleMapsClient.places({query: searchTerm, location: {
            lat, lng, radius
        }}).asPromise()
        let places = await Promise.all(thing.json.results.map( async ({ place_id }) => {
            return googleMapsClient.place({ placeid: place_id }).asPromise()
        }))
        return places.map( place => place.json.result)
    }
}