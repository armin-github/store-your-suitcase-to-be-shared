import {z} from "zod";


export const LuggageFormSchema = z.object({
    color: z.string().trim().min(3, {message: 'color should be at least three characters long.'}),
    length: z.coerce.number().int().positive().min(1, {message: 'length should be at least one centimeter long.'}).max(100, {message: 'length should be at most one hundred centimeters long.'}),
    width: z.coerce.number().int().positive().min(1, {message: 'width should be at least one centimeter long.'}).max(100, {message: 'width should be at most one hundred centimeters long.'}),
    height: z.coerce.number().int().positive().min(1, {message: 'height should be at least one centimeter long.'}).max(100, {message: 'height should be at most one hundred centimeters long.'}),
    weight: z.coerce.number().int().positive().min(1, {message: 'weight should be at least one kilogram.'}).max(100, {message: 'weight should be at most one hundred kilograms.'}),
    ownerName: z.string().trim().min(3, {message: 'name should be at least three characters long.'}).max(50, {message: 'name should be at most fifty characters long.'}),
    notes: z.union([z.literal(''), z.string().trim().max(400, {message: 'Notes max. length is 400 characters long.'})]),

})


export const AuthSchema = z.object({
    email: z.string().trim().email().max(70, {message: 'email should be at most seventy characters long.'}),
    password: z.string().min(6, {message: 'password should be at least six characters long.'}).max(50, {message: 'password should be at most fifty characters long.'}),
})