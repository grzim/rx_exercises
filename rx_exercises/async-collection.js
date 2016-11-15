const Rx = require('rxjs/Rx');
const _ = require('lodash');

const wordApiUrl = 'http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';

function getWordPromise(){
  return true// fetch(wordApiUrl)
    // .then(
    //   response =>
    //     // Examine the text in the response
    //     response.json().then(wordArr => wordArr[0].word)
    //     .catch(err => console.log('Response Error', err))
    // )
    // .catch(err => {
    //   console.log('Fetch Error', err);
    // });
}

function *story(){
  yield getWordPromise();
  yield 'next word:';
  yield getWordPromise();
  yield [1,2,3,4];
  yield [[1,2,3,4],2,[1,2,3,4],4];
}

const samplePromise = val => new Promise(resolve => resolve(val));

const makeAsyncStream$ = source => Rx.Observable
  .from(source)
  .flatMap(samplePromise);

const asyncStream$ = makeAsyncStream$(story());

const asyncSubscription = asyncStream$.subscribe(
  x => console.log(x),
  error => console.error(error),
  () => console.log('done')
)

// export const syncStream$ = Rx.Observable
//   .from(story())
//   .concatMap(samplePromise);

// export const syncSubscription = syncStream$
//   .subscribe(
//     x => console.log(x),
//     error => console.error(error),
//     () => console.log('done')
//   )

module.exports = {
  makeAsyncStream$: makeAsyncStream$
}
