const institutes = [
  {
    name: "Monet Analytics",
    logo: "https://i.postimg.cc/sB00d8N7/monet-networks-logo.jpg",
  },
  {
    name: "Delhi Technological University (Formerly DCE)",
    logo: "https://i.postimg.cc/wvHzVmzR/dtulogo.jpg",
  },
];

function Institutions() {
  return (
    <div className="parentInstitute">
      {institutes.map((item, index) => (
        <div key={index} className="flex gap-2 items-center mb-2">
          <img className="w-8 h-8" src={item.logo} alt={item.name} />
          <p className="text-blue-500  font-semibold">{item.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Institutions;
