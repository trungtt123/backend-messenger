const UserModel = require('../db/models/user');
const User = {};
const { v4: uuidv4 } = require('uuid');
User.CreateUser = async(data) => {
    var random_id = uuidv4();
    await UserModel.create({
        _id: random_id,
        username: data.username,
        password: data.password,
        fullname: data.fullname,
        address: data.address,
        friendid: []
    });
    return random_id;
}
User.UserLogin = async(data) => {
    var user = await UserModel.findOne({username: data.username, password: data.password});
    return user;
}
User.UserUnfriend = async(data) => {
    var user = await UserModel.findOne({_id: data.userid});
    for (var i = 0; i < user.friendid.length; i++){
        if (user.friendid[i].friendid === data.friendid){
            user.friendid.splice(i,1);
            break;
        }  
    }
    await user.save();
    user = await UserModel.findOne({_id: data.friendid});
    for (var i = 0; i < user.friendid.length; i++){
        if (user.friendid[i].friendid === data.userid){
            user.friendid.splice(i,1);
            break;
        }  
    }
    await user.save();
}
User.CheckExistUserFromUserName = async (username) => {
    var user = await UserModel.findOne({username: username});
    if (user === null) return false;
    return true;
}
User.GetUserFromID = async(id) => {
    var user = await UserModel.findOne({_id: id});
    return user;
}
User.GetAllBoxChatID = async(userid) => {
    var res = await UserModel.findById({_id: userid});
    return res.boxchatid;
}
User.GetAllUsers = async(userid) => {
    var res = await UserModel.find({}).sort({fullname: 1});
    var tmp = new Array;
    for (var i = 0; i < res.length; i++){
        var tmpdata = {};
        tmpdata._id = res[i]._id;
        tmpdata.fullname = res[i].fullname;
        if (res[i]._id !== userid) tmp.push(tmpdata);
    }
    return tmp;
}
User.GetFriends = async(userid) => {
    var res = await UserModel.findOne({_id: userid});
    return res.friendid;
}
module.exports = User;
