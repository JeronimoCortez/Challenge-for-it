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

type IPropsEditTask = {
  onClose: VoidFunction;
};

const EditTask: FC<IPropsEditTask> = ({ onClose }) => {
  const { taskActive, tasks } = taskStore();
  const { updateTaskHook } = useTask();
  const initialValues = {
    title: taskActive?.title || "",
    description: taskActive?.description || "",
    completed: taskActive?.completed || false,
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
        <h5 className="text-center">Editar Tarea</h5>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          enableReinitialize
          onSubmit={async (values) => {
            console.log("Actualizando tarea...");
            await updateTaskHook(taskActive!.id, values);
            console.log(tasks);
            onClose();
          }}
        >
          {({ values, errors, touched, handleChange, setFieldValue }) => (
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
              <select
                name="completed"
                value={values.completed.toString()}
                onChange={(e) =>
                  setFieldValue(
                    "completed",
                    e.target.value === "true" ? true : false
                  )
                }
                className={`border rounded px-1
                    border-gray-300 ${
                      values.completed ? "bg-green-100" : "bg-yellow-100"
                    }
                `}
              >
                <option value="true">COMPLETADO</option>
                <option value="false">PENDIENTE</option>
              </select>

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

export default EditTask;
