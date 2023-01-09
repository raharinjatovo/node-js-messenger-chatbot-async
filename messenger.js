// messenger.js
const request = require('request-promise');
const {deleteFile,downloadFile ,renameFile} = require('./utils');
const PAGE_ACCESS_TOKEN = 'your_access_token';
const fs = require('fs');
/*
 * Send a text message using the Send API.
 *
 */
const quick_reply_content =    [
    {
        "content_type":"text",
        "title":"Developpers",
        "payload":"Developers",
        "image_url":"https://envri.eu/wp-content/uploads/2016/08/software-developer-copy.jpg"
    },
    {
        "content_type":"text",
        "title":"Share this application",
        "payload":"Sharing",
        "image_url":"https://media.business-antidote.com/uploads/2014/09/augmenter-nombre-partage-facebook-contenu-peu-interessant.jpg"
    }
];
async function sendTextMessage(recipientId, messageText) {
    let messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: messageText,
            metadata: "DEVELOPER_DEFINED_METADATA",
            quick_replies:quick_reply_content
        }
    };

    await callSendAPI(messageData,recipientId);
}


async function sendImageMessage(recipientId) {
    let messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "image",
                payload: {
                    url: SERVER_URL + "/assets/rift.png"
                }
            },quick_replies:quick_reply_content
        }
    };

    await callSendAPI(messageData,recipientId);
}

/*
 * Send a Gif using the Send API.
 *
 */
async function sendGifMessage(recipientId) {
    let messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "image",
                payload: {
                    url: SERVER_URL + "/assets/instagram_logo.gif"
                }
            },quick_replies:quick_reply_content
        }
    };

    await callSendAPI(messageData,recipientId);
}

/*
 * Send audio using the Send API.
 *
 */
async function sendAudioMessage(recipientId,link,files) {
    let messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "audio",
                payload: {
                    url:link
                }   
            },quick_replies:quick_reply_content
        }
    };

    await  callSendAPI(messageData,recipientId,files)
}


/*
 * Send a video using the Send API.
 *
 */
async function sendVideoMessage(recipientId,link) {
    let messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "video",
                payload: {
                    url: link
                }
            },quick_replies:quick_reply_content
        }
    };

    await callSendAPI(messageData,recipientId);
}

/*
 * Send a file using the Send API.
 *
 */
async function sendFileMessage(recipientId,link,files) {
    let  messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "file",
                payload: {
                    url: link
                }
            },quick_replies:quick_reply_content
        }
    };

   await  callSendAPI(messageData,recipientId,files)
}



/*
 * Send a button message using the Send API.
 *
 */
async function sendButtonMessage(recipientId) {
    let messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: "This is test text",
                    buttons:[{
                        type: "web_url",
                        url: "https://www.oculus.com/en-us/rift/",
                        title: "Open Web URL"
                    }, {
                        type: "postback",
                        title: "Trigger Postback",
                        payload: "DEVELOPER_DEFINED_PAYLOAD"
                    }, {
                        type: "phone_number",
                        title: "Call Phone Number",
                        payload: "+16505551234"
                    }]
                }
            }
        }
    };

    await callSendAPI(messageData,recipientId);
}

/*
 * Send a Structured Message (Generic Message type) using the Send API.
 *
 */

async function sendGenericMessage(recipientId,data) {
    let  messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: data
                }
            },quick_replies:quick_reply_content
        }
    };

    await callSendAPI(messageData,recipientId);
}
/*
 * Send a receipt message using the Send API.
 *
 */
async function sendReceiptMessage(recipientId) {
    // Generate a random receipt ID as the API requires a unique ID
    let receiptId = "order" + Math.floor(Math.random()*1000);

    let  messageData = {
        recipient: {
            id: recipientId
        },
        message:{
            attachment: {
                type: "template",
                payload: {
                    template_type: "receipt",
                    recipient_name: "Peter Chang",
                    order_number: receiptId,
                    currency: "USD",
                    payment_method: "Visa 1234",
                    timestamp: "1428444852",
                    elements: [{
                        title: "Oculus Rift",
                        subtitle: "Includes: headset, sensor, remote",
                        quantity: 1,
                        price: 599.00,
                        currency: "USD",
                        image_url:"https://guide-images.cdn.ifixit.com/igi/o4OjCNmNeOhvsS1P.medium"
                    }, {
                        title: "Samsung Gear VR",
                        subtitle: "Frost White",
                        quantity: 1,
                        price: 99.99,
                        currency: "USD",
                        image_url: "https://guide-images.cdn.ifixit.com/igi/o4OjCNmNeOhvsS1P.medium"
                    }],
                    address: {
                        street_1: "1 Hacker Way",
                        street_2: "",
                        city: "Menlo Park",
                        postal_code: "94025",
                        state: "CA",
                        country: "US"
                    },
                    summary: {
                        subtotal: 698.99,
                        shipping_cost: 20.00,
                        total_tax: 57.67,
                        total_cost: 626.66
                    },
                    adjustments: [{
                        name: "New Customer Discount",
                        amount: -50
                    }, {
                        name: "$100 Off Coupon",
                        amount: -100
                    }]
                }
            }
        }
    };

    await callSendAPI(messageData,recipientId);
}

/*
 * Send a message with Quick Reply buttons.
 *
 */
async function sendQuickReply(recipientId) {
    let  messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: "What's your favorite movie genre?",
            quick_replies:quick_reply_content
        }
    };

    await callSendAPI(messageData,recipientId);
}

/*
 * Send a read receipt to indicate the message has been read
 *
 */
async function sendReadReceipt(recipientId) {
    console.log("Sending a read receipt to mark message as seen");

    let  messageData = {
        recipient: {
            id: recipientId
        },
        sender_action: "mark_seen"
    };

    await callSendAPI(messageData,recipientId);
}

/*
 * Turn typing indicator on
 *
 */
async function sendTypingOn(recipientId) {
    console.log("Turning typing indicator on");

    let  messageData = {
        recipient: {
            id: recipientId
        },
        sender_action: "typing_on"
    };

    await callSendAPI(messageData,recipientId);
}

/*
 * Turn typing indicator off
 *
 */
async function sendTypingOff(recipientId) {
    console.log("Turning typing indicator off");

    let messageData = {
        recipient: {
            id: recipientId
        },
        sender_action: "typing_off"
    };

    await callSendAPI(messageData,recipientId);
}

/*
 * Send a message with the account linking call-to-action
 *
 */
async function sendAccountLinking(recipientId) {
    let  messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: "Welcome. Link your account.",
                    buttons:[{
                        type: "account_link",
                        url: SERVER_URL + "/authorize"
                    }]
                }
            }
        }
    };

    await callSendAPI(messageData);
}
async function callSendAPI(messageData,senderID,files) {

    const response = await request({
        uri: 'https://graph.facebook.com/v7.0/me/messages',
        qs: { access_token: PAGE_ACCESS_TOKEN },
        method: 'POST',
        json: messageData

    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var recipientId = body.recipient_id;
            var messageId = body.message_id;

            if (messageId) {
                console.log("Successfully sent message with id %s to recipient %s",
                    messageId, recipientId);
            } else {
                console.log("Successfully called Send API for recipient %s",
                    recipientId);
            }
        } else {
            
            console.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
            sendTextMessage(senderID,"an error occurred")
            if(fs.existsSync(files))
            {
               // deleteFile(files)

            }




        }
    });

}



module.exports = {
    sendAudioMessage,sendTextMessage,sendImageMessage,sendGifMessage,
    sendVideoMessage,sendFileMessage,sendButtonMessage,
    sendGenericMessage,sendReceiptMessage,sendQuickReply,sendReadReceipt,
    sendTypingOn,sendTypingOff,sendAccountLinking,

};
