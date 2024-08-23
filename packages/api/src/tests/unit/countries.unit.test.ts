import { getCountryById } from "src/modules/countries/controllers/countryController"; // Assuming the file and function names change accordingly
import { getDb } from "src/config/database";
import { ObjectId } from "mongodb";

jest.mock("src/config/database");

describe("getCountryById", () => {
  const mockDb = {
    collection: jest.fn().mockReturnThis(),
    findOne: jest.fn(),
  };

  beforeEach(() => {
    (getDb as jest.Mock).mockReturnValue(mockDb);
  });

  it("should return a country when given a valid ID", async () => {
    const country = { _id: new ObjectId(), name: "Test Country" };
    mockDb.findOne.mockResolvedValue(country);

    const result = await getCountryById(country._id.toHexString());

    expect(result).toEqual(country);
    expect(mockDb.collection).toHaveBeenCalledWith("countries"); // Change to "countries"
    expect(mockDb.findOne).toHaveBeenCalledWith({ _id: country._id });
  });

  it("should throw an error for an invalid ID", async () => {
    await expect(getCountryById("invalid-id")).rejects.toThrow(
      "Invalid ID format"
    );
  });

  it("should return null if the country is not found", async () => {
    mockDb.findOne.mockResolvedValue(null);
  
    const result = await getCountryById(new ObjectId().toHexString());
  
    expect(result).toBeNull();
  });
});