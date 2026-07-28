import { Card, TextInput, Text, Button, Alert } from "../common/Common";

import { useState } from "react";
import { useSession } from "@/context/AuthContext";
import { router } from "expo-router";

import { useForm, Controller } from "react-hook-form";
import { View } from "react-native";

function SignUpCard() {
  const { signIn } = useSession();
  const [showAlert, setShowAlert] = useState(true);

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
        setShowAlert(true);
      } else {
        signIn();
        router.replace("/dashboard");
      }
    } catch (e: any) {}
  };

  return (
    <>
      {showAlert ? (
        <Alert
          title="Passwords do not match"
          message="A message about stuff and things"
          buttonsPropsArray={[{ title: "Button 1" }, { title: "Button 2" }]}
          textInputArray={[
            { label: "input 1" },
            { label: "input 2" },
            { label: "input 3" },
          ]}
          setShowAlert={setShowAlert}
        />
      ) : null}

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
