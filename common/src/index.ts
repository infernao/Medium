import z from 'zod'

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
})
export type SignupInput = z.infer<typeof signupInput>
//good  for frontend to know the type of signup inputs.

export const SigninInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export type SigninInput = z.infer<typeof SigninInput>

export const createPostInput = z.object({
    title: z.string(),
    content: z.string(),
})

export type CreatePostInput = z.infer<typeof createPostInput>