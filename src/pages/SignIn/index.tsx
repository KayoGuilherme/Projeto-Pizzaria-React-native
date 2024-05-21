import react, { useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthContext } from "../../contexts/AuthContext";
import { StackAuthPramList } from "../../routes/auth.routes";

export default function SignIn() {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackAuthPramList>>();

  const { signIn, loadingAuth } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (email === "" || password === "") {
      return;
    }
    await signIn({ email, password });
    Keyboard.dismiss();
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Digite Seu Email"
          style={styles.input}
          placeholderTextColor="#f0f0f0"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Digite Sua Senha"
          style={styles.input}
          placeholderTextColor="#f0f0f0"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        {loadingAuth ? (
          <ActivityIndicator size={25} color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center" }}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.btntext}>Não tem uma conta?</Text>
        <Text style={styles.btnLink}> Registre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1d1d2e",
  },
  logo: {
    marginBottom: 20,
  },
  inputContainer: {
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
  },
  input: {
    width: "95%",
    height: 40,
    backgroundColor: "#101026",
    marginBottom: 8,
    paddingHorizontal: 10,
    borderRadius: 4,
    color: "#fff",
  },
  button: {
    width: "65%",
    height: 40,
    backgroundColor: "#3fffa3",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  btntext: {
    color: "#fff",
  },
  btnLink: {
    color: "#00FFFF",
  },
});
