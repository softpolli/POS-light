import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">

        <>
          {/* SoftPolli Advertisement / Credit Component */}
          <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden font-sans transition-all hover:shadow-xl">
            <div className="p-6">
              {/* "Developed By" Header */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="h-px w-8 bg-gray-200" />
                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold text-center">
                  Proudly Developed By
                </p>
                <span className="h-px w-8 bg-gray-200" />
              </div>
              {/* Company Logo */}
              <div className="flex justify-center mb-5">
                {/* Ensure the src path matches where you store the image in your client's project */}
                <Image
                  width={811}
                  height={811}
                  src="/logos/SoftPolli-logo-offset.png"
                  alt="SoftPolli Logo"
                  className="h-10 object-contain drop-shadow-sm"
                />
              </div>
              {/* Short Description / Tagline */}
              <p className="text-sm text-gray-600 text-center mb-6 leading-relaxed">
                A modern IT solution &amp; software development agency delivering
                scalable web apps, custom software, and innovative digital solutions.
              </p>
              {/* Services Badges */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <span className="px-3 py-1 bg-[#4A148C]/10 text-[#4A148C] text-xs font-semibold rounded-full border border-[#4A148C]/20">
                  Web Apps
                </span>
                <span className="px-3 py-1 bg-[#FF6D00]/10 text-[#FF6D00] text-xs font-semibold rounded-full border border-[#FF6D00]/20">
                  Custom Software
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full border border-gray-200">
                  IT Solutions
                </span>
              </div>
              {/* Divider */}
              <hr className="border-gray-100 mb-5" />
              {/* Footer: Link & Button */}
              <div className="flex flex-col items-center gap-4">
                {/* Company Website Link */}
                <a
                  href="https://www.softpolli.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#4A148C] hover:text-[#FF6D00] font-semibold transition-colors inline-flex items-center gap-1.5 group"
                >
                  Visit www.softpolli.com
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
                {/* Call to Action Button */}
                <a
                  href="https://www.softpolli.com/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-linear-to-r from-[#4A148C] to-[#FF6D00] hover:from-[#3a0f70] hover:to-[#e66200] text-white font-medium py-2.5 px-4 rounded-lg transition-all shadow-md hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-[#4A148C]"
                >
                  Work With Us
                </a>
              </div>
            </div>
          </div>
        </>


      </main>
    </div>
  );
}
