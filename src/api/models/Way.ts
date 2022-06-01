import { LatLngLiteral} from "leaflet"

interface APIQueryFeaturesWay {
    id: string;
    type: string;
    tags?: {[id: string]: string};
    geometry: ({ lat: number, lon: number } | null)[];
}

export const isBusCompatible = (highway?: string) => {
    switch (highway) {
        case "motorway":
        case "trunk":
        case "primary":
        case "secondary":
        case "tertiary":
        case "residential":
        case "unclassified": // bridges
            return true;
        default:
            return undefined;
    }
}

class Way {
    id: string;
    tags: {[id: string]: string};
    geometry: LatLngLiteral[];

    constructor(id: string, tags: {[id: string]: string}, geometry: LatLngLiteral[]) {
        this.id = id;
        this.tags = tags;
        this.geometry = geometry;
    }

    static from_request_query_features = (obj: APIQueryFeaturesWay) => {
        if(obj.type !== 'way')
            return undefined;

        // https://wiki.openstreetmap.org/wiki/Key:highway
        switch (obj.tags?.['highway']) {
            case undefined:
                return undefined;
            case "motorway":
            case "trunk":
            case "primary":
            case "secondary":
            case "tertiary":
            case "residential":
            case "unclassified": // bridges
                break;
            default:
                return undefined;
        }

        const geometries: LatLngLiteral[] = [];
        for (let i = 0; i < obj.geometry.length; i++) {
            if(obj.geometry[i] != null)
                geometries.push({lat: obj.geometry[i]!.lat, lng: obj.geometry[i]!.lon });
        }

        return new Way(obj.id, obj.tags, geometries);
    }
}

export default Way;