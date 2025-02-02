using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using AdminPortal.Data;
using AdminPortal.Dto;
using AdminPortal.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace AdminPortal.Controllers
{
    [Route("admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {

        private readonly ApplicationContext _context;
        private readonly IConfiguration _configuration;

        public AdminController(ApplicationContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // Hash passwords
        private (string hashedPassword, string salt) HashPassword(string password)
        {
            byte[] saltbytes = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(saltbytes);
            }

            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: saltbytes,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));
            return (hashed, Convert.ToBase64String(saltbytes));
        }


        private bool VerifyPassword(string storedHashedPassword, string storedSalt, string providedPassword)
        {
            byte[] salt = Convert.FromBase64String(storedSalt);

            string hashedProvidedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: providedPassword,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));


            return storedHashedPassword == hashedProvidedPassword;
        }
        private string GenerateJwtToken(Admin admin)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var secretKey = jwtSettings["Key"];
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, admin.Email),
            new Claim("user_id", admin.Id.ToString()),
            new Claim("authorities", admin.Role)
            };

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(1440),
                signingCredentials: credentials
            //issuer: jwtSettings["Issuer"], 
            //audience: jwtSettings["Audience"] 
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // 1. Register Admin
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequestDto dto)
        {
            if (ModelState.IsValid)
            {

                var (hashedPassword, salt) = HashPassword(dto.Password);


                var admin = new Admin
                {
                    FirstName = dto.FirstName,
                    LastName = dto.LastName,
                    Email = dto.Email.ToLower(),
                    Password = hashedPassword,
                    Mobile = dto.Mobile,
                    Role = "ROLE_ADMIN",
                    Salt = salt
                };


                _context.Admin.Add(admin);
                await _context.SaveChangesAsync();

                Console.WriteLine($"Generated Salt: {salt}");
                Console.WriteLine($"Hashed Password: {hashedPassword}");


                return Ok(new { message = "Admin registered successfully." });
            }

            return BadRequest(ModelState);
        }


        // Login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Dto.LoginRequest request)
        {

            //var admin = await _context.Admin.FirstOrDefaultAsync(a => a.Email == request.Email);
            var admin = await _context.Admin
            .Where(a => a.Email.ToLower() == request.Email.ToLower())
            .FirstOrDefaultAsync();

            Console.WriteLine($"Received Email: {request.Email}");
            Console.WriteLine($"Received Password: {request.Password}");


            if (admin == null)
            {
                return Unauthorized("Invalid email or password.");
            }

            bool isPasswordValid = VerifyPassword(admin.Password, admin.Salt, request.Password);

            if (!isPasswordValid)
            {
                return Unauthorized("Invalid email or password.");
            }

            var token = GenerateJwtToken(admin);
            return Ok(new { Token = token, Message = "Login successful." });
        }

        // 3. Update Profile
        [HttpPut("update-profile")]
        [Authorize]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileRequest request)
        {
            var userIdClaim = User.FindFirst("user_id")?.Value;

            if (string.IsNullOrEmpty(userIdClaim))
            {
                return Unauthorized("Invalid token.");
            }

            long userId = long.Parse(userIdClaim);
            var admin = await _context.Admin.FindAsync(userId);

            if (admin == null)
            {
                return NotFound("Admin not found.");
            }

            admin.FirstName = request.FirstName;
            admin.LastName = request.LastName;
            admin.Mobile = request.Mobile;
            admin.Email = request.Email;
            admin.UpdatedAt = DateTime.UtcNow;

            _context.Admin.Update(admin);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Profile updated successfully.", Admin = admin });
        }

        // 4. Change Password
        [HttpPut("change-password")]
        [Authorize]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
        {
            var userIdClaim = User.FindFirst("user_id")?.Value;

            if (string.IsNullOrEmpty(userIdClaim))
            {
                return Unauthorized("Invalid token.");
            }

            long userId = long.Parse(userIdClaim);
            var admin = await _context.Admin.FindAsync(userId);

            if (admin == null)
            {
                return NotFound("Admin not found.");
            }

            if (!VerifyPassword(admin.Password, admin.Salt, request.OldPassword))
            {
                return BadRequest("Old password is incorrect.");
            }

            var (hashedPassword, salt) = HashPassword(request.NewPassword);
            admin.Password = hashedPassword;
            admin.Salt = salt;
            admin.UpdatedAt = DateTime.UtcNow;

            _context.Admin.Update(admin);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Password changed successfully." });
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Email))
            {
                return BadRequest("Email is required.");
            }

            var normalizedEmail = request.Email.Trim().ToLower();
            Console.WriteLine($"Searching for admin with normalized email: {normalizedEmail}");

            var admin = await _context.Admin
                .FirstOrDefaultAsync(a => a.Email.ToLower() == normalizedEmail);

            if (admin == null)
            {
                Console.WriteLine($"No admin found with email: {normalizedEmail}");
                return NotFound(new { Message = "No account found with this email address." });
            }

            var otp = GenerateOtp();
            var jwt = CreateJwtWithOtp(admin.Email, otp);

            try
            {
                await SendOtpViaEmail(admin.Email, otp);
                Console.WriteLine($"OTP sent successfully to {admin.Email}");

                return Ok(new
                {
                    Message = "Password reset instructions sent to your email.",
                    Jwt = jwt
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to send OTP: {ex.Message}");
                return StatusCode(500, new
                {
                    Message = "Please try again later.",
                    Error = ex.Message
                });
            }
        }

        // Reset Password
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] Dto.ResetPasswordRequest request)
        {
            var result = ValidateJwtWithOtp(request.Jwt);

            if (result == null || result.Value.Otp != request.Otp)
            {
                return BadRequest("Invalid or expired OTP.");
            }

            var admin = await _context.Admin.FirstOrDefaultAsync(a => a.Email == result.Value.Email);

            if (admin == null)
            {
                return NotFound("Admin not found.");
            }

            var (hashedPassword, salt) = HashPassword(request.NewPassword);
            admin.Password = hashedPassword;
            admin.Salt = salt;
            admin.UpdatedAt = DateTime.UtcNow;

            _context.Admin.Update(admin);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Password reset successfully." });
        }


        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOtp([FromBody] VerifyOtpRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Jwt) || string.IsNullOrWhiteSpace(request.Otp))
            {
                return BadRequest("JWT and OTP are required.");
            }

            var result = ValidateJwtWithOtp(request.Jwt);

            if (result == null)
            {
                return BadRequest(new { Message = "Invalid or expired reset token." });
            }

            if (result.Value.Otp != request.Otp)
            {
                return BadRequest(new { Message = "Invalid OTP." });
            }

            var admin = await _context.Admin
                .FirstOrDefaultAsync(a => a.Email.ToLower() == result.Value.Email.ToLower());

            if (admin == null)
            {
                return NotFound(new { Message = "Admin not found." });
            }

            return Ok(new { Message = "OTP verified successfully." });
        }

        private string GenerateOtp()
        {
            var random = new Random();
            return random.Next(100000, 999999).ToString();
        }

        private string CreateJwtWithOtp(string email, string otp)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var key = Encoding.ASCII.GetBytes(jwtSettings["Key"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
            new Claim(ClaimTypes.Email, email),
            new Claim("Otp", otp)
        }),
                Expires = DateTime.UtcNow.AddMinutes(5),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private (string Email, string Otp)? ValidateJwtWithOtp(string token)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var key = Encoding.ASCII.GetBytes(jwtSettings["Key"]);

            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                }, out var validatedToken);

                var email = principal.FindFirst(ClaimTypes.Email)?.Value;
                var otp = principal.FindFirst("Otp")?.Value;

                if (email != null && otp != null)
                {
                    return (email, otp);
                }
            }
            catch
            {
                return null;
            }

            return null;
        }

        private async Task SendOtpViaEmail(string email, string otp)
        {
            var sendGridSettings = _configuration.GetSection("SendGrid");
            var apiKey = sendGridSettings["ApiKey"];
            var fromEmail = sendGridSettings["FromEmail"];
            var fromName = sendGridSettings["FromName"];

            var client = new SendGridClient(apiKey);
            var from = new EmailAddress(fromEmail, fromName);
            var to = new EmailAddress(email);
            var subject = "Your OTP for Password Reset";
            var plainTextContent = $"Your OTP is: {otp}";
            var htmlContent = $"<strong>Your OTP is: {otp}</strong>";

            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);

            if (response.StatusCode != System.Net.HttpStatusCode.Accepted)
            {
                throw new Exception("Failed to send OTP via email.");
            }
        }
    }
}