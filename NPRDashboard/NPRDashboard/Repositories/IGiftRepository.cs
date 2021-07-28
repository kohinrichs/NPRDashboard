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
        Dictionary<string, int> GetNumOfGiftsByFrequency(int pledgeDriveId);
        Dictionary<int, int> GetNumOfDonorsAndNumOfGift(DateTime pledgeDriveEndDate, int pledgeDriveId);
        List<Gift> GetNewRecurringGiftsFromPreviousDonors(DateTime pledgeDriveStartDate, DateTime pledgeDriveEndDate);
        List<Gift> GetListOfOneTimeGiftsBySameDonor(DateTime pledgeDriveEndDate);
        List<int> GetFirstTimeDonorIds(DateTime pledgeDriveEndDate);
    }
}
