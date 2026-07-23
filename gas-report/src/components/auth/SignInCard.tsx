import { View } from "react-native";
import { Card, TextInput, Text, Button } from "../common/Common";
import { useForm, Controller } from "react-hook-form";

function SignInCard() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { userName: "", password: "" } });

  const onSubmit = (data: any) => console.log(data);

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
              label="Username"
              placeholder="Username here"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="userName"
        />
        {errors.userName && <Text>Username is required.</Text>}
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
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </Card>
  );
}

export { SignInCard };
