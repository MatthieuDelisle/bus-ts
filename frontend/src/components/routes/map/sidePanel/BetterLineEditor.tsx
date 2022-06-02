import ILayer from "../../../../utils/interface/ILayer";
import {useState} from "react";

type props = {
    layer: ILayer,
    onSaveLine: (layer: ILayer) => void
}

export const BetterLineEditor = ({layer, onSaveLine}:props) => {
    const [editedLayer, setEditedLayer] = useState<ILayer>(layer);
    const [currentNode, setCurrentNode] = useState<number>(484258490);
    //const [ways, setWays] = useState()
}