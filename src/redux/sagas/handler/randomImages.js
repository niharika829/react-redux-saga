import { call, put } from "redux-saga/effects";
import {
  storeImages,
  storeImageDetails,
  storeSearchedImages,
} from "../../reducers/randomImages";
import {
  fetchRandomImages,
  fetchImageDetails,
  fetchImageSearchList,
} from "../requests/randomImages";

export function* handleImageCollection(action) {
  try {
    const response = yield call(fetchRandomImages, action.payload);
    const { data } = response;
    yield put(storeImages(data));
  } catch (error) {
    console.log(error);
  }
}

export function* handleImageDetails(action) {
  try {
    const response = yield call(fetchImageDetails, action.payload);
    const { data } = response;
    yield put(storeImageDetails(data));
  } catch (error) {
    console.log(error);
  }
}

export function* handleImageSearch(action) {
  try {
    const response = yield call(fetchImageSearchList, action.payload);
    const { data } = response;
    yield put(storeSearchedImages(data));
  } catch (error) {
    console.log(error);
  }
}
