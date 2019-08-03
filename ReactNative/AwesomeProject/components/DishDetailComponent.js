import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Modal,
  StyleSheet,
  Button,
  Alert,
  PanResponder,
  Share
} from "react-native";
import { Card, Icon, Rating, Input } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseURL";
import { postFavorite, postComment } from "../redux/ActionCreators";
import * as Animatable from "react-native-animatable";

mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  };
};

const mapDispatchToProps = dispatch => ({
  postFavorite: dishId => dispatch(postFavorite(dishId)),
  addComment: (dishId, rating, comment, author) =>
    dispatch(postComment(dishId, rating, comment, author))
});

function RenderDish(props) {
  const dish = props.dish;
  handleViewRef = ref => (this.view = ref);

  const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
    if (dx < -200) return true;
    else return false;
  };

  const recognizeComment = ({ moveX, moveY, dx, dy }) => {
    if (dx > 100) return true;
    else return false;
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => {
      return true;
    },
    onPanResponderGrant: () => {
      this.view
        .rubberBand(1000)
        .then(endState =>
          console.log(endState.finished ? "finished" : "cancelled")
        );
    },
    onPanResponderEnd: (e, gestureState) => {
      console.log("pan responder end", gestureState);
      if (recognizeDrag(gestureState))
        Alert.alert(
          "Add Favorite",
          "Are you sure you wish to add " + dish.name + " to favorite?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            {
              text: "OK",
              onPress: () => {
                props.favorite
                  ? console.log("Already favorite")
                  : props.onPress();
              }
            }
          ],
          { cancelable: false }
        );
      if (recognizeComment(gestureState)) {
        props.openComments();
      }
      return true;
    }
  });
  const shareDish = (title, message, url) => {
    Share.share(
      {
        title: title,
        message: title + ": " + message + " " + url,
        url: url
      },
      {
        dialogTitle: "Share " + title
      }
    );
  };
  if (dish != null) {
    return (
      <Animatable.View
        animation="fadeInDown"
        duration={2000}
        delay={1000}
        ref={this.handleViewRef}
        {...panResponder.panHandlers}
      >
        <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
          <Text style={{ margin: 10 }}>{dish.description}</Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row"
            }}
          >
            <Icon
              raised
              reverse
              name={props.favourite ? "heart" : "heart-o"}
              type="font-awesome"
              color="#f50"
              onPress={() => {
                props.favourite
                  ? console.log("Already Favourite")
                  : props.onPress();
              }}
            />
            <Icon
              raised
              reverse
              name="pencil"
              type="font-awesome"
              color="#f50"
              onPress={() => {
                props.openComments(true);
              }}
            />
            <Icon
              raised
              reverse
              name="share"
              type="font-awesome"
              color="#51D2A8"
              style={styles.cardItem}
              onPress={() =>
                shareDish(dish.name, dish.description, baseUrl + dish.image)
              }
            />
          </View>
        </Card>
      </Animatable.View>
    );
  } else {
    return <View />;
  }
}

function RenderComments(props) {
  const comments = props.comments;
  const renderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
        <Text style={{ fontSize: 12 }}>
          {"-- " + item.author + "," + item.date}
        </Text>
      </View>
    );
  };

  return (
    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
      <Card title="Comments">
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={item => item.id.toString()}
        />
      </Card>
    </Animatable.View>
  );
}

class DishDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      author: null,
      comment: null,
      timestamp: "null"
    };
  }
  markFavourite(dishId) {
    this.props.postFavorite(dishId);
  }
  static navigationOptions = {
    title: "Dish Details"
  };
  toggleModal = data => {
    this.setState({ showModal: data });
  };
  resetForm() {
    this.setState({
      showModal: false,
      rating: 3,
      author: null,
      comment: null,
      timestamp: null
    });
  }
  handleComment() {
    this.setState({
      timestamp: Date.now()
    });
    const { rating, author, comment, dishId } = this.state;
    this.props.addComment(dishId, rating, comment, author);
  }
  componentDidMount() {
    let dishId = this.props.navigation.getParam("dishId", "");
    this.setState({ dishId: dishId });
  }
  render() {
    const dishId = this.props.navigation.getParam("dishId", "");
    return (
      <ScrollView>
        <RenderDish
          dish={this.props.dishes.dishes[+dishId]}
          favourite={this.props.favorites.some(el => el === dishId)}
          onPress={() => this.markFavourite(dishId)}
          openComments={this.toggleModal}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(
            comment => comment.dishId === dishId
          )}
        />
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => {}}
          onRequestClose={() => this.toggleModal(false)}
        >
          <View style={styles.modal}>
            <Rating
              showRating
              startingValue={3}
              onFinishRating={value => {
                this.setState({ rating: value });
              }}
            />
            <Input
              placeholder="Author"
              leftIcon={
                <Icon name="user" type="font-awesome" size={24} color="white" />
              }
              onChangeText={author => {
                this.setState({ author: author });
              }}
            />
            <Input
              placeholder="Comment"
              leftIcon={<Icon name="comment" size={24} color="black" />}
              onChangeText={comment => {
                this.setState({ comment: comment });
              }}
            />
            <Button
              onPress={() => {
                this.handleComment();
                this.toggleModal(false);
                this.resetForm();
              }}
              color="#512DA8"
              title="Submit"
              style={{ marginVertical: 5 }}
            />
            <Button
              onPress={() => {
                this.toggleModal(false);
                this.resetForm();
              }}
              color="#512DA8"
              title="Close"
              style={{ marginVertical: 5 }}
            />
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20
  },
  formLabel: {
    fontSize: 18,
    flex: 2
  },
  formItem: {
    flex: 1
  },
  modal: {
    justifyContent: "space-between",
    alignItems: "stretch",
    margin: 20
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#512DA8",
    textAlign: "center",
    color: "white",
    marginBottom: 20
  },
  modalText: {
    fontSize: 18,
    margin: 10
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DishDetail);
