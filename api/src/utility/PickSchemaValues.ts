/**
 * Defines a zod oject on construction
 *
 * Can pick schema data to add from a response request
 *
 * Can return the parsed object or an array of them
 *
 * @module
 */

import { z, ZodObject } from "zod";

type picked<T> = {
  [K in keyof T]?: boolean;
};

/**
 * Define the api response with schema
 * and what values you want to keep with picked
 */
class PickSchemaValues {
  private schema: ZodObject;
  private picked: any;

  constructor(schema: ZodObject, picked: picked<string>) {
    this.schema = schema;
    this.picked = picked;
  }

  /**
   * Of type schema
   *
   * Picks wanted data then adds them to the schema structure
   * @param data
   */
  getParsedObject(data: z.infer<typeof this.schema>) {
    const parsedData = this.schema.pick(this.picked).parse(data);

    return parsedData;
  }

  getParsedArray(dataArray: z.infer<(typeof this.schema)[]>) {
    const pickedSchema = this.schema.pick(this.picked);

    const pickedSchemaArray = z.array(pickedSchema);

    const parsedArray = pickedSchemaArray.parse(dataArray);

    return parsedArray;
  }
}

export { PickSchemaValues };
