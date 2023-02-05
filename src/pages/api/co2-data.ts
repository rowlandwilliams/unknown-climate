import AWS from "aws-sdk";
import type { NextApiRequest, NextApiResponse } from "next";
const S3 = new AWS.S3();

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME as string,
    Key: "co2-data",
  };
  const response = await S3.getObject(params).promise(); // await the promise
  const climateData = response?.Body
    ? JSON.parse(response?.Body?.toString())
    : [];
  res.status(200).json(climateData);
}
