import { Cat, Dog } from "../models"

const resolvers = {
  Query: {
    hello: () => "hi",
    cats: () => Cat.find(),
    dogs: () => Dog.find()
  },
  Mutation: {
    createCat: async (_, { name }) => {
      const kitty = new Cat({ name })
      await kitty.save()
      return kitty
    },
    createDog: async (_, { name }) => {
      const puppy = new Dog({ name })
      await puppy.save()
      return puppy
    }
  }
}

export default resolvers
