import jwtDecode from 'jwt-decode'

export default function getCurrentUser() {
    const token = localStorage.getItem('token')
    if (token) return jwtDecode(token) as {
        _id: string,
        isVerified: boolean
    }
    return undefined
}
