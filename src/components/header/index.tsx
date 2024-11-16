const Header = ({ title }: { title: string }) => (
  <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
    <h2 className="text-2xl font-semibold">{title}</h2>
    
  </header>
);

export default Header;
