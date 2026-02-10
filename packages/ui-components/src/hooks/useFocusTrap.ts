import { useEffect, useRef, RefObject } from 'react';

const FOCUSABLE_ELEMENTS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
];

/**
 * Hook to trap focus within a container (useful for modals and dialogs)
 * @param active - Whether the focus trap is active
 * @returns RefObject to attach to the container element
 */
export function useFocusTrap<T extends HTMLElement = HTMLElement>(
  active = true
): RefObject<T> {
  const ref = useRef<T>(null);
  const previousActiveElement = useRef<Element | null>(null);

  useEffect(() => {
    if (!active) return;

    const container = ref.current;
    if (!container) return;

    // Store the currently focused element to restore later
    previousActiveElement.current = document.activeElement;

    // Get all focusable elements within the container
    const getFocusableElements = (): HTMLElement[] => {
      return Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS.join(','))
      ).filter((el) => el.offsetParent !== null); // Filter out hidden elements
    };

    // Focus the first focusable element
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);

      // Restore focus to the previously focused element
      if (previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus();
      }
    };
  }, [active]);

  return ref;
}

/**
 * Hook to manage focus within a list (useful for dropdown menus)
 * @param items - Array of item refs or the number of items
 * @param options - Configuration options
 */
export function useFocusNavigation(
  itemCount: number,
  options: {
    loop?: boolean;
    orientation?: 'horizontal' | 'vertical' | 'both';
    onFocusChange?: (index: number) => void;
  } = {}
): {
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
  getItemProps: (index: number) => { onKeyDown: (e: React.KeyboardEvent) => void };
} {
  const { loop = true, orientation = 'vertical', onFocusChange } = options;
  const focusedIndexRef = useRef(0);

  const setFocusedIndex = (index: number) => {
    focusedIndexRef.current = index;
    onFocusChange?.(index);
  };

  const getItemProps = (index: number) => ({
    onKeyDown: (e: React.KeyboardEvent) => {
      const isVertical = orientation === 'vertical' || orientation === 'both';
      const isHorizontal = orientation === 'horizontal' || orientation === 'both';

      let newIndex = focusedIndexRef.current;

      if ((e.key === 'ArrowDown' && isVertical) || (e.key === 'ArrowRight' && isHorizontal)) {
        e.preventDefault();
        newIndex = focusedIndexRef.current + 1;
        if (newIndex >= itemCount) {
          newIndex = loop ? 0 : itemCount - 1;
        }
      } else if ((e.key === 'ArrowUp' && isVertical) || (e.key === 'ArrowLeft' && isHorizontal)) {
        e.preventDefault();
        newIndex = focusedIndexRef.current - 1;
        if (newIndex < 0) {
          newIndex = loop ? itemCount - 1 : 0;
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        newIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        newIndex = itemCount - 1;
      }

      if (newIndex !== focusedIndexRef.current) {
        setFocusedIndex(newIndex);
      }
    },
  });

  return {
    focusedIndex: focusedIndexRef.current,
    setFocusedIndex,
    getItemProps,
  };
}

