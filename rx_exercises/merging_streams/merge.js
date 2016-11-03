import Rx from 'rxjs/Rx';
import "./../log-operator";
import commonSubscription from "./../common-subscription"

const interval$ =  Rx.Observable.interval(1000).map(x => "first");
const interval2$ = Rx.Observable.interval(400).map(x => "second");
const interval3$ = Rx.Observable.interval(900).map(x => "third");

const source = interval$
  .merge(interval2$, interval3$)
  .take(15);


const subscription = source.subscribe(
  ...commonSubscription
);

export default subscription;