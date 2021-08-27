export const validationsAPI = {
  required(name, value) {
    if (!value) throw Error(`${name} is required`);
  },
  email(email) {
    validationsAPI.required("email", email);
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!reg.test(email)) throw Error("Invalid Email");
  },

  firstname(firstname) {
    validationsAPI.required("First name", firstname);
    const reg = /^[a-zA-Z]{3,}\S*$/;
    if (!reg.test(firstname)) {
      if (firstname.length < 3) throw Error("First name is too short! Minimum 3 chars");
      if (firstname.length > 20) throw Error("First name is too long! Maximum 20 chars");
      throw Error("Invalid first name");
    }
  },
  lastname(lastname) {
    validationsAPI.required("Last name", lastname);
    const reg = /^[a-zA-Z]{3,}\S*$/;
    if (!reg.test(lastname)) {
      if (lastname.length < 5) throw Error("Last name is too short! Minimum 3 chars");
      if (lastname.length > 20) throw Error("Last name is too long! Maximum 20 chars");
      throw Error("Invalid last name");
    }
  },

  address(address) {
    validationsAPI.required("Address", address);
  },

  password(password) {
    validationsAPI.required("Password", password);
    const reg = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$/;
    if (password.length < 6) throw Error("Minimus password length is 6 chars");
    if (password.length > 45) throw Error("Maximum password length is 45 chars");
    if (!reg.test(password)) throw Error("Invalid password. Must contain numbers and letters");
  },
  confirmPassword(confirmPassword, password = "") {
    validationsAPI.required("Confirm Password", confirmPassword);
    validationsAPI.password(confirmPassword);
    if (confirmPassword !== password) throw Error("Passwords don't match");
  },
};

export const validateFields = (values) => {
  for (const key in values) {
    try {
      if (key === "confirmPassword") {
        validationsAPI[key](values[key], values["password"]);
      } else {
        validationsAPI[key](values[key]);
      }
    } catch (err) {
      return { key, message: err.message };
    }
  }

  return true;
};
