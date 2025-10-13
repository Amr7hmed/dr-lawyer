/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useState } from "react";
import { IconCreateUserForm } from "@/assets/icons";
import { SubAccountService } from "@/services/subAccountService";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

type UserFormValues = {
  username: string;
  experience: string;
  gender: "male" | "female";
  status: boolean;
  email: string;
  password: string;
};

const initialValues: UserFormValues = {
  username: "",
  experience: "",
  gender: "male",
  status: true,
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  experience: Yup.string().required("Experience is required"),
  gender: Yup.mixed<"male" | "female">()
    .oneOf(["male", "female"], "Invalid gender")
    .required("Gender is required"),
  status: Yup.boolean().required(),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const CreateUserForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
    const handleSubmit = async (values: UserFormValues) => {
    try {
      setServerError(null); 
      const payload = {
        fullName: values.username,
        gender: values.gender,
        email: values.email,
        password: values.password,
        lawyerExperience: Number(values.experience),
      };

      const newSubAccount = await SubAccountService.createSubAccount(payload);
      console.log("✅ Created:", newSubAccount);
      window.location.href = "/lawyer/settings/myaccountsettings";

    } catch (error: any) {
      console.error("❌ Error:", error.response?.data || error.message);
      setServerError(error.response?.data?.message || "Failed to create sub account");
    }
  };


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, resetForm }) => (
        <Form className="w-full p-6 bg-white rounded-[20px] flex flex-col gap-6">
          <h2 className="text-neutral-800 text-xl font-bold">
            Create new user account
          </h2>

          {/* Row 1 */}
          <div className="flex gap-6 items-end justify-between">
            {/* Username */}
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">User Name</label>
              <Field
                type="text"
                name="username"
                placeholder="Enter username"
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl shadow-sm text-base"
              />
              <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Experience */}
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Experience</label>
              <Field
                type="text"
                name="experience"
                placeholder="e.g. 3 years"
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl shadow-sm text-base"
              />
              <ErrorMessage name="experience" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Gender */}
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Gender</label>
              <div className="flex w-full rounded-2xl border border-gray-300 bg-gray-50 p-1">
                {["male", "female"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFieldValue("gender", option)}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-xl transition
                      ${values.gender === option
                        ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                        : "text-gray-500"
                      }`}
                  >
                    {option === "male" ? "Male" : "Female"}
                  </button>
                ))}
              </div>
              <ErrorMessage name="gender" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Status */}
            <div className="flex-1 flex flex-col gap-1.5 justify-end">
              <div className="flex-1 self-stretch px-3.5 py-2.5 bg-White rounded-xl shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] h-[48px] 
                border border-gray-300 inline-flex justify-start items-center gap-2 overflow-hidden">
                <div className="flex-1 flex justify-start items-center gap-2">
                  <div className="flex-1 flex justify-start items-center gap-2.5">
                    <div className="justify-start text-Gray-700 text-sm font-medium font-['Manrope']">Status</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <Field
                      type="checkbox"
                      name="status"
                      checked={values.status}
                      onChange={() => setFieldValue("status", !values.status)}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-8 bg-gray-200 rounded-full peer peer-checked:bg-[#642329] transition-colors"></div>
                    <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <Field
              type="email"
              name="email"
              placeholder="example@email.com"
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl shadow-sm text-base"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <Field
              type="password"
              name="password"
              placeholder="Enter password"
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl shadow-sm text-base"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Buttons */}
          
            {serverError && (
              <div className="text-red-600 text-sm font-medium">
                {serverError}
              </div>
            )}
          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              className="px-5 py-3 border border-red-300 rounded-2xl text-red-600 font-semibold cursor-pointer"
              onClick={() => resetForm()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-red-900 text-white rounded-[32px] font-bold flex items-center gap-[10px] cursor-pointer"
            >
              <span>Create account</span>
              <IconCreateUserForm />
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateUserForm;
