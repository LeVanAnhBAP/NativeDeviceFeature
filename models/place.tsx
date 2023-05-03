interface PlaceModel {
    title: string;
    imageUrl: string;
    address: string;
    location: {lat: string, long: string};
}

class Place implements PlaceModel {
    title: string;
    imageUrl: string;
    address: string;
    location: {lat: string, long: string};
    id: string

    constructor(title: string, imageUrl: string, address: string, location: {lat: string, long: string}, id: string) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.address = address;
        this.location = {lat: location.lat, long: location.long};
        this.id = id
    }
}

export default Place