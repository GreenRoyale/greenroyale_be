import { z } from "zod";
import { RECYCLINGMATERIALENUM } from "../entities/recycling-material.entity";
const materialSchema = z.object({
  materialType: z.nativeEnum(RECYCLINGMATERIALENUM),
  quantity: z.number().positive().min(1),
});

const recyclingSchema = z.object({
  materials: z.array(materialSchema),
});

type IRecyclingSchema = z.infer<typeof recyclingSchema>;
export { IRecyclingSchema, recyclingSchema };
