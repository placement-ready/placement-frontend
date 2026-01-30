'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { env } from '@/config';

interface UseSocketOptions {
  autoConnect?: boolean;
}

type SocketCallback<T = unknown> = (data: T) => void;

export function useSocket(options: UseSocketOptions = {}) {
  const { autoConnect = true } = options;
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const listenersRef = useRef<Map<string, Set<SocketCallback>>>(new Map());

  useEffect(() => {
    if (!autoConnect) return;

    // Remove /api suffix to get the base socket URL
    const socketUrl = env.apiUrl.endsWith('/api') ? env.apiUrl.slice(0, -4) : env.apiUrl;

    socketRef.current = io(socketUrl, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current.on('connect', () => {
      setIsConnected(true);
      setError(null);
    });

    socketRef.current.on('disconnect', () => {
      setIsConnected(false);
    });

    socketRef.current.on('connect_error', (err) => {
      console.error('Socket connection error:', err.message);
      setError(err.message);
      setIsConnected(false);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [autoConnect]);

  const emit = useCallback(<T = unknown>(event: string, data?: T) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(event, data);
    } else {
      console.warn('Socket not connected, cannot emit:', event);
    }
  }, []);

  const on = useCallback(<T = unknown>(event: string, callback: SocketCallback<T>) => {
    if (!listenersRef.current.has(event)) {
      listenersRef.current.set(event, new Set());
    }

    const listeners = listenersRef.current.get(event)!;
    listeners.add(callback as SocketCallback);

    socketRef.current?.on(event, callback);

    // Return cleanup function
    return () => {
      listeners.delete(callback as SocketCallback);
      socketRef.current?.off(event, callback);
    };
  }, []);

  const off = useCallback((event: string, callback?: SocketCallback) => {
    if (callback) {
      listenersRef.current.get(event)?.delete(callback);
      socketRef.current?.off(event, callback);
    } else {
      listenersRef.current.delete(event);
      socketRef.current?.off(event);
    }
  }, []);

  const disconnect = useCallback(() => {
    socketRef.current?.disconnect();
    setIsConnected(false);
  }, []);

  const connect = useCallback(() => {
    socketRef.current?.connect();
  }, []);

  return {
    socket: socketRef.current,
    isConnected,
    error,
    emit,
    on,
    off,
    disconnect,
    connect,
  };
}
