using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace rmsTrainingApp.Training.Models
{
    public class TrainingContext : DbContext
    {
        public TrainingContext(DbContextOptions<TrainingContext> options) : base(options)
        { }

        public DbSet<TrainingInfo> TrainingInfo { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TrainingInfo>().Property(f => f.Id)
            .ValueGeneratedOnAdd();
        }
        // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        // {
        //     if (!optionsBuilder.IsConfigured)
        //     {
        //         optionsBuilder.UseSqlite("Data Source=training.db");
        //     }
        // }
    }
    public class TrainingInfo
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string TrainingName { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        [NotMapped]
        public int Difference
        {
            get
            {
                return ((FromDate > DateTime.MinValue) &&
                        (ToDate > DateTime.MinValue) &&
                        (FromDate < ToDate))
                        ? (int)(ToDate - FromDate).TotalDays
                        : 0;

            }
        }
    }
}