const BoxChatServices = require('../services/boxchat');
module.exports = (data) => {
    if (data.method === 'get'){
        switch (data.command){
            case 'getboxchat': {
                return BoxChatServices.GetBoxChat(data.obj.boxchatid);
            }
        }
    }
    if (data.method === 'put'){
        switch (data.command){
            case 'updateboxchat': {
                return BoxChatServices.UpdateBoxChat(data.obj);
            }
        }
    }
    if (data.method === 'post'){
        switch (data.command){
            case 'createboxchat' : {
                return BoxChatServices.CreateBoxChat(data.obj);
            }
        }
    }
};