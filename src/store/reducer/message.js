const initialState = {
  messages: {}
};

//actions
const NEW_MESSAGE = "NEW_MESSAGE";
const GET_MESSAGE = "GET_MESSAGE";

//action creators
export const getAllMessage = (data, reciverId) => {
  return { type: GET_MESSAGE, payload: {messages: data, id: reciverId } };
};

export const getNewMessage = (data, reciverId) => {
  return { type: NEW_MESSAGE, payload: {messages: data, id: reciverId }  };
};

const messageReducer = (state = { ...initialState }, action) => {
    let messages;
    switch (action.type) {
        case NEW_MESSAGE:
            if (action.payload.id && state.messages[action.payload.id]) state.messages[action.payload.id].push(action.payload.messages);
            messages = state.messages;
            return {
                ...state,
                messages: {
                    ...messages
                }
            };
        case GET_MESSAGE:
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.payload.id]: action.payload.messages
                }
            }
        default:
            return state;
    }
};

export default messageReducer;
