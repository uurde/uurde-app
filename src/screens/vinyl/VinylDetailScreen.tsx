import React, { FC } from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { getVinylById } from "../../hooks/useVinyls";

type DetailParams = {
    route: {
        params: {
            id: string
        }
    }
}

type Navigation = NativeStackHeaderProps & DetailParams;

const VinylDetailScreen: FC<Navigation> = ({ route }) => {
    const vinyl = getVinylById(route.params.id);
    return (
        <View style={styles.container}>
            <View style={styles.itemContainer}>
                <Image style={styles.itemImage} source={{ uri: vinyl?.albumCoverPath ? vinyl.albumCoverPath : 'https://via.placeholder.com/100' }} />
                <View style={{ paddingLeft: 10 }}>
                    <Text style={styles.itemName}>{vinyl?.artistName}</Text>
                    <Text style={styles.itemText}>{vinyl?.albumName}</Text>
                    <Text style={styles.itemText}>{vinyl?.albumReleaseYear}</Text>
                    <Text style={styles.itemText}>{vinyl?.vinylType}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        felx: 1,
        backgroundColor: "#fff",
        padding: 10,
        height: "100%"
    },
    itemContainer: {
        backgroundColor: "#fff",
        marginBottom: 10,
        alignItems: "center"
    },
    itemName: {
        fontWeight: "bold",
        paddingBottom: 10,
        paddingTop: 10,
        fontSize: 20,
        textAlign: "center"
    },
    itemText: {
        paddingBottom: 10,
        fontSize: 20,
        textAlign: "center"
    },
    itemImage: {
        width: 200,
        height: 200,
    }
});

export default VinylDetailScreen;