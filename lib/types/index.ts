
export interface Account {
  address: string
  // isConnect: boolean
  status: boolean
}
interface Tag<T extends string, RealType> {
  __tag__: T;
  __realType__: RealType;
}

export type OpaqueType<T extends string, U> = U & Tag<T, U>;
