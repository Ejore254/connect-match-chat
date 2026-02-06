import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { db, Conversation, Message as DBMessage } from "@/lib/db";

interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline";
  lastSeen?: Date;
}

interface DisplayMessage {
  id: string;
  sender: "user" | "other";
  content: string;
  timestamp: Date;
}

export default function Chat() {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  // Load conversations and users on mount
  useEffect(() => {
    if (!user) return;

    // Get all other users (for demo, create some if they don't exist)
    let allUsers = db.getUsers().filter((u) => u.id !== user.id);

    // If not enough users, create demo users
    if (allUsers.length === 0) {
      const demoUsers = [
        {
          id: "user_demo_1",
          email: "sarah@meetheart.com",
          name: "Sarah Johnson",
          age: 26,
          gender: "female",
          lookingFor: "male",
          location: "Los Angeles, CA",
          bio: "Love yoga and travel 🌍",
          createdAt: new Date().toISOString(),
        },
        {
          id: "user_demo_2",
          email: "emma@meetheart.com",
          name: "Emma Davis",
          age: 25,
          gender: "female",
          lookingFor: "male",
          location: "San Francisco, CA",
          bio: "Artist and nature lover 🎨",
          createdAt: new Date().toISOString(),
        },
        {
          id: "user_demo_3",
          email: "jessica@meetheart.com",
          name: "Jessica Williams",
          age: 27,
          gender: "female",
          lookingFor: "male",
          location: "Seattle, WA",
          bio: "Hiking enthusiast ⛰️",
          createdAt: new Date().toISOString(),
        },
      ];

      demoUsers.forEach((u) => db.saveUser(u));
      allUsers = demoUsers;
    }

    // Convert to chat users
    const chatUsersList: ChatUser[] = allUsers.map((u) => ({
      id: u.id,
      name: u.name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.name}`,
      status: Math.random() > 0.3 ? "online" : "offline",
      lastSeen: new Date(Date.now() - Math.random() * 3600000),
    }));

    setChatUsers(chatUsersList);

    // Get user's conversations
    const userConversations = db.getConversationsForUser(user.id);
    setConversations(userConversations);

    // Auto-select first conversation or create one
    if (userConversations.length > 0) {
      setSelectedConversation(userConversations[0]);
      const otherUserId =
        userConversations[0].user1Id === user.id
          ? userConversations[0].user2Id
          : userConversations[0].user1Id;
      const otherUser = chatUsersList.find((u) => u.id === otherUserId);
      if (otherUser) setSelectedUser(otherUser);
    } else if (chatUsersList.length > 0) {
      // Create first conversation
      const firstChatUser = chatUsersList[0];
      const conv = db.getOrCreateConversation(user.id, firstChatUser.id);
      setSelectedConversation(conv);
      setSelectedUser(firstChatUser);
    }

    setLoading(false);
  }, [user]);

  // Load messages when conversation changes
  useEffect(() => {
    if (!selectedConversation) return;

    const dbMessages = db.getMessagesForConversation(selectedConversation.id);
    const displayMessages: DisplayMessage[] = dbMessages.map((m) => ({
      id: m.id,
      sender: m.senderId === user?.id ? "user" : "other",
      content: m.content,
      timestamp: new Date(m.timestamp),
    }));

    setMessages(displayMessages);
    scrollToBottom();
  }, [selectedConversation, user?.id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);

    const otherUserId =
      conversation.user1Id === user?.id
        ? conversation.user2Id
        : conversation.user1Id;
    const otherUser = chatUsers.find((u) => u.id === otherUserId);
    if (otherUser) setSelectedUser(otherUser);
  };

  const handleSelectUser = (chatUser: ChatUser) => {
    if (!user) return;

    const conversation = db.getOrCreateConversation(user.id, chatUser.id);
    setSelectedConversation(conversation);
    setSelectedUser(chatUser);
    setConversations(db.getConversationsForUser(user.id));
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation || !user) return;

    const message: DBMessage = {
      id: `msg_${Date.now()}`,
      senderId: user.id,
      receiverId: selectedUser!.id,
      conversationId: selectedConversation.id,
      content: messageInput,
      timestamp: new Date().toISOString(),
      read: false,
    };

    db.saveMessage(message);

    // Update conversation last message
    const updatedConv = {
      ...selectedConversation,
      lastMessage: messageInput,
      lastMessageTime: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.saveConversation(updatedConv);

    // Add to display
    const displayMessage: DisplayMessage = {
      id: message.id,
      sender: "user",
      content: messageInput,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, displayMessage]);
    setMessageInput("");

    // Simulate auto-reply after 1 second
    setTimeout(() => {
      const autoReply: DBMessage = {
        id: `msg_${Date.now()}`,
        senderId: selectedUser!.id,
        receiverId: user.id,
        conversationId: selectedConversation.id,
        content: generateReply(messageInput),
        timestamp: new Date().toISOString(),
        read: false,
      };

      db.saveMessage(autoReply);

      const displayReply: DisplayMessage = {
        id: autoReply.id,
        sender: "other",
        content: autoReply.content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, displayReply]);
    }, 800);
  };

  const generateReply = (message: string): string => {
    const replies = [
      "That sounds amazing! 😊",
      "I totally agree with you!",
      "That's exactly what I was thinking!",
      "Let me think about that... 🤔",
      "You seem really interesting!",
      "Tell me more about that!",
      "I love your energy! ✨",
      "Haha, that's funny! 😄",
      "Absolutely! When are you free?",
      "I'd love to know more! 💭",
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  if (!user) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
          <p className="text-muted-foreground">
            Please sign in to view messages.
          </p>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading conversations...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex h-[calc(100vh-80px)] bg-background">
        {/* Chat List Sidebar */}
        <div className="hidden md:flex md:w-80 border-r border-border flex-col bg-muted/20">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <h2 className="text-xl font-bold mb-4">Messages</h2>
            <Input
              placeholder="Search conversations..."
              className="bg-background"
            />
          </div>

          {/* People to Chat With */}
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">
              Available Users
            </h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {chatUsers.map((chatUser) => (
                <button
                  key={chatUser.id}
                  onClick={() => handleSelectUser(chatUser)}
                  className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-background/50 transition-colors"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={chatUser.avatar} alt={chatUser.name} />
                    <AvatarFallback>{chatUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-xs font-medium truncate">
                      {chatUser.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {chatUser.status === "online" ? "Online" : "Offline"}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                Start a conversation by clicking a user above
              </div>
            ) : (
              conversations.map((conv) => {
                const otherUserId =
                  conv.user1Id === user.id ? conv.user2Id : conv.user1Id;
                const otherUser = chatUsers.find((u) => u.id === otherUserId);
                if (!otherUser) return null;

                return (
                  <button
                    key={conv.id}
                    onClick={() => handleSelectConversation(conv)}
                    className={`w-full px-4 py-3 border-b border-border text-left hover:bg-background/50 transition-colors ${
                      selectedConversation?.id === conv.id ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={otherUser.avatar}
                          alt={otherUser.name}
                        />
                        <AvatarFallback>
                          {otherUser.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground">
                          {otherUser.name}
                        </h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {conv.lastMessage || "No messages yet"}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Chat Window */}
        {selectedConversation && selectedUser ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-card">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                  />
                  <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {selectedUser.status === "online" && (
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-background" />
                )}
                <div>
                  <h3 className="font-semibold text-foreground">
                    {selectedUser.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedUser.status === "online" ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-10 w-10 text-muted-foreground hover:text-primary"
                >
                  <Phone className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-10 w-10 text-muted-foreground hover:text-primary"
                >
                  <Video className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-10 w-10 text-muted-foreground hover:text-primary"
                >
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background to-muted/10">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-muted-foreground">
                    <Heart className="w-12 h-12 mx-auto mb-2 opacity-20" />
                    <p>Start a conversation</p>
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md rounded-2xl px-4 py-2 ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                          : "bg-card border border-border text-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "user"
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex items-end gap-3">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-10 w-10 text-muted-foreground hover:text-primary flex-shrink-0"
                >
                  <Paperclip className="w-5 h-5" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="flex-1"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-10 w-10 text-muted-foreground hover:text-primary flex-shrink-0"
                >
                  <Smile className="w-5 h-5" />
                </Button>
                <Button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 disabled:opacity-50 flex-shrink-0 p-0 flex items-center justify-center"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Heart className="w-12 h-12 mx-auto mb-2 opacity-20" />
              <p>Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
