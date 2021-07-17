using NPRDashboard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NPRDashboard.Repositories
{
    public interface IPledgeDriveRepository
    {
        List<PledgeDrive> GetAllPledgeDrives();
        PledgeDrive GetPledgeDriveById(int id);
    }
}
