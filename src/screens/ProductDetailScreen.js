import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectCartCount } from "../redux/cartSlice";

const { width } = Dimensions.get("window");

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params || {};

  // 🔒 Safety check
  if (!product) return null;

  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const [added, setAdded] = useState(false);

  const cartItems = useSelector((s) => s.cart.items);
  const inCart = cartItems.find((i) => i.id === product.id);

  const handleAdd = () => {
    dispatch(addToCart(product));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const stars = Array.from({ length: 5 }, (_, i) =>
    i < Math.floor(product.rating) ? "★" : i < product.rating ? "⯨" : "☆"
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F0E8" }}>
      <StatusBar barStyle="light-content" />

      {/* Top buttons */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: Platform.OS === "ios" ? 56 : 40,
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: "rgba(0,0,0,0.4)",
            borderRadius: 12,
            padding: 10,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Cart")}
          style={{
            backgroundColor: "rgba(0,0,0,0.4)",
            borderRadius: 12,
            padding: 10,
            position: "relative",
          }}
        >
          <Text style={{ fontSize: 18 }}>🛒</Text>

          {cartCount > 0 && (
            <View
              style={{
                position: "absolute",
                top: -4,
                right: -4,
                backgroundColor: "#C4522A",
                borderRadius: 8,
                minWidth: 16,
                height: 16,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 9, fontWeight: "900" }}>
                {cartCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* ✅ FIXED: Wrap EVERYTHING inside ScrollView */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Image */}
        <View>
          <Image
            source={{ uri: product.image }}
            style={{ width, height: width * 1.05 }}
            resizeMode="cover"
          />

          {product.badge && (
            <View
              style={{
                position: "absolute",
                bottom: 20,
                left: 20,
                backgroundColor:
                  product.badge === "New"
                    ? "#7A8C6E"
                    : product.badge === "Limited"
                    ? "#0D0D0D"
                    : product.badge === "Premium"
                    ? "#D4A853"
                    : "#C4522A",
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 5,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: "800",
                  letterSpacing: 1.5,
                }}
              >
                {product.badge.toUpperCase()}
              </Text>
            </View>
          )}
        </View>

        {/* Content */}
        <View
          style={{
            backgroundColor: "#F5F0E8",
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            marginTop: -28,
            padding: 24,
          }}
        >
          {/* Category + Rating */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <View
              style={{
                backgroundColor: "#EDE8DC",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 6,
              }}
            >
              <Text style={{ color: "#888", fontSize: 11, fontWeight: "700" }}>
                {product.category}
              </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ marginRight: 4, color: "#D4A853" }}>
                {stars.join("")}
              </Text>
              <Text style={{ color: "#555", fontSize: 12 }}>
                {product.rating} ({product.reviews})
              </Text>
            </View>
          </View>

          {/* Title */}
          <Text
            style={{
              color: "#0D0D0D",
              fontSize: 26,
              fontWeight: "800",
              marginBottom: 12,
            }}
          >
            {product.title}
          </Text>

          {/* Price */}
          <Text
            style={{
              color: "#C4522A",
              fontSize: 30,
              fontWeight: "900",
              marginBottom: 20,
            }}
          >
            ${product.price.toFixed(2)}
          </Text>

          {/* Description */}
          <Text style={{ color: "#333", fontSize: 15, marginBottom: 28 }}>
            {product.description}
          </Text>

          {/* Add to Cart */}
          <TouchableOpacity
            onPress={handleAdd}
            style={{
              backgroundColor: added
                ? "#7A8C6E"
                : inCart
                ? "#0D0D0D"
                : "#C4522A",
              borderRadius: 16,
              padding: 18,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "800" }}>
              {added
                ? "✓ ADDED TO CART"
                : inCart
                ? `IN CART (${inCart.quantity})`
                : "ADD TO CART"}
            </Text>
          </TouchableOpacity>

          {/* View Cart */}
          {inCart && (
            <TouchableOpacity
              onPress={() => navigation.navigate("Cart")}
              style={{ marginTop: 12, alignItems: "center" }}
            >
              <Text style={{ color: "#C4522A", fontWeight: "700" }}>
                View Cart →
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}