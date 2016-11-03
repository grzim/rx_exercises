import Rx from 'rxjs/Rx';
import "./log-operator";
import commonSubscription from "./common-subscription"

const random = Symbol();
Rx.Observable.prototype[random] = randomNumberGenerator;

function randomNumberGenerator(max = 10, min = 0){
  return Rx.Observable.create(observer => {
    this.subscribe(
      () => {
        observer.next(Math.floor(Math.random()*max) + min);
      },
      error => console.error(error),
      complete => console.log('log complete')
    )
  })
}

const source = Rx.Observable
  .interval(1000)
  .take(8)
  [random]()
  .log('number')
  .windowWhen(x => Rx.Observable.timer(3000))
  .flatMap(x => x.toArray())
  .takeWhile(({length}) => length);

const subscription = source.subscribe(
  ...commonSubscription
);

export default subscription;