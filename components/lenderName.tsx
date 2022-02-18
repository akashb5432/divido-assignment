import { useRouter } from 'next/router';
import { Grid, IconButton, Typography } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { lenderUrl } from 'utils/urlUtil';
import fetchUtil from 'utils/fetchUtil';
import { toCamelCase } from 'utils/helper';
import { CircularProgress } from '@material-ui/core';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import {
  FormInputInterface,
  FormInputStateInterface,
  LenderFields,
  LenderGetResponse,
  LenderPostResponse,
} from 'lib/types';

interface LenderNameProps {
  formData: LenderGetResponse;
}

const LenderName: React.FC<LenderNameProps> = (props) => {
  const { formData } = props;
  const router = useRouter();
  const [elements, setElements] = useState<any>({});
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [respMessage, setRespMessage] = useState<string>();
  const lenderSlug = router.query.lenderName?.toString();

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const payload = elements;
    setIsLoader(true);
    const { decision } = await fetchUtil(
      `${lenderUrl}/${lenderSlug}`,
      'POST',
      payload,
    );
    setIsLoader(false);
    setIsSuccess(true);
    setRespMessage(decision);
  };
  const handleChange = (fieldName: string, event: any) => {
    formData?.fields.forEach((inputField: LenderFields) => {
      if (fieldName === inputField.name) {
        switch (inputField.type) {
          case 'checkbox':
            elements[fieldName] = event.target.checked;
            break;
          default:
            elements[fieldName] = event.target.value;
            break;
        }
      }
      setElements(elements);
    });
  };

  const getFormElements = (inputField: LenderFields) => {
    switch (inputField?.type) {
      case 'select':
        return (
          <>
            <InputLabel id="demo-simple-select-helper-label">
              {inputField.name}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label={toCamelCase(inputField.name)}
              onChange={(event) => handleChange(inputField.name, event)}
            >
              {inputField?.options?.map((option: string, index: number) => (
                <MenuItem value={option} key={`${option}-${index}`}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </>
        );
        break;
      case 'text':
        return (
          <TextField
            id={inputField?.name}
            label={toCamelCase(inputField?.name)}
            variant="outlined"
            onChange={(event) => handleChange(inputField?.name, event)}
          />
        );
    }
  };
  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 2 },
        }}
        noValidate
        autoComplete="off"
        onSubmit={submitHandler}
      >
        <Grid container>
          <Typography>{formData && formData.name}</Typography>
        </Grid>
        {formData &&
          formData?.fields?.map((inputField: LenderFields, index: number) => (
            <Fragment key={`${inputField.name}-${index}`}>
              {getFormElements(inputField)}
            </Fragment>
          ))}
        <Button variant="contained" type="submit">
          Submit
        </Button>
        {isLoader && (
          <div>
            <CircularProgress />
          </div>
        )}
        {isSuccess && (
          <Alert
            onClose={() => setIsSuccess(false)}
            sx={{ mb: 2 }}
            severity={respMessage === 'accepted' ? 'success' : 'error'}
          >
            {respMessage}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default LenderName;
