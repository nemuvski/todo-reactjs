import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, TextField } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { ToDoContext } from '../contexts/ToDoContext';

type FormFields = {
  content: string;
};

const ToDoForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: { content: '' } as FormFields,
  });
  const { insert } = useContext(ToDoContext);

  const submitTask = (formFields: FormFields) => {
    if (!formFields.content) {
      console.error('内容が空欄なので追加できませんでした。');
      return;
    }
    insert(formFields.content);
    reset();
  };

  return (
    <form style={{ display: 'flex' }} autoComplete='off' onSubmit={handleSubmit(submitTask)}>
      <Controller
        control={control}
        name='content'
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
      <Button variant='contained' color='primary' type='submit' disabled={Boolean(errors.content)}>
        <CreateIcon />
      </Button>
    </form>
  );
};

export default ToDoForm;
