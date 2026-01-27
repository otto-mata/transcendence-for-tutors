import * as z from "zod"

const authSchema = z.object({
  type: z.literal('auth'),
  token: z.jwt()
});

const watchSchema = z.object({
  type: z.literal('watch'),
  userId: z.coerce.number()
});

const msgSchema = z.object({
  type: z.literal('message'),
  userId: z.coerce.number(),
  message: z.string()
});

export const messageSchema = z.discriminatedUnion('type', [
  authSchema,
  watchSchema,
  msgSchema
]);

export const jwtSchema = z.object({
  userId: z.coerce.number()
});


