import React from "react";
import { Link, Typography, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import NewEvent from "../components/NewEvent/NewEvent";
import Template from "../components/Template/Template";
import { useParams } from "react-router-dom";
import { useLogedUser } from "../context/UserContext";
import { Container } from "@mui/system";
import useFetch from "../hooks/useFetch";

const NewEventPage = ({ event }) => {
  const params = useParams();
  let { user } = useLogedUser();
  const { data } = useFetch(
    `${process.env.REACT_APP_BACKEND}pets/${params.petID}`
  );
  return (
    <Template>
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            ml: 2,
            mt: 5,
          }}
        >
          <IconButton color="black" component="label">
            <Link href="/">
              <ArrowBackIcon color="black" />
            </Link>
          </IconButton>
          <Typography
            component="h1"
            variant="h5"
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "start",
            }}
          >
            Agregar Cita
          </Typography>
        </Box>
        {user && data && (
          <NewEvent
            petID={params.petID}
            token={user.token}
            petName={data.name}
          />
        )}
      </Container>
    </Template>
  );
};

export default NewEventPage;
