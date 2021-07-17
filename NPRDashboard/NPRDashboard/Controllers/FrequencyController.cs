using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NPRDashboard.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NPRDashboard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FrequencyController : ControllerBase
    {
        private readonly IFrequencyRepository _frequencyRepository;

        public FrequencyController(IFrequencyRepository frequencyRepository)
        {
            _frequencyRepository = frequencyRepository;
        }

        [HttpGet]
        public IActionResult GetAllFrequencies()
        {
            return Ok(_frequencyRepository.GetAllFrequencies());
        }
    }
}
