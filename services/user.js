const BoxChat = require('../repositories/boxchat');
const User = require('../repositories/user');


module.exports = {
    async CreateUser(data) {
        try {
            var userid = await User.CreateUser(data);
            return ({ success: true, userid: userid });
        }
        catch (error) {
            return ({ error: error });
        }
    },
    async GetUserFromID(userid) {
        try {
            var user = await User.GetUserFromID(userid);
            return ({ success: true, user: user });
        }
        catch (error) {
            return ({ error: error });
        }
    },
    async CheckExistUserFromUserName(username) {
        try {
            var exist = await User.CheckExistUserFromUserName(username);
            return ({ success: true, exist: exist });
        }
        catch (error) {
            return ({ error: error });
        }
    },
    async UserLogin(data) {
        try {
            var user = await User.UserLogin(data);
            return ({ success: true, user: user });
        }
        catch (error) {
            return ({ error: error });
        }
    },
    async UserAddFriend(data) {
        try {
            var boxchatid = await BoxChat.CreateBoxChat(data);
            return ({ success: true, boxchatid: boxchatid});
        }
        catch (error) {
            return ({ error: error });
        }
    },
    async UserUnfriend(data) {
        try {
            await User.UserUnfriend(data);
            return ({ success: true});
        }
        catch (error) {
            return ({ error: error });
        }
    },
    async GetAllBoxChatID(userid) {
        try {
            var data = await User.GetAllBoxChatID(userid);
            return { success: true, boxchatid: data};
            
        }
        catch (error) {
            return { error: error };
        }
    },
    async GetAllUsers(userid) {
        try {
            var users = await User.GetAllUsers(userid);
            var friends = await User.GetFriends(userid);
            var tmp = [];
            for (var i = 0; i < users.length; i++){
                var tmpdata = {};
                tmpdata.person = users[i];
                tmpdata.person.relationship = "stranger";
                for (var j = 0; j < friends.length; j++){
                    if (users[i]._id === friends[j].friendid){
                        tmpdata.person.relationship = "friend";
                        tmpdata.person.boxchatid = friends[j].boxchatid;
                        break;
                    }
                }
                tmp.push(tmpdata);
            }
            return { success: true, users: tmp}
        }
        catch (error) {
            return { error: error };
        }
    },
}