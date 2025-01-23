export const getUserFromSession = ()=>{
    const user = JSON.parse(sessionStorage.getItem('user'));
    return user;
}


export const SetUserInSession = (user)=>{
    sessionStorage.setItem('user', JSON.stringify(user));
    return user;
}