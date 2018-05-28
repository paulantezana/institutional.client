const logout = ()=>{
    localStorage.clear();
}

const login = (username, password)=>{
    localStorage.setItem("authenticate",true)
}

const authenticate = ()=> localStorage.getItem("authenticate");

export {
    logout,
    login,
    authenticate
}