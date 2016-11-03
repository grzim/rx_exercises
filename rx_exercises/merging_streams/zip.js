import Rx from 'rxjs/Rx';
import "./../log-operator";
import commonSubscription from "./../common-subscription"

const charArr$ =  Rx.Observable.of('a','b','c','d');
const interval$ = Rx.Observable.interval(1000);

const source = interval$
  .zip(charArr$, (interval, char) => char)
  .log('after zip');


const subscription = source.subscribe(
  ...commonSubscription
);

export default subscription;