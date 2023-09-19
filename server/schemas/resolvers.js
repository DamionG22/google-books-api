const { Book } = require('../models');

const resolvers = {
  Query: {
    tech: async () => {
      return Book.find({});
    }
}
}