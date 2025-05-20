
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Prediction
 * 
 */
export type Prediction = $Result.DefaultSelection<Prisma.$PredictionPayload>
/**
 * Model Bet
 * 
 */
export type Bet = $Result.DefaultSelection<Prisma.$BetPayload>
/**
 * Model Comment
 * 
 */
export type Comment = $Result.DefaultSelection<Prisma.$CommentPayload>
/**
 * Model Like
 * 
 */
export type Like = $Result.DefaultSelection<Prisma.$LikePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const PredictionCategory: {
  CRYPTO: 'CRYPTO',
  SPORTS: 'SPORTS',
  SOCIAL: 'SOCIAL',
  OTHER: 'OTHER'
};

export type PredictionCategory = (typeof PredictionCategory)[keyof typeof PredictionCategory]


export const PredictionStatus: {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
  RESOLVED_TRUE: 'RESOLVED_TRUE',
  RESOLVED_FALSE: 'RESOLVED_FALSE'
};

export type PredictionStatus = (typeof PredictionStatus)[keyof typeof PredictionStatus]

}

export type PredictionCategory = $Enums.PredictionCategory

export const PredictionCategory: typeof $Enums.PredictionCategory

export type PredictionStatus = $Enums.PredictionStatus

export const PredictionStatus: typeof $Enums.PredictionStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Predictions
 * const predictions = await prisma.prediction.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Predictions
   * const predictions = await prisma.prediction.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.prediction`: Exposes CRUD operations for the **Prediction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Predictions
    * const predictions = await prisma.prediction.findMany()
    * ```
    */
  get prediction(): Prisma.PredictionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bet`: Exposes CRUD operations for the **Bet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bets
    * const bets = await prisma.bet.findMany()
    * ```
    */
  get bet(): Prisma.BetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.comment`: Exposes CRUD operations for the **Comment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comments
    * const comments = await prisma.comment.findMany()
    * ```
    */
  get comment(): Prisma.CommentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.like`: Exposes CRUD operations for the **Like** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Likes
    * const likes = await prisma.like.findMany()
    * ```
    */
  get like(): Prisma.LikeDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Prediction: 'Prediction',
    Bet: 'Bet',
    Comment: 'Comment',
    Like: 'Like'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "prediction" | "bet" | "comment" | "like"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Prediction: {
        payload: Prisma.$PredictionPayload<ExtArgs>
        fields: Prisma.PredictionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PredictionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PredictionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionPayload>
          }
          findFirst: {
            args: Prisma.PredictionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PredictionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionPayload>
          }
          findMany: {
            args: Prisma.PredictionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionPayload>[]
          }
          create: {
            args: Prisma.PredictionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionPayload>
          }
          createMany: {
            args: Prisma.PredictionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PredictionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionPayload>[]
          }
          delete: {
            args: Prisma.PredictionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionPayload>
          }
          update: {
            args: Prisma.PredictionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionPayload>
          }
          deleteMany: {
            args: Prisma.PredictionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PredictionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PredictionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionPayload>[]
          }
          upsert: {
            args: Prisma.PredictionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionPayload>
          }
          aggregate: {
            args: Prisma.PredictionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePrediction>
          }
          groupBy: {
            args: Prisma.PredictionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PredictionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PredictionCountArgs<ExtArgs>
            result: $Utils.Optional<PredictionCountAggregateOutputType> | number
          }
        }
      }
      Bet: {
        payload: Prisma.$BetPayload<ExtArgs>
        fields: Prisma.BetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BetPayload>
          }
          findFirst: {
            args: Prisma.BetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BetPayload>
          }
          findMany: {
            args: Prisma.BetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BetPayload>[]
          }
          create: {
            args: Prisma.BetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BetPayload>
          }
          createMany: {
            args: Prisma.BetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BetPayload>[]
          }
          delete: {
            args: Prisma.BetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BetPayload>
          }
          update: {
            args: Prisma.BetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BetPayload>
          }
          deleteMany: {
            args: Prisma.BetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BetPayload>[]
          }
          upsert: {
            args: Prisma.BetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BetPayload>
          }
          aggregate: {
            args: Prisma.BetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBet>
          }
          groupBy: {
            args: Prisma.BetGroupByArgs<ExtArgs>
            result: $Utils.Optional<BetGroupByOutputType>[]
          }
          count: {
            args: Prisma.BetCountArgs<ExtArgs>
            result: $Utils.Optional<BetCountAggregateOutputType> | number
          }
        }
      }
      Comment: {
        payload: Prisma.$CommentPayload<ExtArgs>
        fields: Prisma.CommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findFirst: {
            args: Prisma.CommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findMany: {
            args: Prisma.CommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          create: {
            args: Prisma.CommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          createMany: {
            args: Prisma.CommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          delete: {
            args: Prisma.CommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          update: {
            args: Prisma.CommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          deleteMany: {
            args: Prisma.CommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CommentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          upsert: {
            args: Prisma.CommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          aggregate: {
            args: Prisma.CommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComment>
          }
          groupBy: {
            args: Prisma.CommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommentCountArgs<ExtArgs>
            result: $Utils.Optional<CommentCountAggregateOutputType> | number
          }
        }
      }
      Like: {
        payload: Prisma.$LikePayload<ExtArgs>
        fields: Prisma.LikeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LikeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LikeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>
          }
          findFirst: {
            args: Prisma.LikeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LikeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>
          }
          findMany: {
            args: Prisma.LikeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>[]
          }
          create: {
            args: Prisma.LikeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>
          }
          createMany: {
            args: Prisma.LikeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LikeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>[]
          }
          delete: {
            args: Prisma.LikeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>
          }
          update: {
            args: Prisma.LikeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>
          }
          deleteMany: {
            args: Prisma.LikeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LikeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LikeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>[]
          }
          upsert: {
            args: Prisma.LikeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>
          }
          aggregate: {
            args: Prisma.LikeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLike>
          }
          groupBy: {
            args: Prisma.LikeGroupByArgs<ExtArgs>
            result: $Utils.Optional<LikeGroupByOutputType>[]
          }
          count: {
            args: Prisma.LikeCountArgs<ExtArgs>
            result: $Utils.Optional<LikeCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    prediction?: PredictionOmit
    bet?: BetOmit
    comment?: CommentOmit
    like?: LikeOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PredictionCountOutputType
   */

  export type PredictionCountOutputType = {
    bets: number
    comments: number
    likes: number
  }

  export type PredictionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bets?: boolean | PredictionCountOutputTypeCountBetsArgs
    comments?: boolean | PredictionCountOutputTypeCountCommentsArgs
    likes?: boolean | PredictionCountOutputTypeCountLikesArgs
  }

  // Custom InputTypes
  /**
   * PredictionCountOutputType without action
   */
  export type PredictionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictionCountOutputType
     */
    select?: PredictionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PredictionCountOutputType without action
   */
  export type PredictionCountOutputTypeCountBetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BetWhereInput
  }

  /**
   * PredictionCountOutputType without action
   */
  export type PredictionCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }

  /**
   * PredictionCountOutputType without action
   */
  export type PredictionCountOutputTypeCountLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LikeWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Prediction
   */

  export type AggregatePrediction = {
    _count: PredictionCountAggregateOutputType | null
    _avg: PredictionAvgAggregateOutputType | null
    _sum: PredictionSumAggregateOutputType | null
    _min: PredictionMinAggregateOutputType | null
    _max: PredictionMaxAggregateOutputType | null
  }

  export type PredictionAvgAggregateOutputType = {
    totalBetsTrue: number | null
    totalBetsFalse: number | null
  }

  export type PredictionSumAggregateOutputType = {
    totalBetsTrue: number | null
    totalBetsFalse: number | null
  }

  export type PredictionMinAggregateOutputType = {
    id: string | null
    creatorAddress: string | null
    creatorName: string | null
    creatorImage: string | null
    content: string | null
    category: $Enums.PredictionCategory | null
    status: $Enums.PredictionStatus | null
    createdAt: Date | null
    expiresAt: Date | null
    resolvedAt: Date | null
    contractAddress: string | null
    targetPrice: string | null
    comparisonOperator: string | null
    tokenSymbol: string | null
    totalBetsTrue: number | null
    totalBetsFalse: number | null
    isPending: boolean | null
    hasError: boolean | null
    errorMessage: string | null
  }

  export type PredictionMaxAggregateOutputType = {
    id: string | null
    creatorAddress: string | null
    creatorName: string | null
    creatorImage: string | null
    content: string | null
    category: $Enums.PredictionCategory | null
    status: $Enums.PredictionStatus | null
    createdAt: Date | null
    expiresAt: Date | null
    resolvedAt: Date | null
    contractAddress: string | null
    targetPrice: string | null
    comparisonOperator: string | null
    tokenSymbol: string | null
    totalBetsTrue: number | null
    totalBetsFalse: number | null
    isPending: boolean | null
    hasError: boolean | null
    errorMessage: string | null
  }

  export type PredictionCountAggregateOutputType = {
    id: number
    creatorAddress: number
    creatorName: number
    creatorImage: number
    content: number
    category: number
    status: number
    createdAt: number
    expiresAt: number
    resolvedAt: number
    contractAddress: number
    targetPrice: number
    comparisonOperator: number
    tokenSymbol: number
    totalBetsTrue: number
    totalBetsFalse: number
    isPending: number
    hasError: number
    errorMessage: number
    _all: number
  }


  export type PredictionAvgAggregateInputType = {
    totalBetsTrue?: true
    totalBetsFalse?: true
  }

  export type PredictionSumAggregateInputType = {
    totalBetsTrue?: true
    totalBetsFalse?: true
  }

  export type PredictionMinAggregateInputType = {
    id?: true
    creatorAddress?: true
    creatorName?: true
    creatorImage?: true
    content?: true
    category?: true
    status?: true
    createdAt?: true
    expiresAt?: true
    resolvedAt?: true
    contractAddress?: true
    targetPrice?: true
    comparisonOperator?: true
    tokenSymbol?: true
    totalBetsTrue?: true
    totalBetsFalse?: true
    isPending?: true
    hasError?: true
    errorMessage?: true
  }

  export type PredictionMaxAggregateInputType = {
    id?: true
    creatorAddress?: true
    creatorName?: true
    creatorImage?: true
    content?: true
    category?: true
    status?: true
    createdAt?: true
    expiresAt?: true
    resolvedAt?: true
    contractAddress?: true
    targetPrice?: true
    comparisonOperator?: true
    tokenSymbol?: true
    totalBetsTrue?: true
    totalBetsFalse?: true
    isPending?: true
    hasError?: true
    errorMessage?: true
  }

  export type PredictionCountAggregateInputType = {
    id?: true
    creatorAddress?: true
    creatorName?: true
    creatorImage?: true
    content?: true
    category?: true
    status?: true
    createdAt?: true
    expiresAt?: true
    resolvedAt?: true
    contractAddress?: true
    targetPrice?: true
    comparisonOperator?: true
    tokenSymbol?: true
    totalBetsTrue?: true
    totalBetsFalse?: true
    isPending?: true
    hasError?: true
    errorMessage?: true
    _all?: true
  }

  export type PredictionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Prediction to aggregate.
     */
    where?: PredictionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Predictions to fetch.
     */
    orderBy?: PredictionOrderByWithRelationInput | PredictionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PredictionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Predictions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Predictions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Predictions
    **/
    _count?: true | PredictionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PredictionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PredictionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PredictionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PredictionMaxAggregateInputType
  }

  export type GetPredictionAggregateType<T extends PredictionAggregateArgs> = {
        [P in keyof T & keyof AggregatePrediction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePrediction[P]>
      : GetScalarType<T[P], AggregatePrediction[P]>
  }




  export type PredictionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PredictionWhereInput
    orderBy?: PredictionOrderByWithAggregationInput | PredictionOrderByWithAggregationInput[]
    by: PredictionScalarFieldEnum[] | PredictionScalarFieldEnum
    having?: PredictionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PredictionCountAggregateInputType | true
    _avg?: PredictionAvgAggregateInputType
    _sum?: PredictionSumAggregateInputType
    _min?: PredictionMinAggregateInputType
    _max?: PredictionMaxAggregateInputType
  }

  export type PredictionGroupByOutputType = {
    id: string
    creatorAddress: string
    creatorName: string | null
    creatorImage: string | null
    content: string
    category: $Enums.PredictionCategory
    status: $Enums.PredictionStatus
    createdAt: Date
    expiresAt: Date
    resolvedAt: Date | null
    contractAddress: string | null
    targetPrice: string | null
    comparisonOperator: string | null
    tokenSymbol: string | null
    totalBetsTrue: number
    totalBetsFalse: number
    isPending: boolean
    hasError: boolean
    errorMessage: string | null
    _count: PredictionCountAggregateOutputType | null
    _avg: PredictionAvgAggregateOutputType | null
    _sum: PredictionSumAggregateOutputType | null
    _min: PredictionMinAggregateOutputType | null
    _max: PredictionMaxAggregateOutputType | null
  }

  type GetPredictionGroupByPayload<T extends PredictionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PredictionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PredictionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PredictionGroupByOutputType[P]>
            : GetScalarType<T[P], PredictionGroupByOutputType[P]>
        }
      >
    >


  export type PredictionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    creatorAddress?: boolean
    creatorName?: boolean
    creatorImage?: boolean
    content?: boolean
    category?: boolean
    status?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    resolvedAt?: boolean
    contractAddress?: boolean
    targetPrice?: boolean
    comparisonOperator?: boolean
    tokenSymbol?: boolean
    totalBetsTrue?: boolean
    totalBetsFalse?: boolean
    isPending?: boolean
    hasError?: boolean
    errorMessage?: boolean
    bets?: boolean | Prediction$betsArgs<ExtArgs>
    comments?: boolean | Prediction$commentsArgs<ExtArgs>
    likes?: boolean | Prediction$likesArgs<ExtArgs>
    _count?: boolean | PredictionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["prediction"]>

  export type PredictionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    creatorAddress?: boolean
    creatorName?: boolean
    creatorImage?: boolean
    content?: boolean
    category?: boolean
    status?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    resolvedAt?: boolean
    contractAddress?: boolean
    targetPrice?: boolean
    comparisonOperator?: boolean
    tokenSymbol?: boolean
    totalBetsTrue?: boolean
    totalBetsFalse?: boolean
    isPending?: boolean
    hasError?: boolean
    errorMessage?: boolean
  }, ExtArgs["result"]["prediction"]>

  export type PredictionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    creatorAddress?: boolean
    creatorName?: boolean
    creatorImage?: boolean
    content?: boolean
    category?: boolean
    status?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    resolvedAt?: boolean
    contractAddress?: boolean
    targetPrice?: boolean
    comparisonOperator?: boolean
    tokenSymbol?: boolean
    totalBetsTrue?: boolean
    totalBetsFalse?: boolean
    isPending?: boolean
    hasError?: boolean
    errorMessage?: boolean
  }, ExtArgs["result"]["prediction"]>

  export type PredictionSelectScalar = {
    id?: boolean
    creatorAddress?: boolean
    creatorName?: boolean
    creatorImage?: boolean
    content?: boolean
    category?: boolean
    status?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    resolvedAt?: boolean
    contractAddress?: boolean
    targetPrice?: boolean
    comparisonOperator?: boolean
    tokenSymbol?: boolean
    totalBetsTrue?: boolean
    totalBetsFalse?: boolean
    isPending?: boolean
    hasError?: boolean
    errorMessage?: boolean
  }

  export type PredictionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "creatorAddress" | "creatorName" | "creatorImage" | "content" | "category" | "status" | "createdAt" | "expiresAt" | "resolvedAt" | "contractAddress" | "targetPrice" | "comparisonOperator" | "tokenSymbol" | "totalBetsTrue" | "totalBetsFalse" | "isPending" | "hasError" | "errorMessage", ExtArgs["result"]["prediction"]>
  export type PredictionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bets?: boolean | Prediction$betsArgs<ExtArgs>
    comments?: boolean | Prediction$commentsArgs<ExtArgs>
    likes?: boolean | Prediction$likesArgs<ExtArgs>
    _count?: boolean | PredictionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PredictionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PredictionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PredictionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Prediction"
    objects: {
      bets: Prisma.$BetPayload<ExtArgs>[]
      comments: Prisma.$CommentPayload<ExtArgs>[]
      likes: Prisma.$LikePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      creatorAddress: string
      creatorName: string | null
      creatorImage: string | null
      content: string
      category: $Enums.PredictionCategory
      status: $Enums.PredictionStatus
      createdAt: Date
      expiresAt: Date
      resolvedAt: Date | null
      contractAddress: string | null
      targetPrice: string | null
      comparisonOperator: string | null
      tokenSymbol: string | null
      totalBetsTrue: number
      totalBetsFalse: number
      isPending: boolean
      hasError: boolean
      errorMessage: string | null
    }, ExtArgs["result"]["prediction"]>
    composites: {}
  }

  type PredictionGetPayload<S extends boolean | null | undefined | PredictionDefaultArgs> = $Result.GetResult<Prisma.$PredictionPayload, S>

  type PredictionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PredictionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PredictionCountAggregateInputType | true
    }

  export interface PredictionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Prediction'], meta: { name: 'Prediction' } }
    /**
     * Find zero or one Prediction that matches the filter.
     * @param {PredictionFindUniqueArgs} args - Arguments to find a Prediction
     * @example
     * // Get one Prediction
     * const prediction = await prisma.prediction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PredictionFindUniqueArgs>(args: SelectSubset<T, PredictionFindUniqueArgs<ExtArgs>>): Prisma__PredictionClient<$Result.GetResult<Prisma.$PredictionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Prediction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PredictionFindUniqueOrThrowArgs} args - Arguments to find a Prediction
     * @example
     * // Get one Prediction
     * const prediction = await prisma.prediction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PredictionFindUniqueOrThrowArgs>(args: SelectSubset<T, PredictionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PredictionClient<$Result.GetResult<Prisma.$PredictionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Prediction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictionFindFirstArgs} args - Arguments to find a Prediction
     * @example
     * // Get one Prediction
     * const prediction = await prisma.prediction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PredictionFindFirstArgs>(args?: SelectSubset<T, PredictionFindFirstArgs<ExtArgs>>): Prisma__PredictionClient<$Result.GetResult<Prisma.$PredictionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Prediction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictionFindFirstOrThrowArgs} args - Arguments to find a Prediction
     * @example
     * // Get one Prediction
     * const prediction = await prisma.prediction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PredictionFindFirstOrThrowArgs>(args?: SelectSubset<T, PredictionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PredictionClient<$Result.GetResult<Prisma.$PredictionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Predictions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Predictions
     * const predictions = await prisma.prediction.findMany()
     * 
     * // Get first 10 Predictions
     * const predictions = await prisma.prediction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const predictionWithIdOnly = await prisma.prediction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PredictionFindManyArgs>(args?: SelectSubset<T, PredictionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PredictionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Prediction.
     * @param {PredictionCreateArgs} args - Arguments to create a Prediction.
     * @example
     * // Create one Prediction
     * const Prediction = await prisma.prediction.create({
     *   data: {
     *     // ... data to create a Prediction
     *   }
     * })
     * 
     */
    create<T extends PredictionCreateArgs>(args: SelectSubset<T, PredictionCreateArgs<ExtArgs>>): Prisma__PredictionClient<$Result.GetResult<Prisma.$PredictionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Predictions.
     * @param {PredictionCreateManyArgs} args - Arguments to create many Predictions.
     * @example
     * // Create many Predictions
     * const prediction = await prisma.prediction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PredictionCreateManyArgs>(args?: SelectSubset<T, PredictionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Predictions and returns the data saved in the database.
     * @param {PredictionCreateManyAndReturnArgs} args - Arguments to create many Predictions.
     * @example
     * // Create many Predictions
     * const prediction = await prisma.prediction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Predictions and only return the `id`
     * const predictionWithIdOnly = await prisma.prediction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PredictionCreateManyAndReturnArgs>(args?: SelectSubset<T, PredictionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PredictionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Prediction.
     * @param {PredictionDeleteArgs} args - Arguments to delete one Prediction.
     * @example
     * // Delete one Prediction
     * const Prediction = await prisma.prediction.delete({
     *   where: {
     *     // ... filter to delete one Prediction
     *   }
     * })
     * 
     */
    delete<T extends PredictionDeleteArgs>(args: SelectSubset<T, PredictionDeleteArgs<ExtArgs>>): Prisma__PredictionClient<$Result.GetResult<Prisma.$PredictionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Prediction.
     * @param {PredictionUpdateArgs} args - Arguments to update one Prediction.
     * @example
     * // Update one Prediction
     * const prediction = await prisma.prediction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PredictionUpdateArgs>(args: SelectSubset<T, PredictionUpdateArgs<ExtArgs>>): Prisma__PredictionClient<$Result.GetResult<Prisma.$PredictionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Predictions.
     * @param {PredictionDeleteManyArgs} args - Arguments to filter Predictions to delete.
     * @example
     * // Delete a few Predictions
     * const { count } = await prisma.prediction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PredictionDeleteManyArgs>(args?: SelectSubset<T, PredictionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Predictions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Predictions
     * const prediction = await prisma.prediction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PredictionUpdateManyArgs>(args: SelectSubset<T, PredictionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Predictions and returns the data updated in the database.
     * @param {PredictionUpdateManyAndReturnArgs} args - Arguments to update many Predictions.
     * @example
     * // Update many Predictions
     * const prediction = await prisma.prediction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Predictions and only return the `id`
     * const predictionWithIdOnly = await prisma.prediction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PredictionUpdateManyAndReturnArgs>(args: SelectSubset<T, PredictionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PredictionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Prediction.
     * @param {PredictionUpsertArgs} args - Arguments to update or create a Prediction.
     * @example
     * // Update or create a Prediction
     * const prediction = await prisma.prediction.upsert({
     *   create: {
     *     // ... data to create a Prediction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Prediction we want to update
     *   }
     * })
     */
    upsert<T extends PredictionUpsertArgs>(args: SelectSubset<T, PredictionUpsertArgs<ExtArgs>>): Prisma__PredictionClient<$Result.GetResult<Prisma.$PredictionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Predictions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictionCountArgs} args - Arguments to filter Predictions to count.
     * @example
     * // Count the number of Predictions
     * const count = await prisma.prediction.count({
     *   where: {
     *     // ... the filter for the Predictions we want to count
     *   }
     * })
    **/
    count<T extends PredictionCountArgs>(
      args?: Subset<T, PredictionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PredictionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Prediction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PredictionAggregateArgs>(args: Subset<T, PredictionAggregateArgs>): Prisma.PrismaPromise<GetPredictionAggregateType<T>>

    /**
     * Group by Prediction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PredictionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PredictionGroupByArgs['orderBy'] }
        : { orderBy?: PredictionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PredictionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPredictionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Prediction model
   */
  readonly fields: PredictionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Prediction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PredictionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bets<T extends Prediction$betsArgs<ExtArgs> = {}>(args?: Subset<T, Prediction$betsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comments<T extends Prediction$commentsArgs<ExtArgs> = {}>(args?: Subset<T, Prediction$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    likes<T extends Prediction$likesArgs<ExtArgs> = {}>(args?: Subset<T, Prediction$likesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Prediction model
   */
  interface PredictionFieldRefs {
    readonly id: FieldRef<"Prediction", 'String'>
    readonly creatorAddress: FieldRef<"Prediction", 'String'>
    readonly creatorName: FieldRef<"Prediction", 'String'>
    readonly creatorImage: FieldRef<"Prediction", 'String'>
    readonly content: FieldRef<"Prediction", 'String'>
    readonly category: FieldRef<"Prediction", 'PredictionCategory'>
    readonly status: FieldRef<"Prediction", 'PredictionStatus'>
    readonly createdAt: FieldRef<"Prediction", 'DateTime'>
    readonly expiresAt: FieldRef<"Prediction", 'DateTime'>
    readonly resolvedAt: FieldRef<"Prediction", 'DateTime'>
    readonly contractAddress: FieldRef<"Prediction", 'String'>
    readonly targetPrice: FieldRef<"Prediction", 'String'>
    readonly comparisonOperator: FieldRef<"Prediction", 'String'>
    readonly tokenSymbol: FieldRef<"Prediction", 'String'>
    readonly totalBetsTrue: FieldRef<"Prediction", 'Float'>
    readonly totalBetsFalse: FieldRef<"Prediction", 'Float'>
    readonly isPending: FieldRef<"Prediction", 'Boolean'>
    readonly hasError: FieldRef<"Prediction", 'Boolean'>
    readonly errorMessage: FieldRef<"Prediction", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Prediction findUnique
   */
  export type PredictionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prediction
     */
    select?: PredictionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prediction
     */
    omit?: PredictionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionInclude<ExtArgs> | null
    /**
     * Filter, which Prediction to fetch.
     */
    where: PredictionWhereUniqueInput
  }

  /**
   * Prediction findUniqueOrThrow
   */
  export type PredictionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prediction
     */
    select?: PredictionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prediction
     */
    omit?: PredictionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionInclude<ExtArgs> | null
    /**
     * Filter, which Prediction to fetch.
     */
    where: PredictionWhereUniqueInput
  }

  /**
   * Prediction findFirst
   */
  export type PredictionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prediction
     */
    select?: PredictionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prediction
     */
    omit?: PredictionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionInclude<ExtArgs> | null
    /**
     * Filter, which Prediction to fetch.
     */
    where?: PredictionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Predictions to fetch.
     */
    orderBy?: PredictionOrderByWithRelationInput | PredictionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Predictions.
     */
    cursor?: PredictionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Predictions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Predictions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Predictions.
     */
    distinct?: PredictionScalarFieldEnum | PredictionScalarFieldEnum[]
  }

  /**
   * Prediction findFirstOrThrow
   */
  export type PredictionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prediction
     */
    select?: PredictionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prediction
     */
    omit?: PredictionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionInclude<ExtArgs> | null
    /**
     * Filter, which Prediction to fetch.
     */
    where?: PredictionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Predictions to fetch.
     */
    orderBy?: PredictionOrderByWithRelationInput | PredictionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Predictions.
     */
    cursor?: PredictionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Predictions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Predictions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Predictions.
     */
    distinct?: PredictionScalarFieldEnum | PredictionScalarFieldEnum[]
  }

  /**
   * Prediction findMany
   */
  export type PredictionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prediction
     */
    select?: PredictionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prediction
     */
    omit?: PredictionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionInclude<ExtArgs> | null
    /**
     * Filter, which Predictions to fetch.
     */
    where?: PredictionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Predictions to fetch.
     */
    orderBy?: PredictionOrderByWithRelationInput | PredictionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Predictions.
     */
    cursor?: PredictionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Predictions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Predictions.
     */
    skip?: number
    distinct?: PredictionScalarFieldEnum | PredictionScalarFieldEnum[]
  }

  /**
   * Prediction create
   */
  export type PredictionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prediction
     */
    select?: PredictionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prediction
     */
    omit?: PredictionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionInclude<ExtArgs> | null
    /**
     * The data needed to create a Prediction.
     */
    data: XOR<PredictionCreateInput, PredictionUncheckedCreateInput>
  }

  /**
   * Prediction createMany
   */
  export type PredictionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Predictions.
     */
    data: PredictionCreateManyInput | PredictionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Prediction createManyAndReturn
   */
  export type PredictionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prediction
     */
    select?: PredictionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Prediction
     */
    omit?: PredictionOmit<ExtArgs> | null
    /**
     * The data used to create many Predictions.
     */
    data: PredictionCreateManyInput | PredictionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Prediction update
   */
  export type PredictionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prediction
     */
    select?: PredictionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prediction
     */
    omit?: PredictionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionInclude<ExtArgs> | null
    /**
     * The data needed to update a Prediction.
     */
    data: XOR<PredictionUpdateInput, PredictionUncheckedUpdateInput>
    /**
     * Choose, which Prediction to update.
     */
    where: PredictionWhereUniqueInput
  }

  /**
   * Prediction updateMany
   */
  export type PredictionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Predictions.
     */
    data: XOR<PredictionUpdateManyMutationInput, PredictionUncheckedUpdateManyInput>
    /**
     * Filter which Predictions to update
     */
    where?: PredictionWhereInput
    /**
     * Limit how many Predictions to update.
     */
    limit?: number
  }

  /**
   * Prediction updateManyAndReturn
   */
  export type PredictionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prediction
     */
    select?: PredictionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Prediction
     */
    omit?: PredictionOmit<ExtArgs> | null
    /**
     * The data used to update Predictions.
     */
    data: XOR<PredictionUpdateManyMutationInput, PredictionUncheckedUpdateManyInput>
    /**
     * Filter which Predictions to update
     */
    where?: PredictionWhereInput
    /**
     * Limit how many Predictions to update.
     */
    limit?: number
  }

  /**
   * Prediction upsert
   */
  export type PredictionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prediction
     */
    select?: PredictionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prediction
     */
    omit?: PredictionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionInclude<ExtArgs> | null
    /**
     * The filter to search for the Prediction to update in case it exists.
     */
    where: PredictionWhereUniqueInput
    /**
     * In case the Prediction found by the `where` argument doesn't exist, create a new Prediction with this data.
     */
    create: XOR<PredictionCreateInput, PredictionUncheckedCreateInput>
    /**
     * In case the Prediction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PredictionUpdateInput, PredictionUncheckedUpdateInput>
  }

  /**
   * Prediction delete
   */
  export type PredictionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prediction
     */
    select?: PredictionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prediction
     */
    omit?: PredictionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionInclude<ExtArgs> | null
    /**
     * Filter which Prediction to delete.
     */
    where: PredictionWhereUniqueInput
  }

  /**
   * Prediction deleteMany
   */
  export type PredictionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Predictions to delete
     */
    where?: PredictionWhereInput
    /**
     * Limit how many Predictions to delete.
     */
    limit?: number
  }

  /**
   * Prediction.bets
   */
  export type Prediction$betsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bet
     */
    select?: BetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bet
     */
    omit?: BetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BetInclude<ExtArgs> | null
    where?: BetWhereInput
    orderBy?: BetOrderByWithRelationInput | BetOrderByWithRelationInput[]
    cursor?: BetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BetScalarFieldEnum | BetScalarFieldEnum[]
  }

  /**
   * Prediction.comments
   */
  export type Prediction$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Prediction.likes
   */
  export type Prediction$likesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    where?: LikeWhereInput
    orderBy?: LikeOrderByWithRelationInput | LikeOrderByWithRelationInput[]
    cursor?: LikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LikeScalarFieldEnum | LikeScalarFieldEnum[]
  }

  /**
   * Prediction without action
   */
  export type PredictionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prediction
     */
    select?: PredictionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prediction
     */
    omit?: PredictionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PredictionInclude<ExtArgs> | null
  }


  /**
   * Model Bet
   */

  export type AggregateBet = {
    _count: BetCountAggregateOutputType | null
    _avg: BetAvgAggregateOutputType | null
    _sum: BetSumAggregateOutputType | null
    _min: BetMinAggregateOutputType | null
    _max: BetMaxAggregateOutputType | null
  }

  export type BetAvgAggregateOutputType = {
    amount: number | null
  }

  export type BetSumAggregateOutputType = {
    amount: number | null
  }

  export type BetMinAggregateOutputType = {
    id: string | null
    predictionId: string | null
    userAddress: string | null
    userName: string | null
    userImage: string | null
    amount: number | null
    position: boolean | null
    createdAt: Date | null
    transactionHash: string | null
  }

  export type BetMaxAggregateOutputType = {
    id: string | null
    predictionId: string | null
    userAddress: string | null
    userName: string | null
    userImage: string | null
    amount: number | null
    position: boolean | null
    createdAt: Date | null
    transactionHash: string | null
  }

  export type BetCountAggregateOutputType = {
    id: number
    predictionId: number
    userAddress: number
    userName: number
    userImage: number
    amount: number
    position: number
    createdAt: number
    transactionHash: number
    _all: number
  }


  export type BetAvgAggregateInputType = {
    amount?: true
  }

  export type BetSumAggregateInputType = {
    amount?: true
  }

  export type BetMinAggregateInputType = {
    id?: true
    predictionId?: true
    userAddress?: true
    userName?: true
    userImage?: true
    amount?: true
    position?: true
    createdAt?: true
    transactionHash?: true
  }

  export type BetMaxAggregateInputType = {
    id?: true
    predictionId?: true
    userAddress?: true
    userName?: true
    userImage?: true
    amount?: true
    position?: true
    createdAt?: true
    transactionHash?: true
  }

  export type BetCountAggregateInputType = {
    id?: true
    predictionId?: true
    userAddress?: true
    userName?: true
    userImage?: true
    amount?: true
    position?: true
    createdAt?: true
    transactionHash?: true
    _all?: true
  }

  export type BetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bet to aggregate.
     */
    where?: BetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bets to fetch.
     */
    orderBy?: BetOrderByWithRelationInput | BetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bets
    **/
    _count?: true | BetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BetMaxAggregateInputType
  }

  export type GetBetAggregateType<T extends BetAggregateArgs> = {
        [P in keyof T & keyof AggregateBet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBet[P]>
      : GetScalarType<T[P], AggregateBet[P]>
  }




  export type BetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BetWhereInput
    orderBy?: BetOrderByWithAggregationInput | BetOrderByWithAggregationInput[]
    by: BetScalarFieldEnum[] | BetScalarFieldEnum
    having?: BetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BetCountAggregateInputType | true
    _avg?: BetAvgAggregateInputType
    _sum?: BetSumAggregateInputType
    _min?: BetMinAggregateInputType
    _max?: BetMaxAggregateInputType
  }

  export type BetGroupByOutputType = {
    id: string
    predictionId: string
    userAddress: string
    userName: string | null
    userImage: string | null
    amount: number
    position: boolean
    createdAt: Date
    transactionHash: string | null
    _count: BetCountAggregateOutputType | null
    _avg: BetAvgAggregateOutputType | null
    _sum: BetSumAggregateOutputType | null
    _min: BetMinAggregateOutputType | null
    _max: BetMaxAggregateOutputType | null
  }

  type GetBetGroupByPayload<T extends BetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BetGroupByOutputType[P]>
            : GetScalarType<T[P], BetGroupByOutputType[P]>
        }
      >
    >


  export type BetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    predictionId?: boolean
    userAddress?: boolean
    userName?: boolean
    userImage?: boolean
    amount?: boolean
    position?: boolean
    createdAt?: boolean
    transactionHash?: boolean
    prediction?: boolean | PredictionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bet"]>

  export type BetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    predictionId?: boolean
    userAddress?: boolean
    userName?: boolean
    userImage?: boolean
    amount?: boolean
    position?: boolean
    createdAt?: boolean
    transactionHash?: boolean
    prediction?: boolean | PredictionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bet"]>

  export type BetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    predictionId?: boolean
    userAddress?: boolean
    userName?: boolean
    userImage?: boolean
    amount?: boolean
    position?: boolean
    createdAt?: boolean
    transactionHash?: boolean
    prediction?: boolean | PredictionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bet"]>

  export type BetSelectScalar = {
    id?: boolean
    predictionId?: boolean
    userAddress?: boolean
    userName?: boolean
    userImage?: boolean
    amount?: boolean
    position?: boolean
    createdAt?: boolean
    transactionHash?: boolean
  }

  export type BetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "predictionId" | "userAddress" | "userName" | "userImage" | "amount" | "position" | "createdAt" | "transactionHash", ExtArgs["result"]["bet"]>
  export type BetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    prediction?: boolean | PredictionDefaultArgs<ExtArgs>
  }
  export type BetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    prediction?: boolean | PredictionDefaultArgs<ExtArgs>
  }
  export type BetIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    prediction?: boolean | PredictionDefaultArgs<ExtArgs>
  }

  export type $BetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Bet"
    objects: {
      prediction: Prisma.$PredictionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      predictionId: string
      userAddress: string
      userName: string | null
      userImage: string | null
      amount: number
      position: boolean
      createdAt: Date
      transactionHash: string | null
    }, ExtArgs["result"]["bet"]>
    composites: {}
  }

  type BetGetPayload<S extends boolean | null | undefined | BetDefaultArgs> = $Result.GetResult<Prisma.$BetPayload, S>

  type BetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BetCountAggregateInputType | true
    }

  export interface BetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Bet'], meta: { name: 'Bet' } }
    /**
     * Find zero or one Bet that matches the filter.
     * @param {BetFindUniqueArgs} args - Arguments to find a Bet
     * @example
     * // Get one Bet
     * const bet = await prisma.bet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BetFindUniqueArgs>(args: SelectSubset<T, BetFindUniqueArgs<ExtArgs>>): Prisma__BetClient<$Result.GetResult<Prisma.$BetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Bet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BetFindUniqueOrThrowArgs} args - Arguments to find a Bet
     * @example
     * // Get one Bet
     * const bet = await prisma.bet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BetFindUniqueOrThrowArgs>(args: SelectSubset<T, BetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BetClient<$Result.GetResult<Prisma.$BetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BetFindFirstArgs} args - Arguments to find a Bet
     * @example
     * // Get one Bet
     * const bet = await prisma.bet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BetFindFirstArgs>(args?: SelectSubset<T, BetFindFirstArgs<ExtArgs>>): Prisma__BetClient<$Result.GetResult<Prisma.$BetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BetFindFirstOrThrowArgs} args - Arguments to find a Bet
     * @example
     * // Get one Bet
     * const bet = await prisma.bet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BetFindFirstOrThrowArgs>(args?: SelectSubset<T, BetFindFirstOrThrowArgs<ExtArgs>>): Prisma__BetClient<$Result.GetResult<Prisma.$BetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bets
     * const bets = await prisma.bet.findMany()
     * 
     * // Get first 10 Bets
     * const bets = await prisma.bet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const betWithIdOnly = await prisma.bet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BetFindManyArgs>(args?: SelectSubset<T, BetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Bet.
     * @param {BetCreateArgs} args - Arguments to create a Bet.
     * @example
     * // Create one Bet
     * const Bet = await prisma.bet.create({
     *   data: {
     *     // ... data to create a Bet
     *   }
     * })
     * 
     */
    create<T extends BetCreateArgs>(args: SelectSubset<T, BetCreateArgs<ExtArgs>>): Prisma__BetClient<$Result.GetResult<Prisma.$BetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bets.
     * @param {BetCreateManyArgs} args - Arguments to create many Bets.
     * @example
     * // Create many Bets
     * const bet = await prisma.bet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BetCreateManyArgs>(args?: SelectSubset<T, BetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bets and returns the data saved in the database.
     * @param {BetCreateManyAndReturnArgs} args - Arguments to create many Bets.
     * @example
     * // Create many Bets
     * const bet = await prisma.bet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bets and only return the `id`
     * const betWithIdOnly = await prisma.bet.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BetCreateManyAndReturnArgs>(args?: SelectSubset<T, BetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Bet.
     * @param {BetDeleteArgs} args - Arguments to delete one Bet.
     * @example
     * // Delete one Bet
     * const Bet = await prisma.bet.delete({
     *   where: {
     *     // ... filter to delete one Bet
     *   }
     * })
     * 
     */
    delete<T extends BetDeleteArgs>(args: SelectSubset<T, BetDeleteArgs<ExtArgs>>): Prisma__BetClient<$Result.GetResult<Prisma.$BetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Bet.
     * @param {BetUpdateArgs} args - Arguments to update one Bet.
     * @example
     * // Update one Bet
     * const bet = await prisma.bet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BetUpdateArgs>(args: SelectSubset<T, BetUpdateArgs<ExtArgs>>): Prisma__BetClient<$Result.GetResult<Prisma.$BetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bets.
     * @param {BetDeleteManyArgs} args - Arguments to filter Bets to delete.
     * @example
     * // Delete a few Bets
     * const { count } = await prisma.bet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BetDeleteManyArgs>(args?: SelectSubset<T, BetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bets
     * const bet = await prisma.bet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BetUpdateManyArgs>(args: SelectSubset<T, BetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bets and returns the data updated in the database.
     * @param {BetUpdateManyAndReturnArgs} args - Arguments to update many Bets.
     * @example
     * // Update many Bets
     * const bet = await prisma.bet.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bets and only return the `id`
     * const betWithIdOnly = await prisma.bet.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BetUpdateManyAndReturnArgs>(args: SelectSubset<T, BetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Bet.
     * @param {BetUpsertArgs} args - Arguments to update or create a Bet.
     * @example
     * // Update or create a Bet
     * const bet = await prisma.bet.upsert({
     *   create: {
     *     // ... data to create a Bet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bet we want to update
     *   }
     * })
     */
    upsert<T extends BetUpsertArgs>(args: SelectSubset<T, BetUpsertArgs<ExtArgs>>): Prisma__BetClient<$Result.GetResult<Prisma.$BetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BetCountArgs} args - Arguments to filter Bets to count.
     * @example
     * // Count the number of Bets
     * const count = await prisma.bet.count({
     *   where: {
     *     // ... the filter for the Bets we want to count
     *   }
     * })
    **/
    count<T extends BetCountArgs>(
      args?: Subset<T, BetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BetAggregateArgs>(args: Subset<T, BetAggregateArgs>): Prisma.PrismaPromise<GetBetAggregateType<T>>

    /**
     * Group by Bet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BetGroupByArgs['orderBy'] }
        : { orderBy?: BetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Bet model
   */
  readonly fields: BetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Bet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    prediction<T extends PredictionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PredictionDefaultArgs<ExtArgs>>): Prisma__PredictionClient<$Result.GetResult<Prisma.$PredictionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Bet model
   */
  interface BetFieldRefs {
    readonly id: FieldRef<"Bet", 'String'>
    readonly predictionId: FieldRef<"Bet", 'String'>
    readonly userAddress: FieldRef<"Bet", 'String'>
    readonly userName: FieldRef<"Bet", 'String'>
    readonly userImage: FieldRef<"Bet", 'String'>
    readonly amount: FieldRef<"Bet", 'Float'>
    readonly position: FieldRef<"Bet", 'Boolean'>
    readonly createdAt: FieldRef<"Bet", 'DateTime'>
    readonly transactionHash: FieldRef<"Bet", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Bet findUnique
   */
  export type BetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bet
     */
    select?: BetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bet
     */
    omit?: BetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BetInclude<ExtArgs> | null
    /**
     * Filter, which Bet to fetch.
     */
    where: BetWhereUniqueInput
  }

  /**
   * Bet findUniqueOrThrow
   */
  export type BetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bet
     */
    select?: BetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bet
     */
    omit?: BetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BetInclude<ExtArgs> | null
    /**
     * Filter, which Bet to fetch.
     */
    where: BetWhereUniqueInput
  }

  /**
   * Bet findFirst
   */
  export type BetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bet
     */
    select?: BetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bet
     */
    omit?: BetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BetInclude<ExtArgs> | null
    /**
     * Filter, which Bet to fetch.
     */
    where?: BetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bets to fetch.
     */
    orderBy?: BetOrderByWithRelationInput | BetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bets.
     */
    cursor?: BetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bets.
     */
    distinct?: BetScalarFieldEnum | BetScalarFieldEnum[]
  }

  /**
   * Bet findFirstOrThrow
   */
  export type BetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bet
     */
    select?: BetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bet
     */
    omit?: BetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BetInclude<ExtArgs> | null
    /**
     * Filter, which Bet to fetch.
     */
    where?: BetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bets to fetch.
     */
    orderBy?: BetOrderByWithRelationInput | BetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bets.
     */
    cursor?: BetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bets.
     */
    distinct?: BetScalarFieldEnum | BetScalarFieldEnum[]
  }

  /**
   * Bet findMany
   */
  export type BetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bet
     */
    select?: BetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bet
     */
    omit?: BetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BetInclude<ExtArgs> | null
    /**
     * Filter, which Bets to fetch.
     */
    where?: BetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bets to fetch.
     */
    orderBy?: BetOrderByWithRelationInput | BetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bets.
     */
    cursor?: BetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bets.
     */
    skip?: number
    distinct?: BetScalarFieldEnum | BetScalarFieldEnum[]
  }

  /**
   * Bet create
   */
  export type BetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bet
     */
    select?: BetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bet
     */
    omit?: BetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BetInclude<ExtArgs> | null
    /**
     * The data needed to create a Bet.
     */
    data: XOR<BetCreateInput, BetUncheckedCreateInput>
  }

  /**
   * Bet createMany
   */
  export type BetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bets.
     */
    data: BetCreateManyInput | BetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Bet createManyAndReturn
   */
  export type BetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bet
     */
    select?: BetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Bet
     */
    omit?: BetOmit<ExtArgs> | null
    /**
     * The data used to create many Bets.
     */
    data: BetCreateManyInput | BetCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BetIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Bet update
   */
  export type BetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bet
     */
    select?: BetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bet
     */
    omit?: BetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BetInclude<ExtArgs> | null
    /**
     * The data needed to update a Bet.
     */
    data: XOR<BetUpdateInput, BetUncheckedUpdateInput>
    /**
     * Choose, which Bet to update.
     */
    where: BetWhereUniqueInput
  }

  /**
   * Bet updateMany
   */
  export type BetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bets.
     */
    data: XOR<BetUpdateManyMutationInput, BetUncheckedUpdateManyInput>
    /**
     * Filter which Bets to update
     */
    where?: BetWhereInput
    /**
     * Limit how many Bets to update.
     */
    limit?: number
  }

  /**
   * Bet updateManyAndReturn
   */
  export type BetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bet
     */
    select?: BetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Bet
     */
    omit?: BetOmit<ExtArgs> | null
    /**
     * The data used to update Bets.
     */
    data: XOR<BetUpdateManyMutationInput, BetUncheckedUpdateManyInput>
    /**
     * Filter which Bets to update
     */
    where?: BetWhereInput
    /**
     * Limit how many Bets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BetIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Bet upsert
   */
  export type BetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bet
     */
    select?: BetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bet
     */
    omit?: BetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BetInclude<ExtArgs> | null
    /**
     * The filter to search for the Bet to update in case it exists.
     */
    where: BetWhereUniqueInput
    /**
     * In case the Bet found by the `where` argument doesn't exist, create a new Bet with this data.
     */
    create: XOR<BetCreateInput, BetUncheckedCreateInput>
    /**
     * In case the Bet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BetUpdateInput, BetUncheckedUpdateInput>
  }

  /**
   * Bet delete
   */
  export type BetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bet
     */
    select?: BetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bet
     */
    omit?: BetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BetInclude<ExtArgs> | null
    /**
     * Filter which Bet to delete.
     */
    where: BetWhereUniqueInput
  }

  /**
   * Bet deleteMany
   */
  export type BetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bets to delete
     */
    where?: BetWhereInput
    /**
     * Limit how many Bets to delete.
     */
    limit?: number
  }

  /**
   * Bet without action
   */
  export type BetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bet
     */
    select?: BetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bet
     */
    omit?: BetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BetInclude<ExtArgs> | null
  }


  /**
   * Model Comment
   */

  export type AggregateComment = {
    _count: CommentCountAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  export type CommentMinAggregateOutputType = {
    id: string | null
    predictionId: string | null
    userAddress: string | null
    userName: string | null
    userImage: string | null
    content: string | null
    createdAt: Date | null
  }

  export type CommentMaxAggregateOutputType = {
    id: string | null
    predictionId: string | null
    userAddress: string | null
    userName: string | null
    userImage: string | null
    content: string | null
    createdAt: Date | null
  }

  export type CommentCountAggregateOutputType = {
    id: number
    predictionId: number
    userAddress: number
    userName: number
    userImage: number
    content: number
    createdAt: number
    _all: number
  }


  export type CommentMinAggregateInputType = {
    id?: true
    predictionId?: true
    userAddress?: true
    userName?: true
    userImage?: true
    content?: true
    createdAt?: true
  }

  export type CommentMaxAggregateInputType = {
    id?: true
    predictionId?: true
    userAddress?: true
    userName?: true
    userImage?: true
    content?: true
    createdAt?: true
  }

  export type CommentCountAggregateInputType = {
    id?: true
    predictionId?: true
    userAddress?: true
    userName?: true
    userImage?: true
    content?: true
    createdAt?: true
    _all?: true
  }

  export type CommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comment to aggregate.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Comments
    **/
    _count?: true | CommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommentMaxAggregateInputType
  }

  export type GetCommentAggregateType<T extends CommentAggregateArgs> = {
        [P in keyof T & keyof AggregateComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComment[P]>
      : GetScalarType<T[P], AggregateComment[P]>
  }




  export type CommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithAggregationInput | CommentOrderByWithAggregationInput[]
    by: CommentScalarFieldEnum[] | CommentScalarFieldEnum
    having?: CommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentCountAggregateInputType | true
    _min?: CommentMinAggregateInputType
    _max?: CommentMaxAggregateInputType
  }

  export type CommentGroupByOutputType = {
    id: string
    predictionId: string
    userAddress: string
    userName: string | null
    userImage: string | null
    content: string
    createdAt: Date
    _count: CommentCountAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  type GetCommentGroupByPayload<T extends CommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommentGroupByOutputType[P]>
            : GetScalarType<T[P], CommentGroupByOutputType[P]>
        }
      >
    >


  export type CommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    predictionId?: boolean
    userAddress?: boolean
    userName?: boolean
    userImage?: boolean
    content?: boolean
    createdAt?: boolean
    prediction?: boolean | PredictionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    predictionId?: boolean
    userAddress?: boolean
    userName?: boolean
    userImage?: boolean
    content?: boolean
    createdAt?: boolean
    prediction?: boolean | PredictionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    predictionId?: boolean
    userAddress?: boolean
    userName?: boolean
    userImage?: boolean
    content?: boolean
    createdAt?: boolean
    prediction?: boolean | PredictionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectScalar = {
    id?: boolean
    predictionId?: boolean
    userAddress?: boolean
    userName?: boolean
    userImage?: boolean
    content?: boolean
    createdAt?: boolean
  }

  export type CommentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "predictionId" | "userAddress" | "userName" | "userImage" | "content" | "createdAt", ExtArgs["result"]["comment"]>
  export type CommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    prediction?: boolean | PredictionDefaultArgs<ExtArgs>
  }
  export type CommentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    prediction?: boolean | PredictionDefaultArgs<ExtArgs>
  }
  export type CommentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    prediction?: boolean | PredictionDefaultArgs<ExtArgs>
  }

  export type $CommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Comment"
    objects: {
      prediction: Prisma.$PredictionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      predictionId: string
      userAddress: string
      userName: string | null
      userImage: string | null
      content: string
      createdAt: Date
    }, ExtArgs["result"]["comment"]>
    composites: {}
  }

  type CommentGetPayload<S extends boolean | null | undefined | CommentDefaultArgs> = $Result.GetResult<Prisma.$CommentPayload, S>

  type CommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommentCountAggregateInputType | true
    }

  export interface CommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Comment'], meta: { name: 'Comment' } }
    /**
     * Find zero or one Comment that matches the filter.
     * @param {CommentFindUniqueArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommentFindUniqueArgs>(args: SelectSubset<T, CommentFindUniqueArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Comment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommentFindUniqueOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommentFindUniqueOrThrowArgs>(args: SelectSubset<T, CommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommentFindFirstArgs>(args?: SelectSubset<T, CommentFindFirstArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommentFindFirstOrThrowArgs>(args?: SelectSubset<T, CommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Comments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comments
     * const comments = await prisma.comment.findMany()
     * 
     * // Get first 10 Comments
     * const comments = await prisma.comment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commentWithIdOnly = await prisma.comment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommentFindManyArgs>(args?: SelectSubset<T, CommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Comment.
     * @param {CommentCreateArgs} args - Arguments to create a Comment.
     * @example
     * // Create one Comment
     * const Comment = await prisma.comment.create({
     *   data: {
     *     // ... data to create a Comment
     *   }
     * })
     * 
     */
    create<T extends CommentCreateArgs>(args: SelectSubset<T, CommentCreateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Comments.
     * @param {CommentCreateManyArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommentCreateManyArgs>(args?: SelectSubset<T, CommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Comments and returns the data saved in the database.
     * @param {CommentCreateManyAndReturnArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Comments and only return the `id`
     * const commentWithIdOnly = await prisma.comment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommentCreateManyAndReturnArgs>(args?: SelectSubset<T, CommentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Comment.
     * @param {CommentDeleteArgs} args - Arguments to delete one Comment.
     * @example
     * // Delete one Comment
     * const Comment = await prisma.comment.delete({
     *   where: {
     *     // ... filter to delete one Comment
     *   }
     * })
     * 
     */
    delete<T extends CommentDeleteArgs>(args: SelectSubset<T, CommentDeleteArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Comment.
     * @param {CommentUpdateArgs} args - Arguments to update one Comment.
     * @example
     * // Update one Comment
     * const comment = await prisma.comment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommentUpdateArgs>(args: SelectSubset<T, CommentUpdateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Comments.
     * @param {CommentDeleteManyArgs} args - Arguments to filter Comments to delete.
     * @example
     * // Delete a few Comments
     * const { count } = await prisma.comment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommentDeleteManyArgs>(args?: SelectSubset<T, CommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommentUpdateManyArgs>(args: SelectSubset<T, CommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments and returns the data updated in the database.
     * @param {CommentUpdateManyAndReturnArgs} args - Arguments to update many Comments.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Comments and only return the `id`
     * const commentWithIdOnly = await prisma.comment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CommentUpdateManyAndReturnArgs>(args: SelectSubset<T, CommentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Comment.
     * @param {CommentUpsertArgs} args - Arguments to update or create a Comment.
     * @example
     * // Update or create a Comment
     * const comment = await prisma.comment.upsert({
     *   create: {
     *     // ... data to create a Comment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comment we want to update
     *   }
     * })
     */
    upsert<T extends CommentUpsertArgs>(args: SelectSubset<T, CommentUpsertArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentCountArgs} args - Arguments to filter Comments to count.
     * @example
     * // Count the number of Comments
     * const count = await prisma.comment.count({
     *   where: {
     *     // ... the filter for the Comments we want to count
     *   }
     * })
    **/
    count<T extends CommentCountArgs>(
      args?: Subset<T, CommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommentAggregateArgs>(args: Subset<T, CommentAggregateArgs>): Prisma.PrismaPromise<GetCommentAggregateType<T>>

    /**
     * Group by Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommentGroupByArgs['orderBy'] }
        : { orderBy?: CommentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Comment model
   */
  readonly fields: CommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Comment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    prediction<T extends PredictionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PredictionDefaultArgs<ExtArgs>>): Prisma__PredictionClient<$Result.GetResult<Prisma.$PredictionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Comment model
   */
  interface CommentFieldRefs {
    readonly id: FieldRef<"Comment", 'String'>
    readonly predictionId: FieldRef<"Comment", 'String'>
    readonly userAddress: FieldRef<"Comment", 'String'>
    readonly userName: FieldRef<"Comment", 'String'>
    readonly userImage: FieldRef<"Comment", 'String'>
    readonly content: FieldRef<"Comment", 'String'>
    readonly createdAt: FieldRef<"Comment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Comment findUnique
   */
  export type CommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findUniqueOrThrow
   */
  export type CommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findFirst
   */
  export type CommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findFirstOrThrow
   */
  export type CommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findMany
   */
  export type CommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comments to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment create
   */
  export type CommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to create a Comment.
     */
    data: XOR<CommentCreateInput, CommentUncheckedCreateInput>
  }

  /**
   * Comment createMany
   */
  export type CommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Comment createManyAndReturn
   */
  export type CommentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comment update
   */
  export type CommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to update a Comment.
     */
    data: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
    /**
     * Choose, which Comment to update.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment updateMany
   */
  export type CommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Comments.
     */
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    /**
     * Filter which Comments to update
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to update.
     */
    limit?: number
  }

  /**
   * Comment updateManyAndReturn
   */
  export type CommentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * The data used to update Comments.
     */
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    /**
     * Filter which Comments to update
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comment upsert
   */
  export type CommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The filter to search for the Comment to update in case it exists.
     */
    where: CommentWhereUniqueInput
    /**
     * In case the Comment found by the `where` argument doesn't exist, create a new Comment with this data.
     */
    create: XOR<CommentCreateInput, CommentUncheckedCreateInput>
    /**
     * In case the Comment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
  }

  /**
   * Comment delete
   */
  export type CommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter which Comment to delete.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment deleteMany
   */
  export type CommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comments to delete
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to delete.
     */
    limit?: number
  }

  /**
   * Comment without action
   */
  export type CommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
  }


  /**
   * Model Like
   */

  export type AggregateLike = {
    _count: LikeCountAggregateOutputType | null
    _min: LikeMinAggregateOutputType | null
    _max: LikeMaxAggregateOutputType | null
  }

  export type LikeMinAggregateOutputType = {
    id: string | null
    predictionId: string | null
    userAddress: string | null
    userName: string | null
    userImage: string | null
    createdAt: Date | null
  }

  export type LikeMaxAggregateOutputType = {
    id: string | null
    predictionId: string | null
    userAddress: string | null
    userName: string | null
    userImage: string | null
    createdAt: Date | null
  }

  export type LikeCountAggregateOutputType = {
    id: number
    predictionId: number
    userAddress: number
    userName: number
    userImage: number
    createdAt: number
    _all: number
  }


  export type LikeMinAggregateInputType = {
    id?: true
    predictionId?: true
    userAddress?: true
    userName?: true
    userImage?: true
    createdAt?: true
  }

  export type LikeMaxAggregateInputType = {
    id?: true
    predictionId?: true
    userAddress?: true
    userName?: true
    userImage?: true
    createdAt?: true
  }

  export type LikeCountAggregateInputType = {
    id?: true
    predictionId?: true
    userAddress?: true
    userName?: true
    userImage?: true
    createdAt?: true
    _all?: true
  }

  export type LikeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Like to aggregate.
     */
    where?: LikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Likes to fetch.
     */
    orderBy?: LikeOrderByWithRelationInput | LikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Likes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Likes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Likes
    **/
    _count?: true | LikeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LikeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LikeMaxAggregateInputType
  }

  export type GetLikeAggregateType<T extends LikeAggregateArgs> = {
        [P in keyof T & keyof AggregateLike]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLike[P]>
      : GetScalarType<T[P], AggregateLike[P]>
  }




  export type LikeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LikeWhereInput
    orderBy?: LikeOrderByWithAggregationInput | LikeOrderByWithAggregationInput[]
    by: LikeScalarFieldEnum[] | LikeScalarFieldEnum
    having?: LikeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LikeCountAggregateInputType | true
    _min?: LikeMinAggregateInputType
    _max?: LikeMaxAggregateInputType
  }

  export type LikeGroupByOutputType = {
    id: string
    predictionId: string
    userAddress: string
    userName: string | null
    userImage: string | null
    createdAt: Date
    _count: LikeCountAggregateOutputType | null
    _min: LikeMinAggregateOutputType | null
    _max: LikeMaxAggregateOutputType | null
  }

  type GetLikeGroupByPayload<T extends LikeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LikeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LikeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LikeGroupByOutputType[P]>
            : GetScalarType<T[P], LikeGroupByOutputType[P]>
        }
      >
    >


  export type LikeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    predictionId?: boolean
    userAddress?: boolean
    userName?: boolean
    userImage?: boolean
    createdAt?: boolean
    prediction?: boolean | PredictionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["like"]>

  export type LikeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    predictionId?: boolean
    userAddress?: boolean
    userName?: boolean
    userImage?: boolean
    createdAt?: boolean
    prediction?: boolean | PredictionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["like"]>

  export type LikeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    predictionId?: boolean
    userAddress?: boolean
    userName?: boolean
    userImage?: boolean
    createdAt?: boolean
    prediction?: boolean | PredictionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["like"]>

  export type LikeSelectScalar = {
    id?: boolean
    predictionId?: boolean
    userAddress?: boolean
    userName?: boolean
    userImage?: boolean
    createdAt?: boolean
  }

  export type LikeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "predictionId" | "userAddress" | "userName" | "userImage" | "createdAt", ExtArgs["result"]["like"]>
  export type LikeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    prediction?: boolean | PredictionDefaultArgs<ExtArgs>
  }
  export type LikeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    prediction?: boolean | PredictionDefaultArgs<ExtArgs>
  }
  export type LikeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    prediction?: boolean | PredictionDefaultArgs<ExtArgs>
  }

  export type $LikePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Like"
    objects: {
      prediction: Prisma.$PredictionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      predictionId: string
      userAddress: string
      userName: string | null
      userImage: string | null
      createdAt: Date
    }, ExtArgs["result"]["like"]>
    composites: {}
  }

  type LikeGetPayload<S extends boolean | null | undefined | LikeDefaultArgs> = $Result.GetResult<Prisma.$LikePayload, S>

  type LikeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LikeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LikeCountAggregateInputType | true
    }

  export interface LikeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Like'], meta: { name: 'Like' } }
    /**
     * Find zero or one Like that matches the filter.
     * @param {LikeFindUniqueArgs} args - Arguments to find a Like
     * @example
     * // Get one Like
     * const like = await prisma.like.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LikeFindUniqueArgs>(args: SelectSubset<T, LikeFindUniqueArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Like that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LikeFindUniqueOrThrowArgs} args - Arguments to find a Like
     * @example
     * // Get one Like
     * const like = await prisma.like.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LikeFindUniqueOrThrowArgs>(args: SelectSubset<T, LikeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Like that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikeFindFirstArgs} args - Arguments to find a Like
     * @example
     * // Get one Like
     * const like = await prisma.like.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LikeFindFirstArgs>(args?: SelectSubset<T, LikeFindFirstArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Like that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikeFindFirstOrThrowArgs} args - Arguments to find a Like
     * @example
     * // Get one Like
     * const like = await prisma.like.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LikeFindFirstOrThrowArgs>(args?: SelectSubset<T, LikeFindFirstOrThrowArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Likes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Likes
     * const likes = await prisma.like.findMany()
     * 
     * // Get first 10 Likes
     * const likes = await prisma.like.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const likeWithIdOnly = await prisma.like.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LikeFindManyArgs>(args?: SelectSubset<T, LikeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Like.
     * @param {LikeCreateArgs} args - Arguments to create a Like.
     * @example
     * // Create one Like
     * const Like = await prisma.like.create({
     *   data: {
     *     // ... data to create a Like
     *   }
     * })
     * 
     */
    create<T extends LikeCreateArgs>(args: SelectSubset<T, LikeCreateArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Likes.
     * @param {LikeCreateManyArgs} args - Arguments to create many Likes.
     * @example
     * // Create many Likes
     * const like = await prisma.like.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LikeCreateManyArgs>(args?: SelectSubset<T, LikeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Likes and returns the data saved in the database.
     * @param {LikeCreateManyAndReturnArgs} args - Arguments to create many Likes.
     * @example
     * // Create many Likes
     * const like = await prisma.like.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Likes and only return the `id`
     * const likeWithIdOnly = await prisma.like.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LikeCreateManyAndReturnArgs>(args?: SelectSubset<T, LikeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Like.
     * @param {LikeDeleteArgs} args - Arguments to delete one Like.
     * @example
     * // Delete one Like
     * const Like = await prisma.like.delete({
     *   where: {
     *     // ... filter to delete one Like
     *   }
     * })
     * 
     */
    delete<T extends LikeDeleteArgs>(args: SelectSubset<T, LikeDeleteArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Like.
     * @param {LikeUpdateArgs} args - Arguments to update one Like.
     * @example
     * // Update one Like
     * const like = await prisma.like.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LikeUpdateArgs>(args: SelectSubset<T, LikeUpdateArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Likes.
     * @param {LikeDeleteManyArgs} args - Arguments to filter Likes to delete.
     * @example
     * // Delete a few Likes
     * const { count } = await prisma.like.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LikeDeleteManyArgs>(args?: SelectSubset<T, LikeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Likes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Likes
     * const like = await prisma.like.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LikeUpdateManyArgs>(args: SelectSubset<T, LikeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Likes and returns the data updated in the database.
     * @param {LikeUpdateManyAndReturnArgs} args - Arguments to update many Likes.
     * @example
     * // Update many Likes
     * const like = await prisma.like.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Likes and only return the `id`
     * const likeWithIdOnly = await prisma.like.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LikeUpdateManyAndReturnArgs>(args: SelectSubset<T, LikeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Like.
     * @param {LikeUpsertArgs} args - Arguments to update or create a Like.
     * @example
     * // Update or create a Like
     * const like = await prisma.like.upsert({
     *   create: {
     *     // ... data to create a Like
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Like we want to update
     *   }
     * })
     */
    upsert<T extends LikeUpsertArgs>(args: SelectSubset<T, LikeUpsertArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Likes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikeCountArgs} args - Arguments to filter Likes to count.
     * @example
     * // Count the number of Likes
     * const count = await prisma.like.count({
     *   where: {
     *     // ... the filter for the Likes we want to count
     *   }
     * })
    **/
    count<T extends LikeCountArgs>(
      args?: Subset<T, LikeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LikeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Like.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LikeAggregateArgs>(args: Subset<T, LikeAggregateArgs>): Prisma.PrismaPromise<GetLikeAggregateType<T>>

    /**
     * Group by Like.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LikeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LikeGroupByArgs['orderBy'] }
        : { orderBy?: LikeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LikeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLikeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Like model
   */
  readonly fields: LikeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Like.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LikeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    prediction<T extends PredictionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PredictionDefaultArgs<ExtArgs>>): Prisma__PredictionClient<$Result.GetResult<Prisma.$PredictionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Like model
   */
  interface LikeFieldRefs {
    readonly id: FieldRef<"Like", 'String'>
    readonly predictionId: FieldRef<"Like", 'String'>
    readonly userAddress: FieldRef<"Like", 'String'>
    readonly userName: FieldRef<"Like", 'String'>
    readonly userImage: FieldRef<"Like", 'String'>
    readonly createdAt: FieldRef<"Like", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Like findUnique
   */
  export type LikeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * Filter, which Like to fetch.
     */
    where: LikeWhereUniqueInput
  }

  /**
   * Like findUniqueOrThrow
   */
  export type LikeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * Filter, which Like to fetch.
     */
    where: LikeWhereUniqueInput
  }

  /**
   * Like findFirst
   */
  export type LikeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * Filter, which Like to fetch.
     */
    where?: LikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Likes to fetch.
     */
    orderBy?: LikeOrderByWithRelationInput | LikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Likes.
     */
    cursor?: LikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Likes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Likes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Likes.
     */
    distinct?: LikeScalarFieldEnum | LikeScalarFieldEnum[]
  }

  /**
   * Like findFirstOrThrow
   */
  export type LikeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * Filter, which Like to fetch.
     */
    where?: LikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Likes to fetch.
     */
    orderBy?: LikeOrderByWithRelationInput | LikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Likes.
     */
    cursor?: LikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Likes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Likes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Likes.
     */
    distinct?: LikeScalarFieldEnum | LikeScalarFieldEnum[]
  }

  /**
   * Like findMany
   */
  export type LikeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * Filter, which Likes to fetch.
     */
    where?: LikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Likes to fetch.
     */
    orderBy?: LikeOrderByWithRelationInput | LikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Likes.
     */
    cursor?: LikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Likes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Likes.
     */
    skip?: number
    distinct?: LikeScalarFieldEnum | LikeScalarFieldEnum[]
  }

  /**
   * Like create
   */
  export type LikeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * The data needed to create a Like.
     */
    data: XOR<LikeCreateInput, LikeUncheckedCreateInput>
  }

  /**
   * Like createMany
   */
  export type LikeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Likes.
     */
    data: LikeCreateManyInput | LikeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Like createManyAndReturn
   */
  export type LikeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * The data used to create many Likes.
     */
    data: LikeCreateManyInput | LikeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Like update
   */
  export type LikeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * The data needed to update a Like.
     */
    data: XOR<LikeUpdateInput, LikeUncheckedUpdateInput>
    /**
     * Choose, which Like to update.
     */
    where: LikeWhereUniqueInput
  }

  /**
   * Like updateMany
   */
  export type LikeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Likes.
     */
    data: XOR<LikeUpdateManyMutationInput, LikeUncheckedUpdateManyInput>
    /**
     * Filter which Likes to update
     */
    where?: LikeWhereInput
    /**
     * Limit how many Likes to update.
     */
    limit?: number
  }

  /**
   * Like updateManyAndReturn
   */
  export type LikeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * The data used to update Likes.
     */
    data: XOR<LikeUpdateManyMutationInput, LikeUncheckedUpdateManyInput>
    /**
     * Filter which Likes to update
     */
    where?: LikeWhereInput
    /**
     * Limit how many Likes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Like upsert
   */
  export type LikeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * The filter to search for the Like to update in case it exists.
     */
    where: LikeWhereUniqueInput
    /**
     * In case the Like found by the `where` argument doesn't exist, create a new Like with this data.
     */
    create: XOR<LikeCreateInput, LikeUncheckedCreateInput>
    /**
     * In case the Like was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LikeUpdateInput, LikeUncheckedUpdateInput>
  }

  /**
   * Like delete
   */
  export type LikeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * Filter which Like to delete.
     */
    where: LikeWhereUniqueInput
  }

  /**
   * Like deleteMany
   */
  export type LikeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Likes to delete
     */
    where?: LikeWhereInput
    /**
     * Limit how many Likes to delete.
     */
    limit?: number
  }

  /**
   * Like without action
   */
  export type LikeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PredictionScalarFieldEnum: {
    id: 'id',
    creatorAddress: 'creatorAddress',
    creatorName: 'creatorName',
    creatorImage: 'creatorImage',
    content: 'content',
    category: 'category',
    status: 'status',
    createdAt: 'createdAt',
    expiresAt: 'expiresAt',
    resolvedAt: 'resolvedAt',
    contractAddress: 'contractAddress',
    targetPrice: 'targetPrice',
    comparisonOperator: 'comparisonOperator',
    tokenSymbol: 'tokenSymbol',
    totalBetsTrue: 'totalBetsTrue',
    totalBetsFalse: 'totalBetsFalse',
    isPending: 'isPending',
    hasError: 'hasError',
    errorMessage: 'errorMessage'
  };

  export type PredictionScalarFieldEnum = (typeof PredictionScalarFieldEnum)[keyof typeof PredictionScalarFieldEnum]


  export const BetScalarFieldEnum: {
    id: 'id',
    predictionId: 'predictionId',
    userAddress: 'userAddress',
    userName: 'userName',
    userImage: 'userImage',
    amount: 'amount',
    position: 'position',
    createdAt: 'createdAt',
    transactionHash: 'transactionHash'
  };

  export type BetScalarFieldEnum = (typeof BetScalarFieldEnum)[keyof typeof BetScalarFieldEnum]


  export const CommentScalarFieldEnum: {
    id: 'id',
    predictionId: 'predictionId',
    userAddress: 'userAddress',
    userName: 'userName',
    userImage: 'userImage',
    content: 'content',
    createdAt: 'createdAt'
  };

  export type CommentScalarFieldEnum = (typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum]


  export const LikeScalarFieldEnum: {
    id: 'id',
    predictionId: 'predictionId',
    userAddress: 'userAddress',
    userName: 'userName',
    userImage: 'userImage',
    createdAt: 'createdAt'
  };

  export type LikeScalarFieldEnum = (typeof LikeScalarFieldEnum)[keyof typeof LikeScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'PredictionCategory'
   */
  export type EnumPredictionCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PredictionCategory'>
    


  /**
   * Reference to a field of type 'PredictionCategory[]'
   */
  export type ListEnumPredictionCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PredictionCategory[]'>
    


  /**
   * Reference to a field of type 'PredictionStatus'
   */
  export type EnumPredictionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PredictionStatus'>
    


  /**
   * Reference to a field of type 'PredictionStatus[]'
   */
  export type ListEnumPredictionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PredictionStatus[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type PredictionWhereInput = {
    AND?: PredictionWhereInput | PredictionWhereInput[]
    OR?: PredictionWhereInput[]
    NOT?: PredictionWhereInput | PredictionWhereInput[]
    id?: StringFilter<"Prediction"> | string
    creatorAddress?: StringFilter<"Prediction"> | string
    creatorName?: StringNullableFilter<"Prediction"> | string | null
    creatorImage?: StringNullableFilter<"Prediction"> | string | null
    content?: StringFilter<"Prediction"> | string
    category?: EnumPredictionCategoryFilter<"Prediction"> | $Enums.PredictionCategory
    status?: EnumPredictionStatusFilter<"Prediction"> | $Enums.PredictionStatus
    createdAt?: DateTimeFilter<"Prediction"> | Date | string
    expiresAt?: DateTimeFilter<"Prediction"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"Prediction"> | Date | string | null
    contractAddress?: StringNullableFilter<"Prediction"> | string | null
    targetPrice?: StringNullableFilter<"Prediction"> | string | null
    comparisonOperator?: StringNullableFilter<"Prediction"> | string | null
    tokenSymbol?: StringNullableFilter<"Prediction"> | string | null
    totalBetsTrue?: FloatFilter<"Prediction"> | number
    totalBetsFalse?: FloatFilter<"Prediction"> | number
    isPending?: BoolFilter<"Prediction"> | boolean
    hasError?: BoolFilter<"Prediction"> | boolean
    errorMessage?: StringNullableFilter<"Prediction"> | string | null
    bets?: BetListRelationFilter
    comments?: CommentListRelationFilter
    likes?: LikeListRelationFilter
  }

  export type PredictionOrderByWithRelationInput = {
    id?: SortOrder
    creatorAddress?: SortOrder
    creatorName?: SortOrderInput | SortOrder
    creatorImage?: SortOrderInput | SortOrder
    content?: SortOrder
    category?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    contractAddress?: SortOrderInput | SortOrder
    targetPrice?: SortOrderInput | SortOrder
    comparisonOperator?: SortOrderInput | SortOrder
    tokenSymbol?: SortOrderInput | SortOrder
    totalBetsTrue?: SortOrder
    totalBetsFalse?: SortOrder
    isPending?: SortOrder
    hasError?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    bets?: BetOrderByRelationAggregateInput
    comments?: CommentOrderByRelationAggregateInput
    likes?: LikeOrderByRelationAggregateInput
  }

  export type PredictionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PredictionWhereInput | PredictionWhereInput[]
    OR?: PredictionWhereInput[]
    NOT?: PredictionWhereInput | PredictionWhereInput[]
    creatorAddress?: StringFilter<"Prediction"> | string
    creatorName?: StringNullableFilter<"Prediction"> | string | null
    creatorImage?: StringNullableFilter<"Prediction"> | string | null
    content?: StringFilter<"Prediction"> | string
    category?: EnumPredictionCategoryFilter<"Prediction"> | $Enums.PredictionCategory
    status?: EnumPredictionStatusFilter<"Prediction"> | $Enums.PredictionStatus
    createdAt?: DateTimeFilter<"Prediction"> | Date | string
    expiresAt?: DateTimeFilter<"Prediction"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"Prediction"> | Date | string | null
    contractAddress?: StringNullableFilter<"Prediction"> | string | null
    targetPrice?: StringNullableFilter<"Prediction"> | string | null
    comparisonOperator?: StringNullableFilter<"Prediction"> | string | null
    tokenSymbol?: StringNullableFilter<"Prediction"> | string | null
    totalBetsTrue?: FloatFilter<"Prediction"> | number
    totalBetsFalse?: FloatFilter<"Prediction"> | number
    isPending?: BoolFilter<"Prediction"> | boolean
    hasError?: BoolFilter<"Prediction"> | boolean
    errorMessage?: StringNullableFilter<"Prediction"> | string | null
    bets?: BetListRelationFilter
    comments?: CommentListRelationFilter
    likes?: LikeListRelationFilter
  }, "id">

  export type PredictionOrderByWithAggregationInput = {
    id?: SortOrder
    creatorAddress?: SortOrder
    creatorName?: SortOrderInput | SortOrder
    creatorImage?: SortOrderInput | SortOrder
    content?: SortOrder
    category?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    contractAddress?: SortOrderInput | SortOrder
    targetPrice?: SortOrderInput | SortOrder
    comparisonOperator?: SortOrderInput | SortOrder
    tokenSymbol?: SortOrderInput | SortOrder
    totalBetsTrue?: SortOrder
    totalBetsFalse?: SortOrder
    isPending?: SortOrder
    hasError?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    _count?: PredictionCountOrderByAggregateInput
    _avg?: PredictionAvgOrderByAggregateInput
    _max?: PredictionMaxOrderByAggregateInput
    _min?: PredictionMinOrderByAggregateInput
    _sum?: PredictionSumOrderByAggregateInput
  }

  export type PredictionScalarWhereWithAggregatesInput = {
    AND?: PredictionScalarWhereWithAggregatesInput | PredictionScalarWhereWithAggregatesInput[]
    OR?: PredictionScalarWhereWithAggregatesInput[]
    NOT?: PredictionScalarWhereWithAggregatesInput | PredictionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Prediction"> | string
    creatorAddress?: StringWithAggregatesFilter<"Prediction"> | string
    creatorName?: StringNullableWithAggregatesFilter<"Prediction"> | string | null
    creatorImage?: StringNullableWithAggregatesFilter<"Prediction"> | string | null
    content?: StringWithAggregatesFilter<"Prediction"> | string
    category?: EnumPredictionCategoryWithAggregatesFilter<"Prediction"> | $Enums.PredictionCategory
    status?: EnumPredictionStatusWithAggregatesFilter<"Prediction"> | $Enums.PredictionStatus
    createdAt?: DateTimeWithAggregatesFilter<"Prediction"> | Date | string
    expiresAt?: DateTimeWithAggregatesFilter<"Prediction"> | Date | string
    resolvedAt?: DateTimeNullableWithAggregatesFilter<"Prediction"> | Date | string | null
    contractAddress?: StringNullableWithAggregatesFilter<"Prediction"> | string | null
    targetPrice?: StringNullableWithAggregatesFilter<"Prediction"> | string | null
    comparisonOperator?: StringNullableWithAggregatesFilter<"Prediction"> | string | null
    tokenSymbol?: StringNullableWithAggregatesFilter<"Prediction"> | string | null
    totalBetsTrue?: FloatWithAggregatesFilter<"Prediction"> | number
    totalBetsFalse?: FloatWithAggregatesFilter<"Prediction"> | number
    isPending?: BoolWithAggregatesFilter<"Prediction"> | boolean
    hasError?: BoolWithAggregatesFilter<"Prediction"> | boolean
    errorMessage?: StringNullableWithAggregatesFilter<"Prediction"> | string | null
  }

  export type BetWhereInput = {
    AND?: BetWhereInput | BetWhereInput[]
    OR?: BetWhereInput[]
    NOT?: BetWhereInput | BetWhereInput[]
    id?: StringFilter<"Bet"> | string
    predictionId?: StringFilter<"Bet"> | string
    userAddress?: StringFilter<"Bet"> | string
    userName?: StringNullableFilter<"Bet"> | string | null
    userImage?: StringNullableFilter<"Bet"> | string | null
    amount?: FloatFilter<"Bet"> | number
    position?: BoolFilter<"Bet"> | boolean
    createdAt?: DateTimeFilter<"Bet"> | Date | string
    transactionHash?: StringNullableFilter<"Bet"> | string | null
    prediction?: XOR<PredictionScalarRelationFilter, PredictionWhereInput>
  }

  export type BetOrderByWithRelationInput = {
    id?: SortOrder
    predictionId?: SortOrder
    userAddress?: SortOrder
    userName?: SortOrderInput | SortOrder
    userImage?: SortOrderInput | SortOrder
    amount?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    transactionHash?: SortOrderInput | SortOrder
    prediction?: PredictionOrderByWithRelationInput
  }

  export type BetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BetWhereInput | BetWhereInput[]
    OR?: BetWhereInput[]
    NOT?: BetWhereInput | BetWhereInput[]
    predictionId?: StringFilter<"Bet"> | string
    userAddress?: StringFilter<"Bet"> | string
    userName?: StringNullableFilter<"Bet"> | string | null
    userImage?: StringNullableFilter<"Bet"> | string | null
    amount?: FloatFilter<"Bet"> | number
    position?: BoolFilter<"Bet"> | boolean
    createdAt?: DateTimeFilter<"Bet"> | Date | string
    transactionHash?: StringNullableFilter<"Bet"> | string | null
    prediction?: XOR<PredictionScalarRelationFilter, PredictionWhereInput>
  }, "id">

  export type BetOrderByWithAggregationInput = {
    id?: SortOrder
    predictionId?: SortOrder
    userAddress?: SortOrder
    userName?: SortOrderInput | SortOrder
    userImage?: SortOrderInput | SortOrder
    amount?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    transactionHash?: SortOrderInput | SortOrder
    _count?: BetCountOrderByAggregateInput
    _avg?: BetAvgOrderByAggregateInput
    _max?: BetMaxOrderByAggregateInput
    _min?: BetMinOrderByAggregateInput
    _sum?: BetSumOrderByAggregateInput
  }

  export type BetScalarWhereWithAggregatesInput = {
    AND?: BetScalarWhereWithAggregatesInput | BetScalarWhereWithAggregatesInput[]
    OR?: BetScalarWhereWithAggregatesInput[]
    NOT?: BetScalarWhereWithAggregatesInput | BetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Bet"> | string
    predictionId?: StringWithAggregatesFilter<"Bet"> | string
    userAddress?: StringWithAggregatesFilter<"Bet"> | string
    userName?: StringNullableWithAggregatesFilter<"Bet"> | string | null
    userImage?: StringNullableWithAggregatesFilter<"Bet"> | string | null
    amount?: FloatWithAggregatesFilter<"Bet"> | number
    position?: BoolWithAggregatesFilter<"Bet"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Bet"> | Date | string
    transactionHash?: StringNullableWithAggregatesFilter<"Bet"> | string | null
  }

  export type CommentWhereInput = {
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    id?: StringFilter<"Comment"> | string
    predictionId?: StringFilter<"Comment"> | string
    userAddress?: StringFilter<"Comment"> | string
    userName?: StringNullableFilter<"Comment"> | string | null
    userImage?: StringNullableFilter<"Comment"> | string | null
    content?: StringFilter<"Comment"> | string
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    prediction?: XOR<PredictionScalarRelationFilter, PredictionWhereInput>
  }

  export type CommentOrderByWithRelationInput = {
    id?: SortOrder
    predictionId?: SortOrder
    userAddress?: SortOrder
    userName?: SortOrderInput | SortOrder
    userImage?: SortOrderInput | SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    prediction?: PredictionOrderByWithRelationInput
  }

  export type CommentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    predictionId?: StringFilter<"Comment"> | string
    userAddress?: StringFilter<"Comment"> | string
    userName?: StringNullableFilter<"Comment"> | string | null
    userImage?: StringNullableFilter<"Comment"> | string | null
    content?: StringFilter<"Comment"> | string
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    prediction?: XOR<PredictionScalarRelationFilter, PredictionWhereInput>
  }, "id">

  export type CommentOrderByWithAggregationInput = {
    id?: SortOrder
    predictionId?: SortOrder
    userAddress?: SortOrder
    userName?: SortOrderInput | SortOrder
    userImage?: SortOrderInput | SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    _count?: CommentCountOrderByAggregateInput
    _max?: CommentMaxOrderByAggregateInput
    _min?: CommentMinOrderByAggregateInput
  }

  export type CommentScalarWhereWithAggregatesInput = {
    AND?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    OR?: CommentScalarWhereWithAggregatesInput[]
    NOT?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Comment"> | string
    predictionId?: StringWithAggregatesFilter<"Comment"> | string
    userAddress?: StringWithAggregatesFilter<"Comment"> | string
    userName?: StringNullableWithAggregatesFilter<"Comment"> | string | null
    userImage?: StringNullableWithAggregatesFilter<"Comment"> | string | null
    content?: StringWithAggregatesFilter<"Comment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Comment"> | Date | string
  }

  export type LikeWhereInput = {
    AND?: LikeWhereInput | LikeWhereInput[]
    OR?: LikeWhereInput[]
    NOT?: LikeWhereInput | LikeWhereInput[]
    id?: StringFilter<"Like"> | string
    predictionId?: StringFilter<"Like"> | string
    userAddress?: StringFilter<"Like"> | string
    userName?: StringNullableFilter<"Like"> | string | null
    userImage?: StringNullableFilter<"Like"> | string | null
    createdAt?: DateTimeFilter<"Like"> | Date | string
    prediction?: XOR<PredictionScalarRelationFilter, PredictionWhereInput>
  }

  export type LikeOrderByWithRelationInput = {
    id?: SortOrder
    predictionId?: SortOrder
    userAddress?: SortOrder
    userName?: SortOrderInput | SortOrder
    userImage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    prediction?: PredictionOrderByWithRelationInput
  }

  export type LikeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    predictionId_userAddress?: LikePredictionIdUserAddressCompoundUniqueInput
    AND?: LikeWhereInput | LikeWhereInput[]
    OR?: LikeWhereInput[]
    NOT?: LikeWhereInput | LikeWhereInput[]
    predictionId?: StringFilter<"Like"> | string
    userAddress?: StringFilter<"Like"> | string
    userName?: StringNullableFilter<"Like"> | string | null
    userImage?: StringNullableFilter<"Like"> | string | null
    createdAt?: DateTimeFilter<"Like"> | Date | string
    prediction?: XOR<PredictionScalarRelationFilter, PredictionWhereInput>
  }, "id" | "predictionId_userAddress">

  export type LikeOrderByWithAggregationInput = {
    id?: SortOrder
    predictionId?: SortOrder
    userAddress?: SortOrder
    userName?: SortOrderInput | SortOrder
    userImage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: LikeCountOrderByAggregateInput
    _max?: LikeMaxOrderByAggregateInput
    _min?: LikeMinOrderByAggregateInput
  }

  export type LikeScalarWhereWithAggregatesInput = {
    AND?: LikeScalarWhereWithAggregatesInput | LikeScalarWhereWithAggregatesInput[]
    OR?: LikeScalarWhereWithAggregatesInput[]
    NOT?: LikeScalarWhereWithAggregatesInput | LikeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Like"> | string
    predictionId?: StringWithAggregatesFilter<"Like"> | string
    userAddress?: StringWithAggregatesFilter<"Like"> | string
    userName?: StringNullableWithAggregatesFilter<"Like"> | string | null
    userImage?: StringNullableWithAggregatesFilter<"Like"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Like"> | Date | string
  }

  export type PredictionCreateInput = {
    id?: string
    creatorAddress: string
    creatorName?: string | null
    creatorImage?: string | null
    content: string
    category: $Enums.PredictionCategory
    status?: $Enums.PredictionStatus
    createdAt?: Date | string
    expiresAt: Date | string
    resolvedAt?: Date | string | null
    contractAddress?: string | null
    targetPrice?: string | null
    comparisonOperator?: string | null
    tokenSymbol?: string | null
    totalBetsTrue?: number
    totalBetsFalse?: number
    isPending?: boolean
    hasError?: boolean
    errorMessage?: string | null
    bets?: BetCreateNestedManyWithoutPredictionInput
    comments?: CommentCreateNestedManyWithoutPredictionInput
    likes?: LikeCreateNestedManyWithoutPredictionInput
  }

  export type PredictionUncheckedCreateInput = {
    id?: string
    creatorAddress: string
    creatorName?: string | null
    creatorImage?: string | null
    content: string
    category: $Enums.PredictionCategory
    status?: $Enums.PredictionStatus
    createdAt?: Date | string
    expiresAt: Date | string
    resolvedAt?: Date | string | null
    contractAddress?: string | null
    targetPrice?: string | null
    comparisonOperator?: string | null
    tokenSymbol?: string | null
    totalBetsTrue?: number
    totalBetsFalse?: number
    isPending?: boolean
    hasError?: boolean
    errorMessage?: string | null
    bets?: BetUncheckedCreateNestedManyWithoutPredictionInput
    comments?: CommentUncheckedCreateNestedManyWithoutPredictionInput
    likes?: LikeUncheckedCreateNestedManyWithoutPredictionInput
  }

  export type PredictionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorAddress?: StringFieldUpdateOperationsInput | string
    creatorName?: NullableStringFieldUpdateOperationsInput | string | null
    creatorImage?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    category?: EnumPredictionCategoryFieldUpdateOperationsInput | $Enums.PredictionCategory
    status?: EnumPredictionStatusFieldUpdateOperationsInput | $Enums.PredictionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    targetPrice?: NullableStringFieldUpdateOperationsInput | string | null
    comparisonOperator?: NullableStringFieldUpdateOperationsInput | string | null
    tokenSymbol?: NullableStringFieldUpdateOperationsInput | string | null
    totalBetsTrue?: FloatFieldUpdateOperationsInput | number
    totalBetsFalse?: FloatFieldUpdateOperationsInput | number
    isPending?: BoolFieldUpdateOperationsInput | boolean
    hasError?: BoolFieldUpdateOperationsInput | boolean
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    bets?: BetUpdateManyWithoutPredictionNestedInput
    comments?: CommentUpdateManyWithoutPredictionNestedInput
    likes?: LikeUpdateManyWithoutPredictionNestedInput
  }

  export type PredictionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorAddress?: StringFieldUpdateOperationsInput | string
    creatorName?: NullableStringFieldUpdateOperationsInput | string | null
    creatorImage?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    category?: EnumPredictionCategoryFieldUpdateOperationsInput | $Enums.PredictionCategory
    status?: EnumPredictionStatusFieldUpdateOperationsInput | $Enums.PredictionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    targetPrice?: NullableStringFieldUpdateOperationsInput | string | null
    comparisonOperator?: NullableStringFieldUpdateOperationsInput | string | null
    tokenSymbol?: NullableStringFieldUpdateOperationsInput | string | null
    totalBetsTrue?: FloatFieldUpdateOperationsInput | number
    totalBetsFalse?: FloatFieldUpdateOperationsInput | number
    isPending?: BoolFieldUpdateOperationsInput | boolean
    hasError?: BoolFieldUpdateOperationsInput | boolean
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    bets?: BetUncheckedUpdateManyWithoutPredictionNestedInput
    comments?: CommentUncheckedUpdateManyWithoutPredictionNestedInput
    likes?: LikeUncheckedUpdateManyWithoutPredictionNestedInput
  }

  export type PredictionCreateManyInput = {
    id?: string
    creatorAddress: string
    creatorName?: string | null
    creatorImage?: string | null
    content: string
    category: $Enums.PredictionCategory
    status?: $Enums.PredictionStatus
    createdAt?: Date | string
    expiresAt: Date | string
    resolvedAt?: Date | string | null
    contractAddress?: string | null
    targetPrice?: string | null
    comparisonOperator?: string | null
    tokenSymbol?: string | null
    totalBetsTrue?: number
    totalBetsFalse?: number
    isPending?: boolean
    hasError?: boolean
    errorMessage?: string | null
  }

  export type PredictionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorAddress?: StringFieldUpdateOperationsInput | string
    creatorName?: NullableStringFieldUpdateOperationsInput | string | null
    creatorImage?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    category?: EnumPredictionCategoryFieldUpdateOperationsInput | $Enums.PredictionCategory
    status?: EnumPredictionStatusFieldUpdateOperationsInput | $Enums.PredictionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    targetPrice?: NullableStringFieldUpdateOperationsInput | string | null
    comparisonOperator?: NullableStringFieldUpdateOperationsInput | string | null
    tokenSymbol?: NullableStringFieldUpdateOperationsInput | string | null
    totalBetsTrue?: FloatFieldUpdateOperationsInput | number
    totalBetsFalse?: FloatFieldUpdateOperationsInput | number
    isPending?: BoolFieldUpdateOperationsInput | boolean
    hasError?: BoolFieldUpdateOperationsInput | boolean
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PredictionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorAddress?: StringFieldUpdateOperationsInput | string
    creatorName?: NullableStringFieldUpdateOperationsInput | string | null
    creatorImage?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    category?: EnumPredictionCategoryFieldUpdateOperationsInput | $Enums.PredictionCategory
    status?: EnumPredictionStatusFieldUpdateOperationsInput | $Enums.PredictionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    targetPrice?: NullableStringFieldUpdateOperationsInput | string | null
    comparisonOperator?: NullableStringFieldUpdateOperationsInput | string | null
    tokenSymbol?: NullableStringFieldUpdateOperationsInput | string | null
    totalBetsTrue?: FloatFieldUpdateOperationsInput | number
    totalBetsFalse?: FloatFieldUpdateOperationsInput | number
    isPending?: BoolFieldUpdateOperationsInput | boolean
    hasError?: BoolFieldUpdateOperationsInput | boolean
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BetCreateInput = {
    id?: string
    userAddress: string
    userName?: string | null
    userImage?: string | null
    amount: number
    position: boolean
    createdAt?: Date | string
    transactionHash?: string | null
    prediction: PredictionCreateNestedOneWithoutBetsInput
  }

  export type BetUncheckedCreateInput = {
    id?: string
    predictionId: string
    userAddress: string
    userName?: string | null
    userImage?: string | null
    amount: number
    position: boolean
    createdAt?: Date | string
    transactionHash?: string | null
  }

  export type BetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    userImage?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    position?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    prediction?: PredictionUpdateOneRequiredWithoutBetsNestedInput
  }

  export type BetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    predictionId?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    userImage?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    position?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BetCreateManyInput = {
    id?: string
    predictionId: string
    userAddress: string
    userName?: string | null
    userImage?: string | null
    amount: number
    position: boolean
    createdAt?: Date | string
    transactionHash?: string | null
  }

  export type BetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    userImage?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    position?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    predictionId?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    userImage?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    position?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CommentCreateInput = {
    id?: string
    userAddress: string
    userName?: string | null
    userImage?: string | null
    content: string
    createdAt?: Date | string
    prediction: PredictionCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateInput = {
    id?: string
    predictionId: string
    userAddress: string
    userName?: string | null
    userImage?: string | null
    content: string
    createdAt?: Date | string
  }

  export type CommentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    userImage?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prediction?: PredictionUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    predictionId?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    userImage?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentCreateManyInput = {
    id?: string
    predictionId: string
    userAddress: string
    userName?: string | null
    userImage?: string | null
    content: string
    createdAt?: Date | string
  }

  export type CommentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    userImage?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    predictionId?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    userImage?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LikeCreateInput = {
    id?: string
    userAddress: string
    userName?: string | null
    userImage?: string | null
    createdAt?: Date | string
    prediction: PredictionCreateNestedOneWithoutLikesInput
  }

  export type LikeUncheckedCreateInput = {
    id?: string
    predictionId: string
    userAddress: string
    userName?: string | null
    userImage?: string | null
    createdAt?: Date | string
  }

  export type LikeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    userImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prediction?: PredictionUpdateOneRequiredWithoutLikesNestedInput
  }

  export type LikeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    predictionId?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    userImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LikeCreateManyInput = {
    id?: string
    predictionId: string
    userAddress: string
    userName?: string | null
    userImage?: string | null
    createdAt?: Date | string
  }

  export type LikeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    userImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LikeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    predictionId?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    userImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumPredictionCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.PredictionCategory | EnumPredictionCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.PredictionCategory[] | ListEnumPredictionCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.PredictionCategory[] | ListEnumPredictionCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumPredictionCategoryFilter<$PrismaModel> | $Enums.PredictionCategory
  }

  export type EnumPredictionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PredictionStatus | EnumPredictionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PredictionStatus[] | ListEnumPredictionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PredictionStatus[] | ListEnumPredictionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPredictionStatusFilter<$PrismaModel> | $Enums.PredictionStatus
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type BetListRelationFilter = {
    every?: BetWhereInput
    some?: BetWhereInput
    none?: BetWhereInput
  }

  export type CommentListRelationFilter = {
    every?: CommentWhereInput
    some?: CommentWhereInput
    none?: CommentWhereInput
  }

  export type LikeListRelationFilter = {
    every?: LikeWhereInput
    some?: LikeWhereInput
    none?: LikeWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LikeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PredictionCountOrderByAggregateInput = {
    id?: SortOrder
    creatorAddress?: SortOrder
    creatorName?: SortOrder
    creatorImage?: SortOrder
    content?: SortOrder
    category?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    resolvedAt?: SortOrder
    contractAddress?: SortOrder
    targetPrice?: SortOrder
    comparisonOperator?: SortOrder
    tokenSymbol?: SortOrder
    totalBetsTrue?: SortOrder
    totalBetsFalse?: SortOrder
    isPending?: SortOrder
    hasError?: SortOrder
    errorMessage?: SortOrder
  }

  export type PredictionAvgOrderByAggregateInput = {
    totalBetsTrue?: SortOrder
    totalBetsFalse?: SortOrder
  }

  export type PredictionMaxOrderByAggregateInput = {
    id?: SortOrder
    creatorAddress?: SortOrder
    creatorName?: SortOrder
    creatorImage?: SortOrder
    content?: SortOrder
    category?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    resolvedAt?: SortOrder
    contractAddress?: SortOrder
    targetPrice?: SortOrder
    comparisonOperator?: SortOrder
    tokenSymbol?: SortOrder
    totalBetsTrue?: SortOrder
    totalBetsFalse?: SortOrder
    isPending?: SortOrder
    hasError?: SortOrder
    errorMessage?: SortOrder
  }

  export type PredictionMinOrderByAggregateInput = {
    id?: SortOrder
    creatorAddress?: SortOrder
    creatorName?: SortOrder
    creatorImage?: SortOrder
    content?: SortOrder
    category?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    resolvedAt?: SortOrder
    contractAddress?: SortOrder
    targetPrice?: SortOrder
    comparisonOperator?: SortOrder
    tokenSymbol?: SortOrder
    totalBetsTrue?: SortOrder
    totalBetsFalse?: SortOrder
    isPending?: SortOrder
    hasError?: SortOrder
    errorMessage?: SortOrder
  }

  export type PredictionSumOrderByAggregateInput = {
    totalBetsTrue?: SortOrder
    totalBetsFalse?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumPredictionCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PredictionCategory | EnumPredictionCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.PredictionCategory[] | ListEnumPredictionCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.PredictionCategory[] | ListEnumPredictionCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumPredictionCategoryWithAggregatesFilter<$PrismaModel> | $Enums.PredictionCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPredictionCategoryFilter<$PrismaModel>
    _max?: NestedEnumPredictionCategoryFilter<$PrismaModel>
  }

  export type EnumPredictionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PredictionStatus | EnumPredictionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PredictionStatus[] | ListEnumPredictionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PredictionStatus[] | ListEnumPredictionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPredictionStatusWithAggregatesFilter<$PrismaModel> | $Enums.PredictionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPredictionStatusFilter<$PrismaModel>
    _max?: NestedEnumPredictionStatusFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type PredictionScalarRelationFilter = {
    is?: PredictionWhereInput
    isNot?: PredictionWhereInput
  }

  export type BetCountOrderByAggregateInput = {
    id?: SortOrder
    predictionId?: SortOrder
    userAddress?: SortOrder
    userName?: SortOrder
    userImage?: SortOrder
    amount?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    transactionHash?: SortOrder
  }

  export type BetAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type BetMaxOrderByAggregateInput = {
    id?: SortOrder
    predictionId?: SortOrder
    userAddress?: SortOrder
    userName?: SortOrder
    userImage?: SortOrder
    amount?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    transactionHash?: SortOrder
  }

  export type BetMinOrderByAggregateInput = {
    id?: SortOrder
    predictionId?: SortOrder
    userAddress?: SortOrder
    userName?: SortOrder
    userImage?: SortOrder
    amount?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    transactionHash?: SortOrder
  }

  export type BetSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type CommentCountOrderByAggregateInput = {
    id?: SortOrder
    predictionId?: SortOrder
    userAddress?: SortOrder
    userName?: SortOrder
    userImage?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type CommentMaxOrderByAggregateInput = {
    id?: SortOrder
    predictionId?: SortOrder
    userAddress?: SortOrder
    userName?: SortOrder
    userImage?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type CommentMinOrderByAggregateInput = {
    id?: SortOrder
    predictionId?: SortOrder
    userAddress?: SortOrder
    userName?: SortOrder
    userImage?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type LikePredictionIdUserAddressCompoundUniqueInput = {
    predictionId: string
    userAddress: string
  }

  export type LikeCountOrderByAggregateInput = {
    id?: SortOrder
    predictionId?: SortOrder
    userAddress?: SortOrder
    userName?: SortOrder
    userImage?: SortOrder
    createdAt?: SortOrder
  }

  export type LikeMaxOrderByAggregateInput = {
    id?: SortOrder
    predictionId?: SortOrder
    userAddress?: SortOrder
    userName?: SortOrder
    userImage?: SortOrder
    createdAt?: SortOrder
  }

  export type LikeMinOrderByAggregateInput = {
    id?: SortOrder
    predictionId?: SortOrder
    userAddress?: SortOrder
    userName?: SortOrder
    userImage?: SortOrder
    createdAt?: SortOrder
  }

  export type BetCreateNestedManyWithoutPredictionInput = {
    create?: XOR<BetCreateWithoutPredictionInput, BetUncheckedCreateWithoutPredictionInput> | BetCreateWithoutPredictionInput[] | BetUncheckedCreateWithoutPredictionInput[]
    connectOrCreate?: BetCreateOrConnectWithoutPredictionInput | BetCreateOrConnectWithoutPredictionInput[]
    createMany?: BetCreateManyPredictionInputEnvelope
    connect?: BetWhereUniqueInput | BetWhereUniqueInput[]
  }

  export type CommentCreateNestedManyWithoutPredictionInput = {
    create?: XOR<CommentCreateWithoutPredictionInput, CommentUncheckedCreateWithoutPredictionInput> | CommentCreateWithoutPredictionInput[] | CommentUncheckedCreateWithoutPredictionInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutPredictionInput | CommentCreateOrConnectWithoutPredictionInput[]
    createMany?: CommentCreateManyPredictionInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type LikeCreateNestedManyWithoutPredictionInput = {
    create?: XOR<LikeCreateWithoutPredictionInput, LikeUncheckedCreateWithoutPredictionInput> | LikeCreateWithoutPredictionInput[] | LikeUncheckedCreateWithoutPredictionInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutPredictionInput | LikeCreateOrConnectWithoutPredictionInput[]
    createMany?: LikeCreateManyPredictionInputEnvelope
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
  }

  export type BetUncheckedCreateNestedManyWithoutPredictionInput = {
    create?: XOR<BetCreateWithoutPredictionInput, BetUncheckedCreateWithoutPredictionInput> | BetCreateWithoutPredictionInput[] | BetUncheckedCreateWithoutPredictionInput[]
    connectOrCreate?: BetCreateOrConnectWithoutPredictionInput | BetCreateOrConnectWithoutPredictionInput[]
    createMany?: BetCreateManyPredictionInputEnvelope
    connect?: BetWhereUniqueInput | BetWhereUniqueInput[]
  }

  export type CommentUncheckedCreateNestedManyWithoutPredictionInput = {
    create?: XOR<CommentCreateWithoutPredictionInput, CommentUncheckedCreateWithoutPredictionInput> | CommentCreateWithoutPredictionInput[] | CommentUncheckedCreateWithoutPredictionInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutPredictionInput | CommentCreateOrConnectWithoutPredictionInput[]
    createMany?: CommentCreateManyPredictionInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type LikeUncheckedCreateNestedManyWithoutPredictionInput = {
    create?: XOR<LikeCreateWithoutPredictionInput, LikeUncheckedCreateWithoutPredictionInput> | LikeCreateWithoutPredictionInput[] | LikeUncheckedCreateWithoutPredictionInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutPredictionInput | LikeCreateOrConnectWithoutPredictionInput[]
    createMany?: LikeCreateManyPredictionInputEnvelope
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumPredictionCategoryFieldUpdateOperationsInput = {
    set?: $Enums.PredictionCategory
  }

  export type EnumPredictionStatusFieldUpdateOperationsInput = {
    set?: $Enums.PredictionStatus
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type BetUpdateManyWithoutPredictionNestedInput = {
    create?: XOR<BetCreateWithoutPredictionInput, BetUncheckedCreateWithoutPredictionInput> | BetCreateWithoutPredictionInput[] | BetUncheckedCreateWithoutPredictionInput[]
    connectOrCreate?: BetCreateOrConnectWithoutPredictionInput | BetCreateOrConnectWithoutPredictionInput[]
    upsert?: BetUpsertWithWhereUniqueWithoutPredictionInput | BetUpsertWithWhereUniqueWithoutPredictionInput[]
    createMany?: BetCreateManyPredictionInputEnvelope
    set?: BetWhereUniqueInput | BetWhereUniqueInput[]
    disconnect?: BetWhereUniqueInput | BetWhereUniqueInput[]
    delete?: BetWhereUniqueInput | BetWhereUniqueInput[]
    connect?: BetWhereUniqueInput | BetWhereUniqueInput[]
    update?: BetUpdateWithWhereUniqueWithoutPredictionInput | BetUpdateWithWhereUniqueWithoutPredictionInput[]
    updateMany?: BetUpdateManyWithWhereWithoutPredictionInput | BetUpdateManyWithWhereWithoutPredictionInput[]
    deleteMany?: BetScalarWhereInput | BetScalarWhereInput[]
  }

  export type CommentUpdateManyWithoutPredictionNestedInput = {
    create?: XOR<CommentCreateWithoutPredictionInput, CommentUncheckedCreateWithoutPredictionInput> | CommentCreateWithoutPredictionInput[] | CommentUncheckedCreateWithoutPredictionInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutPredictionInput | CommentCreateOrConnectWithoutPredictionInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutPredictionInput | CommentUpsertWithWhereUniqueWithoutPredictionInput[]
    createMany?: CommentCreateManyPredictionInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutPredictionInput | CommentUpdateWithWhereUniqueWithoutPredictionInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutPredictionInput | CommentUpdateManyWithWhereWithoutPredictionInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type LikeUpdateManyWithoutPredictionNestedInput = {
    create?: XOR<LikeCreateWithoutPredictionInput, LikeUncheckedCreateWithoutPredictionInput> | LikeCreateWithoutPredictionInput[] | LikeUncheckedCreateWithoutPredictionInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutPredictionInput | LikeCreateOrConnectWithoutPredictionInput[]
    upsert?: LikeUpsertWithWhereUniqueWithoutPredictionInput | LikeUpsertWithWhereUniqueWithoutPredictionInput[]
    createMany?: LikeCreateManyPredictionInputEnvelope
    set?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    disconnect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    delete?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    update?: LikeUpdateWithWhereUniqueWithoutPredictionInput | LikeUpdateWithWhereUniqueWithoutPredictionInput[]
    updateMany?: LikeUpdateManyWithWhereWithoutPredictionInput | LikeUpdateManyWithWhereWithoutPredictionInput[]
    deleteMany?: LikeScalarWhereInput | LikeScalarWhereInput[]
  }

  export type BetUncheckedUpdateManyWithoutPredictionNestedInput = {
    create?: XOR<BetCreateWithoutPredictionInput, BetUncheckedCreateWithoutPredictionInput> | BetCreateWithoutPredictionInput[] | BetUncheckedCreateWithoutPredictionInput[]
    connectOrCreate?: BetCreateOrConnectWithoutPredictionInput | BetCreateOrConnectWithoutPredictionInput[]
    upsert?: BetUpsertWithWhereUniqueWithoutPredictionInput | BetUpsertWithWhereUniqueWithoutPredictionInput[]
    createMany?: BetCreateManyPredictionInputEnvelope
    set?: BetWhereUniqueInput | BetWhereUniqueInput[]
    disconnect?: BetWhereUniqueInput | BetWhereUniqueInput[]
    delete?: BetWhereUniqueInput | BetWhereUniqueInput[]
    connect?: BetWhereUniqueInput | BetWhereUniqueInput[]
    update?: BetUpdateWithWhereUniqueWithoutPredictionInput | BetUpdateWithWhereUniqueWithoutPredictionInput[]
    updateMany?: BetUpdateManyWithWhereWithoutPredictionInput | BetUpdateManyWithWhereWithoutPredictionInput[]
    deleteMany?: BetScalarWhereInput | BetScalarWhereInput[]
  }

  export type CommentUncheckedUpdateManyWithoutPredictionNestedInput = {
    create?: XOR<CommentCreateWithoutPredictionInput, CommentUncheckedCreateWithoutPredictionInput> | CommentCreateWithoutPredictionInput[] | CommentUncheckedCreateWithoutPredictionInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutPredictionInput | CommentCreateOrConnectWithoutPredictionInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutPredictionInput | CommentUpsertWithWhereUniqueWithoutPredictionInput[]
    createMany?: CommentCreateManyPredictionInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutPredictionInput | CommentUpdateWithWhereUniqueWithoutPredictionInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutPredictionInput | CommentUpdateManyWithWhereWithoutPredictionInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type LikeUncheckedUpdateManyWithoutPredictionNestedInput = {
    create?: XOR<LikeCreateWithoutPredictionInput, LikeUncheckedCreateWithoutPredictionInput> | LikeCreateWithoutPredictionInput[] | LikeUncheckedCreateWithoutPredictionInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutPredictionInput | LikeCreateOrConnectWithoutPredictionInput[]
    upsert?: LikeUpsertWithWhereUniqueWithoutPredictionInput | LikeUpsertWithWhereUniqueWithoutPredictionInput[]
    createMany?: LikeCreateManyPredictionInputEnvelope
    set?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    disconnect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    delete?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    update?: LikeUpdateWithWhereUniqueWithoutPredictionInput | LikeUpdateWithWhereUniqueWithoutPredictionInput[]
    updateMany?: LikeUpdateManyWithWhereWithoutPredictionInput | LikeUpdateManyWithWhereWithoutPredictionInput[]
    deleteMany?: LikeScalarWhereInput | LikeScalarWhereInput[]
  }

  export type PredictionCreateNestedOneWithoutBetsInput = {
    create?: XOR<PredictionCreateWithoutBetsInput, PredictionUncheckedCreateWithoutBetsInput>
    connectOrCreate?: PredictionCreateOrConnectWithoutBetsInput
    connect?: PredictionWhereUniqueInput
  }

  export type PredictionUpdateOneRequiredWithoutBetsNestedInput = {
    create?: XOR<PredictionCreateWithoutBetsInput, PredictionUncheckedCreateWithoutBetsInput>
    connectOrCreate?: PredictionCreateOrConnectWithoutBetsInput
    upsert?: PredictionUpsertWithoutBetsInput
    connect?: PredictionWhereUniqueInput
    update?: XOR<XOR<PredictionUpdateToOneWithWhereWithoutBetsInput, PredictionUpdateWithoutBetsInput>, PredictionUncheckedUpdateWithoutBetsInput>
  }

  export type PredictionCreateNestedOneWithoutCommentsInput = {
    create?: XOR<PredictionCreateWithoutCommentsInput, PredictionUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: PredictionCreateOrConnectWithoutCommentsInput
    connect?: PredictionWhereUniqueInput
  }

  export type PredictionUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<PredictionCreateWithoutCommentsInput, PredictionUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: PredictionCreateOrConnectWithoutCommentsInput
    upsert?: PredictionUpsertWithoutCommentsInput
    connect?: PredictionWhereUniqueInput
    update?: XOR<XOR<PredictionUpdateToOneWithWhereWithoutCommentsInput, PredictionUpdateWithoutCommentsInput>, PredictionUncheckedUpdateWithoutCommentsInput>
  }

  export type PredictionCreateNestedOneWithoutLikesInput = {
    create?: XOR<PredictionCreateWithoutLikesInput, PredictionUncheckedCreateWithoutLikesInput>
    connectOrCreate?: PredictionCreateOrConnectWithoutLikesInput
    connect?: PredictionWhereUniqueInput
  }

  export type PredictionUpdateOneRequiredWithoutLikesNestedInput = {
    create?: XOR<PredictionCreateWithoutLikesInput, PredictionUncheckedCreateWithoutLikesInput>
    connectOrCreate?: PredictionCreateOrConnectWithoutLikesInput
    upsert?: PredictionUpsertWithoutLikesInput
    connect?: PredictionWhereUniqueInput
    update?: XOR<XOR<PredictionUpdateToOneWithWhereWithoutLikesInput, PredictionUpdateWithoutLikesInput>, PredictionUncheckedUpdateWithoutLikesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumPredictionCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.PredictionCategory | EnumPredictionCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.PredictionCategory[] | ListEnumPredictionCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.PredictionCategory[] | ListEnumPredictionCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumPredictionCategoryFilter<$PrismaModel> | $Enums.PredictionCategory
  }

  export type NestedEnumPredictionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PredictionStatus | EnumPredictionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PredictionStatus[] | ListEnumPredictionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PredictionStatus[] | ListEnumPredictionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPredictionStatusFilter<$PrismaModel> | $Enums.PredictionStatus
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumPredictionCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PredictionCategory | EnumPredictionCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.PredictionCategory[] | ListEnumPredictionCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.PredictionCategory[] | ListEnumPredictionCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumPredictionCategoryWithAggregatesFilter<$PrismaModel> | $Enums.PredictionCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPredictionCategoryFilter<$PrismaModel>
    _max?: NestedEnumPredictionCategoryFilter<$PrismaModel>
  }

  export type NestedEnumPredictionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PredictionStatus | EnumPredictionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PredictionStatus[] | ListEnumPredictionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PredictionStatus[] | ListEnumPredictionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPredictionStatusWithAggregatesFilter<$PrismaModel> | $Enums.PredictionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPredictionStatusFilter<$PrismaModel>
    _max?: NestedEnumPredictionStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type BetCreateWithoutPredictionInput = {
    id?: string
    userAddress: string
    userName?: string | null
    userImage?: string | null
    amount: number
    position: boolean
    createdAt?: Date | string
    transactionHash?: string | null
  }

  export type BetUncheckedCreateWithoutPredictionInput = {
    id?: string
    userAddress: string
    userName?: string | null
    userImage?: string | null
    amount: number
    position: boolean
    createdAt?: Date | string
    transactionHash?: string | null
  }

  export type BetCreateOrConnectWithoutPredictionInput = {
    where: BetWhereUniqueInput
    create: XOR<BetCreateWithoutPredictionInput, BetUncheckedCreateWithoutPredictionInput>
  }

  export type BetCreateManyPredictionInputEnvelope = {
    data: BetCreateManyPredictionInput | BetCreateManyPredictionInput[]
    skipDuplicates?: boolean
  }

  export type CommentCreateWithoutPredictionInput = {
    id?: string
    userAddress: string
    userName?: string | null
    userImage?: string | null
    content: string
    createdAt?: Date | string
  }

  export type CommentUncheckedCreateWithoutPredictionInput = {
    id?: string
    userAddress: string
    userName?: string | null
    userImage?: string | null
    content: string
    createdAt?: Date | string
  }

  export type CommentCreateOrConnectWithoutPredictionInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutPredictionInput, CommentUncheckedCreateWithoutPredictionInput>
  }

  export type CommentCreateManyPredictionInputEnvelope = {
    data: CommentCreateManyPredictionInput | CommentCreateManyPredictionInput[]
    skipDuplicates?: boolean
  }

  export type LikeCreateWithoutPredictionInput = {
    id?: string
    userAddress: string
    userName?: string | null
    userImage?: string | null
    createdAt?: Date | string
  }

  export type LikeUncheckedCreateWithoutPredictionInput = {
    id?: string
    userAddress: string
    userName?: string | null
    userImage?: string | null
    createdAt?: Date | string
  }

  export type LikeCreateOrConnectWithoutPredictionInput = {
    where: LikeWhereUniqueInput
    create: XOR<LikeCreateWithoutPredictionInput, LikeUncheckedCreateWithoutPredictionInput>
  }

  export type LikeCreateManyPredictionInputEnvelope = {
    data: LikeCreateManyPredictionInput | LikeCreateManyPredictionInput[]
    skipDuplicates?: boolean
  }

  export type BetUpsertWithWhereUniqueWithoutPredictionInput = {
    where: BetWhereUniqueInput
    update: XOR<BetUpdateWithoutPredictionInput, BetUncheckedUpdateWithoutPredictionInput>
    create: XOR<BetCreateWithoutPredictionInput, BetUncheckedCreateWithoutPredictionInput>
  }

  export type BetUpdateWithWhereUniqueWithoutPredictionInput = {
    where: BetWhereUniqueInput
    data: XOR<BetUpdateWithoutPredictionInput, BetUncheckedUpdateWithoutPredictionInput>
  }

  export type BetUpdateManyWithWhereWithoutPredictionInput = {
    where: BetScalarWhereInput
    data: XOR<BetUpdateManyMutationInput, BetUncheckedUpdateManyWithoutPredictionInput>
  }

  export type BetScalarWhereInput = {
    AND?: BetScalarWhereInput | BetScalarWhereInput[]
    OR?: BetScalarWhereInput[]
    NOT?: BetScalarWhereInput | BetScalarWhereInput[]
    id?: StringFilter<"Bet"> | string
    predictionId?: StringFilter<"Bet"> | string
    userAddress?: StringFilter<"Bet"> | string
    userName?: StringNullableFilter<"Bet"> | string | null
    userImage?: StringNullableFilter<"Bet"> | string | null
    amount?: FloatFilter<"Bet"> | number
    position?: BoolFilter<"Bet"> | boolean
    createdAt?: DateTimeFilter<"Bet"> | Date | string
    transactionHash?: StringNullableFilter<"Bet"> | string | null
  }

  export type CommentUpsertWithWhereUniqueWithoutPredictionInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutPredictionInput, CommentUncheckedUpdateWithoutPredictionInput>
    create: XOR<CommentCreateWithoutPredictionInput, CommentUncheckedCreateWithoutPredictionInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutPredictionInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutPredictionInput, CommentUncheckedUpdateWithoutPredictionInput>
  }

  export type CommentUpdateManyWithWhereWithoutPredictionInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutPredictionInput>
  }

  export type CommentScalarWhereInput = {
    AND?: CommentScalarWhereInput | CommentScalarWhereInput[]
    OR?: CommentScalarWhereInput[]
    NOT?: CommentScalarWhereInput | CommentScalarWhereInput[]
    id?: StringFilter<"Comment"> | string
    predictionId?: StringFilter<"Comment"> | string
    userAddress?: StringFilter<"Comment"> | string
    userName?: StringNullableFilter<"Comment"> | string | null
    userImage?: StringNullableFilter<"Comment"> | string | null
    content?: StringFilter<"Comment"> | string
    createdAt?: DateTimeFilter<"Comment"> | Date | string
  }

  export type LikeUpsertWithWhereUniqueWithoutPredictionInput = {
    where: LikeWhereUniqueInput
    update: XOR<LikeUpdateWithoutPredictionInput, LikeUncheckedUpdateWithoutPredictionInput>
    create: XOR<LikeCreateWithoutPredictionInput, LikeUncheckedCreateWithoutPredictionInput>
  }

  export type LikeUpdateWithWhereUniqueWithoutPredictionInput = {
    where: LikeWhereUniqueInput
    data: XOR<LikeUpdateWithoutPredictionInput, LikeUncheckedUpdateWithoutPredictionInput>
  }

  export type LikeUpdateManyWithWhereWithoutPredictionInput = {
    where: LikeScalarWhereInput
    data: XOR<LikeUpdateManyMutationInput, LikeUncheckedUpdateManyWithoutPredictionInput>
  }

  export type LikeScalarWhereInput = {
    AND?: LikeScalarWhereInput | LikeScalarWhereInput[]
    OR?: LikeScalarWhereInput[]
    NOT?: LikeScalarWhereInput | LikeScalarWhereInput[]
    id?: StringFilter<"Like"> | string
    predictionId?: StringFilter<"Like"> | string
    userAddress?: StringFilter<"Like"> | string
    userName?: StringNullableFilter<"Like"> | string | null
    userImage?: StringNullableFilter<"Like"> | string | null
    createdAt?: DateTimeFilter<"Like"> | Date | string
  }

  export type PredictionCreateWithoutBetsInput = {
    id?: string
    creatorAddress: string
    creatorName?: string | null
    creatorImage?: string | null
    content: string
    category: $Enums.PredictionCategory
    status?: $Enums.PredictionStatus
    createdAt?: Date | string
    expiresAt: Date | string
    resolvedAt?: Date | string | null
    contractAddress?: string | null
    targetPrice?: string | null
    comparisonOperator?: string | null
    tokenSymbol?: string | null
    totalBetsTrue?: number
    totalBetsFalse?: number
    isPending?: boolean
    hasError?: boolean
    errorMessage?: string | null
    comments?: CommentCreateNestedManyWithoutPredictionInput
    likes?: LikeCreateNestedManyWithoutPredictionInput
  }

  export type PredictionUncheckedCreateWithoutBetsInput = {
    id?: string
    creatorAddress: string
    creatorName?: string | null
    creatorImage?: string | null
    content: string
    category: $Enums.PredictionCategory
    status?: $Enums.PredictionStatus
    createdAt?: Date | string
    expiresAt: Date | string
    resolvedAt?: Date | string | null
    contractAddress?: string | null
    targetPrice?: string | null
    comparisonOperator?: string | null
    tokenSymbol?: string | null
    totalBetsTrue?: number
    totalBetsFalse?: number
    isPending?: boolean
    hasError?: boolean
    errorMessage?: string | null
    comments?: CommentUncheckedCreateNestedManyWithoutPredictionInput
    likes?: LikeUncheckedCreateNestedManyWithoutPredictionInput
  }

  export type PredictionCreateOrConnectWithoutBetsInput = {
    where: PredictionWhereUniqueInput
    create: XOR<PredictionCreateWithoutBetsInput, PredictionUncheckedCreateWithoutBetsInput>
  }

  export type PredictionUpsertWithoutBetsInput = {
    update: XOR<PredictionUpdateWithoutBetsInput, PredictionUncheckedUpdateWithoutBetsInput>
    create: XOR<PredictionCreateWithoutBetsInput, PredictionUncheckedCreateWithoutBetsInput>
    where?: PredictionWhereInput
  }

  export type PredictionUpdateToOneWithWhereWithoutBetsInput = {
    where?: PredictionWhereInput
    data: XOR<PredictionUpdateWithoutBetsInput, PredictionUncheckedUpdateWithoutBetsInput>
  }

  export type PredictionUpdateWithoutBetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorAddress?: StringFieldUpdateOperationsInput | string
    creatorName?: NullableStringFieldUpdateOperationsInput | string | null
    creatorImage?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    category?: EnumPredictionCategoryFieldUpdateOperationsInput | $Enums.PredictionCategory
    status?: EnumPredictionStatusFieldUpdateOperationsInput | $Enums.PredictionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    targetPrice?: NullableStringFieldUpdateOperationsInput | string | null
    comparisonOperator?: NullableStringFieldUpdateOperationsInput | string | null
    tokenSymbol?: NullableStringFieldUpdateOperationsInput | string | null
    totalBetsTrue?: FloatFieldUpdateOperationsInput | number
    totalBetsFalse?: FloatFieldUpdateOperationsInput | number
    isPending?: BoolFieldUpdateOperationsInput | boolean
    hasError?: BoolFieldUpdateOperationsInput | boolean
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: CommentUpdateManyWithoutPredictionNestedInput
    likes?: LikeUpdateManyWithoutPredictionNestedInput
  }

  export type PredictionUncheckedUpdateWithoutBetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorAddress?: StringFieldUpdateOperationsInput | string
    creatorName?: NullableStringFieldUpdateOperationsInput | string | null
    creatorImage?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    category?: EnumPredictionCategoryFieldUpdateOperationsInput | $Enums.PredictionCategory
    status?: EnumPredictionStatusFieldUpdateOperationsInput | $Enums.PredictionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    targetPrice?: NullableStringFieldUpdateOperationsInput | string | null
    comparisonOperator?: NullableStringFieldUpdateOperationsInput | string | null
    tokenSymbol?: NullableStringFieldUpdateOperationsInput | string | null
    totalBetsTrue?: FloatFieldUpdateOperationsInput | number
    totalBetsFalse?: FloatFieldUpdateOperationsInput | number
    isPending?: BoolFieldUpdateOperationsInput | boolean
    hasError?: BoolFieldUpdateOperationsInput | boolean
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: CommentUncheckedUpdateManyWithoutPredictionNestedInput
    likes?: LikeUncheckedUpdateManyWithoutPredictionNestedInput
  }

  export type PredictionCreateWithoutCommentsInput = {
    id?: string
    creatorAddress: string
    creatorName?: string | null
    creatorImage?: string | null
    content: string
    category: $Enums.PredictionCategory
    status?: $Enums.PredictionStatus
    createdAt?: Date | string
    expiresAt: Date | string
    resolvedAt?: Date | string | null
    contractAddress?: string | null
    targetPrice?: string | null
    comparisonOperator?: string | null
    tokenSymbol?: string | null
    totalBetsTrue?: number
    totalBetsFalse?: number
    isPending?: boolean
    hasError?: boolean
    errorMessage?: string | null
    bets?: BetCreateNestedManyWithoutPredictionInput
    likes?: LikeCreateNestedManyWithoutPredictionInput
  }

  export type PredictionUncheckedCreateWithoutCommentsInput = {
    id?: string
    creatorAddress: string
    creatorName?: string | null
    creatorImage?: string | null
    content: string
    category: $Enums.PredictionCategory
    status?: $Enums.PredictionStatus
    createdAt?: Date | string
    expiresAt: Date | string
    resolvedAt?: Date | string | null
    contractAddress?: string | null
    targetPrice?: string | null
    comparisonOperator?: string | null
    tokenSymbol?: string | null
    totalBetsTrue?: number
    totalBetsFalse?: number
    isPending?: boolean
    hasError?: boolean
    errorMessage?: string | null
    bets?: BetUncheckedCreateNestedManyWithoutPredictionInput
    likes?: LikeUncheckedCreateNestedManyWithoutPredictionInput
  }

  export type PredictionCreateOrConnectWithoutCommentsInput = {
    where: PredictionWhereUniqueInput
    create: XOR<PredictionCreateWithoutCommentsInput, PredictionUncheckedCreateWithoutCommentsInput>
  }

  export type PredictionUpsertWithoutCommentsInput = {
    update: XOR<PredictionUpdateWithoutCommentsInput, PredictionUncheckedUpdateWithoutCommentsInput>
    create: XOR<PredictionCreateWithoutCommentsInput, PredictionUncheckedCreateWithoutCommentsInput>
    where?: PredictionWhereInput
  }

  export type PredictionUpdateToOneWithWhereWithoutCommentsInput = {
    where?: PredictionWhereInput
    data: XOR<PredictionUpdateWithoutCommentsInput, PredictionUncheckedUpdateWithoutCommentsInput>
  }

  export type PredictionUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorAddress?: StringFieldUpdateOperationsInput | string
    creatorName?: NullableStringFieldUpdateOperationsInput | string | null
    creatorImage?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    category?: EnumPredictionCategoryFieldUpdateOperationsInput | $Enums.PredictionCategory
    status?: EnumPredictionStatusFieldUpdateOperationsInput | $Enums.PredictionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    targetPrice?: NullableStringFieldUpdateOperationsInput | string | null
    comparisonOperator?: NullableStringFieldUpdateOperationsInput | string | null
    tokenSymbol?: NullableStringFieldUpdateOperationsInput | string | null
    totalBetsTrue?: FloatFieldUpdateOperationsInput | number
    totalBetsFalse?: FloatFieldUpdateOperationsInput | number
    isPending?: BoolFieldUpdateOperationsInput | boolean
    hasError?: BoolFieldUpdateOperationsInput | boolean
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    bets?: BetUpdateManyWithoutPredictionNestedInput
    likes?: LikeUpdateManyWithoutPredictionNestedInput
  }

  export type PredictionUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorAddress?: StringFieldUpdateOperationsInput | string
    creatorName?: NullableStringFieldUpdateOperationsInput | string | null
    creatorImage?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    category?: EnumPredictionCategoryFieldUpdateOperationsInput | $Enums.PredictionCategory
    status?: EnumPredictionStatusFieldUpdateOperationsInput | $Enums.PredictionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    targetPrice?: NullableStringFieldUpdateOperationsInput | string | null
    comparisonOperator?: NullableStringFieldUpdateOperationsInput | string | null
    tokenSymbol?: NullableStringFieldUpdateOperationsInput | string | null
    totalBetsTrue?: FloatFieldUpdateOperationsInput | number
    totalBetsFalse?: FloatFieldUpdateOperationsInput | number
    isPending?: BoolFieldUpdateOperationsInput | boolean
    hasError?: BoolFieldUpdateOperationsInput | boolean
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    bets?: BetUncheckedUpdateManyWithoutPredictionNestedInput
    likes?: LikeUncheckedUpdateManyWithoutPredictionNestedInput
  }

  export type PredictionCreateWithoutLikesInput = {
    id?: string
    creatorAddress: string
    creatorName?: string | null
    creatorImage?: string | null
    content: string
    category: $Enums.PredictionCategory
    status?: $Enums.PredictionStatus
    createdAt?: Date | string
    expiresAt: Date | string
    resolvedAt?: Date | string | null
    contractAddress?: string | null
    targetPrice?: string | null
    comparisonOperator?: string | null
    tokenSymbol?: string | null
    totalBetsTrue?: number
    totalBetsFalse?: number
    isPending?: boolean
    hasError?: boolean
    errorMessage?: string | null
    bets?: BetCreateNestedManyWithoutPredictionInput
    comments?: CommentCreateNestedManyWithoutPredictionInput
  }

  export type PredictionUncheckedCreateWithoutLikesInput = {
    id?: string
    creatorAddress: string
    creatorName?: string | null
    creatorImage?: string | null
    content: string
    category: $Enums.PredictionCategory
    status?: $Enums.PredictionStatus
    createdAt?: Date | string
    expiresAt: Date | string
    resolvedAt?: Date | string | null
    contractAddress?: string | null
    targetPrice?: string | null
    comparisonOperator?: string | null
    tokenSymbol?: string | null
    totalBetsTrue?: number
    totalBetsFalse?: number
    isPending?: boolean
    hasError?: boolean
    errorMessage?: string | null
    bets?: BetUncheckedCreateNestedManyWithoutPredictionInput
    comments?: CommentUncheckedCreateNestedManyWithoutPredictionInput
  }

  export type PredictionCreateOrConnectWithoutLikesInput = {
    where: PredictionWhereUniqueInput
    create: XOR<PredictionCreateWithoutLikesInput, PredictionUncheckedCreateWithoutLikesInput>
  }

  export type PredictionUpsertWithoutLikesInput = {
    update: XOR<PredictionUpdateWithoutLikesInput, PredictionUncheckedUpdateWithoutLikesInput>
    create: XOR<PredictionCreateWithoutLikesInput, PredictionUncheckedCreateWithoutLikesInput>
    where?: PredictionWhereInput
  }

  export type PredictionUpdateToOneWithWhereWithoutLikesInput = {
    where?: PredictionWhereInput
    data: XOR<PredictionUpdateWithoutLikesInput, PredictionUncheckedUpdateWithoutLikesInput>
  }

  export type PredictionUpdateWithoutLikesInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorAddress?: StringFieldUpdateOperationsInput | string
    creatorName?: NullableStringFieldUpdateOperationsInput | string | null
    creatorImage?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    category?: EnumPredictionCategoryFieldUpdateOperationsInput | $Enums.PredictionCategory
    status?: EnumPredictionStatusFieldUpdateOperationsInput | $Enums.PredictionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    targetPrice?: NullableStringFieldUpdateOperationsInput | string | null
    comparisonOperator?: NullableStringFieldUpdateOperationsInput | string | null
    tokenSymbol?: NullableStringFieldUpdateOperationsInput | string | null
    totalBetsTrue?: FloatFieldUpdateOperationsInput | number
    totalBetsFalse?: FloatFieldUpdateOperationsInput | number
    isPending?: BoolFieldUpdateOperationsInput | boolean
    hasError?: BoolFieldUpdateOperationsInput | boolean
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    bets?: BetUpdateManyWithoutPredictionNestedInput
    comments?: CommentUpdateManyWithoutPredictionNestedInput
  }

  export type PredictionUncheckedUpdateWithoutLikesInput = {
    id?: StringFieldUpdateOperationsInput | string
    creatorAddress?: StringFieldUpdateOperationsInput | string
    creatorName?: NullableStringFieldUpdateOperationsInput | string | null
    creatorImage?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    category?: EnumPredictionCategoryFieldUpdateOperationsInput | $Enums.PredictionCategory
    status?: EnumPredictionStatusFieldUpdateOperationsInput | $Enums.PredictionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    targetPrice?: NullableStringFieldUpdateOperationsInput | string | null
    comparisonOperator?: NullableStringFieldUpdateOperationsInput | string | null
    tokenSymbol?: NullableStringFieldUpdateOperationsInput | string | null
    totalBetsTrue?: FloatFieldUpdateOperationsInput | number
    totalBetsFalse?: FloatFieldUpdateOperationsInput | number
    isPending?: BoolFieldUpdateOperationsInput | boolean
    hasError?: BoolFieldUpdateOperationsInput | boolean
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    bets?: BetUncheckedUpdateManyWithoutPredictionNestedInput
    comments?: CommentUncheckedUpdateManyWithoutPredictionNestedInput
  }

  export type BetCreateManyPredictionInput = {
    id?: string
    userAddress: string
    userName?: string | null
    userImage?: string | null
    amount: number
    position: boolean
    createdAt?: Date | string
    transactionHash?: string | null
  }

  export type CommentCreateManyPredictionInput = {
    id?: string
    userAddress: string
    userName?: string | null
    userImage?: string | null
    content: string
    createdAt?: Date | string
  }

  export type LikeCreateManyPredictionInput = {
    id?: string
    userAddress: string
    userName?: string | null
    userImage?: string | null
    createdAt?: Date | string
  }

  export type BetUpdateWithoutPredictionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    userImage?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    position?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BetUncheckedUpdateWithoutPredictionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    userImage?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    position?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BetUncheckedUpdateManyWithoutPredictionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    userImage?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    position?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CommentUpdateWithoutPredictionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    userImage?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateWithoutPredictionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    userImage?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyWithoutPredictionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    userImage?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LikeUpdateWithoutPredictionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    userImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LikeUncheckedUpdateWithoutPredictionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    userImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LikeUncheckedUpdateManyWithoutPredictionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userAddress?: StringFieldUpdateOperationsInput | string
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    userImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}