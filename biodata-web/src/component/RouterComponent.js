import Login from "../pages/login";
import EntryBiodata from "../pages/insertbiodata";
import Register from "../pages/register";
import UsersData from "../pages/usersdata";
import {
    Routes ,
    Navigate ,
    Route
  } from "react-router-dom";

  export default function RouterComponent(props){
    if(props.logged.role === "user"){
        return (
          <Routes>
            <Route path="/login" element={<Navigate to="/entry-biodata" />} />
            <Route path="/" element={ <Navigate to="/entry-biodata" /> } />
            <Route path="/register" element={ <Navigate to="/entry-biodata" /> } />
            <Route path="/entry-biodata" element={ <EntryBiodata /> } />
            <Route path="/users-data" element={ <UsersData /> } />
          </Routes>
        )
      }else if(props.logged.role === "admin"){
          return (
            <Routes>
              <Route path="/users-data" element={ <UsersData /> } />
              <Route path="/login" element={<Navigate to="/users-data" />} />
              <Route path="/" element={ <Navigate to="/users-data" /> } />
              <Route path="/register" element={ <Navigate to="/users-data" />} />
              <Route path="/entry-biodata" element={ <Navigate to="/users-data" /> } />
            </Routes>
          )
      }else{
        return (
          <Routes>
            <Route path="/login" element={< Login />} />
            <Route path="/" element={ <Login /> } />
            <Route path="/register" element={ <Register />} />
            <Route path="/users-data" element={ <Navigate to="/login" /> } />
            <Route path="/entry-biodata" element={ <Navigate to="/login" /> } />
          </Routes>
        )
      }
  }