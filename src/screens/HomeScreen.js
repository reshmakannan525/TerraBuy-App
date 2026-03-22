import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import { selectCartCount } from "../redux/cartSlice";
import { products } from "../data/products";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

// ✅ UPDATED categories (added Men & Women)
const categories = [
  "All",
  "Men",
  "Women",
  "Outerwear",
  "Tops",
  "Bottoms",
  "Footwear",
  "Accessories",
  "Knitwear",
];

export default function HomeScreen({ navigation }) {
  const cartCount = useSelector(selectCartCount);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const user = useSelector((s) => s.auth.user);

  // ✅ UPDATED FILTER LOGIC
  const filtered = products.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());

    let matchCat = true;

    if (activeCategory === "Men") {
      matchCat = p.category !== "Women"; // everything except women
    } else if (activeCategory === "Women") {
      matchCat = p.category === "Women";
    } else if (activeCategory !== "All") {
      matchCat = p.category === activeCategory;
    }

    return matchCat && matchSearch;
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F0E8" }}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View
        style={{
          backgroundColor: "#0D0D0D",
          paddingTop: 52,
          paddingBottom: 20,
          paddingHorizontal: 20,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <View>
            <Text style={{ color: "#D4A853", fontSize: 30, letterSpacing: 4, fontWeight: "600" }}>
              TerraBuy🛒
            </Text>
            <Text style={{ color: "#F5F0E8", fontSize: 20, fontWeight: "800", marginTop: 2 }}>
              Hello, {user?.name?.split(" ")[0] || "Shopper"}⚡
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("Cart")}
            style={{
              backgroundColor: "#C4522A",
              borderRadius: 14,
              padding: 10,
              position: "relative",
            }}
          >
            <Text style={{ fontSize: 20 }}>🛒</Text>

            {cartCount > 0 && (
              <View
                style={{
                  position: "absolute",
                  top: -6,
                  right: -6,
                  backgroundColor: "#D4A853",
                  borderRadius: 10,
                  minWidth: 20,
                  height: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 2,
                  borderColor: "#0D0D0D",
                }}
              >
                <Text style={{ color: "#0D0D0D", fontSize: 10, fontWeight: "900" }}>
                  {cartCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#1A1A1A",
            borderRadius: 12,
            paddingHorizontal: 14,
            paddingVertical: 10,
          }}
        >
          <Text style={{ fontSize: 16, marginRight: 8 }}>🔍</Text>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search products..."
            placeholderTextColor="#FFFFFF"
            style={{ flex: 1, color: "#F5F0E8", fontSize: 14 }}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setActiveCategory(cat)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                marginRight: 8,
                backgroundColor: activeCategory === cat ? "#C4522A" : "#EDE8DC",
              }}
            >
              <Text
                style={{
                  color: activeCategory === cat ? "#fff" : "#555",
                  fontSize: 13,
                  fontWeight: activeCategory === cat ? "700" : "500",
                }}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Title */}
        <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
          <Text style={{ color: "#0D0D0D", fontSize: 22, fontWeight: "800" }}>
            {activeCategory}
          </Text>
          <Text style={{ color: "#888", fontSize: 13 }}>
            {filtered.length} items
          </Text>
        </View>

        {/* Products */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 16, gap: 12 }}>
          {filtered.map((product) => (
            <TouchableOpacity
              key={product.id}
              onPress={() => navigation.navigate("ProductDetail", { product })}
              style={{
                width: CARD_WIDTH,
                backgroundColor: "#fff",
                borderRadius: 16,
                overflow: "hidden",
                marginBottom: 8,
              }}
            >
              <Image
                source={{ uri: product.image }}
                style={{ width: "100%", height: CARD_WIDTH * 1.1 }}
              />

              <View style={{ padding: 10 }}>
                <Text style={{ color: "#888", fontSize: 10 }}>
                  {product.category}
                </Text>

                <Text style={{ fontWeight: "700" }} numberOfLines={2}>
                  {product.title}
                </Text>

                <Text style={{ color: "#C4522A", fontWeight: "800" }}>
                  ${product.price}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {filtered.length === 0 && (
          <View style={{ alignItems: "center", padding: 40 }}>
            <Text>No products found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}