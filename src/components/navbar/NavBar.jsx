import React,{useState} from 'react'
import{BsFillHouseFill} from 'react-icons/bs'



import './NavBar.css'

const NavBar = () => {
   const [menuOpen, setMenuOpen] = useState(false)

    
  return (
    <div className='navbar'>
        <div className='container'>
            <h1><span><BsFillHouseFill/>Sky</span>Line.</h1>
            <div className="menu" 
            onClick={() => {
            setMenuOpen(!menuOpen);
            }}
            > 
            
        </div>
            
            
            <ul className={menuOpen ? "open" : ""}> 
                <li><a href='/Home'>Home</a></li>
                <li><a href='/About'>About</a></li>
                <li><a href='/Contact'>Contact</a></li>
            </ul>
            
        </div>
    </div>
  )
}

export default NavBar


