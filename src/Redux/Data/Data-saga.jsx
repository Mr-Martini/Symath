import { all, takeLatest, call, put } from 'redux-saga/effects'
import HANDLE_DATA from '../Data/DataType'
import { auth, storage } from '../../Firebase/Firebase'
import { successUploadData, failureUploadData } from '../Data/DataAction'

export function* dataUpload(data) {
    const fileSizeLimit = 500000 // 500kb
    const allowableNumbOfFilesOnCloud = 6
    try {
        const user = yield auth.currentUser
        const listRef = yield storage.ref(`users/${user.uid}/documents/PDFs`).listAll()
        if (listRef.items.length <= allowableNumbOfFilesOnCloud && data.payload.size <= fileSizeLimit) {
            const storageRef = yield storage.ref(`users/${user.uid}`)
            const dataRef = yield storageRef.child(`/documents/PDFs/${data.payload.name}`)
            yield dataRef.put(data.payload)
            yield put(successUploadData('Success uploading your file!'))
        }
        else {
            yield put(failureUploadData('Failed to upload your file'))
        }
    } catch (error) {
        yield put(failureUploadData("Failed to upload your file"))
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