import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BusLine from "../../utils/models/BusLine";

const Display = ({busLines, onEditLine, onDeleteLine} : {busLines: BusLine[], onEditLine:(busLine: BusLine) => void, onDeleteLine: (busLine: BusLine) => void}) => {

    return <>
        <Stack gap={3}>
            {busLines.map((line: BusLine, i: number) => {
                return <Row>
                    <Col sm={8}>{line.name}</Col>
                    <Col sm>
                        <Button className={'m-2'} variant="primary" onClick={() => onEditLine(line)}>Edit</Button>
                        <Button variant="danger"  onClick={() => onDeleteLine(line)}>Delete</Button>
                    </Col>
                </Row>
            })}
        </Stack>
        <Button variant="primary" onClick={() => {onEditLine(new BusLine()); }}>
            Create new Line
        </Button>
    </>
}

export default Display;