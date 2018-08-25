import { helper } from '@ember/component/helper';

export default helper(function([value, decrement = 1]) {
  return value - decrement;
});