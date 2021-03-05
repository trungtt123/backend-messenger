const BoxChatModel = require('../db/models/boxchat');
const UserModel = require('../db/models/user');
const BoxChat = {};
const { v4: uuidv4 } = require('uuid');

BoxChat.CreateBoxChat = async (data) => {
    var randomid = uuidv4();
    var d = new Date();
    await BoxChatModel.create({
        _id: randomid,
        time: d.getTime(),
        userid: [data.userid,data.friendid],
        index: []
    });
    var user = await UserModel.findOne({_id: data.userid});
    user.friendid.push({
        boxchatid: randomid,
        friendid: data.friendid,
    });
    await user.save();
    user = await UserModel.findOne({_id: data.friendid});
    user.friendid.push({
        boxchatid: randomid,
        friendid: data.userid,
    });
    await user.save();
    return randomid;
}
BoxChat.UpdateBoxChat = async (data) => {
    var d = new Date();
    var boxchat = await BoxChatModel.findOne({ _id: data.boxchatid });
    boxchat.time = d.getTime();
    boxchat.index.push(
        data.data
    );
    await boxchat.save();
}
BoxChat.GetBoxChat = async (id) => {
    var boxchat = await BoxChatModel.findOne({ _id: id });
    return boxchat.index;
}
module.exports = BoxChat;
