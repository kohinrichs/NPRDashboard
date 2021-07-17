using NPRDashboard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NPRDashboard.Repositories
{
    public interface IFrequencyRepository
    {
        List<Frequency> GetAllFrequencies();
    }
}
