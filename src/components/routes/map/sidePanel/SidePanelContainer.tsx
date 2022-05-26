import React, {useState} from "react";
import ConfigurationState from "../../../../utils/enums/ConfigurationState";
import Index from "./Index";
import LineEditor from "./LineEditor";
import ILayer from "../../../../utils/interface/ILayer";


const SidePanelContainer = () => {

    const [state, setState] = useState<ConfigurationState>(ConfigurationState.DISPLAY);
    const [editLayer, setEditLayer] = useState<ILayer | undefined>(undefined);


    const onEditLine = (layer: ILayer) => {
        setEditLayer(layer);
        setState(ConfigurationState.EDITING);
    }

    const onSaveLine = (layer: ILayer) => {

        //

        setState(ConfigurationState.DISPLAY);
    }

    switch (state) {
        case ConfigurationState.DISPLAY:
            return <Index onEditLine={onEditLine}/>
        case ConfigurationState.EDITING:
            return <LineEditor layer={editLayer!} onSaveLine={onSaveLine}/>
    }
}
export default SidePanelContainer