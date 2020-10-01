import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "../redux/actions";
import productApi from "../api/productsAPI";

function* fetchAllData() {
  try {
    const {fetchedData, headerFetched} = yield call(productApi);
    yield put(actions.receiveApiData(fetchedData, headerFetched));
  } catch (error) {
    console.log(error);
  }
}

export default function* mySaga() {
  yield takeLatest(actions.REQUEST_API_DATA, fetchAllData);
}
