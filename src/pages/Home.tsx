import { CylindricalButton } from '../components/CylindricalButton';
import ExperienceTab from '../components/ExperienceTab';
import Institutions from '../components/Institutions';
import { Contents } from '../content';
import Blog from './Blog';
import Contact from './Contact';
import Projects from './Projects';

function Home() {
  return (
    <main className="pt-20 max-w-5xl mx-auto space-y-10">
      {/* Profile Card */}
      <section className="bg-white rounded-lg shadow">
        <div className="h-40 bg-gradient-to-r from-green-600 to-blue-600 rounded-t-lg"></div>
        <div className="px-6 -mt-12 items-end gap-6">
          <img
            src="https://i.postimg.cc/bDDVzT76/Gemini-Generated-Image-5o5wiq5o5wiq5o5w.png"
            alt="profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover object-top"
          />

          <div className="profile-card-parent flex">
            <div className="profile-card-left w-2/3">
              <h1 className="text-2xl font-semibold">Rohan Prabhakar</h1>
              <p className="text-gray-700">Software Developer | Backend Developer @ Monet Analytics || DTU 2024</p>
              <div className="flex gap-1.5">
                <p className="text-sm text-gray-500">New Delhi, India</p>
                <a className="text-sm text-blue-500 font-semibold gap-6 hover:underline" href="/#/contact">
                  Contact info
                </a>
              </div>
            </div>

            <div className="profilecard-right w-1/3">
              <Institutions />
            </div>
          </div>
          <div className="pb-2">
            <CylindricalButton
              expanded={false}
              onClick={() => window.location.href = '/#/contact'}
              labelCollapsed="Message"
              className="text-white bg-blue-500 border hover:bg-blue-600 cursor-pointer"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <div className="bg-white rounded-lg shadow p-6 px-6 py-4">
        <h2 className="text-lg font-semibold mb-2">About</h2>
        <p className="text-gray-700">
          Backend-focused developer experienced in JavaScript, TypeScript, databases, and cloud deployments. Passionate
          about scalable systems & APIs.
        </p>
      </div>

      {/* Experience Section */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-2">Experience</h2>
        <div className="mt-4 flex flex-col gap-6">
          {Contents.experience.map((elem, id) => (
            <ExperienceTab key={id} exp={elem} expand={false} />
          ))}
        </div>
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
