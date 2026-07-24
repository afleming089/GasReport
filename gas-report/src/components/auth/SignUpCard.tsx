import { Card, TextInput, Text, Button } from "../common/Common";

import { useSession } from "@/context/AuthContext";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { View } from "react-native";

function SignUpCard() {
  const { signIn } = useSession();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = (data: any) => {
    signIn();
    router.replace("/dashboard");
  };

  return (
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
            />
          )}
          name="confirmPassword"
        />
        {errors.confirmPassword && <Text>Confirm Password is required.</Text>}
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </Card>
  );
}

export { SignUpCard };
