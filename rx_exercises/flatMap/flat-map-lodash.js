import _ from "lodash";
import "./../log-operator";

function duplicate(n) {
  return [n, n];
}

function* flatMapExampleGenerator(){
  yield _.map([1, 2], duplicate);
  yield _.flatMap([1, 2], duplicate);
}

export const flatMapExample = flatMapExampleGenerator();
