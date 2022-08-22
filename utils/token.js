const get_token = () =>{
    const token = uni.getStorageSync('token');
    return token;
}

// 每次登录存一下token
const set_token = (token) => {
    uni.setStorageSync('token', token);
}