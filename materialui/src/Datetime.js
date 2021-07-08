import 'date-fns';
import { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker,
    KeyboardDatePicker } from '@material-ui/pickers';
import { ko } from 'date-fns/esm/locale';

export function MaterialPickers() {
    const [ targetDate, setTargetDate ] = useState(new Date('2021-07-08T21:00:00'));

    useEffect(() => {
        console.log(`targetDate: ${targetDate}`);
    }, [targetDate]);

    const handleDateChange = (date) => {
        setTargetDate(date);
    };



    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="space-around">
                <KeyboardDatePicker disableToolbar variant="inline" format="MM/dd/yyyy" margin="normal" 
                    id="date-picker-inline" label="Date picker inline" 
                    value={targetDate} onChange={handleDateChange} locale={ko} 
                    KeyboardButtonProps={{
                        'aria-label': 'change date'
                    }} />
            </Grid>
        </MuiPickersUtilsProvider>
    );
};