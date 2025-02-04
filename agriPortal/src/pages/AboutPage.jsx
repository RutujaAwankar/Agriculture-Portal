import Footer from "../components/common/Footer";
import Header from "../components/common/Header";

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-gray-900 pt-24">
      <Header />

      {/* Content Section */}
      <section className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-extrabold text-white mb-12 text-center">
          About Us
        </h1>

        {/* Image & Text Container */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image Section */}
          <div className="w-full md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with actual image path
              alt="KSAN About Us"
              className="rounded-xl h-96 w-full object-cover opacity-90 shadow-lg"
            />
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2 max-w-2xl text-gray-400 space-y-6 text-center md:text-left">
            <p className="text-lg leading-relaxed">
              KSAN (Knowledge Sharing and Networking) is a platform dedicated to connecting
              farmers, researchers, and agricultural experts. Our goal is to bridge the gap
              between traditional farming wisdom and modern advancements.
            </p>

            <p className="text-lg leading-relaxed">
              Whether you're looking for organic farming techniques, fishery management, or
              the latest innovations in agriculture, we provide a space to learn, share, and
              grow together.
            </p>

            <p className="text-lg leading-relaxed">
              Join our community and be part of the movement shaping the future of sustainable
              farming.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AboutPage;
