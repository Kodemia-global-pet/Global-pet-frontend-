import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Grid, TextField, Button, Alert, Box, MenuItem } from "@mui/material";
import { useLogedUser } from "../../context/UserContext";
import { const_event_types } from "../../helpers/constants";
import DropFileInput from "./DropFileInput";
import { createEvent } from "../../services/backend";

const NewEvent = ({ petID, token }) => {
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    let formData = new FormData();
    formData.append("date", getValues("date"));
    formData.append("time", getValues("time"));
    formData.append("title", getValues("title"));
    formData.append("vet", getValues("vet"));
    formData.append("type", getValues("type"));
    formData.append("description", getValues("description"));
    formData.append("other_info", getValues("other_info"));
    files.forEach((file) => {
      formData.append("file", file);
    });

    const response = await createEvent(petID, token, formData);
    const result = await response.json();
    if (!result.success) setError("Ocurrió un error.");
    else {
      setError(null);
      navigate(`/pets/${petID}`);
    }
  };

  return (
    <>
      <Grid
        item
        container
        sx={{
          backgroundColor: "grey.contrast",
          color: "#545454",
          borderRadius: "10px",
          width: "100%",
          ml: 2,
        }}
      >
        {error && <Alert severity="error">{error} </Alert>}

        <Box
          sx={{
            marginTop: 5,
            ml: 2,
            mr: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              InputLabelProps={{ shrink: true }}
              margin="normal"
              fullWidth
              type="date"
              label="Fecha"
              {...register("date", {
                required: "Completa Este Campo",
              })}
              error={!!errors?.date}
              helperText={errors.date?.message}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              margin="normal"
              fullWidth
              type="time"
              label="Hora"
              {...register("time", {
                required: "Completa Este Campo",
              })}
              error={!!errors?.date}
              helperText={errors.date?.message}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Titulo"
              autoComplete="titulo"
              {...register("title")}
              error={!!errors?.title}
              helperText={errors.title?.message}
            />

            <TextField
              margin="normal"
              fullWidth
              select
              label="Tipo"
              autoComplete="Tipo"
              {...register("type", {
                required: "Completa Este Campo",
              })}
              error={!!errors?.type}
              helperText={errors.type?.message}
            >
              {const_event_types.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin="normal"
              fullWidth
              label="Veterinario"
              autoComplete="veterinario"
              {...register("vet")}
              error={!!errors?.vet}
              helperText={errors.vet?.message}
            />

            <TextField
              margin="normal"
              fullWidth
              type="text"
              label="Descripcion"
              autoComplete="description"
              {...register("description")}
              error={!!errors?.description}
              helperText={errors.description?.message}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Otra informacion"
              autoComplete="otherInformation"
              {...register("other_info")}
              error={!!errors?.other_info}
              helperText={errors.other_info?.message}
            />
            <Grid
              container
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                type="submit"
                sx={{
                  width: 170,
                  height: 43,
                  backgroundColor: "grey.main",
                  mt: 3,
                  mb: 2,
                }}
              >
                Guardar
              </Button>
            </Grid>
          </form>
        </Box>
      </Grid>
      <DropFileInput files={files} setFiles={setFiles} />
    </>
  );
};

export default NewEvent;
