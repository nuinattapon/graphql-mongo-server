import mongoose, { model, Schema } from 'mongoose'

export const Cat = mongoose.model('Cat', { name: String })

export const Dog = mongoose.model('Dog', { name: String })
