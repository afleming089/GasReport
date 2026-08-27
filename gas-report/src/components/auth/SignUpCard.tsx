/**
 * Uses react-hook-form for form validation
 * https://www.npmjs.com/package/react-hook-form
 *
 * Use {@link components/common/Alert} to notify user of login issues
 *
 * Made up of {@link components/common/Common} components
 *
 * Has api error handling
 * @module
 */

import {
  Alert,
  AlertProps,
  Button,
  Card,
  Text,
  TextInput,
} from "../common/Common";

import { ApiError } from "../../utility/api/ApiError";

import { useSession } from "@/context/AuthContext";
import { router } from "expo-router";
import { useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

function SignUpCard() {
  const { signIn } = useSession();
  const [alertState, setAlertState] = useState<AlertProps | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = (data: any) => {
    const password = getValues("password");
    const confirmPassword = getValues("confirmPassword");

    try {
      if (password !== confirmPassword) {
        setAlertState({
          title: "Passwords do not match",
          setAlertState,
        });
      } else {
        signIn();
        router.replace("/dashboard");
      }
    } catch (error: any) {
      // const apiError = error as ApiError;
      const apiError: ApiError = error;

      setAlertState({
        message: apiError.message,
        status: apiError.status,
        setAlertState,
      });
    }
  };

  return (
    <>
      {alertState ? <Alert {...alertState} /> : null}

      <Card paddingChildren="paddingNone" title="Sign up">
        <View className="flex gap-3">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Email"
                placeholder="Email here"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
          />
          {errors.email && <Text>Email is required.</Text>}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Password"
                placeholder="Password here"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={true}
              />
            )}
            name="password"
          />
          {errors.password && <Text>Password is required.</Text>}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Confirm Password"
                placeholder="Confirm Password here"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={true}
              />
            )}
            name="confirmPassword"
          />
          {errors.confirmPassword && <Text>Confirm Password is required.</Text>}
          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
      </Card>
    </>
  );
}

export { SignUpCard };
