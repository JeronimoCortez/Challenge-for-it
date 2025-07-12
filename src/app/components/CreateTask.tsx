import * as Yup from "yup";
import { taskStore } from "../store/taskStore";
import { Form, Formik } from "formik";
import { FC } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTask } from "../hooks/useTask";

const validationSchema = Yup.object({
  title: Yup.string().required(),
  description: Yup.string().required(),
});

type IPropsCreateTask = {
  onClose: VoidFunction;
};

const CreateTask: FC<IPropsCreateTask> = ({ onClose }) => {
  const { createTaskHook } = useTask();
  const initialValues = {
    title: "",
    description: "",
  };

  return (
    <div className="absolute z-[999] bg-[#D9D9D9]/75 w-[100vw] h-[100vh] top-0 left-0 flex justify-center items-center">
      <div className={`bg-[#fff] relative font-semibold  p-6 rounded`}>
        <Icon
          className="cursor-pointer absolute right-1 top-1 "
          onClick={onClose}
          icon="material-symbols-light:close"
          width="24"
          height="24"
        />
        <h5 className="text-center">Crear Tarea</h5>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          enableReinitialize
          onSubmit={async (values) => {
            console.log("Creando tarea...");
            createTaskHook(values);
            onClose();
          }}
        >
          {({ values, errors, touched, handleChange }) => (
            <Form className="flex flex-col w-[20rem] gap-1.5 ">
              <label htmlFor="title">Titulo: </label>
              <input
                type="text"
                id="title"
                name="title"
                value={values.title}
                onChange={handleChange}
                className={`border rounded px-1 ${
                  errors.title && touched.title
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              <label htmlFor="description">Description: </label>
              <textarea
                id="description"
                name="description"
                value={values.description}
                onChange={handleChange}
                className={`border rounded px-1 ${
                  errors.description && touched.description
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />

              <div className="flex justify-center gap-2 mt-2 ">
                <button
                  type="submit"
                  className="bg-green-400 px-4 cursor-pointer "
                >
                  Enviar
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-red-400 px-4 cursor-pointer "
                >
                  Cancelar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateTask;
