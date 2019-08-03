import * as ActionTypes from "./ActionTypes";

export const comments = (state = { errMess: null, comments: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return { ...state, errMess: null, comments: action.payload };

    case ActionTypes.COMMENTS_FAILED:
      return { ...state, errMess: action.payload };
    case ActionTypes.ADD_COMMENT:
      let payload = {
        id:state.comments.length,
        dishId:action.dishId,
        rating:action.rating,
        comment:action.comment,
        author:action.author,
        date:new Date().toISOString()
      } 
      console.log("Adding Comment",payload);
      return { ...state,errMess:null, comments:state.comments.concat(payload)}
    default:
      return state;
  }
};
