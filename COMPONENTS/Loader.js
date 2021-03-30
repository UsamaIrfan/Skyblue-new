import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { colors } from "../Constant";

class Loader extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator color={colors.Blue} size='large' />
            </View>
        );
    }
}

export default Loader;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: "rgba(204, 204, 204, 0.5)",
        opacity: 0.7
    }
})