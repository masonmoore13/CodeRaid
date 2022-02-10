function List(props){
      function handleClick(){
    props.deletion(props.id)
  }
    return (
        <div className="event">
          <h1 >  Title: {props.event_name} </h1>
          <p > description: {props.description}</p>
          <button onClick={handleClick}>Delete</button>
        </div>
    )
  }

export default List;