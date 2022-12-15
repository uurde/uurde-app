import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { VinylModel } from "../../models/vinyl";


export default function VinylItem({ item }: { item: VinylModel }) {
    return (
        <View style={styles.itemContainer}>
            <Image style={styles.itemImage} source={{ uri: item.albumCoverPath ? item.albumCoverPath : 'https://via.placeholder.com/100' }} />
            <View style={{ paddingLeft: 10 }}>
                <Text style={styles.itemName}>{item.artistName}</Text>
                <Text>{item.albumName}</Text>
                <Text>{item.albumReleaseYear}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: "#fff",
        flexDirection: "row",
        marginBottom: 10
    },
    itemName: {
        fontWeight: "bold"
    },
    itemImage: {
        width: 50,
        height: 50
    }
});