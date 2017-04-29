import * as assert from 'assert';
import { typeWrapper } from '../../src';


// Setup:

class UserID extends typeWrapper<UserID,number>() {
  private _brand: any;
}

class CompanyID extends typeWrapper<CompanyID,number>() {
  private _brand: any;
}

const idNumber = 123;
const nameString = 'Bert';


// Expected failures:

// $ExpectError The left-hand side of an arithmetic operation must be of type 'any', 'number' or an enum type.
const x1: number = UserID.wrap(123) * 456; // Not a string.

// $ExpectError Argument of type '123' is not assignable to parameter of type 'UserID'.
const x2: UserID = UserID.unwrap(123); // Can't unwrap a string.

// $ExpectError Argument of type '"123"' is not assignable to parameter of type 'number'.
const x3: UserID = UserID.wrap('123'); // Wraps strings, not numbers.

// $ExpectError Type 'UserID' is not assignable to type 'CompanyID'.
const x4: CompanyID = UserID.wrap(idNumber); // UserID not a CompanyID

// $ExpectError Type 'CompanyID' is not assignable to type 'UserID'.
const x5: UserID = CompanyID.wrap(idNumber); // ... and vice-versa.
