import { all, takeLatest, call, put } from 'redux-saga/effects'
import HANDLE_DATA from '../Data/DataType'
import { auth, storage, getCurrentUser } from '../../Firebase/Firebase'
import { successUploadData, failureUploadData, successDownloadData, failureDownloadData, startDownloadData } from '../Data/DataAction'

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
            yield put(startDownloadData())
        }
        else {
            yield put(failureUploadData('Failed to upload your file'))
        }
    } catch (error) {
        yield put(failureUploadData("Failed to upload your file"))
    }
}


export function* dataDownload() {
    try {
        const user = yield call(getCurrentUser)
        const storageRef = yield storage.ref(`users/${user.uid}/documents/PDFs/`)
        const listRef = yield storageRef.listAll()
        const items = yield listRef.items
        const names = []
        for (let i = 0; i < items.length; ++i) {
            names.push(items[i].name)
        }
        let fileRef = []
        let getURLPromise = []
        let data = []
        for (let i = 0; i < items.length; ++i) {
            yield fileRef.push(storageRef.child(`/${names[i]}`))
            yield getURLPromise.push(fileRef[i].getDownloadURL())
            const URL = yield getURLPromise[i]
            data.push({ name: names[i], url: URL })
        } 
        yield put(successDownloadData(data))
    } catch (error) {
        yield put(failureDownloadData(error.message))
    }
}


export function* onStartDataUpload() {
    yield takeLatest(HANDLE_DATA.START_UPLOAD_DATA, dataUpload)
}

export function* onStartDataDownload() {
    yield takeLatest(HANDLE_DATA.START_DOWNLOAD_DATA, dataDownload)
}

export function* dataSaga() {
    yield all([
        call(onStartDataUpload),
        call(onStartDataDownload)
    ])
}