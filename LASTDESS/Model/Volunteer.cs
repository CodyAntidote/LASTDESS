﻿namespace LASTDESS.Model
{
    public class Volunteer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Contact { get; set; }
        public string Availability { get; set; }
        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
    }
}
