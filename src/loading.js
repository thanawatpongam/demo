import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import Theme from "./theme";

class loading extends Component {
    render() {
        return(
            <View style={styles.container}>
                { this.props.loading &&
                    <View style={[styles.container, styles.containerCenter]}>
                        <ActivityIndicator size="large" color={"silver"} />
                    </View>
                }
                { !this.props.loading &&
                    <View style={styles.container}>
                        {this.props.children}
                    </View>
                }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: "#FFF"
    },
    container: {
        flex: 1,
    },
    containerCenter: {
        justifyContent: 'center'
    }
});

export default loading
