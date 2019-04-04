import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {RkCard, RkButton} from 'react-native-ui-kitten';
import {Order} from './order';
import Loading from './loading';
import Theme from './theme';

export class Menu extends Component {
    static navigationOptions = {
        title: 'Menu',
    };
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          detail: {},
          orders: [],
          total: 0
        };
        this.summary = this.summary.bind(this);
    }
    componentDidMount() {
        fetch('https://order-plz.herokuapp.com/restaurants/' + this.props.navigation.state.params.id + '.json')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log("ress", responseJson);
            this.setState({
                detail: responseJson,
                loading: false
            });
        })
        .catch((error) => {
        console.error(error);
        });
    }
    summary(order, status) {
        let total = this.state.total;
        let orders = this.state.orders.slice(0);
        if(status){
            total += parseInt(order.price);
            orders.push(order);
        }else {
            total -= parseInt(order.price);
            orders = orders.filter(item => {
                return item.id != order.id;
            })
        }
        this.setState({ 
            total,
            orders
        });
    }
    submit(orders){
        console.log("submit", orders);
    }
    getOrder = (menus) => {
        if(menus) {
            const orders = menus.map((order) =>
            <Order item={order} summary={this.summary}/>);
            return orders
        }else {
            return null;
        }
    }
    render() {
        return (
            <Loading loading={this.state.loading}>
                <View style={{flex: 1}}>
                    <ScrollView>
                    <View style={styles.container}>
                        <View style={{marginVertical: 15}}>
                            <Text style={[styles.name, Theme.styles.textBold]}>{this.state.detail.name}</Text>
                            <Text style={[styles.kind, Theme.styles.textBold]}>{this.state.detail.kind}</Text>
                        </View>
                        <RkCard>
                            <Image rkCardImg style={styles.image} source={{uri: this.state.detail.image_url}}/>
                        </RkCard>
                        <Text style={[styles.menuText, Theme.styles.textBold]}>Menu</Text>
                        {this.getOrder(this.state.detail.menus)}
                    </View>
                    </ScrollView>
                    { this.state.total != 0 &&
                    <View style={styles.bottom}>
                            <View style={styles.total}>
                                <Text style={[styles.totalText,Theme.styles.text]}>Total Price</Text>
                                <Text style={[styles.resultText,Theme.styles.textBold]}>{this.state.total + " THB"}</Text>
                            </View>
                            <RkButton style={styles.nextButton} rkType='success' onPress={() => this.submit(this.state.orders)}>
                                <Text style={[styles.nextText, Theme.styles.textBold]}>Next</Text>
                            </RkButton>
                    </View>
                    }
                </View>
            </Loading>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  name: {
    fontSize: 24,
  },
  kind: {
    fontSize: 12,
    color: "gray"
  },
  menuText: {
    fontSize: 14,
    marginVertical: 15
  },
  image: {
    borderRadius: 6,
  },
  bottom: {
    flex: 1,
    position: 'absolute',
    backgroundColor: "silver",
    width: "100%",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nextButton: {
    borderRadius:20,
    marginHorizontal:20,
    marginVertical: 15,
  },
  nextText: {
    color: "#FFF",
    fontSize: 16
  },
  total: {
    marginHorizontal:20,
    marginVertical: 15,
  },
  totalText: {
    color: "#808080",
    fontSize: 16
  },
  resultText: {
    fontSize: 20
  }
});