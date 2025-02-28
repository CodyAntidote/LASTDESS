using LASTDESS.Model;
using LASTDESS.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LASTDESS.Controllers 
{

    [Route("api/[controller]")]
    [ApiController]
    public class HelpRequestctrl : ControllerBase
    {
        private readonly ComNet _context;

        public HelpRequestctrl(ComNet context)
        {
            _context = context;
        }

        // GET: api/HelpRequest
        [HttpGet]
        public async Task<IActionResult> GetRequests()
        {
            var requests =  await _context.HelpRequests.ToListAsync();
            return Ok(requests);
        }

        // POST: api/HelpRequest
        [HttpPost]
        public async Task<IActionResult> AddRequest([FromBody] HelReq helpRequest)
        {
            if (Request == null)
            {
                return BadRequest("Request dat is required");
            }
            // Add request to the database
            await _context.HelpRequests.AddAsync(helpRequest); // Adjust this to your actual DbSet
            await _context.SaveChangesAsync();


            return CreatedAtAction(nameof(GetRequests), new { id = helpRequest.Id }, helpRequest);
        }
    }
}
