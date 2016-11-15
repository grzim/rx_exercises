import Rx from 'rxjs/Rx';
import "./../log-operator";

//no scheduler - synchronous, executed right away
console.log('Before subscription');
Rx.Observable.range(1, 5)
  .log('Processing value:')
  .map(x => x*x)
  .subscribe(x => console.log(`on next ${x}`));
console.log('After subscription');
