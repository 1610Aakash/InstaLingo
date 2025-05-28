




import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import PageWrapper from "../components/common/PageWrapper";

const ContactSection = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Submitted:", data);
    localStorage.setItem("contactFormData", JSON.stringify(data));
    toast.success("Message sent successfully!");
    reset();
  };

  return (
    <PageWrapper>
      <section
        id="contact"
        className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100 p-5 mt-[75px]"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl w-full bg-white shadow-2xl rounded-2xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {/* Contact Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
            <h2 className="text-4xl font-bold text-[#1a3b9c] text-center md:text-left">
              Let’s Talk
            </h2>

            {/* Name */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3b9c]"
              />
              {errors.name && <span className="text-sm text-red-500">{errors.name.message}</span>}
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                })}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3b9c]"
              />
              {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
            </div>

            {/* Message */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                rows={5}
                {...register("message", { required: "Message is required" })}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3b9c]"
              ></textarea>
              {errors.message && <span className="text-sm text-red-500">{errors.message.message}</span>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#1a3b9c] hover:bg-[#0f255d] text-white font-medium py-3 px-6 rounded-lg transition duration-300 disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Contact Info */}
          <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-5 text-gray-700">
            <p className="text-lg">
              Have questions or feedback? We’d love to hear from you.
            </p>
            <div className="space-y-3 text-lg">
              <p>📧 <strong>Email:</strong> support@instalingo.com</p>
              <p>📞 <strong>Phone:</strong> +91 96501 41603</p>
            </div>
          </div>
        </motion.div>
      </section>
    </PageWrapper>
  );
};

export default ContactSection;



