export const DropdownMenu = ({ setTopicName, allTopics }) => {
    return (
        <div className="post-dropdown">
            <select
                onChange={(event) => {
                    setTopicName(event.target.value)
                }}

            >
                {allTopics.map((topic) => {
                    return (
                        <option
                            className="post-option"
                            key={topic.id}
                        >
                            {topic.name}

                        </option>
                    )
                })}


            </select>
        </div>
    )
}