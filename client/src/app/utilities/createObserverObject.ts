import {HttpErrorResponse} from "@angular/common/http"

export default function createObserverObject(successCallback: (response: any) => void, errorCallback: (msg: string) => void, finishCallback?: () => void, remove?: boolean) {
    return {
        next: (response) => {
            successCallback(response)
            if (finishCallback) finishCallback()
        },
        error: (error: HttpErrorResponse) => {
            if (typeof error.error === 'string') errorCallback(error.error)
            else if (error.message) errorCallback(error.message)
            else errorCallback('An unknown error has occurred')
            if (remove) setTimeout(() => errorCallback(''), 5000) // remove the error message after 5 seconds
            if (finishCallback) finishCallback()
        }
    }
}
