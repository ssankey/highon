
export const SAVE_EDITED_IMAGE = 'SAVE_EDITED_IMAGE';

export const saveEditedImage = (editedImage ,aspectRatio) => {
  return {
    type: SAVE_EDITED_IMAGE,
    payload: {
    editedImage,
    aspectRatio,
    },
  };
};
