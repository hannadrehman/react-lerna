import { autocompleteUser } from '../../../Services/api/api.requests';

// gets user data modifies it according to out component and returns the promise
const getUsersByName = input => autocompleteUser(input)
  .then(successData => successData.result.map((c, i) => ({ id: i, value: c })));

export default getUsersByName;
