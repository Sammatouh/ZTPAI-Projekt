import React, {useState} from 'react'
import { FormGroup, Input, Label } from 'reactstrap'

const CheckboxFilter = (props) => {
    const [checked, setChecked] = useState([]);

    const handleToggle = (value) => {
        const currIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if(currIndex === -1) {
            newChecked.push(value);
        }
        else {
            newChecked.splice(currIndex, 1);
        }

        setChecked(newChecked);
        props.handleFilters(newChecked);
    }

    const renderCheckboxList = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index}>
            <FormGroup check>
                <Input
                    type="checkbox"
                    onChange={() => handleToggle(value)}
                    checked={checked.indexOf(value) === -1 ? false : true}
                />
                <Label check>{value}</Label>
            </FormGroup>
        </React.Fragment>  
    ))

    return (
        <>
            {renderCheckboxList()}
        </>
    )
}

export default CheckboxFilter
