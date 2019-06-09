import { DataMapper } from '@aws/dynamodb-data-mapper';
import * as aws from 'aws-sdk';

export interface Db {
  document: aws.DynamoDB.DocumentClient;
  database: aws.DynamoDB;
  mapper: DataMapper;
}

export const createDb = (config: {
  endpoint?: string;
  tablePrefix: string;
}): Db => {
  const { AWS_ENDPOINT, AWS_DEFAULT_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

  const configOptions = {
    endpoint: AWS_ENDPOINT,
    region: AWS_DEFAULT_REGION,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  }

  const database = new aws.DynamoDB(configOptions);

  return {
    document: new aws.DynamoDB.DocumentClient(configOptions),
    mapper: new DataMapper({
      client: database,
      tableNamePrefix: config.tablePrefix + '-',
    }),
    database,
  };
};

export const generateKey = (tableName: string) => tableName + Date.now().toString();

export const getItemList = async <T>(iterator: AsyncIterableIterator<T>) => {
  const result: T[] = [];
  for await (const item of iterator) {
    result.push(item);
  }
  return result;
};
