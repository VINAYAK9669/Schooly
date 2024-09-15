import StudentProfile from "./StudentProfile";
import { jwtDecode } from "jwt-decode";
import TeacherProfile from "../components/TeacherProfile";

function Profile() {
  const { profession } = jwtDecode(localStorage.getItem("authToken"));
  return (
    <div>
      {profession === "student" ? <StudentProfile /> : <TeacherProfile />}
    </div>
  );
}

export default Profile;
