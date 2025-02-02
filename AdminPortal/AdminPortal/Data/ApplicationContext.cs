using System.Security.Cryptography.X509Certificates;
using AdminPortal.Models;
using Microsoft.EntityFrameworkCore;

namespace AdminPortal.Data
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        { }
        public DbSet<Admin> Admin { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Admin>().Property(a=>a.Id).ValueGeneratedOnAdd();

            modelBuilder.Entity<Admin>().Property(a => a.CreatedAt).HasDefaultValueSql("GETDATE()");

            modelBuilder.Entity<Admin>().Property(a => a.UpdatedAt).HasDefaultValueSql("GETDATE()");
        }

    }
}
