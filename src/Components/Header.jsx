const Header = ({ title }) => {
  return (
    <header className=" bg-lightBackground dark:bg-darkBackground text-lightText dark:text-darkText bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-50 border-gray-700">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold ">{title}</h1>
      </div>
    </header>
  );
};
export default Header;
