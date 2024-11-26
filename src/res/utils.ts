import USER_MODEL from "../API/Models/user.model";

const findUserByID = async (id: string) => {
  try {
    const user = await USER_MODEL.findById(id);
    return user;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("user was no found", errorMessage);
    return errorMessage || null;
  }
};

export default findUserByID;
