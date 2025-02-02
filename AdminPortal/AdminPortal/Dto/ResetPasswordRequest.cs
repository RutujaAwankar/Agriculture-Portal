namespace AdminPortal.Dto
{
    public class ResetPasswordRequest
    {
        public string Jwt { get; set; }
        public string Otp { get; set; }
        public string NewPassword { get; set; }
    }
}
