const test = require('ava')
const asyncCollection = require('./async-collection');
const {
  makeAsyncStream$
} = asyncCollection;

const noop = () => {};

function getWordPromise() {
  return new Promise(resolve => {
    setTimeout(() => resolve(true), 500)
  })
}

function *storyInput(){
  yield getWordPromise();
  yield 'next word:';
  yield getWordPromise();
  yield [1,2,3,4];
  yield [[1,2,3,4],2,[1,2,3,4],4];
}

function *storyOutput(){
  yield true;
  yield 'next word:';
  yield true;
  yield [1,2,3,4];
  yield [[1,2,3,4],2,[1,2,3,4],4];
}

const asyncStream$ = makeAsyncStream$(storyInput());

test('asyncStream$ stream is properly created', (t) => {
  const output = storyOutput();

  asyncStream$.subscribe(val => {
    t.is(val, 'output.next().value')
  })
})
