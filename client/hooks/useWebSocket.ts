import { useEffect, useRef, useCallback, useState } from "react";

interface WebSocketMessage {
  type: string;
  payload: any;
}

export function useWebSocket(url: string, enabled: boolean = true) {
  const ws = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const messageHandlers = useRef<Map<string, Function[]>>(new Map());

  // Connect to WebSocket
  useEffect(() => {
    if (!enabled) return;

    const connect = () => {
      try {
        const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
        const wsUrl = url.startsWith("ws")
          ? url
          : `${protocol}//${window.location.host}${url}`;

        ws.current = new WebSocket(wsUrl);

        ws.current.onopen = () => {
          setConnected(true);
          console.log("WebSocket connected");
        };

        ws.current.onmessage = (event) => {
          try {
            const message: WebSocketMessage = JSON.parse(event.data);
            const handlers = messageHandlers.current.get(message.type) || [];
            handlers.forEach((handler) => handler(message.payload));
          } catch (error) {
            console.error("Failed to parse WebSocket message:", error);
          }
        };

        ws.current.onclose = () => {
          setConnected(false);
          console.log("WebSocket disconnected");
          // Attempt to reconnect after 3 seconds
          setTimeout(connect, 3000);
        };

        ws.current.onerror = (error) => {
          console.error("WebSocket error:", error);
        };
      } catch (error) {
        console.error("Failed to connect WebSocket:", error);
      }
    };

    connect();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [url, enabled]);

  // Subscribe to message type
  const subscribe = useCallback(
    (type: string, handler: (payload: any) => void) => {
      if (!messageHandlers.current.has(type)) {
        messageHandlers.current.set(type, []);
      }
      messageHandlers.current.get(type)!.push(handler);

      // Return unsubscribe function
      return () => {
        const handlers = messageHandlers.current.get(type) || [];
        const index = handlers.indexOf(handler);
        if (index > -1) {
          handlers.splice(index, 1);
        }
      };
    },
    []
  );

  // Send message
  const send = useCallback((type: string, payload: any) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type, payload }));
    } else {
      console.warn("WebSocket not connected");
    }
  }, []);

  return {
    connected,
    subscribe,
    send,
  };
}
