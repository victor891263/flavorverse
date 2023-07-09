import {HttpErrorResponse} from "@angular/common/http"

export default function createObserverObject(successCallback: (response: any) => void, errorCallback: (msg: string) => void, finishCallback?: () => void, remove?: boolean) {
    return {
        next: (response) => {
            successCallback(response)
            if (finishCallback) finishCallback()
        },
        error: (error: HttpErrorResponse) => {
            errorCallback(error.error || error.message || 'An unknown error has occurred')
            if (remove) setTimeout(() => errorCallback(''), 5000) // remove the error message after 5 seconds
            if (finishCallback) finishCallback()
        }
    }
}
