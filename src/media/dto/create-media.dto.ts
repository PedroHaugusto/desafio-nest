import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import * as Joi from 'joi';

@JoiSchemaOptions({ allowUnknown: false })
export class CreateMediaDto {
  @JoiSchema(Joi.string().required())
  title: string;

  @JoiSchema(Joi.string().required())
  description: string;

  @JoiSchema(Joi.string().valid('movie', 'series').required())
  type: 'movie' | 'series';

  @JoiSchema(Joi.number().integer().min(1900).max(2100).required())
  releaseYear: number;

  @JoiSchema(Joi.string().required())
  genre: string;
}