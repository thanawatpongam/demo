import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import {RkCard} from 'react-native-ui-kitten';
import Theme from './theme';

export class Restaurant extends Component {
    static navigationOptions = {
        title: 'Restaurant',
    };
    constructor(props) {
        super(props);
        this.state = {
          restaurants: []
        };
    }
    componentDidMount() {
        fetch('https://order-plz.herokuapp.com/restaurants.json')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                restaurants: responseJson.restaurants
            });
        })
        .catch((error) => {
        console.error(error);
        });
    }
    gotoMenu(id) {
        console.log(id);
        this.props.navigation.push("Menu", {id})
    }
    getItem(item) {
        console.log(item);
        return (
            <TouchableOpacity onPress={() => this.gotoMenu(item.id)}>
            <RkCard style={styles.card}>
                <Image rkCardImg style={styles.image} source={{uri: item.image_url}}/>
                <View rkCardContent>
                    <Text style={[styles.nameText,Theme.styles.textBold]}>{item.name}</Text>
                    <Text style={[styles.kindText,Theme.styles.text]}>{item.kind}</Text>
                </View>
            </RkCard>
            </TouchableOpacity>
        );
    } 
    
    render() {
        return (
            <FlatList
                style={styles.flatList}
                data={this.state.restaurants}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => this.getItem(item)}
            />
        );
    }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
  },
  flatList: {
    paddingVertical: 8
  },
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 6,
  },
  image: {
    borderRadius: 6
  },
  nameText: {
    fontSize: 16
  },
  kindText: {
    fontSize: 12
  }
});