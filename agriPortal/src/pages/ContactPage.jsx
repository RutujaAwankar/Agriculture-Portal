import { Mail, Phone, MapPin } from "lucide-react";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";

const ContactPage = () => {
  return (
    <main className="min-h-screen bg-gray-900 pt-24">
      <Header />
      
      {/* Contact Section */}
      <section className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-white mb-10 text-center">
          Get in Touch
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          {/* Contact Info Card */}
          <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg text-gray-300 text-center">
            <p className="text-lg leading-relaxed mb-6">
              Have questions or need help? Feel free to reach out!
            </p>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-center gap-4">
                <Mail className="text-blue-400" size={24} />
                <div className="text-left">
                  <p className="text-lg font-semibold text-white">Email</p>
                  <p className="text-gray-300">support@ksan.com</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4">
                <Phone className="text-green-400" size={24} />
                <div className="text-left">
                  <p className="text-lg font-semibold text-white">Phone</p>
                  <p className="text-gray-300">+91 7209515515</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center gap-4">
                <MapPin className="text-red-400" size={24} />
                <div className="text-left">
                  <p className="text-lg font-semibold text-white">Address</p>
                  <p className="text-gray-300">
                    Sunbeam Infotech, Pune City, Maharashtra
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ContactPage;
