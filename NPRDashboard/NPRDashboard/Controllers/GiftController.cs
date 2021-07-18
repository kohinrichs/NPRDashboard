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

        // #1
        [HttpGet("getgiftsbypledgedriveid/{pledgeDriveId}")]
        public IActionResult GetGiftsByPledgeDriveId(int pledgeDriveId)
        {
            return Ok(_giftRepository.GetGiftsByPledgeDriveId(pledgeDriveId));
        }

        // #2
        [HttpGet("getnumofgiftsbyfrequency/{pledgeDriveId}")]
        public IActionResult GetNumOfGiftsByFrequency(int pledgeDriveId)
        {
            return Ok(_giftRepository.GetNumOfGiftsByFrequency(pledgeDriveId));
        }

        // #3
        [HttpGet("getnumofdonorsbynumofgifts/{pledgeDriveEndDate}")]
        public IActionResult GetNumOfDonorsAndNumOfGift(DateTime pledgeDriveEndDate)
        {
            return Ok(_giftRepository.GetNumOfDonorsAndNumOfGift(pledgeDriveEndDate));
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
