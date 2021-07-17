using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NPRDashboard.Models
{
    public class Gift
    {
        public int Id { get; set; }
        public int DonorProfileId { get; set; }
        public int PledgeDriveId { get; set; }
        public DateTime GiftDate { get; set; }
        public decimal Amount { get; set; }
        public int DonationTypeId { get; set; }
        public int ? ReasonId { get; set; }
        public int MethodId { get; set; }
        public int FrequencyId { get; set; }
        public int ? RecurringFrequencyId { get; set; }
        public DonorProfile DonorProfile { get; set; }
        public PledgeDrive PledgeDrive { get; set; }
        public DonationType DonationType { get; set; }
        public Frequency Frequency { get; set; }
    }
}
