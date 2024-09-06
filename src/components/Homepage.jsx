

function Homepage(myprofile) {
    const profile = myprofile.myprofile;
  return (
    <>
      <div className="buymecoffee right-0 fixed top-0 m-2 p-2">
        <a href="https://www.buymeacoffee.com/icyr" target="_blank">
          <img
            src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
            alt="Buy Me A Coffee"
            style={{ height: "60px", width: "217px" }}
          ></img>
        </a>
      </div>
      <div className="basicdiv w-screen max-h-screen flex justify-between">
        <div className="part1 flex flex-col justify-end p-5 min-h-dvh">
          <div className="img min-h-3 py-5 drop-shadow-sm hover:drop-shadow-2xl transition-[300ms]">
            <img alt="mypic" src={profile} className="rounded-full" />
          </div>
          <div className="anotherdiv items-center font-extrabold text-xl py-3 text-center bg-neutral-800 rounded-2xl">
            MM Asath - ICY
          </div>
          <div className="desc p-3 bg-neutral-800 rounded-2xl my-5">
            hey, I&apos;m Asath. I&apos;m a full-stack developer. <br /> I love
            to code and learn new things. <br /> I&apos;m a self-taught
            developer.
          </div>
          <div className="contactlinks flex ">
            <p className="p-2">contact me: </p>
            <a
              href="https://www.github.com/icy-r"
              target="_blank"
              className="p-2"
            >
              <img
                src="https://img.icons8.com/ios-glyphs/30/000000/github.png"
                alt="github"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/mohomed-asath-92ab682a7/"
              target="_blank"
              className="p-2"
            >
              <img
                src="https://img.icons8.com/ios-glyphs/30/000000/linkedin.png"
                alt="linkedin"
              />
            </a>
          </div>
        </div>

        <div className="part2 flex flex-col p-5 text-center justify-center">
          Having some tight schedule maintaining some other projects. Please come back later.
        </div>
      </div>
    </>
  );
}

export default Homepage;
