import React from 'react';

export const KANOMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

type OnUnlock = (event: KeyboardEvent) => void;
type Sequence = string[];
type OnReset = (distance: number, event: KeyboardEvent) => void;
type OnKeyPress = (key: string, index: number, event: KeyboardEvent) => void;

interface Target {
  addEventListener: HTMLElement['addEventListener'],
  removeEventListener: HTMLElement['removeEventListener'],
}

export interface UseKanomiCodeArgs {
  /**
   * The callback when the sequence has been completed and the secret unlocked
   */
  onUnlock: OnUnlock,

  /**
   * An optional key sequence to use instead of the default Kanomi Code.
   * This should be an array of strings that correspond to key events.
   */
  sequence?: Sequence,

  /**
   * An optional callback when a portion of the sequence has been completed,
   * but reset before being unlocked. It is called with the distance through
   * the sequence that was make. For example, it would be invoked with `3`
   * if the they successfully pressed the first 3 keys in the sequence before
   * pressing an incorrect key.
   */
  onReset?: OnReset,

  /**
   * An optional callback when a key in the sequence is pressed.
   */
  onKeyPress?: OnKeyPress,

  /**
   * An optional target element to listen to events. The default is the window object.
   */
  target?: Target,
}

const areArraysEqual = (arr1: string[], arr2: string[]) => arr1 === arr2 || (arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]));

const useKanomiCode = ({
  onUnlock,
  sequence: inputSequence = KANOMI_CODE,
  onReset,
  onKeyPress,
  target = window,
}: UseKanomiCodeArgs) => {
  const index = React.useRef(0);
  const sequence = React.useRef(inputSequence);

  const mutableCallbacks = React.useRef({
    onUnlock,
    onReset,
    onKeyPress,
  });
  mutableCallbacks.current = {
    onUnlock,
    onReset,
    onKeyPress,
  };

  const keyHandler = React.useCallback((event) => {
    const { key } = event;
    if (key !== sequence.current[index.current]) {
      if (index.current !== 0) {
        mutableCallbacks.current.onReset?.(index.current, event);
      }
      index.current = 0;
      return;
    }

    mutableCallbacks.current.onKeyPress?.(key, index.current, event);

    index.current += 1;

    if (index.current === sequence.current.length) {
      mutableCallbacks.current.onUnlock(event);
      index.current = 0;
    }
  }, [mutableCallbacks]);

  React.useEffect(() => {
    target?.addEventListener?.('keydown', keyHandler);
    return () => {
      target?.removeEventListener?.('keydown', keyHandler);
    };
  }, [target, keyHandler]);

  if (!areArraysEqual(inputSequence, sequence.current)) {
    // Input sequence changed, so reset current index
    sequence.current = inputSequence;
    index.current = 0;
  }
};

export default useKanomiCode;
