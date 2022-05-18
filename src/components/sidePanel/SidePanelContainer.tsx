import React, {useState} from "react";
import BusLine from "../../utils/models/BusLine";
import ConfigurationState from "../../utils/enums/ConfigurationState";
import Index from "./Index";
import LineEditor from "./LineEditor";
import MapClickEvent from "../../utils/observer/MapClickEvent";
import MapManager from "../../utils/manager/MapManager";

const SidePanelContainer = () => {

    const [state, setState] = useState<ConfigurationState>(ConfigurationState.DISPLAY);
    const [editingLine, setEditingLine] = useState<BusLine | undefined>(undefined);


    const onEditLine = (busLine: BusLine) => {
        setEditingLine(busLine);
        setState(ConfigurationState.EDITING);
    }

    const onSaveLine = () => {
        setState(ConfigurationState.DISPLAY);
    }

    switch (state) {
        case ConfigurationState.DISPLAY:
            return <Index onEditLine={onEditLine}/>
        case ConfigurationState.EDITING:
            return <LineEditor busLine={editingLine!} onSaveLine={onSaveLine}/>
    }
}
export default SidePanelContainer