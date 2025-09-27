import Experience from "./Experience";
import Projects from "./Projects";
import Blog from "./Blog";
import Contact from "./Contact";

function Home() {
  return (
    <main className="pt-20 max-w-5xl mx-auto space-y-10">
      {/* Profile Card */}
      <section className="bg-white rounded-lg shadow">
        <div className="h-40 bg-gradient-to-r from-green-600 to-blue-600 rounded-t-lg"></div>
        <div className="px-6 -mt-12 flex items-end gap-6">
          <img
            src="https://media.licdn.com/dms/image/v2/D5603AQGWpPsk-9iBWA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1690612396654?e=1761782400&v=beta&t=H_oyTWH4nWoQ3XhXGuxF2ZynsGZJxkmYODMZLgM3Mnk"
            alt="profile"
            className="w-28 h-28 rounded-full border-4 border-white shadow-md"
          />
          <div>
            <h1 className="text-2xl font-semibold">Rohan Prabhakar</h1>
            <p className="text-gray-700">
              Software Developer | Backend Developer @ Monet Analytics || DTU
              2024
            </p>
            <p className="text-sm text-gray-500">New Delhi, India</p>
          </div>
        </div>

        {/* About Section */}
        <div className="px-6 py-4 border-t">
          <h2 className="text-lg font-semibold mb-2">About</h2>
          <p className="text-gray-700">
            Backend-focused developer experienced in JavaScript, TypeScript,
            databases, and cloud deployments. Passionate about scalable systems
            & APIs.
          </p>
        </div>
      </section>

      {/* Experience Section */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Experience</h2>
        <Experience />
      </section>

      {/* Projects Section */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Projects</h2>
        <Projects />
      </section>

      {/* Blog Section */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Blog</h2>
        <Blog />
      </section>

      {/* Contact Section */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Contact</h2>
        <Contact />
      </section>
    </main>
  );
}

export default Home;
