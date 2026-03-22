import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StatusBar,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../redux/authSlice";

export default function AuthScreen({ navigation }) {

  const [mode, setMode] = useState("login"); // 'login' | 'signup'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const users = useSelector((s) => s.auth.users);

  const validate = () => {
    const e = {};
    if (mode === "signup" && !name.trim()) e.name = "Name is required";
    if (!email.trim() || !email.includes("@")) e.email = "Valid email required";
    if (password.length < 6) e.password = "Min 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
  if (!validate()) return;

  if (mode === "login") {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      setErrors({ general: "Invalid email or password" });
      return;
    }

    dispatch(login({ email, password }));

    // ✅ ADD THIS
    navigation.replace("Home");

  } else {
    const exists = users.find((u) => u.email === email);

    if (exists) {
      setErrors({ general: "Email already registered" });
      return;
    }

    dispatch(signup({ name, email, password }));

    // ✅ ADD THIS
    navigation.replace("Home");
  }
};

  const switchMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setErrors({});
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#0D0D0D" }}
    >
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Top decoration */}
        <View style={{ height: 180, justifyContent: "flex-end", paddingBottom: 32, paddingHorizontal: 32 }}>
          {/* Geometric accent */}
          <View
            style={{
              position: "absolute",
              top: -40,
              right: -40,
              width: 200,
              height: 200,
              borderRadius: 100,
              backgroundColor: "#C4522A",
              opacity: 0.15,
            }}
          />
          <View
            style={{
              position: "absolute",
              top: 20,
              left: -20,
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: "#D4A853",
              opacity: 0.1,
            }}
          />
          {/* Brand */}
          <Text
  style={{
    color: "#D4A853",
    fontSize: 34,        // ⬅ increased
    letterSpacing: 4,    // ⬅ reduced for better look
    fontWeight: "800",
    marginBottom: 10,
  }}
>
TerraBuy🛒
</Text>

<Text style={{ color: "#F5F0E8", fontSize: 24, fontWeight: "800", letterSpacing: 1 }}>
            {mode === "login" ? "Welcome\nBuddy" : "Join Us\nToday"}
          </Text>
        </View>

        {/* Form Card */}
        <View
          style={{
            flex: 1,
            backgroundColor: "#F5F0E8",
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            padding: 32,
            paddingTop: 40,
          }}
        >
          {/* Mode tabs */}
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#EDE8DC",
              borderRadius: 12,
              padding: 4,
              marginBottom: 32,
            }}
          >
            {["login", "signup"].map((m) => (
              <TouchableOpacity
                key={m}
                onPress={() => setMode(m) || setErrors({})}
                style={{
                  flex: 1,
                  paddingVertical: 10,
                  borderRadius: 10,
                  alignItems: "center",
                  backgroundColor: mode === m ? "#0D0D0D" : "transparent",
                }}
              >
                <Text
                  style={{
                    color: mode === m ? "#F5F0E8" : "#888",
                    fontWeight: "700",
                    fontSize: 13,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                  }}
                >
                  {m}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {errors.general ? (
            <View
              style={{
                backgroundColor: "#FDECEA",
                borderRadius: 10,
                padding: 12,
                marginBottom: 16,
                borderLeftWidth: 3,
                borderLeftColor: "#C4522A",
              }}
            >
              <Text style={{ color: "#C4522A", fontSize: 13, fontWeight: "600" }}>
                {errors.general}
              </Text>
            </View>
          ) : null}

          {mode === "signup" && (
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: "#555", fontSize: 12, fontWeight: "700", letterSpacing: 1, marginBottom: 6, textTransform: "uppercase" }}>
                Full Name
              </Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Your name"
                placeholderTextColor="#aaa"
                style={{
                  backgroundColor: errors.name ? "#FFF0EE" : "#EDE8DC",
                  borderRadius: 12,
                  padding: 14,
                  fontSize: 15,
                  color: "#0D0D0D",
                  borderWidth: errors.name ? 1 : 0,
                  borderColor: "#C4522A",
                }}
              />
              {errors.name ? (
                <Text style={{ color: "#C4522A", fontSize: 11, marginTop: 4 }}>{errors.name}</Text>
              ) : null}
            </View>
          )}

          <View style={{ marginBottom: 16 }}>
            <Text style={{ color: "#555", fontSize: 12, fontWeight: "700", letterSpacing: 1, marginBottom: 6, textTransform: "uppercase" }}>
              Email
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              autoCapitalize="none"
              style={{
                backgroundColor: errors.email ? "#FFF0EE" : "#EDE8DC",
                borderRadius: 12,
                padding: 14,
                fontSize: 15,
                color: "#0D0D0D",
                borderWidth: errors.email ? 1 : 0,
                borderColor: "#C4522A",
              }}
            />
            {errors.email ? (
              <Text style={{ color: "#C4522A", fontSize: 11, marginTop: 4 }}>{errors.email}</Text>
            ) : null}
          </View>

          <View style={{ marginBottom: 28 }}>
            <Text style={{ color: "#555", fontSize: 12, fontWeight: "700", letterSpacing: 1, marginBottom: 6, textTransform: "uppercase" }}>
              Password
            </Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor="#aaa"
              secureTextEntry
              style={{
                backgroundColor: errors.password ? "#FFF0EE" : "#EDE8DC",
                borderRadius: 12,
                padding: 14,
                fontSize: 15,
                color: "#0D0D0D",
                borderWidth: errors.password ? 1 : 0,
                borderColor: "#C4522A",
              }}
            />
            {errors.password ? (
              <Text style={{ color: "#C4522A", fontSize: 11, marginTop: 4 }}>{errors.password}</Text>
            ) : null}
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            activeOpacity={0.85}
            style={{
              backgroundColor: "#C4522A",
              borderRadius: 14,
              padding: 16,
              alignItems: "center",
              shadowColor: "#C4522A",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.35,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 15, fontWeight: "800", letterSpacing: 1.5, textTransform: "uppercase" }}>
              {mode === "login" ? "Sign In →" : "Create Account →"}
            </Text>
          </TouchableOpacity>

          {mode === "login" && (
            <View style={{ marginTop: 20, alignItems: "center" }}>
              <Text style={{ color: "#888", fontSize: 12 }}>
                Demo: demo@shop.com / demo123
              </Text>
            </View>
          )}

          <View style={{ marginTop: 24, flexDirection: "row", justifyContent: "center" }}>
            <Text style={{ color: "#888", fontSize: 14 }}>
              {mode === "login" ? "New here? " : "Already have an account? "}
            </Text>
            <TouchableOpacity onPress={switchMode}>
              <Text style={{ color: "#C4522A", fontSize: 14, fontWeight: "700" }}>
                {mode === "login" ? "Create account" : "Sign in"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
