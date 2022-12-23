const SET_CATEGORY = 'set-category';
const SET_MANUFACTURER = 'set-manufacturer';
const SET_COLOR = 'set-color';
const CLEAR_FILTER = 'clear-filter';

const initFilter = {
  categoryId: 0,
  manufacturerId: 0,
  color: '',
};
const setCategory = (payload) => {
  return { type: SET_CATEGORY, payload };
};
const setManufacturer = (payload) => {
  return { type: SET_MANUFACTURER, payload };
};
const setColor = (payload) => {
  return { type: SET_COLOR, payload };
};
const clearFilter = () => {
  return {
    type: CLEAR_FILTER,
    payload: {
      categoryId: 0,
      manufacturerId: 0,
      color: '',
    },
  };
};
const filterReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case SET_CATEGORY:
      newState = {
        ...state,
        categoryId: action.payload,
      };

      break;
    case SET_MANUFACTURER:
      newState = {
        ...state,
        manufacturerId: action.payload,
      };
      break;
    case SET_COLOR:
      newState = {
        ...state,
        color: action.payload,
      };

      break;
    case CLEAR_FILTER:
      newState = action.payload;

      break;

    default:
      break;
  }
  return newState;
};
export { initFilter, setCategory, setManufacturer, setColor, clearFilter, filterReducer };
