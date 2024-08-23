import { getCityById } from "src/modules/cities/controllers/cityController";
import { getDb } from "src/config/database";
import { ObjectId } from "mongodb";

jest.mock("src/config/database");

describe("getCityById", () => {
  const mockDb = {
    collection: jest.fn().mockReturnThis(),
    findOne: jest.fn(),
  };

  beforeEach(() => {
    (getDb as jest.Mock).mockReturnValue(mockDb);
  });

  it("should return a city when given a valid ID", async () => {
    const city = { _id: new ObjectId(), name: "Test City" };
    mockDb.findOne.mockResolvedValue(city);

    const result = await getCityById(city._id.toHexString());

    expect(result).toEqual(city);
    expect(mockDb.collection).toHaveBeenCalledWith("cities");
    expect(mockDb.findOne).toHaveBeenCalledWith({ _id: city._id });
  });

  it("should throw an error for an invalid ID", async () => {
    await expect(getCityById("invalid-id")).rejects.toThrow(
      "Invalid ID format"
    );
  });

  it("should return null if the city is not found", async () => {
    mockDb.findOne.mockResolvedValue(null);
  
    const result = await getCityById(new ObjectId().toHexString());
  
    expect(result).toBeNull();
  });
});
