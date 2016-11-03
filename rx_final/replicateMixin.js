import Rx from 'rxjs/Rx';

function replicateMixin(subject) {
  return class ReplicateMixin extends subject {
    replicate(source) {
      if (typeof source === 'undefined') {
        throw new Error('Cannot replicate() if source is undefined.');
      }
      return source.subscribe(
        x => this.next(x),
        err => console.error(err)
      );
    }
  }
}

export default replicateMixin;