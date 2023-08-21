import { useUserStore } from "src/stores/users";

export default function authHeader(multipart = false) {
    // let user = JSON.parse(localStorage.getItem('t'));
    const userToken = useUserStore()
    const header: Record<string, string> = multipart ?
        { 'Content-Type': 'multipart/form-data' } :
        {}
    if (userToken.token) {
        header['Authorization'] = `Bearer ${userToken.token.access}`
        // return {
        //     Authorization: `Bearer ${userToken.token.access}`,
        //     'Content-Type': 'multipart/form-data',
        // }; // for Spring Boot back-end
        // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    }
    return header
}