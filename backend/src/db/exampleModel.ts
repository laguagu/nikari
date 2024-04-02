import { connect } from "./connect";

const users = async () => {
  const db = await connect();
  if (!db) {
    throw new Error("Database connection failed");
  }
  const users = db.collection("users");

  //find all data and return an array
  const fetchData = async () => {
    try {
      const result = await users.find().toArray();
      return result;
    } catch (error) {
      console.error("Connection to test db failed with status code 101");
      throw error;
    }
  };

  const fetchOne = async (id: string | number) => {
    try {
      const result = await users.findOne({ forwardedId: id });
      return result;
    } catch (error) {
      console.error(
        "Connection to productInfo document failed with status code 100: ",
        error
      );
      throw error;
    }
  };

  //add one datacell to document
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addData = async (productData: any) => {
    try {
      const result = await users.insertOne(productData);
      console.log("new data added to users");

      return result;
    } catch (error) {
      console.error("Connection to test db failed with status code 102");
      throw error;
    }
  };

  return {
    fetchOne,
    fetchData,
    addData,
  };
};

export default users;
