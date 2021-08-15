import { takeLatest } from "redux-saga/effects";
import {
  handleImageCollection,
  handleImageDetails,
  handleImageSearch,
} from "./handler/randomImages";
import {
  GET_IMAGES,
  GET_IMAGE_DETAILS,
  SEARCH_IMAGE_COLLECTION,
} from "../reducers/randomImages";

export function* watcherSaga() {
  yield takeLatest(GET_IMAGES, handleImageCollection);
  yield takeLatest(GET_IMAGE_DETAILS, handleImageDetails);
  yield takeLatest(SEARCH_IMAGE_COLLECTION, handleImageSearch);
}
