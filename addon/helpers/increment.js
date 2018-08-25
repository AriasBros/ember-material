import { helper } from '@ember/component/helper';

export default helper(function([value, increment = 1]) {
  return value + increment;
});