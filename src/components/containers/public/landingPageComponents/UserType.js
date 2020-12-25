import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function UserType(props) {

  const { title } = props

  useEffect(() => {
    AOS.init({
        duration : 2000
    });
    AOS.refresh();
  }, []);

  return (
    <div data-aos="fade-up">
        <p>{title}</p>
    </div>
  );
}

export default UserType;