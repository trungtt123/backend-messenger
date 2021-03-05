const UserServices = require('../services/user');
module.exports = (data) => {
    if (data.method === 'get'){
        switch (data.command){
            case 'allboxchatid': {
                return UserServices.GetAllBoxChatID(data.obj.userid);
            }
            case 'checkexistuserfromusername' : {
                return UserServices.CheckExistUserFromUserName(data.obj.username);
            }
            case 'userfromid' : {
                return UserServices.GetUserFromID(data.obj.userid);
            }
            case 'allusers' : {
                return UserServices.GetAllUsers(data.obj.userid);
            }
        }
    }
    if (data.method === 'post'){
        switch (data.command){
            case 'createuser' : {
                return UserServices.CreateUser(data.obj);
            }
            case 'userlogin' : {
                return UserServices.UserLogin(data.obj);
            }
            case 'addfriend' : {
                return UserServices.UserAddFriend(data.obj);
            }
            case 'unfriend' : {
                return UserServices.UserUnfriend(data.obj);
            }
        }
    }
};