"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Spinner from "../Spinner";
import { useTranslations } from "next-intl";

export default function LoginForm() {
  const t = useTranslations("login");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      setError(t("invalid"));
    } else {
      window.location.href = "/";
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 space-y-6"
    >
    

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
        >
          {t("email")}
        </label>
        <input
          type="email"
          id="email"
          {...register("email", { required: t("emailRequired") })}
          placeholder={t("emailPlaceholder")}
          className={`mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200 transition ${
            errors.email
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-700"
          }`}
        />
        {errors.email && (
          <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
        >
          {t("password")}
        </label>
        <input
          type="password"
          id="password"
          {...register("password", { required: t("passwordRequired") })}
          placeholder={t("passwordPlaceholder")}
          className={`mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200 transition ${
            errors.password
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-700"
          }`}
        />
        {errors.password && (
          <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 flex justify-center gap-2 items-center transition"
      >
        <span>{t("submit")}</span>
        {isSubmitting && <Spinner className="border-white" size={15} />}
      </button>
    </form>
  );
}
