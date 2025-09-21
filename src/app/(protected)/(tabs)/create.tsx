import { AntDesign } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useAtom } from "jotai";
import { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { selectedGroupAtom } from "../../../atoms";
import { Group } from "../../../types";

export default function CreateScreen() {
  const [title, setTitle] = useState<string>("");
  const [bodyText, setBodyText] = useState<string>("");
  const [group, setGroup] = useAtom(selectedGroupAtom);

  const goBack = () => {
    setTitle("");
    setBodyText("");
    setGroup(null);
    router.back();
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 10 }}
    >
      {/* HEADER */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <AntDesign name="close" size={26} onPress={() => goBack()} />
        <Pressable
          onPress={() => console.error("Pressed")}
          style={{ marginLeft: "auto" }}
        >
          <Text
            style={{
              backgroundColor: "#0d469b",
              color: "white",
              fontWeight: "bold",
              paddingVertical: 2,
              paddingHorizontal: 7,
              borderRadius: 10,
            }}
          >
            Post
          </Text>
        </Pressable>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ padding: 10 }}
        >
          {/* COMMUNITY SELECTOR */}
          <Link
            href={"GroupSelector"}
            asChild
            style={{
              flexDirection: "row",
              backgroundColor: "#EDEDED",
              padding: 10,
              borderRadius: 20,
              gap: 5,
              alignSelf: "flex-start",
              marginVertical: 10,
            }}
          >
            <Pressable>
              {group ? (
                <>
                  <Image
                    source={{ uri: group.image }}
                    style={{ width: 20, height: 20, borderRadius: 10 }}
                  />
                  <Text style={{ fontWeight: "600" }}>{group.name}</Text>
                </>
              ) : (
                <>
                  <Text
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      paddingVertical: 1,
                      paddingHorizontal: 5,
                      fontWeight: "bold",
                      borderRadius: 10,
                    }}
                  >
                    r/
                  </Text>
                  <Text style={{ fontWeight: "600" }}>Select a community</Text>
                </>
              )}
            </Pressable>
          </Link>

          {/* INPUTS */}
          <TextInput
            placeholder="Title"
            style={{ fontSize: 20, fontWeight: "bold", paddingVertical: 20 }}
            value={title}
            onChangeText={(text) => setTitle(text)}
            multiline
            scrollEnabled={false}
          />
          <TextInput
            placeholder="body text (optional)"
            value={bodyText}
            onChangeText={(text) => setBodyText(text)}
            multiline
            scrollEnabled={false}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
