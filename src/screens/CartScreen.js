import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  selectCartTotal,
} from "../redux/cartSlice";

export default function CartScreen({ navigation }) {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.cart.items);
  const total = useSelector(selectCartTotal);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const handleCheckout = () => {
    Alert.alert(
      "Order Placed! 🎉",
      `Thank you for your order of $${(total + 9.99).toFixed(2)}. You'll receive a confirmation email shortly.`,
      [
        {
          text: "Continue Shopping",
          onPress: () => {
            dispatch(clearCart());
            navigation.navigate("Home");
          },
        },
      ]
    );
  };

  const handleClearCart = () => {
    Alert.alert("Clear Cart", "Remove all items from your cart?", [
      { text: "Cancel", style: "cancel" },
      { text: "Clear", style: "destructive", onPress: () => dispatch(clearCart()) },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#0D0D0D" }}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View
        style={{
          paddingTop: Platform.OS === "ios" ? 56 : 40,
          paddingBottom: 20,
          paddingHorizontal: 20,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: "#1A1A1A",
              borderRadius: 10,
              padding: 10,
            }}
          >
            <Text style={{ color: "#F5F0E8", fontSize: 16 }}>←</Text>
          </TouchableOpacity>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#D4A853", fontSize: 36, letterSpacing: 3, fontWeight: "600" }}>
              TerraBuy🛒
            </Text>
            <Text style={{ color: "#F5F0E8", fontSize: 18, fontWeight: "800", marginTop: 1 }}>
              Your Cart
            </Text>
          </View>
          {items.length > 0 ? (
            <TouchableOpacity onPress={handleClearCart} style={{ padding: 8 }}>
              <Text style={{ color: "#C4522A", fontSize: 12, fontWeight: "700" }}>CLEAR</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ width: 40 }} />
          )}
        </View>

        {items.length > 0 && (
          <View
            style={{
              backgroundColor: "#1A1A1A",
              borderRadius: 10,
              padding: 12,
              marginTop: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "#888", fontSize: 13 }}>
              {itemCount} item{itemCount !== 1 ? "s" : ""} in cart
            </Text>
            <Text style={{ color: "#D4A853", fontSize: 13, fontWeight: "700" }}>
              ${total.toFixed(2)} subtotal
            </Text>
          </View>
        )}
      </View>

      {/* Content */}
      {items.length === 0 ? (
        <View
          style={{
            flex: 1,
            backgroundColor: "#F5F0E8",
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 40,
          }}
        >
          <Text style={{ fontSize: 72, marginBottom: 16 }}>🛒</Text>
          <Text style={{ color: "#0D0D0D", fontSize: 22, fontWeight: "800", textAlign: "center", marginBottom: 8 }}>
            Your cart is empty
          </Text>
          <Text style={{ color: "#888", fontSize: 14, textAlign: "center", lineHeight: 21, marginBottom: 32 }}>
            Looks like you haven't added anything yet. Browse our collection and find something you love.
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={{
              backgroundColor: "#C4522A",
              borderRadius: 14,
              paddingHorizontal: 32,
              paddingVertical: 14,
              shadowColor: "#C4522A",
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 6,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 14, fontWeight: "800", letterSpacing: 1.5 }}>
              BROWSE PRODUCTS →
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1, backgroundColor: "#F5F0E8", borderTopLeftRadius: 28, borderTopRightRadius: 28 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 16, paddingBottom: 200 }}
          >
            {items.map((item, index) => (
              <View
                key={item.id}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 16,
                  padding: 14,
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 12,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.06,
                  shadowRadius: 8,
                  elevation: 2,
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 80, height: 80, borderRadius: 12 }}
                  resizeMode="cover"
                />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={{ color: "#888", fontSize: 10, fontWeight: "700", letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>
                    {item.category}
                  </Text>
                  <Text style={{ color: "#0D0D0D", fontSize: 14, fontWeight: "700", marginBottom: 4 }} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={{ color: "#C4522A", fontSize: 15, fontWeight: "800" }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                  {item.quantity > 1 && (
                    <Text style={{ color: "#aaa", fontSize: 11, marginTop: 1 }}>
                      ${item.price.toFixed(2)} each
                    </Text>
                  )}
                </View>

                {/* Quantity + Remove */}
                <View style={{ alignItems: "center", gap: 8 }}>
                  <TouchableOpacity
                    onPress={() => dispatch(removeFromCart(item.id))}
                    style={{
                      backgroundColor: "#FFF0EE",
                      borderRadius: 8,
                      padding: 5,
                    }}
                  >
                    <Text style={{ color: "#C4522A", fontSize: 11, fontWeight: "700" }}>✕</Text>
                  </TouchableOpacity>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#EDE8DC",
                      borderRadius: 10,
                      overflow: "hidden",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => dispatch(decreaseQuantity(item.id))}
                      style={{ paddingHorizontal: 10, paddingVertical: 6 }}
                    >
                      <Text style={{ color: "#0D0D0D", fontSize: 16, fontWeight: "700" }}>−</Text>
                    </TouchableOpacity>
                    <Text style={{ color: "#0D0D0D", fontSize: 14, fontWeight: "800", minWidth: 20, textAlign: "center" }}>
                      {item.quantity}
                    </Text>
                    <TouchableOpacity
                      onPress={() => dispatch(increaseQuantity(item.id))}
                      style={{ paddingHorizontal: 10, paddingVertical: 6 }}
                    >
                      <Text style={{ color: "#0D0D0D", fontSize: 16, fontWeight: "700" }}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Order Summary Footer */}
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "#fff",
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: 24,
              paddingBottom: Platform.OS === "ios" ? 36 : 24,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.1,
              shadowRadius: 16,
              elevation: 12,
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
              <Text style={{ color: "#888", fontSize: 14 }}>Subtotal</Text>
              <Text style={{ color: "#0D0D0D", fontSize: 14, fontWeight: "600" }}>${total.toFixed(2)}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 14 }}>
              <Text style={{ color: "#888", fontSize: 14 }}>Shipping</Text>
              <Text style={{ color: "#7A8C6E", fontSize: 14, fontWeight: "600" }}>$9.99</Text>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: "#EDE8DC",
                marginBottom: 14,
              }}
            />
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 18 }}>
              <Text style={{ color: "#0D0D0D", fontSize: 16, fontWeight: "800" }}>Total</Text>
              <Text style={{ color: "#C4522A", fontSize: 18, fontWeight: "900" }}>
                ${(total + 9.99).toFixed(2)}
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleCheckout}
              activeOpacity={0.85}
              style={{
                backgroundColor: "#0D0D0D",
                borderRadius: 14,
                padding: 16,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#F5F0E8", fontSize: 15, fontWeight: "800", letterSpacing: 1.5 }}>
                CHECKOUT — ${(total + 9.99).toFixed(2)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
