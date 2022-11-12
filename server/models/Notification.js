const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const notificationSchema = new Schema({
    totalCount: {
        type: Number
    },
    unreadCount: {
        type: Number,
    },
    unseenCount: {
        type: Number,
    },
    edges: [
        {
          cursor: {
            type: String
          },
          node: [
            {
                title: {
                    type: String
                },
                content: {
                    type: String
                },
                actionUrl: {
                    type: String
                },
                category: {
                    type: String
                },
                topic: {
                    type: String
                },
                customAttributes: {
                    type: String
                },
                sentAt: {
                    type: Date
                },
                readAt: {
                    type: Date
                },
                seenAt: {
                    type: Date
                },
                archivedAt: {
                    type: Date
                }
            }
          ]
        },
    ],
    pageInfo: [
        {
            hasNextPage: {
                type: Boolean
            },
            hasPreviousPage: {
                type: Boolean
            },
            startCursor: {
                type: String
            },
            endCursor: {
                type: String
            }
        }
    ]
});

const Notification = model('Notification', notificationSchema);

module.exports = Notification;
