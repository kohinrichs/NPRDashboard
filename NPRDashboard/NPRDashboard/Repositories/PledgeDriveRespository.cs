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
    public class PledgeDriveRespository : BaseRepository, IPledgeDriveRepository
    {
        public PledgeDriveRespository(IConfiguration configuration) : base(configuration) { }

        // Get All PledgeDrives
        public List<PledgeDrive> GetAllPledgeDrives()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, [Name], StartDate, EndDate, Goal
                        FROM PledgeDrive
                        ORDER BY StartDate DESC";

                    var reader = cmd.ExecuteReader();
                    var pledgeDrives = new List<PledgeDrive>();

                    while (reader.Read())
                    {
                        pledgeDrives.Add(NewPledgeDriveFromDb(reader));
                    }

                    reader.Close();

                    return pledgeDrives;
                }
            }
        }


        // Get A PledgeDrive By Its Id
        public PledgeDrive GetPledgeDriveById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, [Name], StartDate, EndDate, Goal
                        FROM PledgeDrive
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    PledgeDrive pledgeDrive = null;

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        pledgeDrive = NewPledgeDriveFromDb(reader);
                    }
                    reader.Close();

                    return pledgeDrive;
                }
            }
        }

        private PledgeDrive NewPledgeDriveFromDb(SqlDataReader reader)
        {
            return new PledgeDrive()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
                StartDate = DbUtils.GetDateTime(reader, "StartDate"),
                EndDate = DbUtils.GetDateTime(reader, "EndDate"),
                Goal = DbUtils.GetInt(reader, "Goal"),
            };
        }
    }
}
