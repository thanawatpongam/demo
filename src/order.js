import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Theme from './theme';

export class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
          check: false
        };
        this.onCheck = this.onCheck.bind(this);
    }
    onCheck(order, status) {
        this.props.summary(order, status);
        this.setState({
            check: status
        })
    }
    render() {
        console.log("ordersss");
        return (
            <View style={styles.container} >
                <TouchableOpacity style={styles.borderLayout} onPress={() => this.onCheck(this.props.item, !this.state.check)}>
                    <Image style={styles.imageOrder} source={{uri: this.props.item.image_url}}/>
                    <View style={styles.orderContent}>
                        <Text style={[styles.nameText, Theme.styles.text]}>{this.props.item.name}</Text>
                        <Text style={[styles.priceText,Theme.styles.textBold]}>{parseInt(this.props.item.price) + " THB"}</Text>
                    </View>
                    <View style={styles.checkLayout}>
                        <View>
                        { this.state.check &&
                            <Image style={styles.checkImage} source={require('../img/check.png')} />
                        }
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1,
    },
    borderLayout: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
    imageOrder: {
        width: 80,
        height: 80,
        borderRadius: 6
    },
    orderContent: {
        flex: 1,
        marginHorizontal: 16,
    },
    nameText: {
        fontSize: 14
    },
    priceText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    checkLayout: {
        justifyContent: "center",
        alignItems: 'center',
        width: 80
    },
    checkImage: {
        width: 20,
        height: 20,
        left: 20
    }
  });