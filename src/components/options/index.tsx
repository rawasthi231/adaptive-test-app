export default function Options({ options }: { options: string[] }) {
  return (
    <div className="p-4 rounded-lg shadow-md">
      <h2 className="text-md font-semibold text-gray-800 mb-3">Options</h2>
      <ul className="space-y-2">
        {options.map((option, i) => (
          <li className="flex items-center text-sm" key={`${option}-${i}`}>
            <span className="text-green-500 mr-2">{option}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
