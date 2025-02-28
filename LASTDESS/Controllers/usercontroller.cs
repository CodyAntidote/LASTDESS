using LASTDESS.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using LASTDESS.Data;

namespace LASTDESS.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class Usercontroller : ControllerBase
    {
        private readonly ComNet _context;

        public Usercontroller(ComNet context)
        {
            _context = context;
        }

        // GET: api/users
        [HttpGet]
        public async Task<IActionResult> GetUser()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        // POST: api/users
        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] user user)
        {
            if (user == null)
            {
                return BadRequest("User data is required");
            }

            // Add user to the database
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Return the added user
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }
    }
}
