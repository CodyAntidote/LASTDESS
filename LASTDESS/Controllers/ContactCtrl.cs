using LASTDESS.Model;
using LASTDESS.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LASTDESS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactCtrl : ControllerBase
    {
        private readonly ComNet _context;

        public ContactCtrl(ComNet context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetContacts()
        {
            // Return a sample response, even if there's no persistent data
            var contacts = await _context.Contacts.ToListAsync();
            return Ok(contacts); // Returns 200 OK with the contacts array
        }

        // POST: api/contact
        [HttpPost]  // Ensure this is here to allow POST requests
        public async Task<IActionResult> PostContact([FromBody] Contact contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid input data");
            }

            _context.Contacts.Add(contact); // Add the contact to the database
            await _context.SaveChangesAsync(); // Save changes to the database

            return CreatedAtAction(nameof(GetContacts), new { id = contact.Id }, contact); // Send success response

        }
    }

}
