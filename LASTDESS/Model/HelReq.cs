namespace LASTDESS.Model
{
    public class HelReq
    {
        public int Id { get; set; }
        public string Title { get; set; } // Ensure this property is defined
        public string Description { get; set; }
        public string Status { get; set; }
        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
    }
}
