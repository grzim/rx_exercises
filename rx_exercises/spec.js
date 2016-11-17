import Rx from 'rxjs/Rx';
import test from 'ava';

import { makeAsyncStream$ } from './async-collection';

const noop = () => {};

function getWordPromise() {
  return new Promise(resolve => {
    setTimeout(() => resolve(true), 500)
  });
};

function *storyInput() {
  yield getWordPromise();
  yield 'next word:';
  yield getWordPromise();
  yield [1,2,3,4];
  yield [[1,2,3,4],2,[1,2,3,4],4];
}

function *storyOutput() {
  yield 'next word:';
  yield [1,2,3,4];
  yield [[1,2,3,4],2,[1,2,3,4],4];
  yield true;
  yield true;
}

const asyncStream$ = makeAsyncStream$(storyInput());

test('asyncStream$ stream is properly created', (t) => {
  t.plan(5);

  const output = storyOutput();

  return asyncStream$.map(x => {
    t.deepEqual(x, output.next().value);
  });
})
