import React from "react";

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  id?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  children,
  id,
}) => {
  return (
    <section id={id} className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="px-6 py-5">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
};

export default SectionCard;
