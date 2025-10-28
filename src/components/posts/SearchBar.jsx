export const SearchBar = ( {setSearchTerm}) => {
    return (
        <div className="search-bar">
                    <input className="search-input"
                        type="text"
                        placeholder="Search Tickets"
                        onChange={(event) => {
                            setSearchTerm(event.target.value)

                        }}>
                    </input>
                </div>
    )
}