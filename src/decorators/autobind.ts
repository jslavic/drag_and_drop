// Method decorator that will automatically bind class instance to a method
export function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  // Here we are getting the original method and configuring the getter
  // of the property descriptor to be bound to its class instance
  const originalMethod = descriptor.value;
  const adjustedDescriptor = <PropertyDescriptor>{
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjustedDescriptor;
}
