# use-kanomi-code

A zero dependency React hook that listens for a sequence of key presses to unlock a feature. This is usually referred to an easter egg. The default sequence is commonly known as the [Kanomi Code][link-kanomi-code-wiki]: `↑` `↑` `↓` `↓` `←` `→` `←` `→` `a` `b`. 

[![NPM Version][icon-npm-version]][link-npm]
[![NPM Total Downloads][icon-npm-total-downloads]][link-npm]
[![License][icon-license]][link-license]
[![Build Status][icon-build-status]][link-build]
[![Coverage][icon-coverage]][link-coverage]

## Installation

```sh
yarn add use-kanomi-code
```

## Usage

```jsx
import useKanomiCode from 'use-kanomi-code';

const Demo = () => {
  useKanomiCode({
    onUnlock: () => console.log('Unlocked 30 extra lives'),
  });

  return (
    <div>useKanomiCode Demo</div>
  );
};
```

### Options

`onUnlock: (event: KeyboardEvent) => void` The callback when the sequence has been completed and the secret unlocked

`sequence: string[]` An optional key sequence to use instead of the default Kanomi Code. This should be an array of strings that correspond to [key events][link-key-events].

`onReset: (distance: number, event: KeyboardEvent) => void` An optional callback when a portion of the sequence has been completed, but reset before being unlocked. It is called with the distance through the sequence that was make. For example, it would be invoked with `3` if the they successfully pressed the first 3 keys in the sequence before pressing an incorrect key.

`onKeyPress: (key: string, index: number, event: KeyboardEvent) => void` An optional callback when a key in the sequence is pressed.

`target: HTMLElement` An optional target element to listen to events. The default is the window object.

[icon-npm-version]: https://img.shields.io/npm/v/use-kanomi-code.svg
[icon-npm-total-downloads]: https://img.shields.io/npm/dt/use-kanomi-code.svg
[icon-license]: https://img.shields.io/github/license/chris-feist/use-kanomi-code.svg
[icon-build-status]: https://travis-ci.com/chris-feist/use-kanomi-code.svg?branch=main
[icon-coverage]: https://img.shields.io/codecov/c/github/chris-feist/use-kanomi-code/main.svg

[link-npm]: https://www.npmjs.com/package/use-kanomi-code
[link-license]: ./LICENSE
[link-build]: https://travis-ci.com/chris-feist/use-kanomi-code
[link-coverage]: https://codecov.io/gh/chris-feist/use-kanomi-code
[link-kanomi-code-wiki]: https://en.wikipedia.org/wiki/Konami_Code
[link-key-events]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
