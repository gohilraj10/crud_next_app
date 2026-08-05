import * as yup from "yup";

import { User, UserFormValues, CreateUserPayload, UpdateUserPayload } from "n@/types/user";

const GENDER_OPTIONS = ["male", "female"] as const;
const ROLE_OPTIONS = ["admin", "moderator", "user"] as const;
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] as const;

export const createUserFormSchema = (
  isEdit: boolean
): yup.ObjectSchema<UserFormValues> =>
  yup
    .object({
      firstName: yup.string().trim().required("First name is required"),
      lastName: yup.string().trim().required("Last name is required"),
      maidenName: yup.string().default(""),
      age: yup
        .number()
        .typeError("Age must be a number")
        .required("Age is required")
        .min(1, "Age must be at least 1")
        .max(120, "Age cannot exceed 120"),
      gender: yup
        .string()
        .oneOf([...GENDER_OPTIONS], "Select a valid gender")
        .required("Gender is required"),
      email: yup
        .string()
        .trim()
        .email("Enter a valid email")
        .required("Email is required"),
      phone: yup.string().trim().required("Phone is required"),
      username: yup.string().trim().required("Username is required"),
      password: isEdit
        ? yup
            .string()
            .trim()
            .test(
              "password-length",
              "Password must be at least 6 characters",
              (value) => !value || value.length >= 6
            )
            .default("")
        : yup
            .string()
            .trim()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters"),
      birthDate: yup.string().trim().required("Birth date is required"),
      bloodGroup: yup
        .string()
        .oneOf([...BLOOD_GROUPS], "Select a valid blood group")
        .required("Blood group is required"),
      height: yup
        .number()
        .typeError("Height must be a number")
        .required("Height is required")
        .min(0, "Height must be at least 0"),
      weight: yup
        .number()
        .typeError("Weight must be a number")
        .required("Weight is required")
        .min(0, "Weight must be at least 0"),
      eyeColor: yup.string().trim().required("Eye color is required"),
      role: yup
        .string()
        .oneOf([...ROLE_OPTIONS], "Select a valid role")
        .required("Role is required"),
      university: yup.string().trim().required("University is required"),
    })
    .required();

export const defaultUserFormValues: UserFormValues = {
  firstName: "",
  lastName: "",
  maidenName: "",
  age: 18,
  gender: "male",
  email: "",
  phone: "",
  username: "",
  password: "",
  birthDate: "",
  bloodGroup: "O+",
  height: 170,
  weight: 70,
  eyeColor: "",
  role: "user",
  university: "",
};

export const userToFormValues = (user: User): UserFormValues => ({
  firstName: user.firstName,
  lastName: user.lastName,
  maidenName: user.maidenName ?? "",
  age: user.age,
  gender: user.gender,
  email: user.email,
  phone: user.phone,
  username: user.username,
  password: "",
  birthDate: user.birthDate,
  bloodGroup: user.bloodGroup,
  height: user.height,
  weight: user.weight,
  eyeColor: user.eyeColor,
  role: user.role,
  university: user.university,
});

export const formValuesToCreatePayload = (
  values: UserFormValues
): CreateUserPayload => ({
  firstName: values.firstName,
  lastName: values.lastName,
  ...(values.maidenName.trim() ? { maidenName: values.maidenName.trim() } : {}),
  age: values.age,
  gender: values.gender,
  email: values.email,
  phone: values.phone,
  username: values.username,
  password: values.password,
  birthDate: values.birthDate,
  bloodGroup: values.bloodGroup,
  height: values.height,
  weight: values.weight,
  eyeColor: values.eyeColor,
  role: values.role,
  university: values.university,
});

export const formValuesToUpdatePayload = (
  values: UserFormValues
): UpdateUserPayload => {
  const payload: UpdateUserPayload = {
    firstName: values.firstName,
    lastName: values.lastName,
    maidenName: values.maidenName,
    age: values.age,
    gender: values.gender,
    email: values.email,
    phone: values.phone,
    username: values.username,
    birthDate: values.birthDate,
    bloodGroup: values.bloodGroup,
    height: values.height,
    weight: values.weight,
    eyeColor: values.eyeColor,
    role: values.role,
    university: values.university,
  };

  if (values.password.trim()) {
    payload.password = values.password;
  }

  return payload;
};

export { BLOOD_GROUPS, GENDER_OPTIONS, ROLE_OPTIONS };
