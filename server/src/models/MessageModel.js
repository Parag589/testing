import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  recipientId: { type: String, required: true },
  messageText: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  role: { type: String, required: true },

});

const Message = mongoose.model('Message', messageSchema);

export default Message;
