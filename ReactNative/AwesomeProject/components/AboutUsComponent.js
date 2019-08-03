import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { Card } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import { ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseURL";
import { Loading } from "./LoadingComponent";
import * as Animatable from "react-native-animatable";

mapStateToProps = state => {
  return {
    leaders: state.leaders
  };
};

class AboutUs extends Component {
  static navigationOptions = {
    title: "About Us"
  };
  render() {
    console.log(this.props.leaders.leaders);
    const renderMenuItem = ({ item, index }) => {
      return (
        <ListItem
          key={index}
          title={item.name}
          subtitle={item.description}
          hideChevron={true}
          leftAvatar={{ source: { uri: baseUrl + item.image } }}
        />
      );
    };
    const History = () => {
      return (
        <Card title="Our History">
          <Text>
            Started in 2010, Ristorante con Fusion quickly established itself as
            a culinary icon par excellence in Hong Kong. With its unique brand
            of world fusion cuisine that can be found nowhere else, it enjoys
            patronage from the A-list clientele in Hong Kong. Featuring four of
            the best three-star Michelin chefs in the world, you never know what
            will arrive on your plate the next time you visit us.
          </Text>
          <Text>
            Started in 2010, Ristorante con Fusion quickly established itself as
            a culinary icon par excellence in Hong Kong. With its unique brand
            of world fusion cuisine that can be found nowhere else, it enjoys
            patronage from the A-list clientele in Hong Kong. Featuring four of
            the best three-star Michelin chefs in the world, you never know what
            will arrive on your plate the next time you visit us.
          </Text>
        </Card>
      );
    };
    if (this.props.leaders.isLoading) {
      return (
        <ScrollView>
          {History()}
          <Card title="Corporate Leadership">
            <Loading />
          </Card>
        </ScrollView>
      );
    } else if (this.props.leaders.errMess) {
      return (
        <ScrollView>
          <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
            {History()}
            <Card title="Corporate Leadership">
              <Text>{this.props.leaders.errMess}</Text>
            </Card>
          </Animatable.View>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView>
          <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
            {History()}
            <Card title="Corporate Leadership">
              <FlatList
                data={this.props.leaders.leaders}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
              />
            </Card>
          </Animatable.View>
        </ScrollView>
      );
    }
  }
}
export default connect(mapStateToProps)(AboutUs);
