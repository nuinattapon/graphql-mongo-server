import { Cat, Dog } from '../models'
// import { connectPGDB, pgQuery } from '../config/pgdb'

const resolvers = {
  Query: {
    hello: () => 'hello',
    cats: async () => {
      try {
        const cats = await Cat.find()
        if (!cats) {
          return []
        }
        // if (pgQuery) {
        //   const values = await pgQuery('SELECT NOW() as now')

        //   console.log({ rows: values.rows })
        // }
        return cats
      } catch (err) {
        console.log(err)
        return []
      }
    },
    dogs: async () => {
      try {
        const dogs = await Dog.find()
        if (!dogs) {
          return []
        }

        return dogs
      } catch (err) {
        console.log(err)
        return []
      }
    },
    cat: async (_, { id }) => {
      try {
        const cat = await Cat.findById(id)
        return cat
      } catch (err) {
        console.log(err)
        return null
      }
    },

    dog: async (_, { id }) => {
      try {
        const dog = await Dog.findById(id)
        return dog
      } catch (err) {
        console.log(err)
        return null
      }
    },
  },
  Mutation: {
    createCat: async (_, { name }) => {
      try {
        const kitty = new Cat({ name })
        await kitty.save()
        return kitty
      } catch (err) {
        console.log(err)
        return null
      }
    },
    createDog: async (_, { name }) => {
      try {
        const puppy = new Dog({ name })
        await puppy.save()
        return puppy
      } catch (err) {
        console.log(err)
        return null
      }
    },
    updateCat: async (_, { id, name }) => {
      try {
        const kitty = await Cat.findByIdAndUpdate(id, { name })
        const cat = await Cat.findById(id)
        return cat
      } catch (err) {
        console.log(err)
        return null
      }
    },
    updateDog: async (_, { id, name }) => {
      try {
        const puppy = await Dog.findByIdAndUpdate(id, { name })
        const dog = await Dog.findById(id)
        return dog
      } catch (err) {
        console.log(err)
        return null
      }
    },
    deleteCat: async (_, { id }) => {
      try {
        const cat = await Cat.findByIdAndDelete(id)
        return cat
      } catch (err) {
        console.log(err)
        return null
      }
    },

    deleteDog: async (_, { id }) => {
      try {
        const dog = await Dog.findByIdAndDelete(id)
        return dog
      } catch (err) {
        console.log(err)
        return null
      }
    },
  },
}

export default resolvers
