
import { ConversationWriter } from './conversation_writer.model';
import { Msg } from './msg.model';

export class Conversation {
  writer: ConversationWriter;
  message: Msg;
  createdAt: number;

  constructor(writer: ConversationWriter, message: Msg, createdAt: number) {
    this.writer = writer;
    this.message = message;
    this.createdAt = createdAt;
  }
}
