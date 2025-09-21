import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import {  router, Stack } from "expo-router";
import { View } from "react-native";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="post/[id]"
        options={{
          headerTitle: "",
          headerStyle: { backgroundColor: "#FF5700" },
          headerLeft: () => (
            <AntDesign
              name="close"
              size={24}
              color="white"
              onPress={() => router.back()}
            />
          ),
          headerRight: () => (
            <View style={{flexDirection:"row",gap:10}}>
              <MaterialIcons name="search" size={24} color="white" />
              <MaterialIcons name="sort" size={24} color="white" />
              <Entypo name="dots-three-horizontal" size={24} color="white" />
            </View>
          ),
          animation: "slide_from_bottom",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack>
  );
}
