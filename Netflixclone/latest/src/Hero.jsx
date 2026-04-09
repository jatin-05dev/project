 function Hero() {
  return (
    <div className="bg-black px-4 py-10">

      {/* Heading */}
      <h1 className="text-white font-bold text-center text-2xl md:text-4xl mb-8">
        Trending Now
      </h1>

      {/* Trending Cards */}
      <div className="flex flex-wrap gap-5 justify-center">
        {["img7.webp", "img8.webp", "img78.webp", "img4.webp", "img3.webp"].map(
          (img, index) => (
            <div
              key={index}
              className="h-52 w-36 md:h-64 md:w-44 bg-cover bg-center rounded-xl"
              style={{ backgroundImage: `url('/${img}')` }}
            ></div>
          )
        )}
      </div>

      {/* More reasons */}
      <h1 className="text-white font-bold text-2xl md:text-3xl mt-12 mb-6 text-center">
        More reasons to join
      </h1>

      {/* Info Cards */}
      <div className="flex flex-wrap justify-center gap-6">
        {[1, 2, 3, 4].map((_, i) => (
          <div
            key={i}
            className="bg-purple-950 rounded-xl w-full sm:w-[300px] p-5"
          >
            <h2 className="text-white font-bold text-xl mb-3">
              Enjoy on your TV
            </h2>
            <p className="text-white text-sm">
              Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
              Blu-ray players and more.
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Hero
