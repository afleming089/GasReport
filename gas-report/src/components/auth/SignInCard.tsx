import { View } from "react-native";
import { Card, TextInput, Text, Button } from "../common/Common";

import { useSession } from "@/context/AuthContext";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";

function SignInCard() {
  const { signIn } = useSession();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });

  const onSubmit = (data: any) => {
    signIn();
    router.replace("/dashboard");
  };

  return (
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
  );
}

export { SignInCard };
