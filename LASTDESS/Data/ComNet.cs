using LASTDESS.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace LASTDESS.Data
{
    public class ComNet : DbContext
    {
        public ComNet(DbContextOptions<ComNet> options) : base(options) { }

        public DbSet<user> Users { get; set; }
        public DbSet<HelReq> HelpRequests { get; set; }

        public DbSet<Volunteer> Volunteers { get; set; }
        public DbSet<Contact> Contacts { get; set; }

    }
}
