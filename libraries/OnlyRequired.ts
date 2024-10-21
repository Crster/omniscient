export type OnlyRequired<Type> = Pick<Type, { [K in keyof Type]-?: {} extends Pick<Type, K> ? never : K }[keyof Type]>;
export type OnlyOptional<Type> = Pick<Type, { [K in keyof Type]-?: {} extends Pick<Type, K> ? K : never }[keyof Type]>;
