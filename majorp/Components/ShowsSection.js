function ShowsSection({
    id,
    title,
    shows,
    addedShows,
    onAddShow,
    onScroll
  }) {
    return (
      <div id={id}>
        <h2>{title}</h2>
        <div className="shows-list" onScroll={(e) => onScroll(id, e.deltaX > 0 ? "right" : "left")}>
          {shows.map((show) => (
            <div key={show.id} className="show-item">
              <h3>{show.name}</h3>
              <button onClick={() => onAddShow(show.id)}>
                {addedShows.includes(show.id) ? "Remove" : "Add"}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
  

export default ShowsSection;