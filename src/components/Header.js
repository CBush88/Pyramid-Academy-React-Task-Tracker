import PropTypes from 'prop-types'
import Button from './Button'
//Using a deconstructed property, could also use props.title
const Header = ({title, onAdd, showAdd}) => {

  return (
    <header className="header">
        {/* CSS inline example */}
        {/* <h1 style={{color:"red", backgroundColor:"black"}}>{title}</h1> */}

        {/* CSS document example */}
        {/* <h1 style={headingStyle}>{title}</h1> */}

        <h1>{title}</h1>
        <Button color={showAdd ? "red" : "green"} text={showAdd ? "Close" : "Add"} onClick={onAdd}/>
    </header>
  )
}

//A way to set a default property
Header.defaultProps = {
    title: "Task Tracker",
}

//Can set mandatory type checking for properties, optional, will still render if requirements not met
//must use lower camel case in declaration
Header.propTypes = {
    //must use upper camel case inside
    title: PropTypes.string.isRequired
}

// CSS in JS
// const headingStyle = {
//     color:"red",
//     backgroundColor:"black",
// }

export default Header