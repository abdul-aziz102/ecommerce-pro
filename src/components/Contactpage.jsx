import { motion } from "framer-motion";
import { assets } from "../assets/frontend_assets/assets"; // Adjust path as needed

function ContactPage() {
  // Your contact details (replace with actual data)
  const contactInfo = {
    name:"Abdul Aziz",
    phone: "+123 456 7890",
    email: "abdulazizyousufzai@gmail.com",
    address: "123 Company St, Karachi, pakistan",
    whatsapp: "+123 456 7890",
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-center justify-center py-12">
        {/* Left Side - Company Logo */}
        

        {/* Right Side - Contact Details */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-2/3 bg-gray-800 p-8 rounded-lg shadow-lg"
        >
          <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/3 flex text-center"
        >
          <img
            src={assets.logo} // Replace with your company logo
            alt="Company Logo"
            className="w-32 h-10  filter brightness-0 invert text-center" // White logo
          />
        </motion.div>
          <h1 className="text-3xl font-bold mb-6 text-teal-300">Contact Us</h1>
          
          {/* Contact Info Cards */}
          <div className="space-y-4">
            {[
              { icon: "👤", label: "Name", value: contactInfo.name },
              { icon: "📞", label: "Call Us", value: contactInfo.phone },
              { icon: "✉️", label: "Email", value: contactInfo.email },
              { icon: "📍", label: "Address", value: contactInfo.address },
              { icon: "💬", label: "WhatsApp", value: contactInfo.whatsapp },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-gray-400 text-sm">{item.label}</p>
                  <p className="text-white font-medium">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* WhatsApp Direct Chat Link (Optional) */}
          <a
            href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition duration-300"
          >
            <img 
              src={assets.whatsapp_icon} // Replace with WhatsApp icon
              alt="WhatsApp"
              className="w-5 h-5 filter brightness-0 invert"
            />
            Chat on WhatsApp
          </a>
        </motion.div>
      </div>
    </div>
  );
}

export default ContactPage;