import { v4 as uuidv4 } from 'uuid';

class BusLine {
    uuid: string = uuidv4();
    name: string = "";
}

export default BusLine;