const SET_CATEGORY = 'set-category';
const SET_MANUFACTURER = 'set-manufacturer';
const SET_COLOR = 'set-color';

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
const filterReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case 'set-category':
      newState = {
        ...state,
        categoryId: action.payload,
      };

      break;
    case 'set-manufacturer':
      newState = {
        ...state,
        manufacturerId: action.payload,
      };
      break;
    case 'set-color':
      newState = {
        ...state,
        color: action.payload,
      };

      break;

    default:
      break;
  }
  return newState;
};
export { initFilter, setCategory, setManufacturer, setColor, filterReducer };
