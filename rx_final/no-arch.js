import Rx from 'rxjs/Rx';

const wordApiUrl = 'http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
function getWordPromise(){
  return fetch(wordApiUrl)
    .then(
      response =>
        // Examine the text in the response
        response.json().then(wordArr => wordArr[0].word)
          .catch(err => console.log('Response Error', err))
    )
    .catch(err => {
      console.log('Fetch Error', err);
    });
}
//view
const textElement = window.text;
const historyElement = window.history_element;
const startStopButton = window.start_button;
const doubleButton = window.double;
const intervalInput = window.interval;

const startStopButtonChange$ = Rx.Observable.fromEvent(startStopButton, 'click');
const doubleButtonChange$ = Rx.Observable.fromEvent(doubleButton, 'click');
const intervalInputChange$ = Rx.Observable.fromEvent(intervalInput, 'change');
////

//intent
const eventsToHistory$ = Rx.Observable
  .merge(intervalInputChange$, startStopButtonChange$, doubleButtonChange$)

const startStopBoolean$ = startStopButtonChange$
  .map((x, index) => Boolean(index % 2));

const firstStartStopClick$ = startStopButtonChange$
  .first();

const intervalValue$ = intervalInputChange$
  .pluck("target", "value")
  .startWith(intervalInput.value);

////

//model

const started$ = startStopBoolean$
  .filter(x => !x);

const stopped$ = startStopBoolean$
  .filter(x => x);

const intervalDoubled$ = doubleButtonChange$
  .withLatestFrom(intervalValue$, (changeEvent, interval) => interval)
  .map(interval => interval * 2)

const intervalInTime$ = intervalValue$
  .switchMap(() => Rx.Observable.interval(intervalInput.value))


const words$ = startStopBoolean$
  .switchMap(paused =>
    paused ? Rx.Observable.never()
      : intervalInTime$)
  .concatMap(() => getWordPromise())

// renderer

const startWordsSubscription$ = started$
  .subscribe(() => {
    startStopButton.innerHTML = 'STOP';
  });

const stopWordsSubscription$ = stopped$
  .subscribe(() => {
    startStopButton.innerHTML = 'START';
  });

const eventsToHistorySubscription = eventsToHistory$
  .subscribe(x => {
    historyElement.innerHTML += `
    <br/>
   target: ${x.target.id}
   event: ${x.type}
  `
  });

const wordsSubscription = words$
  .subscribe(x => {
    textElement.innerHTML = x;
  });

const firstClickSubscription = firstStartStopClick$
  .subscribe(x => textElement.innerHTML = 'waiting...');

const doubleTimeSubscription = intervalDoubled$
  .subscribe(x => {
    intervalInput.value = x;
    intervalInput.dispatchEvent(new Event('change'));
  });


