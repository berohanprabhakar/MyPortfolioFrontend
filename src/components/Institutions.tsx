const institutes = [
  {
    name: "Monet Analytics",
    logo: "/assets/monet_networks_logo.jpeg",
  },
  {
    name: "Delhi Technological University (Formerly DCE)",
    logo: "/assets/dtulogo.jpeg",
  },
];

function Institutions() {
  return (
    <div className="parentInstitute">
      {institutes.map((item, index) => (
        <div key={index} className="flex gap-2 items-center mb-2">
          <img className="w-8 h-8" src={item.logo} alt={item.name} />
          <p className="text-black">{item.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Institutions;
