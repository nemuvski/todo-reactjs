import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, TextField } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';

type FormFields = {
  keyword: string;
};

const ToDoForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: { keyword: '' } as FormFields,
  });

  const submitTask = (formFields: FormFields) => {
    console.log(formFields);
  };

  return (
    <form style={{ display: 'flex' }} autoComplete='off' onSubmit={handleSubmit(submitTask)}>
      <Controller
        control={control}
        name='keyword'
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextField
            style={{ flex: 1, marginRight: 12 }}
            variant='outlined'
            value={value}
            onChange={onChange}
            label='何する？'
          />
        )}
      />
      <Button variant='contained' color='primary' type='submit' disabled={Boolean(errors.keyword)}>
        <CreateIcon />
      </Button>
    </form>
  );
};

export default ToDoForm;
