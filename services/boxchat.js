const BoxChat = require('../repositories/boxchat');


module.exports = {
    async UpdateBoxChat(data) {
        try {
            await BoxChat.UpdateBoxChat(data);
            return ({ success: true});
        }
        catch (error) {
            return ({ error: error });
        }
    },
    async GetBoxChat(boxchatid) {
        try {
            var data = await BoxChat.GetBoxChat(boxchatid);
            return ({ success: true, index: data});
        }
        catch (error) {
            return ({ error: error });
        }
    },
    
}