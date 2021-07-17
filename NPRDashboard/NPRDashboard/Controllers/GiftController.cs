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
    public class GiftController : ControllerBase
    {
        private readonly IGiftRepository _giftRepository;
        public GiftController(IGiftRepository giftRepository)
        {
            _giftRepository = giftRepository;
        }

        [HttpGet("getbypledgedriveid/{pledgeDriveId}")]
        public IActionResult GetGiftsByPledgeDriveId(int pledgeDriveId)
        {
            return Ok(_giftRepository.GetGiftsByPledgeDriveId(pledgeDriveId));
        }

        [HttpGet("getbynumberofdonations/{pledgeDriveEndDate}")]
        public IActionResult GetGiftsByPledgeDriveId(DateTime pledgeDriveEndDate)
        {
            return Ok(_giftRepository.GetNumOfDonAndNumOfGifts(pledgeDriveEndDate));
        }

        [HttpGet("getnumofgiftsbyfrequency/{pledgeDriveId}")]
        public IActionResult GetNumOfGiftsByFrequency(int pledgeDriveId)
        {
            return Ok(_giftRepository.GetNumOfGiftsByFrequency(pledgeDriveId));
        }

        [HttpGet("getnewrecurringgifts/{pledgeDriveStartDate}/{pledgeDriveEndDate}")]
        public IActionResult NewRecurringGifts(DateTime pledgeDriveStartDate, DateTime pledgeDriveEndDate)
        {
            return Ok(_giftRepository.NewRecurringGifts(pledgeDriveStartDate, pledgeDriveEndDate));
        }

        [HttpGet("getlistofonetimegiftsbysamedonor/{pledgeDriveEndDate}")]
        public IActionResult GetListOfOneTimeGiftsBySameDonor(DateTime pledgeDriveEndDate)
        {
            return Ok(_giftRepository.GetListOfOneTimeGiftsBySameDonor(pledgeDriveEndDate));
        }
    }
}
