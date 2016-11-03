//only available in rx4
import Rx from 'Rx';
import "./log-operator";
import commonSubscription from "./common-subscription"

const keyDown$ = Rx.Observable.fromEvent(window, 'keydown')

const source = keyDown$
  .groupByUntil(x => x.keyCode,
    x => x.keyCode,
    x => Rx.Observable.timer(2000));

const subscription = source.subscribe(
  obs => {
    obs.count().subscribe(function (x) {
      console.log('Count: ' + x);
    });
  },
  error => console.error(error),
  () => console.log('done')
);

export default subscription;