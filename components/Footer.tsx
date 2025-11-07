export default function Footer(){
    return(
    <footer className="py-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header section */}
        <div className="flex mb-8 flex-col gap-6 md:flex-row">
          <h2 className="text-4xl font-bold font-heading">Book & manage appointments — beautifully simple..</h2>
          <div className="font-body">
            <p className="text-lg">8502 Preston Rd. Inglewood, Maine 98380, USA</p>
            <p className="text-lg">support@rareblocks.xyz</p>
          </div>
        </div>

        <div className="w-full h-1 bg-primary"></div>

        {/* Links and contact info */}
       <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">

          <div className="flex space-x-4">
            <a href="#" className="text-lg hover:underline">About</a>
            <a href="#" className="text-lg hover:underline">Features</a>
            <a href="#" className="text-lg hover:underline">Works</a>
            <a href="#" className="text-lg hover:underline">Support</a>
          </div>
            {/* Copyright section */}
            <div className="text-center text-sm">
            <p>© Copyright {new Date().getFullYear()}, All Rights Reserved</p>
            </div>
        </div>

      </div>
    </footer>
    )
}