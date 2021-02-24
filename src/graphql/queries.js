/* eslint-disable */
// this is an auto generated file. This will be overwritten

/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDoge = /* GraphQL */ `
  query GetDoge {
    getDoge(id: "1") {
      id
      price
      
    }
  }
`;
export const listDoges = /* GraphQL */ `
  query ListDoges(
    $filter: ModelDogeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDoges(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        price
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;