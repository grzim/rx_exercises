import Rx from 'rxjs/Rx';
import './../log-operator'


const keyDown$ = Rx.Observable.fromEvent(window, 'keydown');

const subscription = keyDown$
  .throttleTime(1000)
  .pluck('code')
  .subscribe(
    x => console.log(x),
    error => console.error(error),
    () => console.log('done')
  );

export default subscription;
