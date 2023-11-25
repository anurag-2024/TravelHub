import React, { useRef, useEffect, useState } from 'react'
import { Container, Row, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { NavLink, Link} from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useLocation,useNavigate } from 'react-router-dom';
import userIcon from "../../assets/images/user.png";
import "./Header.css"
import axios from "axios";
import { BASE_URL } from '../../utilis/config';
import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '../../Store/Store';
const nav_link = [
  {
    path: "/home",
    display: "Home"
  },
  {
    path: "/about",
    display: "About"
  },
  {
    path: "/tours",
    display: "Tours"
  }
]
const Header = () => {
  const setisLogin = useAuthStore(state => state.setIsLogin);
  const setusername = useAuthStore(state => state.setUsername);
  const setprofile = useAuthStore(state => state.setProfile);
  const setToken = useAuthStore(state => state.setToken);
  const setUserId = useAuthStore(state => state.setUserId);
  const setUserEmail = useAuthStore(state => state.setUserEmail);
  const isLogin = useAuthStore(state => state.auth.isLogin);
  const username = useAuthStore(state => state.auth.username);
  const profile = useAuthStore(state => state.auth.profile);
  const token = localStorage.getItem('token');
  setToken(token);
  const navigate=useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  var decode = null;
  if (token) {
    decode = jwtDecode(token);
  }
  useEffect(() => {
    const fetchData = (async () => {
      if (token) {
        const res = await axios.get(`${BASE_URL}/getUser/${decode?.userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          "Content-type": "Application/json"
        });
        if (res.status === 200) {
          const name = (res?.data?.data?.username).split(" ")[0];
          setisLogin(true);
          setusername(name);
          setprofile(res?.data?.data?.profile);
          setUserId(res?.data?.data?._id);
          setUserEmail(res?.data?.data?.email);
        }
      }
    })
    fetchData();
  }, [token, decode?.userId, setisLogin, setusername, setprofile,setUserId,setUserEmail]);
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const headerRef = useRef(null);
  const menuRef = useRef(null);
  useEffect(() => {
    const stickyHeaderFunc = () => {
      const headerElement = headerRef?.current;
      if (headerElement) {
        window.addEventListener("scroll", () => {
          if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            headerElement?.classList?.add("sticky__header");
          } else {
            headerElement?.classList?.remove("sticky__header");
          }
        });
      }
    };
  
    stickyHeaderFunc();
  
    return () => {
      window.removeEventListener("scroll", stickyHeaderFunc);
    };
  }, [headerRef]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    const menuElement = menuRef.current;
    if (menuElement) {
      menuElement?.classList?.toggle("show__menu");
    }
  };
  return (
    <header className='header'
      ref={headerRef}
    >
      <Container>
        <Row>
          <div className='nav_wrapper d-flex align-items-center justify-content-between'>
            <div className='logo'>
              <NavLink to={nav_link[0].path}><img src={logo} alt="" /></NavLink>
            </div>
            <div className='navigation' ref={menuRef} onClick={toggleMenu}>
              <ul className='menu d-flex align-items-center gap-5'>
                {
                  nav_link.map((item, index) => {
                    return <li className='nav__item' key={item}>
                      <NavLink to={item.path}
                        className={item.path === location.pathname ? 'active__link' : ''}
                      >{item.display}</NavLink>
                    </li>
                  })
                }
              </ul>
            </div>
            <div className='nav__right d-flex align-items-center gap-4'>
              <div className="nav__btns d-flex align-items-center gap-4">
                {isLogin ? (

                  <div className="user-info">
                    <span className="user-greeting">Hi,{username}</span>
                    <Dropdown  isOpen={dropdownOpen} toggle={toggleDropdown}>
                      <DropdownToggle style={{ backgroundColor: 'white', border: 'none', borderColor:"black",'--bs-btn-hover-color': 'unset',"--bs-btn-color":"unset"}} caret>
                        <img src={profile?profile:userIcon} alt="Profile Pic" className="profile-pic" />
                      </DropdownToggle>
                      <DropdownMenu style={{"--bs-dropdown-min-width":"8rem","--bs-dropdown-min-height":"2rem","padding":"unset"}}>
                        <DropdownItem style={{"lineHeight":"unset"}} onClick={()=>{navigate("/profile")}}>Profile</DropdownItem>
                        <DropdownItem style={{"lineHeight":"unset"}} onClick={() => {localStorage.clear(); navigate("/");window.location.reload();}}>Logout</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                ) : (
                  <>
                    <Button className="btn secondary__btn">
                      <Link to="/login"> Login </Link>
                    </Button>
                    <Button className="btn primary__btn">
                      <Link to="/register"> Register </Link>
                    </Button>
                  </>
                )}
              </div>

              <span className='mobile__menu' onClick={toggleMenu}>
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  )
}

export default Header
