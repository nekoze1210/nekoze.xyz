type TODO = any
export declare type MatchType<T, U, V = never> = T extends U ? T : V
export declare type ElementType<T> = T extends (infer U)[] ? U : never
