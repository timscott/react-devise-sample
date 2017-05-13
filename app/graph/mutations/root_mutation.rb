RootMutation = GraphQL::ObjectType.define do
  name 'RootMutation'
  field :hello do
    type !types.String
    resolve -> obj, args, context { 'World' }
  end
end
