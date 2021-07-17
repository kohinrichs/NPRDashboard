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
    public class PledgeDriveController : ControllerBase
    {
        private readonly IPledgeDriveRepository _pledgeDriveRepository;

        public PledgeDriveController(IPledgeDriveRepository pledgeDriveRepository)
        {
            _pledgeDriveRepository = pledgeDriveRepository;
        }

        [HttpGet]
        public IActionResult GetAllPledgeDrives()
        {
            return Ok(_pledgeDriveRepository.GetAllPledgeDrives());
        }

        [HttpGet("{id}")]
        public IActionResult GetPledgeDriveById(int id)
        {
            return Ok(_pledgeDriveRepository.GetPledgeDriveById(id));
        }
    }
}
