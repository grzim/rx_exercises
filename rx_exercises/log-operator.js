import Rx from 'rxjs/Rx';

Rx.Observable.prototype.log = logOperator;

function logOperator(indicator = '->'){
  const prefix = (indicator + ' ');
  return Rx.Observable.create(observer => {
    this.subscribe(
      (...values) => {
        console.log(prefix + values);
        observer.next(...values);
      },
      error => console.error(error),
      complete => console.log('log complete')
    )
  })
}

export default logOperator;
