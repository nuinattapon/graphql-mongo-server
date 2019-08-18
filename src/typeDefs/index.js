import { gql } from "apollo-server-express"

// import fs and paht and we will use it to parse .graphql file
import fs from "fs"
import path from "path"

// * graphql typeDefs from schema.graphql file
const schema = fs.readFileSync(path.join(__dirname, "schema.gql"), "utf8")
const typeDefs = gql`
  ${schema}
`

export default typeDefs
