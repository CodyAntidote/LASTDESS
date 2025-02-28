using LASTDESS.Data;
using LASTDESS.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LASTDESS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VolunteersController : ControllerBase
    {
        private readonly ComNet _context;

        public VolunteersController(ComNet context)
        {
            _context = context;
        }

        // GET: api/volunteers
        [HttpGet]
        public async Task<IActionResult> GetVolunteers()
        {
            var volunteers = await _context.Volunteers.ToListAsync();
            return Ok(volunteers);
        }

        // POST: api/volunteers
        [HttpPost]
        public async Task<IActionResult> AddVolunteer([FromBody] Volunteer volunteer)
        {
            if (volunteer == null)
            {
                return BadRequest();
            }

            _context.Volunteers.Add(volunteer);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetVolunteers), new { id = volunteer.Id }, volunteer);
        }
    }
}
