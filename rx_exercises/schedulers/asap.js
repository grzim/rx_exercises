import Rx from 'rxjs/Rx';
import "./../log-operator";

//runs asynchronously, like setTimeout(fn,0) / process.nextTick (for Node)
console.log('Before asap subscription');
Rx.Observable.range(1, 5)
  .log('Processing value:')
  .observeOn(Rx.Scheduler.asap)
  .map(x => x*x)
  .subscribe(x => console.log(`on next ${x}`));
console.log('After asap subscription');
