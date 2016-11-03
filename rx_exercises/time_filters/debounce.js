import Rx from 'rxjs/Rx';
import './../log-operator'

const numbersArr = [1,2,3,4,5];

const interval$ = Rx.Observable
  .from(numbersArr)
  .flatMap(x => {
    return Rx.Observable.timer(x * x * 100)
        .timeInterval()
        .pluck("interval")
        .take(numbersArr.length)
        .log('after timer')
    }
  );

const subscription = interval$
  .debounceTime(600)
  .log('after debounce')
  .subscribe(
    x => console.log(x),
    error => console.error(error),
    () => console.log('done')
  );

export default subscription;