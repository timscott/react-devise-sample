RootQuery = GraphQL::ObjectType.define do
  name 'RootQuery'
  description 'The query root of this schema'
  field :hello do
    type !types.String
    resolve -> obj, args, context { 'World' }
  end
end
