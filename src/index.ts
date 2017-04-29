export type TypeWrapper<Wrapper,Inner> = {
  new(x: never): {}, // Impossible to call, so allow any return value.
  wrap(x: Inner): Wrapper,
  unwrap(x: Wrapper): Inner,
  over(func: (i: Inner) => Inner, x: Wrapper): Wrapper,
};

export function typeWrapper<Wrapper,Inner>(): TypeWrapper<Wrapper,Inner> {
  return class {
    // A constructor that can't be called (nothing can satisfy the "never" type).
    // tslint:disable-next-line:no-empty
    constructor(x: never) {}

    // Inner -> Wrapped Value
    static wrap(x: Inner): Wrapper {
      return x as any;
    }

    // Wrapped Value -> Inner
    static unwrap(x: Wrapper): Inner {
      return x as any;
    }

    // (Inner -> Inner), Wrapped Value -> Wrapped Value
    // Apply a function to the wrapped value.
    static over(func: (i: Inner) => Inner, x: Wrapper): Wrapper {
      return this.wrap(func(this.unwrap(x)));
    }
  };
}


// Needs to be used with a brand (the "private brand: any" below); we can't
// avoid this bit of boilerplate, unfortunately. For example,
//
//   class Email extends TypeWrapper<Email,string> {
//     private brand: any;
//   }
//
// eg.
//
//   const email = Email.wrap("foo@bar.com");
//
//   function sendEmail(from: Email, to: Email, subject: string, body: string) {
//     console.log("Sent from", Email.unwrap(from), " to ", Email.unwrap(to));
//     ...
//   }
//
//   // Works:
//   sendEmail(email, email, "Hello me", "It's me.");
//
//   // Explodes:
//   sendEmail(email, "Hello me", "It's me.", email);
