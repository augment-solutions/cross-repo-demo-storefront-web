import { useEffect, useCallback, useRef } from 'react';

type KeyHandler = (event: KeyboardEvent) => void;

interface KeyboardOptions {
  /** Only trigger when the target element is focused */
  targetRef?: React.RefObject<HTMLElement>;
  /** Prevent default browser behavior */
  preventDefault?: boolean;
  /** Stop event propagation */
  stopPropagation?: boolean;
  /** Only trigger when ctrl/cmd key is pressed */
  ctrlKey?: boolean;
  /** Only trigger when shift key is pressed */
  shiftKey?: boolean;
  /** Only trigger when alt key is pressed */
  altKey?: boolean;
  /** Only trigger when meta key is pressed */
  metaKey?: boolean;
  /** Enable/disable the handler */
  enabled?: boolean;
}

/**
 * Hook to handle keyboard events
 * @param key - The key to listen for (e.g., 'Escape', 'Enter', 'a', 'ArrowDown')
 * @param handler - Callback function when the key is pressed
 * @param options - Additional options for the keyboard handler
 */
export function useKeyboard(
  key: string | string[],
  handler: KeyHandler,
  options: KeyboardOptions = {}
): void {
  const {
    targetRef,
    preventDefault = false,
    stopPropagation = false,
    ctrlKey = false,
    shiftKey = false,
    altKey = false,
    metaKey = false,
    enabled = true,
  } = options;

  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      const keys = Array.isArray(key) ? key : [key];

      // Check if the pressed key matches any of the target keys
      const keyMatches = keys.some(
        (k) => event.key === k || event.code === k
      );

      if (!keyMatches) return;

      // Check modifier keys
      if (ctrlKey && !event.ctrlKey) return;
      if (shiftKey && !event.shiftKey) return;
      if (altKey && !event.altKey) return;
      if (metaKey && !event.metaKey) return;

      if (preventDefault) {
        event.preventDefault();
      }

      if (stopPropagation) {
        event.stopPropagation();
      }

      handlerRef.current(event);
    },
    [key, ctrlKey, shiftKey, altKey, metaKey, preventDefault, stopPropagation, enabled]
  );

  useEffect(() => {
    const target = targetRef?.current || document;

    target.addEventListener('keydown', handleKeyDown as EventListener);

    return () => {
      target.removeEventListener('keydown', handleKeyDown as EventListener);
    };
  }, [handleKeyDown, targetRef]);
}

/**
 * Hook to handle the Escape key
 */
export function useEscapeKey(handler: KeyHandler, enabled = true): void {
  useKeyboard('Escape', handler, { enabled });
}

/**
 * Hook to handle the Enter key
 */
export function useEnterKey(handler: KeyHandler, enabled = true): void {
  useKeyboard('Enter', handler, { enabled });
}

/**
 * Hook to handle arrow keys for navigation
 */
export function useArrowKeys(
  handlers: {
    onUp?: KeyHandler;
    onDown?: KeyHandler;
    onLeft?: KeyHandler;
    onRight?: KeyHandler;
  },
  enabled = true
): void {
  const handler = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          handlers.onUp?.(event);
          break;
        case 'ArrowDown':
          handlers.onDown?.(event);
          break;
        case 'ArrowLeft':
          handlers.onLeft?.(event);
          break;
        case 'ArrowRight':
          handlers.onRight?.(event);
          break;
      }
    },
    [handlers]
  );

  useKeyboard(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'], handler, {
    enabled,
    preventDefault: true,
  });
}

