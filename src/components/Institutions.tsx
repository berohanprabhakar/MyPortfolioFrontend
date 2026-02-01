import { Contents } from "../content";

function Institutions() {
  const { institutes } = Contents;
  return (
    <div className="parentInstitute">
      {institutes.map((item, index) => (
        <div key={index} className="flex gap-2 items-center mb-2">
          <img className="w-8 h-8" src={item.logo} alt={item.name} />
          <p className="text-blue-500  font-semibold">
            {" "}
            <a
              href={item.link}
              target="_blank"
              className="text-blue-600"
            >
              {" "}
              {item.name}
            </a>
          </p>
        </div>
      ))}
    </div>
  );
}

export default Institutions;
