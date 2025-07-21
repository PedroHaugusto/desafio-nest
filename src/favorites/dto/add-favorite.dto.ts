import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import * as Joi from 'joi';

@JoiSchemaOptions({ allowUnknown: false })
export class AddFavoriteDto {
  @JoiSchema(Joi.string().uuid().required())
  mediaId: string;
}