import AWS from "aws-sdk";
import type { NextApiRequest, NextApiResponse } from "next";

const S3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});
const params = {
  Bucket: process.env.S3_BUCKET_NAME as string,
  Key: "co2-data",
};

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await S3.getObject(params).promise();
  const climateData = response?.Body
    ? JSON.parse(response?.Body?.toString())
    : [];
  res.status(200).json(climateData);
}
