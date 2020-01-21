import { all, call } from 'redux-saga/effects'

import { userSaga } from './User/user-saga'
import { dataSaga } from './Data/Data-saga'

export default function* rootSaga() {
    yield all([
        call(userSaga),
        call(dataSaga)
    ])
}