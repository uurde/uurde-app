import { useNavigation } from "@react-navigation/native";
import React, { FC, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import VinylItem from "../../components/vinyl/VinylItem";
import { getVinyls } from "../../hooks/useVinyls";
import { VinylModel } from "../../models/vinyl";

const VinylScreen: FC = () => {
    const navigation = useNavigation();
    const vinyls: VinylModel[] = getVinyls();
    const [filteredData, setFilteredData] = useState<VinylModel[]>([]);

    // useEffect(()=>{
    //     setFilteredData(vinyls);
    // })

    // useEffect(() => {
    //     //TODO: search bar
    //     navigation.setOptions({
    //         headerLargerTitle: true,
    //         headerTitle: "a",
    //         // headerRight: () => (
    //         //     <TouchableOpacity>
    //         //         <Text>+</Text>
    //         //     </TouchableOpacity>
    //         // ),
    //         headerSearchBarOptions: {
    //             placeholder: "Name",
    //             onChangeText: (event: any) => {
    //                 searchFilter(event.nativeEvent.text);
    //             },
    //         },
    //     });
    // }, [navigation]);

    const searchFilter = (text: string) => {
        if (text) {
            const filtered = vinyls.filter(item => {
                return item.artistName.toLowerCase().indexOf(text.toLowerCase()) > -1
            });
            setFilteredData(filtered);
        }
    }

    return (
        <View style={styles.container}>
            {vinyls ? <Text style={styles.count}>{vinyls.length + " Vinyls"}</Text> : ""}
            <FlatList
                data={vinyls}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <Pressable
                        onPress={() =>
                            navigation.navigate('VinylDetail', { id: item.id })
                        }
                    >
                        <VinylItem item={item}/>
                    </Pressable>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        felx: 1,
        backgroundColor: "#fff",
        padding: 10
    },
    count: {
        fontSize: 15,
        fontWeight: "bold",
        paddingBottom: 10
    }
});

export default VinylScreen;