import {
  Text,
  View,
  TextInput,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import groups from "../../../assets/data/groups.json";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { selectedGroupAtom } from "../../atoms";
import { useSetAtom } from "jotai";
import { Group } from "../../types";

export default function GroupSelector() {
  const [searchValue, setSearchValue] = useState<string>("");
  const setGroup = useSetAtom(selectedGroupAtom);

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const onGroupSelected = (group: Group) => {
    setGroup(group);
    router.back();
  };

  return (
    <SafeAreaView style={{ marginHorizontal: 10 }}>
      {/* HEADER */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <AntDesign
          name="close"
          size={26}
          color="black"
          onPress={() => router.back()}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
            flex: 1,
            paddingRight: 30,
          }}
        >
          Post to
        </Text>
      </View>

      {/* SEARCH */}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "lightgrey",
          borderRadius: 10,
          gap: 5,
          marginVertical: 10,
          alignItems: "center",
          paddingHorizontal: 5,
        }}
      >
        <MaterialIcons name="search" size={24} color="grey" />
        <TextInput
          placeholder="Search for a community"
          placeholderTextColor="grey"
          style={{
            paddingVertical: 10,
            fontSize: 16,
            fontWeight: "600",
            flex: 1,
          }}
          value={searchValue}
          onChangeText={(text) => setSearchValue(text)}
        />
        {searchValue && (
          <MaterialIcons
            name="close"
            size={24}
            color="grey"
            onPress={() => setSearchValue("")}
          />
        )}
      </View>

      {/* RENDER GROUPS */}
      <FlatList
        data={filteredGroups}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onGroupSelected(item)}
            style={{
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: 40, aspectRatio: 1, borderRadius: 20 }}
            />
            <Text style={{ fontWeight: "600" }}>{item.name}</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}
