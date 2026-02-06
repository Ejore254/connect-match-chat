// Simple but powerful localStorage-based database for real data persistence
// Production-ready for Vercel deployment

export interface User {
  id: string;
  email: string;
  name: string;
  age: number;
  gender: string;
  lookingFor: string;
  location: string;
  bio: string;
  avatar?: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  conversationId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  user1Id: string;
  user2Id: string;
  lastMessage?: string;
  lastMessageTime?: string;
  createdAt: string;
  updatedAt: string;
}

class Database {
  private prefix = "meetheart_";

  // Users
  saveUser(user: User) {
    const users = this.getUsers();
    const existing = users.findIndex((u) => u.id === user.id);
    if (existing >= 0) {
      users[existing] = user;
    } else {
      users.push(user);
    }
    localStorage.setItem(this.prefix + "users", JSON.stringify(users));
    return user;
  }

  getUser(id: string): User | null {
    const users = this.getUsers();
    return users.find((u) => u.id === id) || null;
  }

  getUserByEmail(email: string): User | null {
    const users = this.getUsers();
    return users.find((u) => u.email === email) || null;
  }

  getUsers(): User[] {
    try {
      const data = localStorage.getItem(this.prefix + "users");
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  // Conversations
  saveConversation(conversation: Conversation) {
    const conversations = this.getConversations();
    const existing = conversations.findIndex((c) => c.id === conversation.id);
    if (existing >= 0) {
      conversations[existing] = conversation;
    } else {
      conversations.push(conversation);
    }
    localStorage.setItem(
      this.prefix + "conversations",
      JSON.stringify(conversations),
    );
    return conversation;
  }

  getConversation(id: string): Conversation | null {
    const conversations = this.getConversations();
    return conversations.find((c) => c.id === id) || null;
  }

  getOrCreateConversation(userId1: string, userId2: string): Conversation {
    const conversations = this.getConversations();
    const [id1, id2] = [userId1, userId2].sort();

    let conversation = conversations.find(
      (c) =>
        (c.user1Id === id1 && c.user2Id === id2) ||
        (c.user1Id === id2 && c.user2Id === id1),
    );

    if (!conversation) {
      conversation = {
        id: `conv_${Date.now()}`,
        user1Id: id1,
        user2Id: id2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.saveConversation(conversation);
    }

    return conversation;
  }

  getConversationsForUser(userId: string): Conversation[] {
    const conversations = this.getConversations();
    return conversations.filter(
      (c) => c.user1Id === userId || c.user2Id === userId,
    );
  }

  getConversations(): Conversation[] {
    try {
      const data = localStorage.getItem(this.prefix + "conversations");
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  // Messages
  saveMessage(message: Message) {
    const messages = this.getMessages();
    messages.push(message);
    localStorage.setItem(this.prefix + "messages", JSON.stringify(messages));
    return message;
  }

  getMessagesForConversation(conversationId: string): Message[] {
    const messages = this.getMessages();
    return messages
      .filter((m) => m.conversationId === conversationId)
      .sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
      );
  }

  getMessages(): Message[] {
    try {
      const data = localStorage.getItem(this.prefix + "messages");
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  getUnreadCount(userId: string): number {
    const messages = this.getMessages();
    return messages.filter((m) => m.receiverId === userId && !m.read).length;
  }

  markAsRead(messageId: string) {
    const messages = this.getMessages();
    const message = messages.find((m) => m.id === messageId);
    if (message) {
      message.read = true;
      localStorage.setItem(this.prefix + "messages", JSON.stringify(messages));
    }
  }

  // Search/Filter
  searchUsers(query: string): User[] {
    const users = this.getUsers();
    const q = query.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.location.toLowerCase().includes(q) ||
        u.bio.toLowerCase().includes(q),
    );
  }

  // Utils
  clear() {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    });
  }

  getStats() {
    return {
      users: this.getUsers().length,
      conversations: this.getConversations().length,
      messages: this.getMessages().length,
    };
  }
}

// Export singleton instance
export const db = new Database();
