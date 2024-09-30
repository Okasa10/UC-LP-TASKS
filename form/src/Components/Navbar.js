import { useState } from 'react';
import '../App.css';

const options = document.getElementsByClassName('options');


function Navbar({ setBg }) {
    const [style, setStyle] = useState({
        color: '#ADEFD1FF',
        backgroundColor: '#00203FFF'
    })
    const [text, setText] = useState('Dark')

    const changeTheme = () => {
        if (style.color === "#ADEFD1FF") {
            setStyle({
                color: '#00203FFF',
                backgroundColor: '#ADEFD1FF'
            })
            setBg({
                backgroundColor: '#00203FFF',
                color: '#ADEFD1FF'

            })
            options.style = {
                boxShadow: '0 4px 8px 0 rgba(0, 31, 63, 0.244), 0 6px 20px 0 rgba(0, 31, 63, 0.581)'
            }
            setText('Light')
        }
        else {
            setStyle({
                color: '#ADEFD1FF',
                backgroundColor: '#00203FFF'
            })
            setBg({
                backgroundColor: '#ADEFD1FF',
                color: '#00203FFF'

            })
            setText('Dark')
        }
    }
    return (
        <nav className="navbar" style={style}>
            <div className="container-fluid "  >
                <span className="navbar-brand" style={style}
                >
                    Login Form
                </span>
                <button type="button" className='btn btn-primary bg-info=subtle theme
                ' onClick={changeTheme}>Enable {text} mode</button>
            </div>
        </nav>
    );
}


export default Navbar;