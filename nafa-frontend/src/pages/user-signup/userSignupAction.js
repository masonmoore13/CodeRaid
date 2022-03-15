import {
  registrationPending,
  registrationSuccess,
  registrationError,
} from "./userSignupSlice";

const userRegistration = (formData) => (dispatch) => {
  try {
    dispatch(registrationPending());
  } catch (error) {
    dispatch(registrationError());
  }
};
