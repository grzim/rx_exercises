import Rx from 'rxjs/Rx';
import './../log-operator'

const interval$ = Rx.Observable.interval(100)
        .timeInterval()
        .pluck("interval")
        .take(6)
        .log('after timer');

const subscription = interval$
  .throttleTime(300)
  .log('after throttle')
  .subscribe(
    x => console.log(x),
    error => console.error(error),
    () => console.log('done')
  );

export default subscription;
