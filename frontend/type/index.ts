export interface User {
  _id: string;
  username: string;
  email: string;
  avatar: string;
}

export interface MessageSender {
  _id: string;
  username: string;
  email: string;
  avatar: string;
}

export interface Message {
  _id: string;
  chatId: string;
  senderId: MessageSender | string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatLastMessage {
  _id: string;
  content: string;
  senderId: string;
  createdAt: string;
}

export interface Chat {
  _id: string;
  participantId: MessageSender;
  lastMessageId: ChatLastMessage | null;
  lastMessageAt: string;
  createdAt: string;
}
