import React, {useState} from "react";
import BusLine from "../../utils/models/BusLine";
import ConfigurationState from "../../utils/enums/ConfigurationState";
import Display from "./Display";
import LineEditor from "./LineEditor";

const SidePanelContainer = () => {

    const [state, setState] = useState<ConfigurationState>(ConfigurationState.DISPLAY);
    const [editingLine, setEditingLine] = useState<BusLine | undefined>(undefined);

    const [busLines, setBusLines] = useState<BusLine[]>([]);

    const onEditLine = (busLine:BusLine) => {
        setEditingLine(busLine);
        setState(ConfigurationState.EDITING);
    }

    const onDeleteLine = (busLine: BusLine) => {
        let items = [...busLines];

        for(let i = 0 ; i < busLines.length; i ++) {
            if(busLine.uuid === busLines[i].uuid) {
                items.splice(i, 1);
                break;
            }
        }

        setBusLines(items);
        setState(ConfigurationState.DISPLAY);
    }

    const onSaveLine = (savedBusLine:BusLine) => {
        // 1. Make a shallow copy of the busLines
        let items = [...busLines];

        let updated = false;
        for(let i = 0 ; i < busLines.length; i ++) {
            if(savedBusLine.uuid === busLines[i].uuid) {
                items[i] = savedBusLine;
                updated = true;
            }
        }

        // Set the state to our new copy
        if(updated)
            setBusLines(items);
        else
            setBusLines([...items, savedBusLine]);

        setState(ConfigurationState.DISPLAY);
    }

    switch (state) {
        case ConfigurationState.DISPLAY:
            return <Display busLines={busLines} onEditLine={onEditLine} onDeleteLine={onDeleteLine}/>
        case ConfigurationState.EDITING:
            return <LineEditor busLine={editingLine!} onSaveLine={onSaveLine} />
    }
}
export default SidePanelContainer