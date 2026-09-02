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
  private pickedSchema: any;

  constructor(schema: ZodObject, picked: picked<any>) {
    this.schema = schema;
    this.picked = picked;

    /** so type can be inferred on return values. Just abstract schema not implemented with concrete data  */
    this.pickedSchema = this.schema.pick(this.picked);
  }

  /**
   * Of type schema
   *
   * returns a type of pickedSchema from constructor
   *
   * Picks wanted data then adds them to the schema structure
   * @function
   */
  getParsedObject(
    data: z.infer<typeof this.schema>,
  ): z.infer<typeof this.pickedSchema> {
    const parsedData = this.schema.pick(this.picked).parse(data);

    return parsedData;
  }

  /**
   * Of type schema
   *
   * returns a type of pickedSchema array from constructor
   *
   * Picks wanted data then adds them to the schema structure
   * @function
   */
  getParsedArray(
    dataArray: z.infer<(typeof this.schema)[]>,
  ): z.infer<(typeof this.pickedSchema)[]> {
    const pickedSchema = this.schema.pick(this.picked);

    const pickedSchemaArray = z.array(pickedSchema);

    const parsedArray = pickedSchemaArray.parse(dataArray);

    return parsedArray;
  }
}

export { PickSchemaValues };
