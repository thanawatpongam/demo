import { StyleSheet } from "react-native";

const fonts = {
    regular: "Montserrat-Medium",
    bold: "Montserrat-Bold"
};
const styles = StyleSheet.create({
    text: {
      fontFamily: fonts.regular
    },
    textBold: {
      fontFamily: fonts.bold
    }
});

const Theme = {
    styles: { ...styles },
    fonts: { ...fonts }
};

export default Theme;