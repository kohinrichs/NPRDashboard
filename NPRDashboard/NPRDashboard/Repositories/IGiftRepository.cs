using NPRDashboard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NPRDashboard.Repositories
{
    public interface IGiftRepository
    {
        List<Gift> GetGiftsByPledgeDriveId(int pledgeDriveId);
        List<KeyValuePair<int, int>> GetNumOfDonAndNumOfGifts(DateTime pledgeDriveEndDate);
        List<KeyValuePair<string, int>> GetNumOfGiftsByFrequency(int pledgeDriveId);
        List<Gift> NewRecurringGifts(DateTime pledgeDriveStartDate, DateTime pledgeDriveEndDate);
        List<Gift> GetListOfOneTimeGiftsBySameDonor(DateTime pledgeDriveEndDate);

    }
}
