import { getHotelById, getHotels, searchAccommodations } from "src/modules/hotels/controllers/hotelController";
import { getDb } from "src/config/database";
import { HttpError } from "src/utils/errors";
import { ObjectId } from "mongodb";

jest.mock("src/config/database");

describe("getHotels", () => {
  it("should throw an error if the page or pageSize is invalid", async () => {
    await expect(getHotels(NaN, 10)).rejects.toThrow(HttpError);
    await expect(getHotels(1, NaN)).rejects.toThrow(HttpError);
  });

  it("should throw an error if the database connection is not established", async () => {
    (getDb as jest.Mock).mockReturnValue(null);
    await expect(getHotels(1, 10)).rejects.toThrow("Database connection is not established");
  });

  it("should return hotels and total count", async () => {
    const mockDb = {
      collection: jest.fn().mockReturnThis(),
      countDocuments: jest.fn().mockResolvedValue(100),
      find: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      toArray: jest.fn().mockResolvedValue([{ name: "Hotel 1" }]),
    };
    (getDb as jest.Mock).mockReturnValue(mockDb);

    const { hotels, total } = await getHotels(1, 10);

    expect(total).toBe(100);
    expect(hotels).toEqual([{ name: "Hotel 1" }]);
  });
});

describe("searchAccommodations", () => {
  it("should throw an error if the query parameter is missing", async () => {
    await expect(searchAccommodations("")).rejects.toThrow(HttpError);
  });

  it("should throw an error if the database connection is not established", async () => {
    (getDb as jest.Mock).mockReturnValue(null);
    await expect(searchAccommodations("test")).rejects.toThrow("Database connection is not established");
  });

  it("should return matching accommodations", async () => {
    const mockDb = {
      collection: jest.fn().mockReturnThis(),
      find: jest.fn().mockReturnThis(),
      toArray: jest.fn().mockResolvedValue([{ name: "Test Hotel" }]),
    };
    (getDb as jest.Mock).mockReturnValue(mockDb);

    const results = await searchAccommodations("test");

    expect(results).toEqual({
      hotels: [{ name: "Test Hotel" }],
      countries: [{ name: "Test Hotel" }],
      cities: [{ name: "Test Hotel" }],
    });
  });
});

describe("getHotelById", () => {
  it("should throw an error if the ID format is invalid", async () => {
    await expect(getHotelById("invalid-id")).rejects.toThrow(HttpError);
  });

  it("should throw an error if the database connection is not established", async () => {
    (getDb as jest.Mock).mockReturnValue(null);
    await expect(getHotelById(new ObjectId().toString())).rejects.toThrow("Database connection is not established");
  });

  it("should return the hotel when given a valid ID", async () => {
    const mockDb = {
      collection: jest.fn().mockReturnThis(),
      findOne: jest.fn().mockResolvedValue({ name: "Test Hotel" }),
    };
    (getDb as jest.Mock).mockReturnValue(mockDb);

    const hotel = await getHotelById(new ObjectId().toString());

    expect(hotel).toEqual({ name: "Test Hotel" });
  });
});