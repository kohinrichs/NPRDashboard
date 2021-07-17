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
    public class FrequencyRepository : BaseRepository, IFrequencyRepository
    {
        public FrequencyRepository(IConfiguration configuration) : base(configuration) { }

        // Get All Frequencies
        public List<Frequency> GetAllFrequencies()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, [Name]
                        FROM Frequency";

                    var reader = cmd.ExecuteReader();
                    var frequencies = new List<Frequency>();

                    while (reader.Read())
                    {
                        frequencies.Add(NewFrequencyFromDb(reader));
                    }

                    reader.Close();

                    return frequencies;
                }
            }
        }

        private Frequency NewFrequencyFromDb(SqlDataReader reader)
        {
            return new Frequency()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name")
            };
        }
    }
}
