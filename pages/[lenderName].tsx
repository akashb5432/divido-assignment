import { useRouter } from 'next/router';
import { Grid, Typography } from '@material-ui/core';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
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

const LenderNamePage: NextPage = () => {
  const router = useRouter();
  const [banksFormData, setBanksFormData] = useState<any>(null);
  const [elements, setElements] = useState<any>([]);
  const [isLoader, setIsLoader] = useState<boolean>(true);
  const lenderSlug = router.query.lenderName?.toString();
  useEffect(() => {
    if (lenderSlug) {
      fetchUser();
    }
  }, [lenderSlug]);

  const fetchUser = async () => {
    setIsLoader(true);
    const response = await fetchUtil(`${lenderUrl}/${lenderSlug}`, 'GET', {});
    setBanksFormData(response);
    setIsLoader(false);
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    console.log(e);
    const payload = {};
    // const payload = {
    //   first_name: 'Akash',
    //   last_name: 'Barma',
    //   gender: 'Male',
    //   monthly_income: 100,
    // };
    setIsLoader(true);
    const response = await fetchUtil(
      `${lenderUrl}/${lenderSlug}`,
      'POST',
      payload,
    );
    setIsLoader(false);
    console.log(response);
  };
  const handleChange = (fieldName: any, event: any) => {
    banksFormData?.fields.forEach((field: any) => {
      if (fieldName === field.name) {
        switch (field.type) {
          case 'checkbox':
            elements[fieldName] = event.target.checked;
            break;
          default:
            elements[fieldName] = event.target.value;
            break;
        }
      }
      console.log(elements);
      setElements(elements);
    });
  };
  useEffect(() => {
    console.log(elements);
  }, [elements]);

  const getFormElements = (field: any) => {
    switch (field.type) {
      case 'select':
        return (
          <>
            <InputLabel id="demo-simple-select-helper-label">
              {field.name}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label={toCamelCase(field.name)}
              onChange={(event) => handleChange(field.name, event)}
            >
              {field?.options?.map((option: any, index: number) => (
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
            required
            id={field.name}
            label={toCamelCase(field.name)}
            variant="outlined"
            onChange={(event) => handleChange(field.name, event)}
          />
        );
    }
  };

  return (
    <div>
      <Grid container>
        <Typography>{banksFormData && banksFormData.name}</Typography>
      </Grid>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
        }}
        noValidate
        autoComplete="off"
        onSubmit={submitHandler}
      >
        {banksFormData &&
          banksFormData?.fields?.map((fields: any, index: number) => (
            <div key={`${fields.name}-${index}`}>{getFormElements(fields)}</div>
          ))}
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
      {isLoader && (
        <div>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default LenderNamePage;
