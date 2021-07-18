using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using NPRDashboard.Models;
using NPRDashboard.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NPRDashboard.Repositories
{
    public class GiftRepository : BaseRepository, IGiftRepository
    {
        public GiftRepository(IConfiguration configuration) : base(configuration) { }

        // Get List of Gifts By PledgeDriveId 
        public List<Gift> GetGiftsByPledgeDriveId(int pledgeDriveId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT g.Id, g.DonorProfileId, g.PledgeDriveId, g.GiftDate, g.Amount, g.DonationTypeId, g.ReasonId, g.MethodId, g.FrequencyId, g.RecurringFrequencyId,    
                        dp.FirstName as FirstName, dp.LastName as LastName, dp.NumberOfGifts as NumberOfGifts,
                        pd.[Name] as PledgeDriveName,
                        dt.[Name] as DonationType,
                        f.[Name] as Frequency
                        FROM Gift g
                        Left Join DonorProfile dp on g.DonorProfileId = dp.Id
                        Left Join PledgeDrive pd on g.PledgeDriveId = pd.Id
                        Left Join [DonationType] dt on g.DonationTypeId = dt.Id
                        Left Join Frequency f on g.FrequencyId = f.Id
                        WHERE g.PledgeDriveId =  @Id
                        ORDER By g.[giftDate]";

                    DbUtils.AddParameter(cmd, "@Id", pledgeDriveId);

                    var reader = cmd.ExecuteReader();

                    var gifts = new List<Gift>();

                    while (reader.Read())
                    {
                        gifts.Add(NewGiftFromDb(reader));
                    }
                    reader.Close();

                    return gifts;
                }
            }
        }

        // Get List Number of Donors Who Gave Number Of Gifts PledgeDriveId 
        public List<KeyValuePair<int, int>> GetNumOfDonAndNumOfGifts(DateTime pledgeDriveEndDate)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Count(*) as NumberOfDonors, SUBQUERY.NumberOfGifts FROM
	                        (SELECT SUBQUERY.DonorProfileId, COUNT(SUBQUERY.Id) as NumberOfGifts FROM
			                        (SELECT g.Id, g.DonorProfileId
			                        FROM Gift g
			                        WHERE GiftDate <= @EndDate) AS SUBQUERY
	                        Group BY SUBQUERY.DonorProfileId) AS SUBQUERY
	                        GROUP BY SUBQUERY.NumberOfGifts";

                    DbUtils.AddParameter(cmd, "@EndDate", pledgeDriveEndDate);

                    var reader = cmd.ExecuteReader();

                    var donorList = new List<KeyValuePair<int, int>> ();

                    while (reader.Read())
                    {
                        donorList.Add(new KeyValuePair<int, int>(DbUtils.GetInt(reader, "NumberOfGifts"), DbUtils.GetInt(reader, "NumberOfDonors")));
                    }
                    reader.Close();

                    return donorList;
                }
            }
        }

        // Get List of Number of Recurring Gifts and One Time Gifts By Pledge Drive 
        public Dictionary<string, int> GetNumOfGiftsByFrequency(int pledgeDriveId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT SUBQUERY.[Name] as FrequencyName, COUNT(SUBQUERY.Id) as NumberOfGifts FROM
			                        (SELECT g.Id, g.FrequencyId, f.[Name]
			                        FROM Gift g
									LEFT JOIN Frequency f on g.FrequencyId = f.Id
			                        WHERE PledgeDriveId = @Id) AS SUBQUERY
	                        Group BY SUBQUERY.[Name]";

                    DbUtils.AddParameter(cmd, "@Id", pledgeDriveId);

                    var reader = cmd.ExecuteReader();

                    var donorList = new Dictionary<string, int>();

                    while (reader.Read())
                    {
                       string FrequencyName = DbUtils.GetString(reader, "FrequencyName");
                       int NumberOfGifts = DbUtils.GetInt(reader, "NumberOfGifts");
                        
                        donorList.Add(FrequencyName, NumberOfGifts);
                    }
                    reader.Close();

                    return donorList;
                }
            }
        }

        // Get List of New Recurring Gifts
        public List<Gift> NewRecurringGifts(DateTime pledgeDriveStartDate, DateTime pledgeDriveEndDate)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT SUBQUERY.DonorProfileId, SUBQUERY.Id, SUBQUERY.FrequencyId, SUBQUERY.GiftDate FROM
	                        (SELECT DonorProfileId, Id, FrequencyId, GiftDate 
		                        FROM Gift
		                        WHERE DonorProfileId IN (
		                        SELECT DonorProfileId
				                        FROM Gift
				                        WHERE GiftDate <= @EndDate
				                        GROUP BY DonorProfileId
				                        HAVING Count(*) >= 2
				                        )
	                        ) AS SUBQUERY
	                    WHERE SUBQUERY.FrequencyId = 2 AND  GiftDate >= @StartDate AND GiftDate <= @EndDate
	                    ORDER BY DonorProfileId, GiftDate";

                    DbUtils.AddParameter(cmd, "@StartDate", pledgeDriveStartDate);
                    DbUtils.AddParameter(cmd, "@EndDate", pledgeDriveEndDate);

                    var reader = cmd.ExecuteReader();

                    var gifts = new List<Gift>();

                    while (reader.Read())
                    {
                        Gift gift = new Gift()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            DonorProfileId = DbUtils.GetInt(reader, "DonorProfileId"),
                            GiftDate = DbUtils.GetDateTime(reader, "GiftDate"),
                            FrequencyId = DbUtils.GetInt(reader, "FrequencyId"),
                        };
                        gifts.Add(gift);
                    }
                    reader.Close();

                    return gifts;
                }
            }
        }


        // Get List of New Recurring Gifts
        public List<Gift> GetListOfOneTimeGiftsBySameDonor(DateTime pledgeDriveEndDate)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                      SELECT SUBQUERY.DonorProfileId, SUBQUERY.FrequencyId, SUBQUERY.Amount, SUBQUERY.Id, SUBQUERY.GiftDate FROM
	                        (SELECT DonorProfileId, Id, FrequencyId, GiftDate, Amount 
		                        FROM Gift
		                        WHERE FrequencyId = 1 AND DonorProfileId IN (
		                        SELECT DonorProfileId
				                        FROM Gift
				                        WHERE FrequencyId = 1 AND GiftDate <= @EndDate
				                        GROUP BY DonorProfileId
				                        HAVING Count(*) >= 2
				                        )
	                        )  AS SUBQUERY
	                        ORDER BY DonorProfileId, GiftDate ASC";

                    DbUtils.AddParameter(cmd, "@EndDate", pledgeDriveEndDate);

                    var reader = cmd.ExecuteReader();

                    var gifts = new List<Gift>();

                    while (reader.Read())
                    {
                        Gift gift = new Gift()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            DonorProfileId = DbUtils.GetInt(reader, "DonorProfileId"),
                            GiftDate = DbUtils.GetDateTime(reader, "GiftDate"),
                            FrequencyId = DbUtils.GetInt(reader, "FrequencyId"),
                            Amount = reader.GetDecimal(reader.GetOrdinal("Amount")),
                        };
                        gifts.Add(gift);
                    }
                    reader.Close();

                    return gifts;
                }
            }
        }


        // To Make A Gift
        private Gift NewGiftFromDb(SqlDataReader reader)
        {
            return new Gift()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                DonorProfileId = DbUtils.GetInt(reader, "DonorProfileId"),
                PledgeDriveId = DbUtils.GetInt(reader, "PledgeDriveId"),
                GiftDate = DbUtils.GetDateTime(reader, "GiftDate"),
                Amount = reader.GetDecimal(reader.GetOrdinal("Amount")),
                DonationTypeId = DbUtils.GetInt(reader, "DonationTypeId"),
                ReasonId = DbUtils.IsDbNull(reader, "ReasonId") ? null : (int)DbUtils.GetNullableInt(reader, "ReasonId"),
                MethodId = DbUtils.GetInt(reader, "MethodId"),
                FrequencyId = DbUtils.GetInt(reader, "FrequencyId"),
                RecurringFrequencyId = DbUtils.IsDbNull(reader, "RecurringFrequencyId") ? null : (int)DbUtils.GetNullableInt(reader, "RecurringFrequencyId"),
                DonorProfile = new DonorProfile()
                {
                    Id = DbUtils.GetInt(reader, "DonorProfileId"),
                    FirstName = DbUtils.GetString(reader, "FirstName"),
                    LastName = DbUtils.GetString(reader, "LastName"),
                    NumberOfGifts = DbUtils.GetInt(reader, "NumberOfGifts")
                },
                PledgeDrive = new PledgeDrive()
                {
                    Id = DbUtils.GetInt(reader, "PledgeDriveId"),
                    Name = DbUtils.GetString(reader, "PledgeDriveName")
                },
                DonationType = new DonationType()
                {
                    Id = DbUtils.GetInt(reader, "DonationTypeId"),
                    Name = DbUtils.GetString(reader, "DonationType")
                },
                Frequency = new Frequency()
                {
                     Id = DbUtils.GetInt(reader, "FrequencyId"),
                     Name = DbUtils.GetString(reader, "Frequency")
                }
            };
        }
    }
}
