import * as assert from 'assert';
import { typeWrapper } from '../../src';

describe('typeWrapper', () => {
  it('lets you declare a wrapper', () => {

    class UserID extends typeWrapper<UserID,number>() {
      private _brand: any;
    }

    const idNumber = 123;
    const nameString = 'Bert';

    const id: UserID = UserID.wrap(idNumber);

    const user = {
      id: id,
      name: nameString,
    };
    const userSummary = UserID.unwrap(id) + ': ' + user.name;

    assert.strictEqual(
      userSummary,
      idNumber + ': ' + nameString
    );

    assert.strictEqual(
      UserID.unwrap(UserID.wrap(idNumber)),
      idNumber
    );

    assert.strictEqual(
      UserID.over(x => x * 2, UserID.wrap(idNumber)),
      UserID.wrap(idNumber * 2)
    );
  });
});
