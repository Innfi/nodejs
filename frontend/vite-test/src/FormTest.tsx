import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayJs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Control, Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';

interface DialogData {
  deliveryDate: string;
  name: string;
}

interface DatePickerParam {
  control: Control<DialogData, any>;
  setValue: Function;
}

const DatePickerLocal = (param: DatePickerParam) => {
  const { control, setValue } = param;

  return (
    <Controller 
      control={control} 
      name="deliveryDate" 
      render={() => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker 
            label="pick date" 
            onChange={(value: unknown) => setValue("deliveryDate", value)} 
          />
        </LocalizationProvider>
      )}
    />
  );
};

export const FormTestDialog = () => {
  const [open, _setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
  } = useForm<DialogData>();

  const onSubmitHandler: SubmitHandler<DialogData> = (input: DialogData) => {
    const { name, deliveryDate } = input;

    console.log(`name: ${name}`);
    console.log(`deliveryDate: ${deliveryDate}`);
  };

  return (
    <Dialog open={open}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <DialogTitle>DeliveryDate</DialogTitle>
        <DialogContent>
          <DatePickerLocal control={control} setValue={setValue} />
          <TextField {...register('name')} />
        </DialogContent>
      </form>
    </Dialog>
  );
};