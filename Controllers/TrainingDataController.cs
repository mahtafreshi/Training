using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using rmsTrainingApp.Training.Models;
namespace rmsTrainingApp.Controllers
{
    [Route("api/v1.0/[controller]")]
    [ApiController]
    public class TrainingController : ControllerBase
    {
        private readonly TrainingContext _context;
        public TrainingController(TrainingContext context)
        {
            _context = context;

        }
        [HttpGet()]
        [Produces("application/json")]
        [ProducesResponseType(typeof(TrainingInfo[]), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IEnumerable<TrainingInfo>> get()
        {
            return this._context.TrainingInfo.ToList();
        }
        [HttpPost()]
        [Produces("application/json")]
        [ProducesResponseType(typeof(TrainingInfo), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> post([FromBody] TrainingInfo trainingInfo)
        {
            // look for same object
            var existings = this._context.TrainingInfo
                .Where(f => f.TrainingName.ToLower() == trainingInfo.TrainingName.ToLower())
                .ToList();
            if (existings.Count > 0)
            {
                return BadRequest("This Training has already been added to DB");
            }

            TrainingInfo trainingInfoDto = new TrainingInfo()
            {
                FromDate = trainingInfo.FromDate,
                ToDate = trainingInfo.ToDate,
                TrainingName = trainingInfo.TrainingName
            };
            try
            {
                this._context.TrainingInfo.Add(trainingInfoDto);
                await this._context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
            // return day difference
            return Ok(trainingInfo.Difference);
        }
    }
}
