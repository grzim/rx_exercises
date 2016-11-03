import Rx from 'rxjs/Rx';
import "./../log-operator";

const wordApiUrl = 'http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
const numberOfWords = 10;
const timeInterval = 1 * 1000;

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

Rx.Observable
  .interval(timeInterval)
  .take(numberOfWords)
  .flatMap(x => getWordPromise())
  .subscribe(
    x => console.log(x),
    error => console.error(error),
    () => console.log('done')
  );

