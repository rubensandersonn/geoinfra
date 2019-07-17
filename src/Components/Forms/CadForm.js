import { useState } from "react";

export const inputHandler = initialValues => {
  const [values, setValues] = useState(initialValues);

  return [
    values,
    e => {
      setValues({
        ...values,
        [e.target.name]: e.target.value
      });
    }
  ];
};

const CadForm = () => {
  const [values, handleChange] = inputHandler({ email: "", password: "" });
  return (
    <>
      <form>
        <input
          type="text"
          value={values.email}
          onChange={handleChange}
          placeholder="email"
          name="email"
        />
        <input
          type="password"
          value={values.password}
          onChange={handleChange}
          placeholder="pdw"
          name="password"
        />
      </form>
    </>
  );
};

export default CadForm;
