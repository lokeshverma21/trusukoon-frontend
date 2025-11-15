"use client";

const gridItems = [
  { id: 1, text: "Seamless Experience", subtitle:"No confusing interfaces. Every click is designed for speed and clarity — so you focus on what matters.", image: "https://images.unsplash.com/photo-1623915695133-d624f7759fd0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJvb2tpbmclMjB3aXRoJTIwcGhvbmV8ZW58MHx8MHx8fDA%3D", className: "col-span-3" },
  { id: 2, image: "https://images.unsplash.com/photo-1524758870432-af57e54afa26?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHRoZXJhcHl8ZW58MHx8MHx8fDA%3D", className: "col-span-1"  },
  { id: 3, image: "https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fHRoZXJhcHl8ZW58MHx8MHx8fDA%3D", className: "md:row-span-2" },
  { id: 4, text: "Reliable & Secure", subtitle:"Your data stays private. We use industry-standard encryption and automated backups.", image: "https://images.unsplash.com/photo-1740477959006-798042a324aa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGVuY3J5cHRpb258ZW58MHx8MHx8fDA%3D", className: "row-span-1 col-span-3 md:col-span-1" },
  { id: 5, image: "https://images.unsplash.com/photo-1598555748505-ccca0d9b9f7b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fG1hc3NhZ2UlMjB0aGVyYXB5fGVufDB8fDB8fHww", className: "row-span-1 col-span-2"  },
  { id: 6, text: "Smart Reminders & Automation", subtitle:"Automatic confirmations & reminders keep everyone on schedule — saving hours weekly.", image: "https://images.unsplash.com/photo-1600960568458-7966d439289e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG5vdGlmaWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",className: "col-span-2 md:col-span-3"  },
];

export default function WhyChooseUs() {
  return (
    <div className="mt-20 px-4">
      <div className="text-center">
        <h3 className="text-5xl font-heading">Why Choose Us</h3>
        <p className="font-body py-4">We simplify booking for users and streamline growth for service providers.</p>
      </div>

      <div className="grid grid-cols-4 gap-4 md:p-6 auto-rows-[150px]">
        {gridItems.map((item) => (
          <div
            key={item.id}
            className={`relative rounded-md overflow-hidden group transition-transform duration-300 hover:scale-105 shadow-md ${item.className || ""}`}
          >
            {/* Background Image Div */}
            <div
              className="absolute inset-0 bg-cover bg-center transition duration-300"
              style={{
                backgroundImage: `url(${item.image})`,
                filter: item.text || item.subtitle ? "blur(2px)" : "none", // Apply blur only if there is text
              }}
            ></div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition duration-300 flex items-end p-4">
              {item.text && (
                <div className="relative z-10 p-0 md:p-4">
                  <h3 className="text-white md:text-lg font-heading">{item.text}</h3>
                  <p className="text-white text-xs md:text-sm font-body">{item.subtitle}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
