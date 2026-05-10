import { CylindricalButton } from "../components/CylindricalButton";
import ExperienceTab from "../components/ExperienceTab";
import Institutions from "../components/Institutions";
import { ProjectCard } from "../components/ProjectCard";
import { Contents } from "../content";
import ActivitySection from "../components/ActivitySection";
import { useNavigate } from "react-router-dom";
import ContactCard from "../components/ContactCard";
import { useState } from "react";
import ContactInfoModal from "../components/ContactInfoModal";
import Certifications from "../components/CertificationCard";
import SectionCard from "../components/SectionCard";
import ExpandableSection from "../components/ExpandableSection";
import GitHubContributions from "../components/GitHubContributions";

function Home() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const { personaldetails } = Contents;

  return (
    <main className="pt-20 max-w-5xl mx-auto space-y-8">
      {/* Profile Card */}
      <section
        id="profile"
        className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
      >
        <div className="h-40 bg-gradient-to-r from-green-600 to-blue-600"></div>

        <div className="px-6 pb-6 -mt-12">
          <img
            src={personaldetails.avtar}
            alt="profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover object-top"
          />

          <div className="flex mt-4 gap-6">
            {/* Left */}
            <div className="w-2/3">
              <h1 className="text-2xl font-semibold">{personaldetails.name}</h1>

              <p className="text-gray-700">{personaldetails.tagline}</p>

              <div className="flex gap-2 items-center">
                <p className="text-sm text-gray-500">
                  {personaldetails.location}
                </p>

                <button
                  className="text-sm text-blue-500 font-semibold hover:underline"
                  onClick={() => setShowPopup(true)}
                >
                  Contact info
                </button>
              </div>
            </div>

            {/* Right */}
            <div className="w-1/3">
              <Institutions />
            </div>
          </div>

          <div className="mt-4">
            <CylindricalButton
              expanded={false}
              onClick={() => navigate("/contact")}
              labelCollapsed="Message"
              className="text-white bg-blue-500 hover:bg-blue-600 cursor-pointer"
            />
          </div>
        </div>

        <ContactInfoModal
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
        />
      </section>

      {/* About */}
      <SectionCard id="about" title="About">
        <p className="text-gray-700 leading-relaxed">
          💻 Software Developer who builds systems, not just code syntax.
          <br />
          Hey, I’m Rohan — a guy who loves building things that work fast and
          work smart. I started with C++ and DSA back in college, and that
          shaped how I think about code — clean logic, optimized structure, no
          fluff. While most people write APIs, I design systems with purpose.
        </p>
      </SectionCard>

      {/* GitHub Contributions */}
      <SectionCard id="github" title="GitHub Contributions">
        <GitHubContributions />
      </SectionCard>
      
      {/* Activity */}
      <SectionCard id="activity" title="Activity">
        <ActivitySection />
      </SectionCard>


      {/* Experience */}
      <SectionCard id="experience" title="Experience">
        <ExpandableSection
          items={Contents.experience}
          initialCount={2}
          buttonText={`Show all ${Contents.experience.length} experiences`}
          renderItem={(item, index) => (
            <ExperienceTab key={index} exp={item} expand={false} />
          )}
        />
      </SectionCard>

      {/* Projects */}
      <SectionCard id="projects" title="Projects">
        <ExpandableSection
          items={Contents.projects}
          initialCount={3}
          buttonText={`Show all ${Contents.projects.length} projects`}
          renderItem={(item, index) => (
            <ProjectCard key={index} project={item} compact />
          )}
        />
      </SectionCard>

      {/* Certifications */}
      <SectionCard id="certifications" title="Licenses & Certifications">
        <ExpandableSection
          items={Contents.certifications}
          initialCount={2}
          buttonText={`Show all ${Contents.certifications.length} certifications`}
          renderItem={(item, index) => (
            <Certifications key={index} cert={item} />
          )}
        />
      </SectionCard>

      {/* Contact */}
      <SectionCard id="contact" title="Contact">
        <ContactCard page={false} />
      </SectionCard>
    </main>
  );
}

export default Home;
