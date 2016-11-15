import Rx from 'rxjs/Rx';
import "./../log-operator";

//runs synchronously for all but recursive operations
console.log('Before queue subscription');
Rx.Observable.of(10)
  .log('repeat value:')
  .repeat()
  .log('after repeat value:')
  .take(10)
  .subscribe(x => console.log(`on next ${x}`));
console.log('After queue subscription');

setTimeout(()=>console.log("bye"),0);
