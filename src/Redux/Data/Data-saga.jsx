import { all, takeLatest, call, put } from 'redux-saga/effects'
import HANDLE_DATA from '../Data/DataType'
import { auth, storage } from '../../Firebase/Firebase'
import { successUploadData, failureUploadData } from '../Data/DataAction'

export function* dataUpload(data) {
    try {
        const user = yield auth.currentUser
        const listRef = yield storage.ref(`users/${user.uid}/documents/PDFs`).listAll()
        if (listRef.items.length < 6) {
            const storageRef = yield storage.ref(`users/${user.uid}`)
            const dataRef = yield storageRef.child(`/documents/PDFs/${data.payload.name}`)
            yield dataRef.put(data.payload)
            yield put(successUploadData('Success uploading your file!'))
        }
        else {
            yield put(failureUploadData('You have reached the limit of 6 files'))
        }
    } catch (error) {
        yield put(failureUploadData('Failed to upload your data'))
    }
}

export function* onStartDataUpload() {
    yield takeLatest(HANDLE_DATA.START_UPLOAD_DATA, dataUpload)
}

export function* dataSaga() {
    yield all([
        call(onStartDataUpload)
    ])
}