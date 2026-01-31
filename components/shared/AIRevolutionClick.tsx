import Link from 'next/link';

const AIRevolutionClick = () => {
  return (
    <section className="w-full bg-[#ECFDF3] md:py-20 py-8 px-4 flex flex-col items-center text-center">
      <div className="max-w-3xl mx-auto space-y-5">
        <h2 className="text-3xl md:text-5xl font-title text-[#1f2937] tracking-normals">
          AI Revolution Click to Ignite.
        </h2>
        
        <p className="text-gray-600 font-sans text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit phasellus mollis sit aliquam sit nullam.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-5 pt-6">
          <Link 
            href="/contact-us"
            className="px-8 py-3 rounded-full bg-gradient-to-b from-[#3DA754] to-[#28883D] text-white font-medium shadow-[0_4px_10px_rgba(40,136,61,0.3)] hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 min-w-[140px]"
          >
            Contact Us
          </Link>
          
          <Link 
            href="/about" 
            className="px-8 py-3 rounded-full bg-white border border-[#28883D] text-[#28883D] font-medium hover:bg-[#28883D] hover:text-white transition-all duration-300 min-w-[140px]"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AIRevolutionClick;
