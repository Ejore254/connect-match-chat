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

interface Message {
  id: string;
  sender: "user" | "other";
  content: string;
  timestamp: Date;
}

interface Chat {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline";
  lastSeen?: Date;
  messages: Message[];
}

const MOCK_CHATS: Chat[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    status: "online",
    messages: [
      {
        id: "1",
        sender: "other",
        content: "Hey! How are you doing? 😊",
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: "2",
        sender: "user",
        content: "Hi Sarah! I'm doing great, thanks for asking!",
        timestamp: new Date(Date.now() - 3500000),
      },
      {
        id: "3",
        sender: "other",
        content: "That's awesome! What are you up to today?",
        timestamp: new Date(Date.now() - 3400000),
      },
    ],
  },
  {
    id: "2",
    name: "Emma Davis",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    status: "offline",
    lastSeen: new Date(Date.now() - 1800000),
    messages: [
      {
        id: "1",
        sender: "user",
        content: "Just watched the most amazing sunset!",
        timestamp: new Date(Date.now() - 5400000),
      },
      {
        id: "2",
        sender: "other",
        content: "That sounds beautiful! Where were you?",
        timestamp: new Date(Date.now() - 5300000),
      },
    ],
  },
  {
    id: "3",
    name: "Jessica Williams",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
    status: "online",
    messages: [
      {
        id: "1",
        sender: "other",
        content: "I love hiking! We should go sometime",
        timestamp: new Date(Date.now() - 7200000),
      },
    ],
  },
];

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState<Chat>(MOCK_CHATS[0]);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(selectedChat.messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages(selectedChat.messages);
  }, [selectedChat]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: "user",
        content: messageInput,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setMessageInput("");
    }
  };

  return (
    <Layout>
      <div className="flex h-[calc(100vh-80px)] bg-background">
        {/* Chat List Sidebar */}
        <div className="hidden md:flex md:w-80 border-r border-border flex-col bg-muted/20">
          {/* Search and Header */}
          <div className="p-4 border-b border-border">
            <h2 className="text-xl font-bold mb-4">Messages</h2>
            <Input
              placeholder="Search conversations..."
              className="bg-background"
            />
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {MOCK_CHATS.map((chat) => (
              <button
                key={chat.id}
                onClick={() => {
                  setSelectedChat(chat);
                }}
                className={`w-full px-4 py-3 border-b border-border text-left hover:bg-background/50 transition-colors ${
                  selectedChat.id === chat.id ? "bg-primary/5" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={chat.avatar} alt={chat.name} />
                      <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {chat.status === "online" && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground">
                      {chat.name}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {chat.messages[chat.messages.length - 1]?.content ||
                        "No messages yet"}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-border flex items-center justify-between bg-card">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
                  <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {selectedChat.status === "online" && (
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-background" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  {selectedChat.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {selectedChat.status === "online"
                    ? "Online"
                    : `Last seen ${Math.round((Date.now() - selectedChat.lastSeen!.getTime()) / 60000)}m ago`}
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
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
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
            ))}
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
                className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 flex-shrink-0 p-0 flex items-center justify-center"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
