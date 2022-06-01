class Node {
    id: string;
    lat: number;
    lon: number;

    constructor(id: string, lat: number, lon: number) {
        this.id = id;
        this.lat = lat;
        this.lon = lon;
    }
}

export default Node;