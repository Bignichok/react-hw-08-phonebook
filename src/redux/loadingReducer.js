const LOADING_START = "LOADING_START";
const LOADING_STOP = "LOADING_STOP";

export const loadingStart = () => ({ type: LOADING_START });
export const loadingStop = () => ({ type: LOADING_STOP });

const initialState = {
  loading: false,
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_START:
      return {
        ...state,
        loading: true,
      };
    case LOADING_STOP:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default loadingReducer;
