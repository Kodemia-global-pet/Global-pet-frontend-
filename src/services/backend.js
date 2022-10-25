export const loginService = (email, password) =>
  fetch(`${process.env.REACT_APP_BACKEND}auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

export const createUser = async (name, email, password) =>
  fetch(`${process.env.REACT_APP_BACKEND}users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

export const PetsNew = async (
  name,
  breed,
  date,
  size,
  feeding,
  allergies,
  species
) =>
  fetch(`${process.env.REACT_APP_BACKEND}pets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      breed,
      date,
      size,
      feeding,
      allergies,
      species,
    }),
  });
