import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BusLine from "../../utils/models/BusLine";
import {useAppSelector, useAppDispatch} from "../../store/hooks";
import {selectDisplay, toggleLayerVisibility} from "../../store/features/display/displaySlice";
import ILayer from "../../utils/interface/ILayer";

const Index = ({onEditLine} : {onEditLine:(busLine: BusLine) => void}) => {

    const display = useAppSelector(selectDisplay);
    const dispatch = useAppDispatch();

    return <>
        <Stack gap={3}>
            {
                display.layers.map((layer: ILayer, i: number) => {
                    return <Row key={i}>
                        <Col sm={8}>{layer.name}</Col>
                        <Col sm>
                            <Button className={'m-2'} variant="primary" onClick={() => dispatch(toggleLayerVisibility(i))}>Show/Hide</Button>
                        </Col>
                    </Row>
                })
            }
        </Stack>
        <Button variant="primary" onClick={() => { onEditLine(new BusLine()); }}>
            Create new Line
        </Button>
    </>
}

export default Index;