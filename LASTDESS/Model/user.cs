namespace LASTDESS.Model
{
    public class user
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Location { get; set; }
        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
    }
}