// Inside redux/reducer.js

import { SAVE_EDITED_IMAGE } from './actions';

const initialState = {
  editedImage: null,
  aspectRatio: '1:1', // Set a default aspect ratio if needed
  // ... other state properties ...
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_EDITED_IMAGE:
      return {
        ...state,
        editedImage: action.payload.editedImage,
        aspectRatio: action.payload.aspectRatio,
      };
    // ... other cases ...
    default:
      return state;
  }
};

export default rootReducer;
