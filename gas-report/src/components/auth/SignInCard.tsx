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

import { View } from "react-native";
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

function SignInCard() {
  const { signIn } = useSession();
  const [alertState, setAlertState] = useState<AlertProps | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });

  const onSubmit = (data: any) => {
    try {
      signIn();
      router.replace("/dashboard");
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

      <Card paddingChildren="paddingNone" title="Login">
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
          {errors.email && <Text>Username is required.</Text>}
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
          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
      </Card>
    </>
  );
}

export { SignInCard };
