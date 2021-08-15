export const GET_IMAGES = "GET_IMAGES";
const SET_IMAGE_COLLECTION = "SET_IMAGE_COLLECTION";
export const GET_IMAGE_DETAILS = "GET_IMAGE_DETAILS";
const STORE_IMAGE_DETAILS = "STORE_IMAGE_DETAILS";
export const SEARCH_IMAGE_COLLECTION = "SEARCH_IMAGE_COLLECTION";
const STORE_SEARCHED_IMAGE_COLLECTION = "STORE_SEARCHED_IMAGE_COLLECTION";

export const getImages = ({ count }) => ({
  type: GET_IMAGES,
  payload: {
    count,
  },
});

export const storeImages = (randomImageList) => ({
  type: SET_IMAGE_COLLECTION,
  payload: {
    randomImageList,
  },
});

export const getImageDetails = ({ id }) => ({
  type: GET_IMAGE_DETAILS,
  payload: {
    id,
  },
});

export const storeImageDetails = (imageDetails) => ({
  type: STORE_IMAGE_DETAILS,
  payload: {
    imageDetails,
  },
});

export const searchImagesByKeyword = ({ keyword }) => ({
  type: SEARCH_IMAGE_COLLECTION,
  payload: {
    keyword,
  },
});

export const storeSearchedImages = (searchResult) => ({
  type: STORE_SEARCHED_IMAGE_COLLECTION,
  payload: {
    searchResult,
  },
});
const initialState = {
  randomImageList: undefined,
  imageDetails: undefined,
  searchResult: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_IMAGE_COLLECTION:
      const { randomImageList } = action.payload;
      return { ...state, randomImageList };
    case STORE_IMAGE_DETAILS:
      const { imageDetails } = action.payload;
      return { ...state, imageDetails };
    case STORE_SEARCHED_IMAGE_COLLECTION:
      const { searchResult } = action.payload;
      return { ...state, searchResult };
    default:
      return state;
  }
};
