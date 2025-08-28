const SearchDetails = props => {
    return (
        <div className="flex items-center rounded-lg bg-white shadow">
            <input type="search" placeholder="search recipe" className="w-[70%] min-w-[200px] px-3 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <button className="w-[30%] px-4 py-2 rounded-r-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Search</button>
        </div>
    )
}

export default SearchDetails